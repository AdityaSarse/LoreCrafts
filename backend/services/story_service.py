"""
story_service.py
----------------
Core service layer for the AI Novel Maker backend.
Handles all database operations and story flow logic.
Routes should call these functions directly — no FastAPI logic lives here.
"""

import uuid
from datetime import datetime
from typing import Optional

from database.db import get_stories_collection
from models.story_model import CreateStoryRequest
from services.ai_service import generate_summary_ai, refine_story_ai, generate_chapter_ai


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def _story_not_found(story_id: str):
    raise ValueError(f"Story with id '{story_id}' not found.")


def _serialize(doc: dict) -> dict:
    """Convert MongoDB _id to string so it is JSON-serializable."""
    if doc and "_id" in doc:
        doc["story_id"] = str(doc["_id"])
        del doc["_id"]
    return doc


# ---------------------------------------------------------------------------
# 1. create_story
# ---------------------------------------------------------------------------

def create_story(data: CreateStoryRequest) -> str:
    """
    Insert a new story document into MongoDB.
    Returns the generated story_id (UUID string).
    """
    collection = get_stories_collection()
    story_id = str(uuid.uuid4())
    now = datetime.utcnow()

    document = {
        "_id": story_id,
        "title": data.title,
        "chapter1_name": data.chapter1_name,
        "genre": data.genre,
        "era": data.era,
        "plot": data.plot,
        "description": data.description,
        # Convert list of Pydantic/dict characters to plain dicts
        "characters": [
            c if isinstance(c, dict) else c.model_dump()
            for c in data.characters
        ],
        "chat_history": [],
        "context": "",
        "chapters": [],
        "created_at": now,
        "updated_at": now,
    }

    collection.insert_one(document)
    return story_id


# ---------------------------------------------------------------------------
# 2. get_story
# ---------------------------------------------------------------------------

def get_story(story_id: str) -> Optional[dict]:
    """
    Fetch a single story document by its _id.
    Returns the document as a dict, or None if not found.
    The raw MongoDB _id is renamed to story_id for cleaner API responses.
    """
    collection = get_stories_collection()
    doc = collection.find_one({"_id": story_id})
    if not doc:
        return None
    return _serialize(doc)


# ---------------------------------------------------------------------------
# 3. generate_summary
# ---------------------------------------------------------------------------

def generate_summary(story_id: str) -> dict:
    """
    Generate a mock AI summary and opening chapter direction for the story.
    Appends an AI message to chat_history and returns the summary payload.
    """
    collection = get_stories_collection()
    story = collection.find_one({"_id": story_id})
    if not story:
        _story_not_found(story_id)

    # Call AI Service
    ai_response = generate_summary_ai(story)
    
    # Simple extraction for Summary and Direction
    summary = ai_response
    chapter_direction = "Start with a vivid hook based on the summary."
    
    if "[Summary]" in ai_response and "[Direction]" in ai_response:
        parts = ai_response.split("[Direction]")
        summary = parts[0].replace("[Summary]", "").strip()
        chapter_direction = parts[1].strip()

    ai_chat_message = {
        "role": "ai",
        "content": ai_response,
        "timestamp": datetime.utcnow(),
    }

    collection.update_one(
        {"_id": story_id},
        {
            "$push": {"chat_history": ai_chat_message},
            "$set": {
                "context": summary,
                "updated_at": datetime.utcnow(),
            },
        },
    )

    return {
        "summary": summary,
        "chapter1_direction": chapter_direction,
    }


# ---------------------------------------------------------------------------
# 4. refine_story
# ---------------------------------------------------------------------------

def refine_story(story_id: str, user_message: str) -> str:
    """
    Accept a user refinement message, generate a mock AI reply,
    persist both to chat_history, and update the story context.
    Returns the AI reply string.
    """
    collection = get_stories_collection()
    story = collection.find_one({"_id": story_id})
    if not story:
        _story_not_found(story_id)

    now = datetime.utcnow()

    # Build chat messages
    user_chat = {
        "role": "user",
        "content": user_message,
        "timestamp": now,
    }

    # Call AI Service
    ai_reply_text = refine_story_ai(story.get("context", ""), user_message)

    ai_chat = {
        "role": "ai",
        "content": ai_reply_text,
        "timestamp": now,
    }

    collection.update_one(
        {"_id": story_id},
        {
            "$push": {"chat_history": {"$each": [user_chat, ai_chat]}},
            "$set": {
                "context": ai_reply_text,
                "updated_at": now,
            },
        },
    )

    return ai_reply_text


# ---------------------------------------------------------------------------
# 5. generate_chapter
# ---------------------------------------------------------------------------

def generate_chapter(story_id: str) -> dict:
    """
    Generate a mock chapter for the story.
    Determines chapter number automatically, appends to chapters array.
    Returns the new chapter object.
    """
    collection = get_stories_collection()
    story = collection.find_one({"_id": story_id})
    if not story:
        _story_not_found(story_id)

    existing_chapters = story.get("chapters", [])
    chapter_number = len(existing_chapters) + 1
    context = story.get("context", "")
    title = story.get("chapter1_name", f"Chapter {chapter_number}") if chapter_number == 1 else f"Chapter {chapter_number}"

    # Call AI Service for Content
    content = generate_chapter_ai(story)

    now = datetime.utcnow()
    chapter_obj = {
        "chapter_number": chapter_number,
        "title": title,
        "content": content,
        "created_at": now,
        "updated_at": now,
    }

    collection.update_one(
        {"_id": story_id},
        {
            "$push": {"chapters": chapter_obj},
            "$set": {"updated_at": now},
        },
    )

    return chapter_obj


# ---------------------------------------------------------------------------
# 6. update_chapter
# ---------------------------------------------------------------------------

def update_chapter(story_id: str, chapter_number: int, new_content: str) -> dict:
    """
    Update the content of a specific chapter inside the chapters array.
    Returns a success message, or raises ValueError if not found.
    """
    collection = get_stories_collection()
    story = collection.find_one({"_id": story_id})
    if not story:
        _story_not_found(story_id)

    # Verify chapter exists
    chapters = story.get("chapters", [])
    chapter_exists = any(c["chapter_number"] == chapter_number for c in chapters)
    if not chapter_exists:
        raise ValueError(f"Chapter {chapter_number} not found in story '{story_id}'.")

    now = datetime.utcnow()
    result = collection.update_one(
        {"_id": story_id, "chapters.chapter_number": chapter_number},
        {
            "$set": {
                "chapters.$.content": new_content,
                "chapters.$.updated_at": now,
                "updated_at": now,
            }
        },
    )

    if result.modified_count == 0:
        raise ValueError("Chapter update had no effect. Check story and chapter IDs.")

    return {"status": "success", "message": f"Chapter {chapter_number} updated successfully."}
