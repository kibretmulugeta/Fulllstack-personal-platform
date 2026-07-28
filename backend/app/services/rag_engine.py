from app.database.connection import get_database

KIBRET_KNOWLEDGE_BASE = """
NAME: Kibret Mulugeta Alemu
ROLE: Senior AI Engineer | Machine Learning Researcher | Full-Stack Developer
LOCATION: Bahir Dar / Addis Ababa, Ethiopia
ACADEMIC BACKGROUND: MSc in Artificial Intelligence and Data Engineering, Bahir Dar University.
RESEARCH THESIS: "Reward-Driven Neural Plasticity Inspired Optimization for Enhancing U-Net Based Medical Image Segmentation"

KEY RESEARCH HIGHLIGHTS:
- Developed a novel optimization framework inspired by biological synaptic plasticity and reward-driven learning.
- Significantly improved U-Net medical image segmentation performance on Brain MRI & CT datasets.
- Achieved state-of-the-art segmentation accuracy of 99.72% with accelerated convergence rates.
- Integrated MONAI and TensorFlow for high-dimensional 3D volumetric medical data.

TECHNICAL SKILLS:
- Programming: Python, JavaScript, C++, SQL, Bash.
- AI/ML/DL: PyTorch, TensorFlow, MONAI, Scikit-learn, OpenCV, Computer Vision, Medical Imaging, Generative AI, RAG Systems, Transformers.
- Backend & Cloud: FastAPI, Flask, Node.js, Express, MongoDB Atlas, PostgreSQL, Redis, REST APIs, WebSockets.
- DevOps & Tools: Docker, Git/GitHub, Linux, Vercel, Render, CI/CD pipelines.

FEATURED PROJECTS:
1. Neuro-Inspired U-Net Optimization:
   - Reward-driven neural plasticity optimization for U-Net medical image segmentation.
   - Tech: Python, TensorFlow, U-Net, MONAI, Medical Imaging.
   - Metric: 99.72% Accuracy.
2. AI Medical Imaging Platform:
   - End-to-end clinical platform for Brain MRI scan uploads, automated U-Net segmentation, AI diagnostic assistant, voice control, and natural language report explanations.
   - Tech: FastAPI, React, MONAI, Web Speech API, MongoDB.
3. MeetPoint Smart Scheduler:
   - Full-stack scheduling solution with automated calendar conflict resolution, Google Maps location integration, and multi-channel SMS/Email notifications.
   - Tech: Node.js, React, MongoDB, Google Maps API, Twilio.
4. KibretAI Portfolio Platform:
   - Futuristic AI Engineer personal brand identity platform with dark futuristic glassmorphic UI, 3D neural brain canvas, RAG AI assistant, and Amharic/English voice interface.
   - Tech: React, Three.js, Framer Motion, Tailwind CSS, FastAPI, Motor MongoDB, JWT Auth.

BLOG POSTS & WRITINGS:
- "Understanding U-Net Architecture in Medical AI"
- "Deep Learning Optimization Techniques: Synaptic Plasticity & Reward Dynamics"
- "Building High-Performance Async AI Applications with FastAPI and MongoDB"

CONTACT DETAILS:
- Email: kibret.mulugeta@example.com / contact@kibret.ai
- GitHub: https://github.com/kibret-mulugeta
- LinkedIn: https://linkedin.com/in/kibret-mulugeta
- Open to: AI Engineering positions, ML Research roles, Ph.D. / Graduate Opportunities, Collaborative Research.
"""

async def retrieve_relevant_context(query: str) -> str:
    db = get_database()
    projects_coll = db["projects"]
    skills_coll = db["skills"]
    blogs_coll = db["blogs"]

    projects_cursor = await projects_coll.find({})
    projects = await projects_cursor.to_list(10)
    
    skills_cursor = await skills_coll.find({})
    skills = await skills_cursor.to_list(20)

    db_context = []
    if projects:
        db_context.append("PROJECTS IN DATABASE:")
        for p in projects:
            db_context.append(f"- {p.get('title')}: {p.get('description')} (Tech: {', '.join(p.get('technologies', []))})")
    
    if skills:
        db_context.append("\nSKILLS IN DATABASE:")
        for s in skills:
            db_context.append(f"- {s.get('name')} ({s.get('category')}): {s.get('percentage')}% proficiency")

    combined_context = KIBRET_KNOWLEDGE_BASE + "\n\n" + "\n".join(db_context)
    return combined_context
