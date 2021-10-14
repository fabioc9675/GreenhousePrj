/************************************************************
 * File: timer.ino                                          *
 * Author: Fabian Castano                                   *
 * Project: Greenhouse-prj                                  *
 * Version: 1.0.0                                           *
 * Organization: University of Antioquia                    *
 ************************************************************/

/* ********************************************************************
 * **** INCLUDES 
 * ********************************************************************/
#include "timer.h"

/* ********************************************************************
 * **** DEFINES 
 * ********************************************************************/

/* ********************************************************************
 * **** EXTERN VARIABLES 
 * ********************************************************************/

/* ********************************************************************
 * **** LOCAL VARIABLES 
 * ********************************************************************/

/* ********************************************************************
 * **** PROTOTYPES 
 * ********************************************************************/

/* ********************************************************************
 * **** FUNCTIONS 
 * ********************************************************************/
// function to initialize timer
void init_Timer(void)
{

    /* Example code with timer intyerrutp that will create an interruption each 
 *  500ms using timer1 and prescalar of 256.
Calculations (for 500ms): 
  System clock 16 Mhz and Prescalar 256;
  Timer 1 speed = 16Mhz/256 = 62.5 Khz    
  Pulse time = 1/62.5 Khz =  16us  
  Count up to = 500ms / 16us = 31250 (so this is the value the OCR register should have)*/

    cli(); //stop interrupts for till we make the settings
    //Timer 1 (interrupt each 100ms)
    TCCR1A = 0;          // Reset entire TCCR1A to 0
    TCCR1B = 0;          // Reset entire TCCR1B to 0
    TCCR1B |= B00000100; //Set CS12 to 1 so we get prescalar 256
    TIMSK1 |= B00000010; //Set OCIE1A to 1 so we enable compare match A
    OCR1A = 6250;        //Finally we set compare register A to this value
    sei();               //Enable back the interrupts
}
