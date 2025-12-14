from fastapi import FastAPI, Depends, HTTPException, status
from sqlmodel import Session, select
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Optional
from .database import create_db_and_tables, get_session, engine
from .models import User, Post

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def on_startup():
    create_db_and_tables()

# Auth/User Endpoints

@app.post("/users/login")
async def login(user_data: dict, session: Session = Depends(get_session)):
    # Frontend sends {email: "...", password: "..."}
    # It might use "username" field for email in the form, let's check frontend logic later.
    # But generic login handling:
    
    identifier = user_data.get("email") or user_data.get("username")
    password = user_data.get("password")
    
    if not identifier or not password:
         return {"success": False, "message": "Missing credentials"}
    
    # Try finding by email first
    statement = select(User).where(User.email == identifier).where(User.password == password)
    user = session.exec(statement).first()
    
    if not user:
         # Try finding by username
        statement = select(User).where(User.username == identifier).where(User.password == password)
        user = session.exec(statement).first()
        
    if user:
        return {"success": True, "user": user}
    return {"success": False, "message": "Invalid credentials"}

@app.post("/users/signup")
async def signup(user: User, session: Session = Depends(get_session)):
    statement = select(User).where((User.email == user.email) | (User.username == user.username))
    existing = session.exec(statement).first()
    if existing:
        return {"success": False, "message": "User already exists"}
    
    if not user.avatar and user.fullName:
        user.avatar = "".join([n[0] for n in user.fullName.split(" ")]).upper()
        
    session.add(user)
    session.commit()
    session.refresh(user)
    return {"success": True, "user": user}

@app.get("/users/{user_id}")
async def get_user(user_id: int, session: Session = Depends(get_session)):
    user = session.get(User, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@app.get("/users/{user_id}/posts")
async def get_user_posts(user_id: int, session: Session = Depends(get_session)):
    statement = select(Post).where(Post.userId == user_id).order_by(Post.timestamp.desc())
    posts = session.exec(statement).all()
    
    result = []
    for post in posts:
        post_dict = post.model_dump()
        if post.user:
            post_dict["username"] = post.user.username
            post_dict["fullName"] = post.user.fullName
            post_dict["avatar"] = post.user.avatar
        result.append(post_dict)
    return result

# Post Endpoints

@app.get("/posts")
async def get_posts(session: Session = Depends(get_session)):
    statement = select(Post).order_by(Post.timestamp.desc())
    posts = session.exec(statement).all()
    
    result = []
    for post in posts:
        post_dict = post.model_dump()
        if post.user:
            post_dict["username"] = post.user.username
            post_dict["fullName"] = post.user.fullName
            post_dict["avatar"] = post.user.avatar
        result.append(post_dict)
        
    return result

@app.post("/posts")
async def create_post(post: Post, session: Session = Depends(get_session)):
    session.add(post)
    
    user = session.get(User, post.userId)
    if user:
        user.posts_count += 1
        session.add(user)
        
    session.commit()
    session.refresh(post)
    
    # Return enriched post
    post_dict = post.model_dump()
    if user:
        post_dict["username"] = user.username
        post_dict["fullName"] = user.fullName
        post_dict["avatar"] = user.avatar
        
    return {"success": True, "post": post_dict}
