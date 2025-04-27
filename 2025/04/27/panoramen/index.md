---
title: "Der Weg vom Foto zum Panorama im Web"
date: "2025-04-27T15:55:00"
categories: [gedacht,getan]
---

Schon einige Zeit vor meinem Wechsel von der Hosentaschenknipse zur Systemkamera (ca ab 2008) habe ich mich vorsichtig am Thema Panoramafotografie versucht. Denn immer wieder stand ich vor dem Problem, dass ich mit einem Bild - egal wie weitwinklig es auch war - nicht das einfangen konnte, was mein Auge wahrnahm.

Alle meine Kameras und Handys brachten zwar eine Panorama-Funktion mit, aber selbst heute sind diese Automatiken nicht wirklich zu gebrauchen. Also musste ich selbst Hand anlegen und teilweise auf die harte Tour lernen, was ein Nodalpunkt ist und mit welchen Einstellungen ich die beste und konsistenteste Qualität aus der Kamera herausbekomme.

Schließlich war die Software um diese Zeit noch nicht ausgereift. Microsoft hatte mit ICE zwar ein kostenloses One-Click-Tool entwickelt, doch ich stieß zu oft an dessen Limitierungen. Also wechselte ich zu PTGui, das deutlich mehr Möglichkeiten bot, aber auch viel Handarbeit erforderte. Ich erinnere mich an viele Stunden des manuellen Maskierens der Bildgrenzen, damit die Übergänge nicht sichtbar waren.

Ich habe mir deshalb sogar einen Nodalpunktadapter zugelegt, um es der Software so leicht wie möglich zu machen. Aber da ich auf Reisen meist mit Zoom-Objektiven arbeite, war die Einstellung immer sehr aufwendig. Spätestens seit ich Lightroom die Panorama-Zusammensetzung überlasse, ist es zum Glück ausreichend, den Nodalpunkt ungefähr zu treffen und so komme ich inzwischen mit aus der Hand geschossenen Bildserien zu guten Ergebnissen.

Zuletzt habe ich meinen Hardware-Zoo um eine Drohne erweitert. Dort ist das Thema Panorama-Fotos noch einmal ein ganzes Stück schwieriger, weshalb ich mich sehr über die Panorama-Automatik der DJI Mini 3 Pro gefreut habe. Doch auch die Software der Drohne kann nicht zaubern und so reichen schon schwache Winde aus, damit die Drohne ihre Position im Raum verlässt und es dementsprechend zu Bildfehlern kommt.

Als mit etwas Übung meine ersten Panoramen so gut wurden, dass man wirklich hineinzommen und Details entdecken konnte, stellte sich natürlich die Frage, wie ich sie am besten präsentieren kann. So bin ich 2012 auf Gigapan gestoßen. Diese stellen selber Hardware/Software für das automatisierte Erstellen von riesigen Panoramen her (deshalb auch der Name; [meine eigenen](https://www.gigapan.com/profiles/KingOli/gigapans) sind weit entfernt von Gigapixeln) und haben parallel dazu eine Plattform entwickelt, um die Fotos zugänglich zu machen. Der Vorteil für mich war, dass die Nutzung kostenlos und sehr simpel war: Einfach das Panorama mit der Windows-Software hochladen; etwas taggen und beschriften - fertig!

Doch spätestens als mein damaliger Fotospace-Anbieter Smugmug 2020 entschied, dass es bestimmte von mir benötigte Funktionen nicht mehr anbietet, wurde mir klar, dass jede zentrale Plattform im Netz nur eine begrenzte Lebensdauer hat und ich gerne selber die Kontrolle über meine Panoramen und ihre Darstellung hätte - heute nennt man das digitale Souveränität ;)

Also machte ich mich auf die Suche nach einer Lösung zum Selberhosten - und fand in [OpenSeadragon](https://openseadragon.github.io/) einen OpenSource-Viewer für das [IIIF-Format](https://iiif.io/api/image/). Als passenden IIIF-Server bot sich [Omeka](https://omeka.org/s/modules/IiifServer/) an.

Doch leider kam ich mit beiden nicht klar. Omeka ist vieles und das merkt man der Oberfläche auch an. Nur zum Ausliefern von Panoramen ist das Tool einfach zu komplex, auch wenn das IIIF-Modul selbständig die Tiles generiert. Zudem scheiterte ich kontinuierlich, OpenSeadragon mit Omeka IIIF oder selbstgenerierten Tiles zum Laufen zu bekommen.

Durch Zufall stolperte ich schließlich über [OpenLayers](https://openlayers.org/), einer Software zur Darstellung von Geodaten (hauptsächlich Karten). Meine Freude war groß als ich feststellte, dass OpenLayers auch IIIF-Panoramen darstellen kann und ich in kürzester Zeit einen Proof of concept implementieren konnte. Im Zusammenspiel mit [IIIF-tiler](https://github.com/glenrobson/iiif-tiler) war es mir sogar möglich, die Tiles vorab lokal zu generieren und einfach als statische Dateien von meinem Server ausliefern zu lassen.

Damit haben nun meine Panoramas endlich eine neue Heimat gefunden: [https://kingoli.net/panoramas/](https://kingoli.net/panoramas/). Entgegen aller Erwartungen ist Gigapan zwar immer noch online, aber es scheint in den letzten zehn Jahren keinerlei Weiterentwicklung gegeben zu haben, so dass ich dankend Tschüss sage und mich darüber freue, dass mein digitaler Garten um weiteren Content angewachsen ist.