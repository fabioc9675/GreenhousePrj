from os import error
import sys
import serial


def main():
    # make the connection with the device

    try:
        dev = serial.Serial("/dev/cu.usbserial-0001", 115200)

        while(1):
            data = dev.read_until()

            # dev.write(data.encode('ascii))

            print(data)

    except error:
        print("Port not found")

    except KeyboardInterrupt:
        print("Program interrupted")
        dev.close()

    finally:
        sys.exit(0)


if __name__ == '__main__':

    main()
