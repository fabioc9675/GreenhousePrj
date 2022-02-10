# SOFTWARE

Folder that contains the information related with software develop

## Software installation

### VISUAL STUDIO CODE

follow the indications in the [link][install VsCode]

Extenions:
-Prettier
-Arduino


### NODE JS

follow the indications in the [link][install NodeJs]

### MOSQUITTO

follow the indications in the [link][install Mosquitto]

### MONGODB

follow the indications in the [link][install MongoDB]

Commands:
- `sudo apt install mongodb`
- `sudo systemctl enable mongodb`
- `sudo systemctl start mongodb`
- `mongo` these commands initiate the daemon to execute mongodb, in the case ofraspberry, create an atlas db because the version differences

### Run the project in the RPi

- Use the command `sudo systemctl stop mongod` to stop the database initial configuration
- Use the command `sudo nohup mongod --dbpath ~/data/db --replSet replocal &` to run the database as a replica set and as a daemon
- verify in `mongo` if the data base is a replica set and includes Greenhouse DB, look at README.md inside greenhouse-app folder
- go to `cd /home/proyecto/GreenhousePrj/Software/` and then...
- go to `cd greenhouse-app/` and run `nohup npm run dev &` to run the web page
- go to `cd greenhouse-pyt/` and run `nohup python3 -u dataReader.py &` to run the script to send data from Arduino to Database



[install VsCode][https://code.visualstudio.com/docs/setup/raspberry-pi]
[install NodeJs][https://linuxize.com/post/how-to-install-node-js-on-raspberry-pi/]
[install Mosquitto][https://stevessmarthomeguide.com/install-mosquitto-raspberry-pi/]
[install MongoDB][https://www.mongodb.com/developer/how-to/mongodb-on-raspberry-pi/]



