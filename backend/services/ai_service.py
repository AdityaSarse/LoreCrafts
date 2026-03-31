import os
import google.generativeai as genai
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Configure Gemini
api_key = os.getenv("GEMINI_API_KEY")
if api_key:
    genai.configure(api_key=api_key)
    model = genai.GenerativeModel("gemini-pro")
else:
    print("WARNING: GEMINI_API_KEY not found in environment. AI features will use fallbacks.")
    model = None

# --- AI FUNCTIONS ---

def generate_summary_ai(story: dict) -> str:
    """
    Generate a story summary and Chapter 1 direction using Gemini.
    Input: story (dictionary containing genre, plot, characters)
    """
    if not model:
        return "AI is currently unavailable. Please check your GEMINI_API_KEY."

    genre = story.get("genre", "Unknown Genre")
    plot = story.get("plot", "No plot provided")
    characters = story.get("characters", [])
    
    char_str = ", ".join([f"{c.get('name')} ({c.get('role')})" for c in characters])

    prompt = f"""
    You are an expert novelist and story architect. 
    Based on the following details, generate a compelling story summary and a clear direction for the first chapter.

    STORY DETAILS:
    - GENRE: {genre}
    - PLOT: {plot}
    - CHARACTERS: {char_str}

    TASK:
    1. Write a 3-4 sentence professional story summary that highlights the central conflict and stakes.
    2. Suggest a 'Chapter 1 Direction' (2 sentences) on how the story should begin to hook the reader.

    TONE: Engaging, emotional, and descriptive.
    FORMAT: Clean text, no markdown headers. Use [Summary] and [Direction] as labels.
    """

    try:
        response = model.generate_content(prompt)
        return response.text.strip()
    except Exception as e:
        return f"Error generating summary: {str(e)}"

def refine_story_ai(context: str, user_input: str) -> str:
    """
    Modify the story direction based on user input.
    Input: context (current story direction), user_input (user message)
    """
    if not model:
        return "AI is currently unavailable."

    prompt = f"""
    CURRENT STORY CONTEXT/DIRECTION:
    {context}

    USER REQUEST FOR REFINEMENT:
    {user_input}

    TASK:
    Based on the user's request, update and refine the story direction. 
    Explain how this new element integrates into the existing plot or changes the tone.
    Be creative but stay consistent with the established world.

    TONE: Professional, encouraging, and descriptive.
    OUTPUT: A single cohesive paragraph of refined direction.
    """

    try:
        response = model.generate_content(prompt)
        return response.text.strip()
    except Exception as e:
        return f"Error refining story: {str(e)}"

def generate_chapter_ai(story: dict) -> str:
    """
    Generate the full text for Chapter 1.
    Input: full story object (dict)
    """
    if not model:
        return "AI is currently unavailable."

    title = story.get("title", "Untitled")
    genre = story.get("genre", "Fiction")
    plot = story.get("plot", "")
    context = story.get("context", "")
    characters = story.get("characters", [])
    char_str = ", ".join([f"{c.get('name')} ({c.get('role')})" for c in characters])

    prompt = f"""
    Write the complete first chapter for a novel based on these specifications:

    SPECIFICATIONS:
    - TITLE: {title}
    - GENRE: {genre}
    - CORE PLOT: {plot}
    - CHARACTERS: {char_str}
    - ESTABLISHED CONTEXT: {context}

    INSTRUCTIONS:
    - Write in a professional novel-style format.
    - Use vivid sensory details, sharp dialogue (if applicable), and immersive world-building.
    - Focus on the internal world of the protagonist while establishing the external setting.
    - Ensure the tone matches the '{genre}' genre.
    - Do NOT use markdown formatting for the story itself (e.g., no bolding or headers).

    OUTPUT: Full Chapter 1 text.
    """

    try:
        response = model.generate_content(prompt)
        return response.text.strip()
    except Exception as e:
        return f"Error generating chapter: {str(e)}"
