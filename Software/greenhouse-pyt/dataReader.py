import serial

# make the connection with the device
dev = serial.Serial("/dev/cu.usbserial-0001", 115200)

while(1):
    data = dev.read_until()

    print(data)
