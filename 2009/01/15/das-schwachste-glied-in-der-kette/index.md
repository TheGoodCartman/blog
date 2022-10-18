---
title: "Das schwächste Glied in der Kette"
date: "2009-01-15T23:08:23"
categories: [gedacht,getan]
---

Manchmal sind es Kleinigkeiten und Details, deren Behebung unendliche Mühen bereiten kann.

Ich besitze eine ziemlich alte DigiCam, die aus heutiger Sicht wohl fast schon ein Museumsstück ist. Die geschossenen Fotos sind meist in Ordnung, dennoch müssen viele Bilder nachbearbeitet werden, sei es aufgrund von zu viel Bildrauschen bei zu geringer Auflösung oder weil sich ein Farbstich eingeschlichen hat (Schnee wird zum Beispiel immer blau bei mir).

Die Bildbearbeitung erledige ich mit einer älteren Version von Paint Shop Pro, da ich damit am Besten klarkomme. Doch leider wird aufgrund des ebenfalls hohen Alters der Anwendung beim Speichern von JPEGs das in den [EXIF](http://de.wikipedia.org/wiki/Exif)-Headern enthaltene Vorschaubild entfernt; die restlichen Metadaten bleiben zum Glück heil. Da [mein MP3-Player](/2008/04/26/sony-hat-mich-wieder/) diese Vorschaubilder aber ebenso wie [XnView](http://www.xnview.com/) beim Browsen anzeigt, generiere ich sie mit der Software [Exifer](http://www.friedemann-schmidt.com/software/exifer/) nach (die leider nicht mehr weiterentwickelt wird).

Nun führen zwei kleine Randbedingungen dazu, dass ich überhaupt ein Problem habe. Zum Einen habe ich meine Kamera auf einen 3:2-Modus im klassischen Kleinbildformat eingestellt (was moderne Kompaktkameras meist gar nicht mehr beherrschen), zum Anderen erzeugt Exifer aber Vorschaubilder im 4:3-Format und fügt deshalb Ränder an - in der Trendfarbe weiß. Dies sieht dann in meinem MP3-Player aufgrund des dunklen Hintergrunds total dämlich aus - die Farbe kann in Exifer jedoch nicht angepasst werden.

Nun habe ich im Internet nach frei verfügbarer Software gesucht und bin schließlich auf die Lösung meines Problems in Form von [jhead](http://www.sentex.net/~mwandel/jhead/) gestoßen. Dieses Kommandozeilenwerkzeug kann vorhandene Vorschaubilder neu generieren (ich brauche also weiterhin Exifer für das initiale Neuanlegen) und beherrscht dabei - man sollte es nicht glauben - auch das 3:2-Format, so dass gar keine Farbe für Ränder notwendig ist. Einzige Bedingung: Es wird mit [mogrify](http://www.imagemagick.org/www/mogrify.html) ein Teil des [ImageMagick](http://www.imagemagick.org/index.html)-Projektes benötigt, womit sich die Software-Kette um ein weiteres Glied verlängert.

Aber gut, allzu lange werde ich diese Arbeit hoffentlich nicht mehr haben. Dieses Jahr soll es eine neue Kamera werden, die dann nicht nur bessere Fotos macht, sondern diese auch noch schneller schießt und nicht fünf Sekunden für das Aufladen des Blitzes benötigt.
