from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.story_routes import router as story_router

app = FastAPI(title="AI Novel Maker API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(story_router)

@app.get("/")
def health_check():
    return {"status": "ok", "message": "Welcome to the AI Novel Maker Backend"}
