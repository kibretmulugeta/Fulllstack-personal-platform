import logging
from motor.motor_asyncio import AsyncIOMotorClient
from app.config import settings

logger = logging.getLogger("kibret_portfolio")

class InMemoryMockCollection:
    def __init__(self, name):
        self.name = name
        self._data = []
        self._counter = 1

    async def find(self, filter_dict=None, limit=0):
        res = []
        for item in self._data:
            match = True
            if filter_dict:
                for k, v in filter_dict.items():
                    if k == "_id":
                        continue
                    if item.get(k) != v:
                        match = False
                        break
            if match:
                res.append(dict(item))
        if limit > 0:
            res = res[:limit]

        class AsyncCursor:
            def __init__(self, items):
                self.items = items
            def __aiter__(self):
                self._iter = iter(self.items)
                return self
            async def __anext__(self):
                try:
                    return next(self._iter)
                except StopIteration:
                    raise StopAsyncIteration
            async def to_list(self, length=100):
                return self.items[:length]
            def sort(self, key, direction=-1):
                reverse = True if direction == -1 else False
                self.items.sort(key=lambda x: x.get(key, ""), reverse=reverse)
                return self

        return AsyncCursor(res)

    async def find_one(self, filter_dict):
        cursor = await self.find(filter_dict)
        items = await cursor.to_list(1)
        return items[0] if items else None

    async def insert_one(self, doc):
        doc_copy = dict(doc)
        if "_id" not in doc_copy:
            doc_copy["_id"] = str(self._counter)
            self._counter += 1
        self._data.append(doc_copy)

        class InsertResult:
            def __init__(self, inserted_id):
                self.inserted_id = inserted_id
        return InsertResult(doc_copy["_id"])

    async def update_one(self, filter_dict, update_dict):
        item = await self.find_one(filter_dict)
        if item:
            set_data = update_dict.get("$set", {})
            for k, v in set_data.items():
                item[k] = v
            # update in memory list
            for idx, d in enumerate(self._data):
                if d.get("_id") == item.get("_id"):
                    self._data[idx] = item
                    break

            class UpdateResult:
                modified_count = 1
            return UpdateResult()

        class UpdateResult:
            modified_count = 0
        return UpdateResult()

    async def delete_one(self, filter_dict):
        item = await self.find_one(filter_dict)
        if item:
            self._data = [d for d in self._data if d.get("_id") != item.get("_id")]

            class DeleteResult:
                deleted_count = 1
            return DeleteResult()

        class DeleteResult:
            deleted_count = 0
        return DeleteResult()

    async def count_documents(self, filter_dict=None):
        if not filter_dict:
            return len(self._data)
        matches = 0
        for item in self._data:
            match = True
            for k, v in filter_dict.items():
                if item.get(k) != v:
                    match = False
                    break
            if match:
                matches += 1
        return matches

class InMemoryMockDatabase:
    def __init__(self):
        self.collections = {}

    def __getitem__(self, name):
        if name not in self.collections:
            self.collections[name] = InMemoryMockCollection(name)
        return self.collections[name]

    def get_collection(self, name):
        return self[name]

db_client = None
db = None
is_mock_db = False

async def connect_to_mongo():
    global db_client, db, is_mock_db
    logger.info("Initializing MongoDB connection...")
    
    if "localhost" in settings.MONGODB_URL and not settings.MONGODB_URL.startswith("mongodb+srv"):
        # Attempt connecting to local or fallback gracefully to in-memory mock if offline
        try:
            db_client = AsyncIOMotorClient(settings.MONGODB_URL, serverSelectionTimeoutMS=2000)
            await db_client.admin.command('ping')
            db = db_client[settings.DB_NAME]
            logger.info("Connected successfully to MongoDB.")
            is_mock_db = False
            return
        except Exception as e:
            logger.warning(f"MongoDB not available at {settings.MONGODB_URL} ({e}). Falling back to high-performance in-memory state engine.")
            db = InMemoryMockDatabase()
            is_mock_db = True
            return
    else:
        try:
            db_client = AsyncIOMotorClient(settings.MONGODB_URL, serverSelectionTimeoutMS=5000)
            db = db_client[settings.DB_NAME]
            logger.info("Connected to MongoDB Atlas.")
            is_mock_db = False
        except Exception as e:
            logger.warning(f"Atlas connection failed ({e}). Using in-memory fallback engine.")
            db = InMemoryMockDatabase()
            is_mock_db = True

async def close_mongo_connection():
    global db_client
    if db_client:
        db_client.close()
        logger.info("MongoDB connection closed.")

def get_database():
    global db
    if db is None:
        db = InMemoryMockDatabase()
    return db
