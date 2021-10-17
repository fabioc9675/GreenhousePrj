# PYMONGO functionallity

This script integrates the functionallity of python and mongodb

## Drivers installation

### PyMongo API

- `pip3 install pymongo` Install the pymongo driver
- `pip install "pymongo[srv]"` to solve problem connecton with remote mongodb
- `pip3 install python-dotenv` Install dotenv library
- `pip3 install pyserial` Install library to communicate with Arduino

### Server installation and running

To run the script and the app as system service use:

- `nohup python3 -u script.py > out &`
- `nohup python3 -u dataReader.py &`
- `nohup npm run dev &`

nohup means don't kill the process
-u means dont need buffer, write out everytime
> out: to record the output in out file (`tail -f out`) to see the last few lines of the file
& to run as a background process

use `kill -9 "process"`

- `ps ax | grep script.py` to see the process
- `ps ax | grep dataReader.py` to see the process