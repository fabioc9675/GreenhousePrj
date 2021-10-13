/************************************************************
 * File: initializer.ino                                    *
 * Author: Fabian Castano                                   *
 * Project: Greenhouse-prj                                  *
 * Version: 1.0.0                                           *
 * Organization: University of Antioquia                    *
 ************************************************************/

/* ********************************************************************
 * **** INCLUDES 
 * ********************************************************************/
#include "initializer.h"

/* ********************************************************************
 * **** DEFINES 
 * ********************************************************************/

/* ********************************************************************
 * **** EXTERN VARIABLES 
 * ********************************************************************/
// Variables to acquire the parameters of the greenhouse
extern String institution;
extern String numHouse;
extern String temp_env;
extern String mois_env;
extern String radi_env;
extern String temp_earth;
extern String humi_earth;

// String to send data to the Raspberry
extern String RaspberryChain;

/* ********************************************************************
 * **** LOCAL VARIABLES 
 * ********************************************************************/

/* ********************************************************************
 * **** PROTOTYPES 
 * ********************************************************************/

/* ********************************************************************
 * **** FUNCTIONS 
 * ********************************************************************/
// function to initialize text variables
void init_TextPayload(void)
{

    // Initialization of Strings variables
    institution = String(INSTITUTION);
    numHouse = String(GREENHOUSE_NUM);
    temp_env = String("");
    mois_env = String("");
    radi_env = String("");
    temp_earth = String("");
    humi_earth = String("");

    RaspberryChain.reserve(512);
    RaspberryChain = String("");
}
