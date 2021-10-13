from os import error, wait
import sys
import serial
import time


def main():
    # make the connection with the device

    try:
        dev = serial.Serial("/dev/cu.usbmodem14101", 115200, timeout=1)
        dev.close()
        dev.open()
        dev.flushInput()
        dev.flushOutput()

        time.sleep(2)

        while(1):
            # data = 'r'
            dev.write(str.encode('r'))
            dev.flushInput()
            # dev.write(data.encode('ascii'))
            data = dev.readline()  # read_until('\r')
            # dev.write(data.encode('ascii))
            print(data)
            time.sleep(5)

    except error:
        print("Port not found")

    except KeyboardInterrupt:
        print("Program interrupted")
        dev.close()

    finally:
        sys.exit(0)


if __name__ == '__main__':

    main()
