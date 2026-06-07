from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

client = MongoClient(
    os.getenv("MONGO_URI")
)

db = client[
    os.getenv("DB_NAME")

]

users= db["users"]
tasks = db["tasks"]
shared_lists = db["shared_lists"]