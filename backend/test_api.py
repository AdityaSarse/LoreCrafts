import json
import urllib.request
import time

BASE_URL = "http://127.0.0.1:8000"

def call_api(path, method="GET", data=None):
    url = f"{BASE_URL}{path}"
    headers = {"Content-Type": "application/json"}
    req_data = json.dumps(data).encode("utf-8") if data else None
    
    req = urllib.request.Request(url, data=req_data, headers=headers, method=method)
    try:
        with urllib.request.urlopen(req) as response:
            return json.loads(response.read().decode("utf-8"))
    except Exception as e:
        print(f"Error calling {path}: {e}")
        return None

def test_full_flow():
    print("--- 🚀 STARTING FULL API TEST ---")
    
    # 1. Create Story
    print("\n[1] Creating Story...")
    story_data = {
        "title": "The Chrono-Gardener",
        "chapter1_name": "The Echoes of Time",
        "genre": "Time-Travel Fantasy",
        "era": "The Final Millennium",
        "plot": "A lonely gardener must prune the timelines to prevent reality from unraveling.",
        "description": "A melancholic journey through dying worlds.",
        "characters": [{"name": "Elowen", "role": "The Gardener"}]
    }
    create_res = call_api("/story/create", method="POST", data=story_data)
    if not create_res: return
    story_id = create_res.get("story_id")
    print(f"✅ Story Created! ID: {story_id}")
    
    # 2. Generate Summary
    print("\n[2] Generating Summary (AI)...")
    summary_res = call_api(f"/story/{story_id}/summary", method="POST")
    if summary_res:
        print("✅ Summary Generated!")
        print(f"Summary: {summary_res.get('summary')[:100]}...")
    
    # 3. Refine Story
    print("\n[3] Refining Story (AI Chat)...")
    refine_data = {"message": "Introduce a mysterious clockwork butterfly that follows Elowen."}
    refine_res = call_api(f"/story/{story_id}/refine", method="POST", data=refine_data)
    if refine_res:
        print("✅ Story Refined!")
        print(f"AI Reply: {refine_res.get('reply')[:100]}...")
    
    # 4. Generate Chapter 1
    print("\n[4] Generating Chapter 1 (AI Write)...")
    chapter_res = call_api(f"/story/{story_id}/generate-chapter", method="POST")
    if chapter_res:
        print("✅ Chapter 1 Generated!")
        print(f"Title: {chapter_res.get('title')}")
        print(f"First 150 chars: {chapter_res.get('content')[:150]}...")
    
    # 5. Get Final Story State
    print("\n[5] Fetching Final Story State...")
    final_res = call_api(f"/story/{story_id}")
    if final_res:
        print("✅ Final Check Complete!")
        print(f"Chat History length: {len(final_res.get('chat_history', []))}")

if __name__ == "__main__":
    test_full_flow()
