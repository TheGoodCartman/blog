---
title: "Lost in Updates"
date: "2007-09-30T18:59:44"
categories: [gedacht]
---

So, mal wieder etwas Motz-Blogging (weil [der neue Pratchett](/2007/08/28/terry-pratchett-news/) immer noch nicht im Laden steht). Diesmal zum Thema *Updates in Theorie und Praxis*.

Eigentlich erwarte ich von einem eingespielten Update, dass ich idealerweise nichts davon merke bzw mich über geschlossene Sicherheitslücken oder sogar neue Funktionen freue. So weit die Theorie. In der Praxis verändert zum Beispiel ein Kernelupdate meines [Ubuntu-Linux](/2007/06/25/ubuntu-704-oder-die-verwirrende-versionsnummer/) die `menu.lst` des Bootmanagers GRUB, da dieser den jeweiligen Kernel direkt anspricht. Dies wäre nicht weiter problematisch, wenn die Updatefunktion nicht auch jedes Mal den Eintrag für mein parallel installiertes Windows löschen würde. Na gut, dann schaue ich eben in die vom Update angelegte Sicherheitskopie `menu.lst~` und kopiere den Eintrag von dort - doch diese enthält genau denselben Inhalt wie das Original und hat deshalb keinerlei Nutzen. Damit ich mich nicht bei jedem Kernelupdate wieder in die Syntax der GRUB-Konfiguration einarbeiten muss, habe ich mir nun eine eigene Kopie angelegt.

Wenn Linux wirklich auf den Desktop von technisch nicht so versierten Anwendern will, dann muss vor allem an diesen Kleinigkeiten gearbeitet werden. Denn man schlägt den Marktführer Microsoft nicht, indem man sich so arrogant wie dieser verhält und davon ausgeht, dass es nur ein Betriebssystem pro Rechner gibt.

Etwas mehr Ärger gibt es gerade mit dem neuen [Majorrelease 2.3 von Wordpress](http://wordpress.org/development/2007/09/wordpress-23/). Neben [datenschutzrechtlichen Problemen](http://forum.wordpress-deutschland.org/allgemeines/25313-wordpress-2-3-sicherheit-datenschutz.html) und der [unschönen Entwicklung der deutschen Wordpress-Version](http://spam.weltretter.de/2007/09/25/spam-23-von-wordpress-deutschland/) stößt mir aber ein anderer Aspekt bitter auf und verhindert ein schnelles Aufspielen der neuen Version.

Und zwar gibt es nach Version 2.1 erneut eine [Änderung am Datenbankschema](http://boren.nu/archives/2007/08/26/wordpress-23-taxonomy-schema/), was das Thema Kategorien betrifft. Dies wäre bei jeder anderen Software kein Problem, doch Wordpress besitzt leider eine grottenschlechte API für Themes und PlugIns, die nur ungenügend die dahinterliegende Struktur der Datenbank verbirgt. Dadurch benutzen viele Entwickler den direkten Zugriff auf die Tabellen und müssen nach nur einem halben Jahr erneut ihre Themes/PlugIns anpassen, damit diese korrekt funktionieren.

Und das Ganze für eine nur halb ausprogrammierte Funktion wie die Tags, für die es viel bessere Lösungen in PlugIn-Form gibt. Ganz abgesehen davon, dass es für mich als Entwickler immer schwerer wird, an eine der zentralen Funktionen eines Blogs, die *Blogroll*, heranzukommen. Früher war diese fest als Linkkategorie Nummer 1 definiert. Nach dem Upgrade auf Version 2.1 wurden aus Link- und Beitragskategorien eine einzige Tabelle und die *Blogroll* hatte plötzlich eine beliebige ID, je nachdem wie viele Beitragskategorien es vorher gab. Und dann kam wieder die schlechte API ins Spiel: Links zu einer bestimmten Kategorie kann man nur ausgeben, wenn man die ID kennt. Allerdings kann mit Bordmitteln nicht herausgefunden werden, welche ID die Kategorie *Blogroll* hat. Also bleibt nur die Suche direkt in der Datenbank als Alternative, die ich für Version 2.3 jetzt wieder umschreiben darf.

Ich will nur hoffen, dass der 2.2er-Branch weiter mit Sicherheitsupdates gepflegt wird, damit ich mir etwas Zeit lassen kann für das Anpassen meines Themes und PlugIns. Ansonsten lohnt es sich vielleicht, eine andere Software auszutesten, bei der modernere Ansätze der Softwareentwicklung verfolgt werden - die API von Wordpress vermischt View (HTML-Ausgabe) und Modell und wird mit jeder neuen Version nur verschlimmbessert. Aber das ist typisch - Features sind sexy und verkaufen sich besser als ein Refactoring mit entsprechenden Auswirkungen auf die Nachhaltigkeit, in diesem Fall die Stabilität von Themes und PlugIns.

OK, genug gemotzt für heute, es gibt ja auch gute Nachrichten: **Wir sind Weltmeisterinnen**!

