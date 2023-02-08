import requests


url = 'https://greenhouse-jfk.herokuapp.com/api/greenhouse'
myobj = {"institution":"JFK","numHouse":1,"temp_env":24.0,"mois_env":74,"radi_env":12,"temp_earth":[12.5,25.3,14.2,12.2],"humi_earth":[14,15,12,13]}

x = requests.post(url, json = myobj)

print(x.text)