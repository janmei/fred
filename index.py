import requests
import paho.mqtt.client as mqtt
import pygame
import os

pygame.init()
device_id = os.getenv('SECTION_ID')

mqtt_topic = "section/%s/#" % device_id

print(mqtt_topic)
sound = pygame.mixer.Sound("/Applications/XAMPP/xamppfiles/htdocs/fred/News-Sound.wav")

def startRequest(data):
    url = "http://192.168.0.20/api/vWOsvVaprpwthxcEnlbcxVjhU6deEL1JV7X8PnXj/lights/3/state"

    payload = data
    headers = {
    'Content-Type': 'application/json'
    }

    response = requests.request("PUT", url, headers=headers, data = payload)

    print(str(response.text, "utf-8"))

def on_connect(client, userdata, flags, rc):
    print("Connected with result code " + str(rc))

    client.subscribe(mqtt_topic)

def on_message(client, userdata, msg):
    topic = msg.topic
    payload = str(msg.payload, "utf-8")
    print(payload)
    print(topic)
    if topic == "section/" + device_id + "/lamp":
        print("Number")
        startRequest(payload)
        print(msg.topic + " " + payload)
        pass
    elif topic == "section/"+ device_id + "/sound":
        print("Not a Number")
        sound.play()
        pass

client = mqtt.Client()
client.on_connect = on_connect
client.on_message = on_message

client.connect("localhost", 1883, 60)

client.loop_forever()


