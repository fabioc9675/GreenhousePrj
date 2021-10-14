/************************************************************
 * File: initializer.h                                      *
 * Author: Fabian Castano                                   *
 * Project: Greenhouse-prj                                  *
 * Version: 1.0.0                                           *
 * Organization: University of Antioquia                    *
 ************************************************************/

#ifndef INITIALIZER_H
#define INITIALIZER_H

/* ********************************************************************
 * **** INCLUDES 
 * ********************************************************************/
#include <Arduino.h>

/* ********************************************************************
 * **** DEFINES 
 * ********************************************************************/
#define INSTITUTION "JFK"
#define GREENHOUSE_NUM 1

// Commands
#define READ_CMD 'r'
#define ALIVE_CMD 'a'

// data sample constant
#define TIME_TO_SEC 10      // need to count until 10 to rise a second
#define SECONDS_TO_SAMPLE 2 // seconds to obtain a sample
#define SECONDS_TO_LED 1    // seconds to toogle led
#define SAMPLE_PERIOD (TIME_TO_SEC * SECONDS_TO_SAMPLE)
#define LED_PERIOD (TIME_TO_SEC * SECONDS_TO_LED)

/* ********************************************************************
 * **** GLOBAL VARIABLES 
 * ********************************************************************/

/* ********************************************************************
 * **** LOCAL VARIABLES 
 * ********************************************************************/

/* ********************************************************************
 * **** PROTOTYPES 
 * ********************************************************************/
// function to initialize text variables
void init_TextPayload(void);

/* ********************************************************************
 * **** FUNCTIONS 
 * ********************************************************************/

#endif /* INITIALIZER_H */