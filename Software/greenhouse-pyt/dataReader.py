import os
from os import error

import datetime
import sys
import serial
import time

from dotenv import load_dotenv  # import dotenv variables
from pymongo import MongoClient  # Allows to connect with MongoDB


def main():
    # Load environment variables
    load_dotenv()

    MONGO_URI = os.getenv('REACT_APP_URI_UDEA')  # load mongodb URI
    MONGO_DB = os.getenv('MONGODB_NAME')    # database name
    MONGO_COL = os.getenv('MONGODB_COLLECTION')    # database name
    SERIAL_PORT = os.getenv('SERIAL_PORT')  # serial port address

    try:

        # Connection with database
        client = MongoClient(MONGO_URI)

        db = client[MONGO_DB]  # connection with specific database
        collection = db[MONGO_COL]  # connection with specific collection

        # make the connection with the device
        dev = serial.Serial(SERIAL_PORT, 115200, timeout=1)
        dev.close()
        dev.open()
        dev.flushInput()
        dev.flushOutput()

        time.sleep(4)

        while(1):
            # data = 'r'
            dev.write(str.encode('r'))
            dev.flushInput()
            # dev.write(data.encode('ascii'))
            data = dev.readline()  # read_until('\r')
            # decode data into string
            decodeData = data[0:len(data)-2].decode("utf-8")
            # Split data in a list
            dataList = decodeData.split(';')
            # dev.write(data.encode('ascii))
            # print(dataList)

            # decompose the data
            institution = dataList[0]
            numHouse = int(dataList[1])
            temp_env = float(dataList[2])
            mois_env = float(dataList[3])
            radi_env = float(dataList[4])
            temp_earth = [float(item) for item in dataList[5][1:-1].split(',')]
            humi_earth = [float(item) for item in dataList[6][1:-1].split(',')]

            mongoObj = {
                "institution": institution,
                "numHouse": numHouse,
                "temp_env": temp_env,
                "mois_env": mois_env,
                "radi_env": radi_env,
                "temp_earth": temp_earth,
                "humi_earth": humi_earth,
                "createdAt": datetime.datetime.utcnow(),
                "updatedAt": datetime.datetime.utcnow(),
                "__v": 0
            }

            print(mongoObj)

            # method to insert document into database
            # collection.insert_one({"institution": "JFK", "numHouse": 3, "temp_env": 25.0, "mois_env": 78, "radi_env": 19, "temp_earth": [24.3, 21.2, 23.3, 21.2], "humi_earth": [14, 17, 15, 18], "createdAt": datetime.datetime.utcnow(), "updatedAt": datetime.datetime.utcnow(), "__v": 0})
            result = collection.insert_one(mongoObj)
            print(result.acknowledged)
            print(result.inserted_id)

            # method to find documents into database
            # results = collection.find({"institution": "JFK"})
            # for result in results:
            # print(result)
            # print(result['temp_earth'])

            # Wait 5 seconds between samples
            time.sleep(60)

    except error:
        print("Port not found")

    except KeyboardInterrupt:
        print("Program interrupted")
        dev.close()

    finally:
        sys.exit(0)


if __name__ == '__main__':

    main()
