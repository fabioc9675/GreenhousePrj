# ARDUINO CODE

This folder contains the firmware project for Arduino

## Libraries

### Use of timer interrupt

- `http://electronoobs.com/eng_arduino_tut140.php`

### Use of serial event

- `https://www.arduino.cc/reference/en/language/functions/communication/serial/serialevent/`
- `https://www.arduino.cc/en/Tutorial/BuiltInExamples/SerialEvent`


The sketch can be uploaded directly to the card without the need for a GUI using **Arduino CLI** on Raspberry PI, to do that:

- `curl -fsSL https://raw.githubusercontent.com/arduino/arduino-cli/master/install.sh | sh` : Install **Arduino CLI**. Reference [Installation - Arduino CLI](https://arduino.github.io/arduino-cli/0.19/installation/)
- `arduino-cli board list` : Show the available boards and their corresponding fbqn and port. Identify which is the board we want to use.
- `arduino-cli compile -b <fbqn> greenhouse-ard` : Compile the code, in **fbqn** field use the corresponding **fbqn** of your board.
> If we get any error like "platform no installed", execute:
> `arduino-cli core install arduino:avr`
- `arduino-cli upload -p <port> -b arduino:avr:uno greenhouse-ard` : Upload code to board.
