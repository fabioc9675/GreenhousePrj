#!/usr/bin/python

import os
from os import error

import datetime
import sys
import serial
import time

from dotenv import load_dotenv  # import dotenv variables
import requests  # Allows to connect with MongoDB


def main():
    # Load environment variables
    load_dotenv()

    SERIAL_PORT = os.getenv('SERIAL_PORT')  # serial port address
    INSTITUTION = os.getenv('INSTITUTION') # Institution name
    APPLICATION_URL = os.getenv('APPLICATION_URL') # URL to POST

    try:

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
            institution = INSTITUTION
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
                "humi_earth": humi_earth  #,
                #"createdAt": datetime.datetime.utcnow(),
                #"updatedAt": datetime.datetime.utcnow(),
                #"__v": 0
            }

            print(mongoObj)

            # method to insert document into database
            # collection.insert_one({"institution": "JFK", "numHouse": 3, "temp_env": 25.0, "mois_env": 78, "radi_env": 19, "temp_earth": [24.3, 21.2, 23.3, 21.2], "humi_earth": [14, 17, 15, 18], "createdAt": datetime.datetime.utcnow(), "updatedAt": datetime.datetime.utcnow(), "__v": 0})
            result = requests.post(APPLICATION_URL, json = mongoObj)
            print(result.text)

            # method to find documents into database
            # results = collection.find({"institution": "JFK"})
            # for result in results:
            # print(result)
            # print(result['temp_earth'])

            # Wait 5 seconds between samples
            time.sleep(3600)

    except Exception as error:
        print(error)
        print("Port not found")

    except KeyboardInterrupt:
        print("Program interrupted")
        dev.close()

    finally:
        print("Trying again")
	sys.exit(0)


if __name__ == '__main__':

    main()