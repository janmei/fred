import requests
import paho.mqtt.client as mqtt
import pygame

pygame.init()

sound = pygame.mixer.Sound("/Applications/XAMPP/xamppfiles/htdocs/fred/News-Sound.wav")

def startRequest(bri):
    url = "http://192.168.0.20/api/vWOsvVaprpwthxcEnlbcxVjhU6deEL1JV7X8PnXj/lights/3/state"

    payload = "{\"bri\": %s}" % bri
    headers = {
    'Content-Type': 'application/json'
    }

    response = requests.request("PUT", url, headers=headers, data = payload)

    print(response.text.encode('utf8'))

def on_connect(client, userdata, flags, rc):
    print("Connected with result code " + str(rc))

    client.subscribe("test/#")

def on_message(client, userdata, msg):
    payload = str(msg.payload, "utf-8")
    print(payload)
    if payload.isnumeric():
        print("Number")
        startRequest(payload)
        print(msg.topic + " " + payload)
        pass
    elif payload == "sound":
        print("Not a Number")
        sound.play()
        pass

client = mqtt.Client()
client.on_connect = on_connect
client.on_message = on_message

client.connect("localhost", 1883, 60)

client.loop_forever()


