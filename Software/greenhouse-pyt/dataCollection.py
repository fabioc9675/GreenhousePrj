import os
import datetime

from dotenv import load_dotenv   # import dotenv variables
from pymongo import MongoClient  # Allows to connect with MongoDB

load_dotenv()

MONGO_URI = os.getenv('REACT_APP_URI')  # load mongodb URI
MONGO_DB = os.getenv('MONGODB_NAME')    # database name
MONGO_COL = os.getenv('MONGODB_COLLECTION')    # database name

# Connection to the database
client = MongoClient(MONGO_URI)

db = client[MONGO_DB]  # connection with specific database
collection = db[MONGO_COL]  # connection with specific collection

# method to insert document into database
# collection.insert_one({"institution": "JFK", "numHouse": 3, "temp_env": 25.0, "mois_env": 78, "radi_env": 19, "temp_earth": [24.3, 21.2, 23.3, 21.2], "humi_earth": [14, 17, 15, 18], "createdAt": datetime.datetime.utcnow(), "updatedAt": datetime.datetime.utcnow(), "__v": 0})

# method to find documents into database
# results = collection.find()
results = collection.find({"institution": "UdeA"})
for result in results:
    # print(result)
    print(result['temp_earth'])

# to update use update function, to delete use delete function
# collection.delete_many({"_id": "6160be76357f2f013eaaec3f"})

numberDocuments = collection.count_documents({})
print(numberDocuments)
