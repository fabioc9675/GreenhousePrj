/************************************************************
 * File: dataSample.ino                                     *
 * Author: Fabian Castano                                   *
 * Project: Greenhouse-prj                                  *
 * Version: 1.0.0                                           *
 * Organization: University of Antioquia                    *
 ************************************************************/

/* ********************************************************************
 * **** INCLUDES 
 * ********************************************************************/
#include "dataSample.h"

/* ********************************************************************
 * **** DEFINES 
 * ********************************************************************/

/* ********************************************************************
 * **** EXTERN VARIABLES 
 * ********************************************************************/
// Variables to storage locally the information
extern float temp_env_val;
extern float mois_env_val;
extern float radi_env_val;
extern float temp_e1_val;
extern float temp_e2_val;
extern float temp_e3_val;
extern float temp_e4_val;
extern float humi_e1_val;
extern float humi_e2_val;
extern float humi_e3_val;
extern float humi_e4_val;

/* ********************************************************************
 * **** LOCAL VARIABLES 
 * ********************************************************************/

/* ********************************************************************
 * **** PROTOTYPES 
 * ********************************************************************/

/* ********************************************************************
 * **** FUNCTIONS 
 * ********************************************************************/
void dataRandGenerator(void)
{
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
