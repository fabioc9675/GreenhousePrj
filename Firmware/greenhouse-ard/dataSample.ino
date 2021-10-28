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
float radiation(){
    float sensorValue = (1023.0 - analogRead(sensorPin2))/100.0;
    return 0.00574751 * pow(sensorValue, 6.737) + 231;
}

void dataRandGenerator(void)
{

    sensors.requestTemperatures(); //Prepara el sensor para la lectura temperatura tierra
    // Create real and random data
    temp_env_val = dht.readTemperature();       //Air temperature
    mois_env_val = dht.readHumidity();           //Air humidity
    radi_env_val = radiation();
    temp_e1_val = sensors.getTempCByIndex(0);   //Soil temperature
    temp_e2_val = random(2000, 3500) / 100.0;
    temp_e3_val = random(2000, 3500) / 100.0;
    temp_e4_val = random(2000, 3500) / 100.0;
    humi_e1_val = (1024.0-analogRead(sensorPin1))/1.0;        //Soil humidity
    humi_e2_val = random(4000, 9000) / 100.0;
    humi_e3_val = random(4000, 9000) / 100.0;
    humi_e4_val = random(4000, 9000) / 100.0;
}
