import pyowm
import matplotlib.pyplot as plt

import googlemaps
from pyowm.utils import geo



def GeoCoder(Address = '', City = 'Horten', CountryCode = 'NO'):
    gmaps = googlemaps.Client(key='AIzaSyBHwGzzMBgY7guUNLvQcG8JRv_DWVyuqV4')
    geocodeResult = gmaps.geocode(Address + ',' + City + ', ' + CountryCode)

    lat = geocodeResult[0]['geometry']['bounds']['northeast']['lat']
    lng = geocodeResult[0]['geometry']['bounds']['northeast']['lng']

    return lat, lng

def GeoLocation():
    gmaps = googlemaps.Client(key='AIzaSyBHwGzzMBgY7guUNLvQcG8JRv_DWVyuqV4')
    geoLocateResult = gmaps.geolocate()

    lat = geoLocateResult['location']['lat']
    lng = geoLocateResult['location']['lng']

    return lat, lng


def Forecast(lat, lng):

    #Use API key and get info
    WeatherAPIKey = '5462453686705895f62c201357f2aac7'
    INFO = pyowm.OWM(WeatherAPIKey)

    #Use info
    Weather_Manager = INFO.weather_manager()
    oneCall = Weather_Manager.one_call(lat, lng)

    #Convert into values we can use as keys in a dictionary which we then can graph
    DailyHourlyForecastRaw = oneCall.forecast_hourly[0:23]
    DailyForecast = []

    for weather in DailyHourlyForecastRaw:
        date = weather.reference_time('iso').split(' ')[0]
        hour = int(weather.reference_time('iso').split(' ')[-1].split(':')[0]) + 2
        if hour >= 24:
            hour -= 24
        #hour = hour + ':' + weather.reference_time('iso').split(' ')[-1].split(':')[1]

        HourlyForecast = {
            'date' : date,
            'hour' : hour,
            'temp' : weather.temperature('celsius')['temp'],
            'condition' : weather.detailed_status
        }

        DailyForecast.append(HourlyForecast)


    for x in DailyForecast:
        print(x)


if __name__ == '__main__':

    Address = 'Utsiksvegen 74'
    City = 'Kongsvinger'
    CountryCode = 'NO'
    
    lat, lng = GeoCoder(Address, City, CountryCode)
    #lat, lng = GeoLocation()
    Forecast(lat, lng)


#plt.plot(Daily_Hourly_forecast[0:23].temperature('celsius'))
