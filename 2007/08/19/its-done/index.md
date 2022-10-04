---
title: "It's done"
date: "2007-08-19T17:12:53"
categories: [getan]
---

Jetzt habe ich es endlich geschafft und meine Blogsoftware auf den neuesten Stand gebracht. Die Ursache für die Verzögerung waren die vielen Änderungen an der API von Wordpress seit Version 1.5, wodurch ich auch ein neues Release meines Themes veröffentlichen musste.

Die größte Schwierigkeit bereitete mir dabei die Zusammenführung der Link- und Post-Kategorien, da nun die Blogroll nicht mehr fest die ID 0, sondern nach dem Upgrade eine beliebige ID besitzt. Damit ich trotzdem nur diese Kategorie in der Sidebar zeigen kann, muss ich eine als `deprecated` markierte Funktion nutzen. Generell bietet Wordpress eine nur unzureichende Unterstützung durch [Template-Tags](http://codex.wordpress.org/Template_Tags) an, so dass ich ein eigenes PlugIn geschrieben habe, um eine Übersicht für das neue [Archiv](/blog/archiv/) analog zu den [Links](/blog/links/) zu erzeugen.

Außerdem habe ich die [Datenbank endlich von Latin1 nach UTF-8 konvertiert](http://g30rg3x.com/utf8-database-converter/) und das [Backup automatisiert](http://www.ilfilosofo.com/blog/wp-db-backup).


