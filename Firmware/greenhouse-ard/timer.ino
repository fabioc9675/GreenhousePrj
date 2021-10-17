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

/* Example code with timer interrupt that will create an interruption each
 *  1 s using timer1 and prescalar of 1024.
Calculations (for 500ms):
    System clock 16 Mhz and Prescalar 1024;
    Timer 1 speed = 16Mhz/1024 = 15625 hz
    Pulse time = 1/15625 hz =  64us
    Count up to = 1s / 64us = 15625 (so this is the value the OCR register should have)*/

    cli(); //stop interrupts for till we make the settings
    
    TCNT1  = 0;          // Initialize counter value to 0
    TCCR1A = 0;          // Reset entire TCCR1A to 0
    TCCR1B = 0;          // Reset entire TCCR1B to 0
    TCCR1B |= (1 << WGM12); //set the timer 1 for (CTC) mode.
    TCCR1B |= (1 << CS12) | (1 << CS10);  //Set CS10 and CS12 bits, so we get prescalar 1024
    TIMSK1 |= (1 << OCIE1A); //Set OCIE1A to 1 so we enable compare match A
    OCR1A = 15625;        //Finally we set compare register A to this value
    sei();               //Enable back the interrupts
}
