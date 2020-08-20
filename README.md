# Sensus

Dies ist die Testoberfläche von Sensus.
Wenn die `index.html` aufgerufen wird, wird die Oberfläche die für die Tests benötigt wird, angezeigt.

## Inbetriebnahme der Testhardware

### Hue

Die Philipps Hue Lampen müssen in eine E27 Lampenfassung geschraubt werden und eingeschaltet werden. Die Hue Bridge muss an einen Router angeschlossen und mit dem Strom verbunden werden.

### Zentraler Rechner

An dem Zentralen Rechner muss ein MQTT Broker laufen.
Das Github Repository muss heruntergeladen und mit `npm i` im Ordner installiert werden.
Danach muss der Socken Server `npm start` gestartet werden.
Die Weboberfläche öffnet man in dem man die `index.html` aufruft.  
Danach kann man schon die Elemente steuern

### Raspberry Pis

Damit die Raspberry Pi alle zu unterscheiden sind, vergibt man nach dem ersten Start den Hostnamen. Dieser geht von `1` aufsteigend los.

Um die Funktionsweise sicherzustellen, müssen die Anforderungen zu erst auf den Raspberry Pis installiert werden:

```
sudo apt-get install git python3-pip python-pygame -y
pip3 install paho-mqtt pygame
```

Lädt man das Github Repository herunter:

```
git clone https://github.com/janmei/fred.git
cd fred
```

Falls der Rechner von der bereits in `index.py` eingetragenen IP-Adresse abweicht, muss man diese mit der korrekten Angeben.
Um das Skript zu starten gibt man ein:

`python3 index.py`
