import requests
import paho.mqtt.client as mqtt
import pygame
import os
import pathlib
import socket

print(socket.gethostname())

pygame.mixer.init()
path = '/home/pi/fred/music.ogg'
print(path)

sound = pygame.mixer.Sound(path)
device_id = os.getenv('SECTION_ID')

mqtt_topic = "section/%s/#" % device_id
print(mqtt_topic)


if device_id == '1':
    lightid = 3
    pass
if device_id == '2':
    lightid = 18
    pass
if device_id == '3':
    lightid = 19
    pass

if device_id == '4':
    lightid = 20
    pass


def startRequest(data):

    url = "http://192.168.0.20/api/vWOsvVaprpwthxcEnlbcxVjhU6deEL1JV7X8PnXj/lights/" + str(lightid) + "/state"
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
    # print(topic)
    if topic == "section/" + device_id + "/lamp":
        startRequest(payload)
        print(msg.topic + " " + payload)
        pass
    if topic == "section/"+ device_id + "/sound":
        sound.play()
        pass
    if topic == "section/" + device_id + "/volume":
        sound.set_volume(float(payload))
        print(payload)
        pass

client = mqtt.Client()
client.on_connect = on_connect
client.on_message = on_message

client.connect("192.168.188.20", 1883, 60)

client.loop_forever()


