import os
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()

MONGO_URL = os.getenv("MONGO_URL")

try:
    client = MongoClient(MONGO_URL)
    # Ping the server to verify connection
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
    
    db = client["novel_ai"]
    stories_collection = db["stories"]
except Exception as e:
    print(f"Error connecting to MongoDB: {e}")

def get_stories_collection():
    return stories_collection
