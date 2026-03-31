from fastapi import APIRouter, HTTPException
from models.story_model import CreateStoryRequest, ChatRequest, ChapterUpdate
from services import story_service

router = APIRouter(prefix="/story", tags=["Story"])

# 1. CREATE STORY
@router.post("/create")
def create_story(request: CreateStoryRequest):
    """
    Connect frontend requests to backend service functions.
    Input: CreateStoryRequest
    Call: create_story()
    Return: story_id
    """
    try:
        story_id = story_service.create_story(request)
        return {"story_id": story_id}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# 2. GET STORY
@router.get("/{story_id}")
def get_story(story_id: str):
    """
    Call: get_story()
    If not found -> return error
    Return full story
    """
    story = story_service.get_story(story_id)
    if not story:
        raise HTTPException(status_code=404, detail=f"Story with id '{story_id}' not found.")
    return story

# 3. GENERATE SUMMARY (CHAT START)
@router.post("/{story_id}/summary")
def generate_summary(story_id: str):
    """
    Call: generate_summary()
    Return:
      - summary
      - chapter1_direction
    """
    try:
        return story_service.generate_summary(story_id)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# 4. CHAT REFINE
@router.post("/{story_id}/refine")
def refine_story(story_id: str, request: ChatRequest):
    """
    Input: ChatRequest
    Call: refine_story()
    Return AI reply
    """
    try:
        reply = story_service.refine_story(story_id, request.message)
        return {"reply": reply}
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# 5. GENERATE CHAPTER
@router.post("/{story_id}/generate-chapter")
def generate_chapter(story_id: str):
    """
    Call: generate_chapter()
    Return chapter content
    """
    try:
        return story_service.generate_chapter(story_id)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# 6. UPDATE CHAPTER
@router.patch("/{story_id}/chapter/{chapter_number}")
def update_chapter(story_id: str, chapter_number: int, update: ChapterUpdate):
    """
    Input: new content (string)
    Call: update_chapter()
    Return success message
    """
    try:
        return story_service.update_chapter(story_id, chapter_number, update.content)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
