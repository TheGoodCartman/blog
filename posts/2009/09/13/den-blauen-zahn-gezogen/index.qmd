---
title: "Den blauen Zahn gezogen"
date: "2009-09-13T14:51:48"
categories: [getan]
---

In heutigen Zeiten muss eine Computermaus kein Kabel mehr besitzen. Also hielt ich nach dem Ableben meines alten Eingabegeräts Ausschau nach einer Bluetooth-Alternative, um meine USB-Slots nicht unnötig mit Adaptern für andere Funktechniken zu belegen. Trotz der inzwischen weiten Verbreitung von Bluetooth in den Laptops ist die Auswahl in diesem Bereich eher bescheiden; am Ende entschied ich mich für ein [Logitech-Modell](http://www.logitech.com/index.cfm/mice_pointers/mice/devices/5747&cl=de,de) und hatte folgend das "Vergnügen", einige technische Hürden überwinden zu müssen, bis es wie erwartet unter Linux und Windows funktionierte.

**PS3**

Die Konsole machte zum Glück gar keine Probleme. Im Sony-Betriebssystem war die Maus schnell erkannt und eingerichtet; aber bis auf zum Surfen (wozu ich die PS3 gar nicht nutze) kann man die Maus nicht sinnvoll verwenden. Die Einrichtung im installierten [Ubuntu Intrepid](/blog/2009/03/29/technik-wie-sie-sein-sollte/) war ebenso ein Kinderspiel. Das Bluetooth-Portlet des Gnome-Desktops fand mein Gerät sofort; ich gab die PIN ein und die Maus funktionierte. Genauso hatte ich mir das vorgestellt. Wenn jetzt auch noch der alternative [Bootloader pdaXrom-ng](http://forums.ps2dev.org/viewtopic.php?t=11559) mit Bluetooth funktioniert, bin ich wunschlos glücklich (aktuelle Versionen von [Petitboot](http://www.kernel.org/pub/linux/kernel/people/geoff/cell/ps3-petitboot/) haben ja leider keine GUI mehr).

**Windows**

Unter dem Microsoft-Betriebssystem begannen dann die Probleme. Asus als Hersteller meines Laptops bietet keine Aktualisierungen für den mitgelieferten Toshiba-Bluetoothstack an, was mich bis zu diesem Zeitpunkt nicht gestört hatte. Die erste Kontaktaufnahme zwischen Laptop und Maus war noch relativ einfach, doch nach dem Neustart des Rechners musste ich feststellen, dass dieser sich nicht automatisch mit dem Eingabegerät verband. Die Verbindung musste jedes Mal manuell wieder aktiviert werden (was umso ärgerlicher ist, wenn man keine funktionierende Maus hat); eine Option zum automatischen Reconnect beim Systemstart gibt es nicht.

Da ich von meinem Bruder wusste, dass der bei Windows eingebaute Bluetoothstack diese Möglichkeit bietet, habe ich die Toshiba-Software entfernt um danach festzustellen, dass zum Einen Windows XP keinen Treiber für meinen eingebauten Bluetoothadapter mitbringt und Asus andererseits den notwendigen Treiber an den Toshiba-Stack koppelt.

Doch zum Glück gibt es ja [kleine](http://www.shootingsoftware.com/Widcomm.htm) [Hacks](http://www.asusforum.encke.net/module-pnForum-viewtopic-topic-3493.html), um Windows von der Funktionsfähigkeit des BT183-Adapters mit einem eingebauten Toshiba-Treiber anderen Namens zu überzeugen. Also schnell den technischen Code in der Treiber-INF angepasst und schon hatten sich die Probleme erledigt.

**Linux**

Unter meinem [Ubuntu Hardy (8.04)](/blog/2008/04/26/der-reiher-ist-gelandet/) gab es keine so einfache Lösung. Der interne Adapter BT183 wurde zwar erkannt, aber selbst nach manuellem Start des Bluetooth-Daemons fand das `hcitool` nicht die direkt daneben funkende Maus.

Also biss ich in den sauren Apfel und führte [das längst überfällige Upgrade](/blog/2009/07/07/stabilitat-und-abhangigkeiten/) auf Ubuntu Jaunty (9.04) durch. Dies stellte sich im Nachhinein als kleiner Fehler heraus, denn in dieser aktuellen Version wurde der Wechsel des Bluez-Stacks auf die neue Major-Version 4 vollzogen. Diese verzichtet auf den HID-Daemin `hidd` und aus einem unerfindlichen Grund funktionieren u.a. die Bluetooth-Mäuse von Microsoft und Logitech nur mit diesem. So auch bei mir; das Bluetooth-Gnome-Portlet fand gar kein Gerät und auf der Kommandozeile sah das `hcitool` zwar meine Maus, aber nach einem ohne Fehlerausgabe durchgeführten Verbindungsversuch gab es trotzdem keine Connection.

Das Beste an diesem Problem war Freund Google. Fast alle Anleitungen zum Einrichten von Bluetooth-Mäusen basieren auf der 3er Version des Bluez-Stack, so dass ich bei der Suche nach Hinweisen nur veraltete Webseiten fand. `HIDD` hier, `HIDD` dort - nur ein `HIDD` ist bei Jaunty nicht mehr installiert. Doch dann fand ich den rettenden Hinweis: Das APT-Paket `bluez-compat` enthält die mit Version 4 entfernten Services, so auch `HIDD`. Und mit diesem Tool klappte dann endlich eine Verbindung und ich konnte den Mauszeiger über die BT-Maus bewegen.
