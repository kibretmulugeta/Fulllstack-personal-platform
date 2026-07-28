import logging
import httpx
from app.config import settings
from app.services.rag_engine import retrieve_relevant_context

logger = logging.getLogger("kibret_portfolio")

AMHARIC_RESPONSES = {
    "projects": "ክብረት በርካታ የላቁ የሰው ሰራሽ አስተዋፅኦ (AI) እና የመድኃኒት ኢሜጂንግ ፕሮጀክቶችን ገንብቷል። ዋና ዋናዎቹ፦ 1) Neuro-Inspired U-Net Optimization (99.72% ትክክለኛነት)፣ 2) AI Medical Imaging Platform (ከድምፅ ረዳት ጋር)፣ 3) MeetPoint Smart Scheduler፣ እና 4) ይህ KibretAI Portfolio Platform ናቸው።",
    "research": "የክብረት የምርምር ትኩረት 'Reward-Driven Neural Plasticity Inspired Optimization for Enhancing U-Net Based Medical Image Segmentation' ላይ ያተኮረ ሲሆን በባህር ዳር ዩኒቨርሲቲ MSc በ AI እና Data Engineering ተመርቋል።",
    "skills": "ክብረት በ Python, PyTorch, TensorFlow, MONAI, Computer Vision, FastAPI, Docker, JavaScript እና MongoDB ከፍተኛ ክህሎት አለው።",
    "contact": "ክብረትን በኢሜይል (kibret.mulugeta@example.com) ወይም በህዝባዊ ሊንክዲንና ጊትሃብ አካውንቶቹ ማግኘት ይችላሉ።",
    "default": "ሰላም! እኔ የክብረት ሙሉጌታ AI Portfolio ረዳት ነኝ። ስለ ክብረት ፕሮጀክቶች፣ ምርምር፣ ክህሎቶች ወይም የትምህርት ዝግጅት ማንኛውንም ጥያቄ መጠየቅ ይችላሉ።"
}

ENGLISH_RESPONSES = {
    "projects": "Kibret has developed cutting-edge AI and Full-Stack platforms, including:\n1. Neuro-Inspired U-Net Optimization (99.72% accuracy in medical image segmentation)\n2. AI Medical Imaging Platform (Brain MRI analysis with voice assistant)\n3. MeetPoint Smart Scheduler (Automated scheduling & Google Maps integration)\n4. KibretAI Portfolio Platform (Full-stack glassmorphic AI showcase platform)",
    "research": "Kibret's MSc research at Bahir Dar University is titled 'Reward-Driven Neural Plasticity Inspired Optimization for Enhancing U-Net Based Medical Image Segmentation', achieving a 99.72% accuracy metric in brain MRI segmentation.",
    "skills": "Kibret specializes in Deep Learning & Full-Stack Development. Key tech stack:\n- AI/ML: PyTorch, TensorFlow, MONAI, OpenCV, Computer Vision, U-Net\n- Backend: FastAPI, Flask, Node.js, MongoDB\n- Tools: Docker, Git, Linux, Cloud Deployment",
    "contact": "You can contact Kibret directly via the contact form on this site, or reach out on GitHub and LinkedIn.",
    "default": "Hello! I am Kibret's AI Portfolio Assistant. Feel free to ask me about Kibret's research, deep learning projects, backend skills, or background!"
}

async def generate_ai_response(user_query: str, language: str = "en") -> dict:
    context = await retrieve_relevant_context(user_query)
    q_lower = user_query.lower()
    is_amharic = (language == "am") or any(ord(char) >= 0x1200 and ord(char) <= 0x137F for char in user_query)
    lang_code = "am" if is_amharic else "en"

    # Try Gemini API if key is present
    if settings.GEMINI_API_KEY:
        try:
            prompt = f"""
You are the AI Portfolio Assistant for Kibret Mulugeta Alemu, an AI Engineer & ML Researcher.
Answer the user's question accurately using ONLY the context provided below.
Respond in {'Amharic' if is_amharic else 'English'}.
Keep responses concise, professional, and impressive.

CONTEXT:
{context}

USER QUESTION:
{user_query}
"""
            async with httpx.AsyncClient() as client:
                url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={settings.GEMINI_API_KEY}"
                payload = {
                    "contents": [{"parts": [{"text": prompt}]}]
                }
                res = await client.post(url, json=payload, timeout=10.0)
                if res.status_code == 200:
                    data = res.json()
                    reply_text = data['candidates'][0]['content']['parts'][0]['text']
                    return {"reply": reply_text, "sources": ["Kibret AI RAG Database", "Gemini 1.5 Flash"], "language": lang_code}
        except Exception as e:
            logger.warning(f"Gemini API call failed: {e}. Falling back to semantic response engine.")

    # Intelligent Fallback Semantic Engine
    responses_dict = AMHARIC_RESPONSES if is_amharic else ENGLISH_RESPONSES

    if any(k in q_lower for k in ["project", "build", "built", "work", "app", "ፕሮጀክት", "ሰራ"]):
        reply = responses_dict["projects"]
    elif any(k in q_lower for k in ["research", "paper", "msc", "u-net", "thesis", "segmentation", "ምርምር", "ትምህርት"]):
        reply = responses_dict["research"]
    elif any(k in q_lower for k in ["skill", "stack", "technology", "python", "pytorch", "fastapi", "ክህሎት", "ቴክኖሎጂ"]):
        reply = responses_dict["skills"]
    elif any(k in q_lower for k in ["contact", "email", "hire", "reach", "ግንኙነት", "ኢሜይል"]):
        reply = responses_dict["contact"]
    else:
        reply = responses_dict["default"]

    return {
        "reply": reply,
        "sources": ["Kibret AI RAG Database", "Embedded Semantic Intelligence"],
        "language": lang_code
    }
