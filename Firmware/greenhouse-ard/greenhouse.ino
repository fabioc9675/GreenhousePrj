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

/* ********************************************************************
 * **** DEFINES 
 * ********************************************************************/

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

int cont = 0;

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

    init_Timer();
    init_TextPayload();

    pinMode(13, OUTPUT);
}

// loop function
// @param: void
// @return: void
void loop(void)
{
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
    TCNT1 = 0; //First, set the timer back to 0 so it resets for next interrupt

    cont++;
    if (cont == 10)
    {
        cont = 0;
        LED_STATE2 = !LED_STATE2;     //Invert LED state
        digitalWrite(13, LED_STATE2); //Write new state to the LED on pin D5

        // create data random
        temp_env_val = random(2000, 3500) / 100.0;
        mois_env_val = random(4000, 9000) / 100.0;
        radi_env_val = random(1000, 2500) / 100.0;
        temp_e1_val = random(2000, 3500) / 100.0;
        temp_e2_val = random(2000, 3500) / 100.0;
        temp_e3_val = random(2000, 3500) / 100.0;
        temp_e4_val = random(2000, 3500) / 100.0;
        humi_e1_val = random(4000, 9000) / 100.0;
        humi_e2_val = random(4000, 9000) / 100.0;
        humi_e3_val = random(4000, 9000) / 100.0;
        humi_e4_val = random(4000, 9000) / 100.0;
    }
}
