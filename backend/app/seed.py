import logging
from app.database.connection import get_database
from app.authentication.jwt_handler import hash_password
from app.config import settings

logger = logging.getLogger("kibret_portfolio")

INITIAL_PROJECTS = [
    {
        "_id": "proj-1",
        "title": "Neuro-Inspired U-Net Optimization",
        "description": "Reward-driven neural plasticity inspired optimization framework for medical image segmentation. Outperformed baseline ADAM/SGD on high-resolution 3D Brain MRI volumetric segmentation tasks.",
        "technologies": ["Python", "TensorFlow", "U-Net", "MONAI", "Medical Imaging", "PyTorch"],
        "image": "https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=1200&q=80",
        "github": "https://github.com/kibret-mulugeta/neuro-unet-optimization",
        "demo": "https://kibret-unet-demo.vercel.app",
        "featured": True,
        "metrics": {"accuracy": "99.72%", "dice_score": "0.984", "speedup": "3.4x"},
        "highlights": [
            "Biological synaptic plasticity mathematical formulation",
            "Monai 3D Brain MRI pipeline integration",
            "99.72% state-of-the-art segmentation accuracy achieved"
        ]
    },
    {
        "_id": "proj-2",
        "title": "AI Medical Imaging Platform",
        "description": "Clinical diagnostic assistant web platform enabling real-time Brain MRI DICOM/PNG uploads, interactive U-Net segmentation overlay, voice-activated diagnostic queries, and automated patient report synthesis.",
        "technologies": ["FastAPI", "React", "MONAI", "Web Speech API", "MongoDB", "Tailwind CSS"],
        "image": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
        "github": "https://github.com/kibret-mulugeta/ai-medical-imaging-platform",
        "demo": "https://medical-ai-kibret.vercel.app",
        "featured": True,
        "metrics": {"latency": "< 450ms", "modalities": "MRI / CT"},
        "highlights": [
            "Voice query interaction in English and Amharic",
            "Automated natural language report generation",
            "GPU accelerated microservice inference"
        ]
    },
    {
        "_id": "proj-3",
        "title": "MeetPoint Smart Scheduler",
        "description": "Full-stack intelligent appointment and location-aware scheduling system featuring automated calendar conflict resolution, Google Maps API routing, and SMS/Email notification microservices.",
        "technologies": ["Node.js", "React", "MongoDB", "Google Maps API", "Twilio", "Docker"],
        "image": "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=1200&q=80",
        "github": "https://github.com/kibret-mulugeta/meetpoint-smart-scheduler",
        "demo": "https://meetpoint-scheduler.vercel.app",
        "featured": False,
        "metrics": {"notification_reliability": "99.9%"},
        "highlights": [
            "Location-aware travel time calculation",
            "Multi-channel automated notification pipeline"
        ]
    },
    {
        "_id": "proj-4",
        "title": "AI Engineer Portfolio Platform",
        "description": "World-class full-stack professional portfolio platform featuring dark futuristic glassmorphism, 3D interactive neural brain, RAG AI assistant supporting English & Amharic voice interaction, and JWT admin control.",
        "technologies": ["React", "Vite", "Three.js", "FastAPI", "Motor MongoDB", "Framer Motion", "Tailwind CSS"],
        "image": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
        "github": "https://github.com/kibret-mulugeta/kibret-ai-portfolio",
        "demo": "https://kibret.ai",
        "featured": True,
        "metrics": {"lighthouse_performance": "100/100"},
        "highlights": [
            "RAG AI chatbot trained on Kibret's research & code",
            "3D WebGL particle neural brain canvas",
            "Complete Admin CMS dashboard"
        ]
    }
]

INITIAL_SKILLS = [
    {"_id": "sk-1", "name": "Python", "category": "Programming", "percentage": 98, "icon": "Terminal"},
    {"_id": "sk-2", "name": "JavaScript / Node.js", "category": "Programming", "percentage": 92, "icon": "Code"},
    {"_id": "sk-3", "name": "SQL & MongoDB", "category": "Programming", "percentage": 90, "icon": "Database"},
    {"_id": "sk-4", "name": "TensorFlow & Keras", "category": "AI/ML", "percentage": 96, "icon": "Cpu"},
    {"_id": "sk-5", "name": "PyTorch", "category": "AI/ML", "percentage": 95, "icon": "Zap"},
    {"_id": "sk-6", "name": "Scikit-Learn", "category": "AI/ML", "percentage": 94, "icon": "BarChart3"},
    {"_id": "sk-7", "name": "MONAI (Medical AI)", "category": "AI/ML", "percentage": 92, "icon": "Activity"},
    {"_id": "sk-8", "name": "Computer Vision & OpenCV", "category": "AI/ML", "percentage": 93, "icon": "Eye"},
    {"_id": "sk-9", "name": "Deep Learning & Transformers", "category": "AI/ML", "percentage": 95, "icon": "Network"},
    {"_id": "sk-10", "name": "FastAPI", "category": "Backend", "percentage": 96, "icon": "Server"},
    {"_id": "sk-11", "name": "Flask", "category": "Backend", "percentage": 88, "icon": "Layers"},
    {"_id": "sk-12", "name": "Node.js & Express", "category": "Backend", "percentage": 90, "icon": "Globe"},
    {"_id": "sk-13", "name": "MongoDB Atlas", "category": "Backend", "percentage": 92, "icon": "Database"},
    {"_id": "sk-14", "name": "Docker & Containers", "category": "Tools", "percentage": 91, "icon": "Box"},
    {"_id": "sk-15", "name": "Git & GitHub Actions", "category": "Tools", "percentage": 95, "icon": "GitBranch"},
    {"_id": "sk-16", "name": "Linux Sysadmin", "category": "Tools", "percentage": 90, "icon": "Command"},
    {"_id": "sk-17", "name": "Vercel & Render Cloud", "category": "Tools", "percentage": 93, "icon": "Cloud"}
]

INITIAL_BLOGS = [
    {
        "_id": "blog-1",
        "title": "Understanding U-Net Architecture for Medical Image Segmentation",
        "summary": "An in-depth guide to the Contracting and Expansive paths of U-Net, skip connections, and volumetric 3D MRI segmentation techniques.",
        "category": "Medical AI",
        "read_time": "7 min read",
        "content": """
# Understanding U-Net Architecture in Medical AI

Medical image segmentation demands high structural fidelity, precise boundary delineations, and robust generalization even on small clinical datasets.

## Key Architectural Components

1. **Encoder (Contracting Path)**: Captures spatial features using repeated 3x3 convolutions followed by ReLU and Max Pooling.
2. **Decoder (Expansive Path)**: Reconstructs high-resolution spatial masks using Up-convolutions.
3. **Skip Connections**: Concatenate fine-grained spatial feature maps from the encoder directly to the decoder, preventing spatial detail loss.

## Volumetric 3D Medical Imaging with MONAI

When expanding U-Net from 2D slices to 3D volumetric MRI tensors, memory efficiency and specialized loss functions (such as Dice + Focal Loss) become essential.
""",
        "image": "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1200&q=80"
    },
    {
        "_id": "blog-2",
        "title": "Deep Learning Optimization: Reward-Driven Synaptic Plasticity",
        "summary": "Exploring how biological learning principles can inspire novel optimizer weight updates in neural networks.",
        "category": "Deep Learning",
        "read_time": "9 min read",
        "content": r"""
# Deep Learning Optimization: Reward-Driven Synaptic Plasticity

Standard SGD and Adam rely purely on backpropagated gradient vectors. However, biological brains refine synaptic weights using local reward signals and spike-timing-dependent plasticity (STDP).

## Mathematical Formulation

By combining global reward feedback $R(t)$ with local pre- and post-synaptic activity metrics:

$$\Delta W_{ij} = \eta \cdot R(t) \cdot (a_i^{\text{pre}} \cdot a_j^{\text{post}} - \lambda W_{ij})$$

This formulation accelerates convergence on non-convex loss surfaces, reaching a 99.72% accuracy benchmark on medical image datasets.
""",
        "image": "https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&w=1200&q=80"
    },
    {
        "_id": "blog-3",
        "title": "Building High-Performance Async AI Microservices with FastAPI",
        "summary": "How to architect low-latency python APIs with FastAPI, Motor async MongoDB driver, and non-blocking model inference.",
        "category": "Backend Engineering",
        "read_time": "6 min read",
        "content": """
# Building High-Performance Async AI Microservices with FastAPI

FastAPI provides native async concurrency powered by Starlette and Pydantic v2.

## Key Engineering Best Practices

- **Async DB I/O**: Use Motor (`motor.motor_asyncio`) to ensure database queries never block the event loop.
- **Worker Thread Pools**: Offload heavy CPU-bound matrix transformations or PyTorch model invocations to background worker thread pools using `run_in_threadpool`.
- **JWT & Pydantic Validation**: Strict schema validation ensures zero runtime type crashes.
""",
        "image": "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80"
    }
]

async def seed_database_if_empty():
    db = get_database()
    
    # 1. Admin User
    users_coll = db["users"]
    admin_user = await users_coll.find_one({"email": settings.ADMIN_EMAIL})
    if not admin_user:
        await users_coll.insert_one({
            "email": settings.ADMIN_EMAIL,
            "password_hash": hash_password(settings.ADMIN_PASSWORD),
            "role": "admin"
        })
        logger.info("Admin user seeded successfully.")

    # 2. Projects
    projects_coll = db["projects"]
    if await projects_coll.count_documents({}) == 0:
        for p in INITIAL_PROJECTS:
            await projects_coll.insert_one(p)
        logger.info("Initial projects seeded.")

    # 3. Skills
    skills_coll = db["skills"]
    if await skills_coll.count_documents({}) == 0:
        for s in INITIAL_SKILLS:
            await skills_coll.insert_one(s)
        logger.info("Initial skills seeded.")

    # 4. Blogs
    blogs_coll = db["blogs"]
    if await blogs_coll.count_documents({}) == 0:
        for b in INITIAL_BLOGS:
            await blogs_coll.insert_one(b)
        logger.info("Initial blogs seeded.")
