from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime

class ChatMessage(BaseModel):
    role: str # "user" or "ai"
    content: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class Chapter(BaseModel):
    chapter_number: int
    title: str
    content: str

class CreateStoryRequest(BaseModel):
    title: str
    chapter1_name: str
    genre: str
    era: str
    plot: str
    description: str
    characters: List[dict] = []

class StoryDB(BaseModel):
    story_id: str
    title: str
    chapter1_name: str
    genre: str
    era: str
    plot: str
    description: str
    characters: List[dict] = []
    chat_history: List[ChatMessage] = []
    context: str = ""
    chapters: List[Chapter] = []
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

class ChatRequest(BaseModel):
    message: str

class ChapterUpdate(BaseModel):
    content: str
