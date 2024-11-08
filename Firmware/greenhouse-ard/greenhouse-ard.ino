/************************************************************
 * File: main.ino                                           *
 * Author: Fabian Castano                                   *
 * Project: Greenhouse-prj                                  *
 * Version: 1.0.0                                           *
 * Organization: University of Antioquia                    *
 ************************************************************/

/* ********************************************************************
 * **** INCLUDES
 * ********************************************************************/
#include <Arduino.h>

#include "initializer.h"
#include "timer.h"
#include "dataSample.h"
#include <ShiftRegister74HC595.h>

// create a global shift register object
// parameters: <number of shift registers> (data pin, clock pin, latch pin)
ShiftRegister74HC595<2> sr(30, 31, 32);

int oe = 33;
int rst = 34;

//Reading of air temperature and humidity
#include <DHT.h>
#include <stdio.h>

//Reading soil temperature
#include <OneWire.h> // incluir  1-Wire y Dallas Temperature
#include <DallasTemperature.h> //  que son librerías

/* ********************************************************************
 * **** DEFINES
 * ********************************************************************/
#define DHTPIN 4
#define ONE_WIRE_BUS 2 // Use el pin # 2 para el bus
#define ONE_WIRE_BUS_2 3 // Use el pin # 2 para el bus
/* ********************************************************************
 * **** VARIABLES
 * ********************************************************************/
// Variables to acquire the parameters of the greenhouse
String institution;
String numHouse;
String temp_env;
String mois_env;
String radi_env;
String temp_earth;
String humi_earth;

// String to send data to the Raspberry
String RaspberryChain;

// Variables to storage locally the information
float temp_env_val;
float mois_env_val;
float radi_env_val;
float temp_e1_val;
float temp_e2_val;
float temp_e3_val;
float temp_e4_val;
float humi_e1_val;
float humi_e2_val;
float humi_e3_val;
float humi_e4_val;

bool LED_STATE2 = true;

// flag to take a sample
int contSample = SECONDS_TO_SAMPLE-1;
int contLed = 0;
int con = 0;
volatile uint8_t flagSample = false;

DHT dht(DHTPIN, DHT11);

OneWire oneWire(ONE_WIRE_BUS); // 1-Wire bus
OneWire oneWire_2(ONE_WIRE_BUS_2); // 1-Wire bus
DallasTemperature sensors(&oneWire);
DallasTemperature sensor2(&oneWire_2);

int sensorPin1 = A0; //Analog reading 1, soil humidity
int sensorPin2 = A2; //Analog reading 2, light radiation
int sensorPin3 = A6; //Analog reading 2, soil humidity

/* ********************************************************************
 * **** PROTOTYPES
 * ********************************************************************/

/* ********************************************************************
 * **** FUNCTIONS
 * ********************************************************************/

// Setup function
// @param: void
// @return: void
void setup(void)
{
    Serial.begin(115200);

    pinMode(oe, OUTPUT);
  pinMode(rst, OUTPUT);

  digitalWrite(oe, LOW);
  digitalWrite(rst, HIGH);

    init_Timer();
    init_TextPayload();

    pinMode(LED_BUILTIN, OUTPUT);

    dht.begin();
    sensors.begin();
    sensor2.begin();
}

// loop function
// @param: void
// @return: void
void loop(void)
{
    if (flagSample == true)
    {
        flagSample = false;

        // generate data random to test communication
        dataRandGenerator();
    }
}

// serialEvent function
// @param: void
// @return: void
void serialEvent(void)
{
    while (Serial.available())
    {
        // String dataIn = Serial.readStringUntil(';');
        char commandRx = (char)Serial.read();

        switch (commandRx)
        {
        case READ_CMD:
            /* code */
            //dataRandGenerator();
            // compose the data

            temp_env = String(temp_env_val, 1);
            mois_env = String(mois_env_val, 1);
            radi_env = String(radi_env_val, 1);
            temp_earth = '[' + String(temp_e1_val, 1) + ',' + String(temp_e2_val, 1) + ',' +
                         String(temp_e3_val, 1) + ',' + String(temp_e4_val, 1) + ']';
            humi_earth = '[' + String(humi_e1_val, 1) + ',' + String(humi_e2_val, 1) + ',' +
                         String(humi_e3_val, 1) + ',' + String(humi_e4_val, 1) + ']';

            RaspberryChain = institution + ';' + numHouse + ';' +
                             temp_env + ';' + mois_env + ';' + radi_env + ';' +
                             temp_earth + ';' + humi_earth + "\r\n";

            Serial.print(RaspberryChain);

            break;

        case ALIVE_CMD:
            /* code */

            Serial.println("Alive");

            break;

        default:
            break;
        }
    }
}

/* ********************************************************************
 * **** INTERRUPTIONS
 * ********************************************************************/

//With the settings above, this IRS will trigger each 100ms.
ISR(TIMER1_COMPA_vect)
{
    contSample++;
    contLed++;
    con++;
    if (con >= 32){
      con = 0;
    }

    // activate sample
    if (contSample == SAMPLE_PERIOD) // 1 sec
    {
        contSample = 0;
        flagSample = true;
    }

    // toggle Led
    if (contLed == LED_PERIOD)
    {
        contLed = 0;
        LED_STATE2 = !LED_STATE2;              //Invert LED state
        digitalWrite(LED_BUILTIN, LED_STATE2); //Write new state to the LED on pin D5
        if (con < 16){
        sr.set(con, HIGH); // set single pin HIGH
        } else {
          sr.set(con%16, LOW);
        }
    }
}
