# ARDUINO CODE

This folder contains the firmware project for Arduino

## Libraries

### Use of timer interrupt

- `http://electronoobs.com/eng_arduino_tut140.php`

### Use of serial event

- `https://www.arduino.cc/reference/en/language/functions/communication/serial/serialevent/`
- `https://www.arduino.cc/en/Tutorial/BuiltInExamples/SerialEvent`

### Run the project in the RPi

- Use the command `sudo systemctl stop mongod` to stop the database initial configuration
- Use the command `sudo nohup mongod --dbpath ~/data/db --replSet replocal &` to run the database as a replica set and as a daemon
- verify in `mongo` if the data base is a replica set and includes Greenhouse DB, look at README.md inside greenhouse-app folder
- go to `cd /home/proyecto/GreenhousePrj/Software/` and then...
- go to `cd greenhouse-app/` and run `nohup npm run dev &` to run the web page
- go to `cd greenhouse-pyt/` and run `nohup python3 -u dataReader.py &` to run the script to send data from Arduino to Database
- 
