from typing import Optional, List
from sqlmodel import Field, SQLModel, Relationship
from datetime import datetime

class User(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    username: str = Field(index=True, unique=True)
    email: str = Field(unique=True)
    password: str
    fullName: str
    bio: Optional[str] = None
    avatar: Optional[str] = None
    joinDate: str = Field(default_factory=lambda: datetime.now().isoformat())
    followers: int = 0
    following: int = 0
    posts_count: int = 0
    
    posts: List["Post"] = Relationship(back_populates="user")

class Post(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    userId: int = Field(foreign_key="user.id")
    content: str
    timestamp: str = Field(default_factory=lambda: datetime.now().isoformat())
    likes: int = 0
    comments: int = 0
    
    user: Optional[User] = Relationship(back_populates="posts")
