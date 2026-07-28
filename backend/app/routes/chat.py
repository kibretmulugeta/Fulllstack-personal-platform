from fastapi import APIRouter
from app.models.domain import ChatRequest, ChatResponse
from app.services.ai_service import generate_ai_response

router = APIRouter(prefix="/api/chat", tags=["AI Chatbot"])

@router.post("", response_model=ChatResponse)
async def chat_with_portfolio_ai(req: ChatRequest):
    result = await generate_ai_response(req.message, req.language)
    return ChatResponse(
        reply=result["reply"],
        sources=result["sources"],
        language=result["language"]
    )
