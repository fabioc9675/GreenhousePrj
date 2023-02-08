/*
  ShiftRegister74HC595 - Library for simplified control of 74HC595 shift registers.
  Developed and maintained by Timo Denk and contributers, since Nov 2014.
  Additional information is available at https://timodenk.com/blog/shift-register-arduino-library/
  Released into the public domain.
*/

#include <ShiftRegister74HC595.h>

// create a global shift register object
// parameters: <number of shift registers> (data pin, clock pin, latch pin)
ShiftRegister74HC595<2> sr(30, 31, 32);

int oe = 33;
int rst = 34;

int v1 = 8;
int v2 = 22;

void setup() {

  pinMode(oe, OUTPUT);
  pinMode(rst, OUTPUT);

  pinMode(v1, OUTPUT);
  pinMode(v2, OUTPUT);

  digitalWrite(oe, LOW);
  digitalWrite(rst, HIGH);

}

void loop() {

  digitalWrite(v1, HIGH);
  digitalWrite(v2, LOW);
  delay(500);
  digitalWrite(v2, HIGH);
  digitalWrite(v1, LOW);

  // setting all pins at the same time to either HIGH or LOW
  sr.setAllHigh(); // set all pins HIGH
  delay(1000);

  digitalWrite(v1, HIGH);
  digitalWrite(v2, LOW);

  sr.setAllLow(); // set all pins LOW
  delay(500);

  digitalWrite(v2, HIGH);
  digitalWrite(v1, LOW);



  // setting single pins
  for (int i = 0; i < 16; i++) {

    sr.set(i, HIGH); // set single pin HIGH
    delay(250);
  }

  digitalWrite(v1, HIGH);
  digitalWrite(v2, LOW);

  for (int i = 0; i < 4; i++) {

    // set all pins at once
    uint8_t pinValues1[] = { B01010101, B01010101 };
    sr.setAll(pinValues1);
    delay(500);

    uint8_t pinValues2[] = { B10101010, B10101010 };
    sr.setAll(pinValues2);
    delay(500);
  }

  digitalWrite(v2, HIGH);
  digitalWrite(v1, LOW);

  // read pin (zero based, i.e. 6th pin)
  uint8_t stateOfPin5 = sr.get(5);
  sr.set(6, stateOfPin5);


  // set pins without immediate update
  sr.setNoUpdate(0, HIGH);
  sr.setNoUpdate(1, LOW);
  // at this point of time, pin 0 and 1 did not change yet
  sr.updateRegisters(); // update the pins to the set values

  delay(500);



}
