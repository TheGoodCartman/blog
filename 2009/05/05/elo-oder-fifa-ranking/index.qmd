---
title: "Elo oder FIFA-Ranking?"
date: "2009-05-05T23:14:37"
categories: [gedacht,getan]
---

Als Organisator des firmeninternen Kickerturniers und Fan von Statistiken habe ich mich damit auseinandergesetzt, die Stärke der Spieler anhand ihrer Ergebnisse in den Turnieren zu bewerten. Eine kurze Recherche im Internet brachte mich auf die [Elozahl](http://de.wikipedia.org/wiki/Elo-Zahl), eine aus dem Schach stammende mathematische Methode, mit deren Hilfe eine [alternative Fußball-Weltrangliste](http://de.wikipedia.org/wiki/World_Football_Elo_Ratings) gepflegt wird. Da ich das Thema recht spannend fand, habe ich diesen Ansatz und zum Vergleich die [FIFA-Weltrangliste](http://de.wikipedia.org/wiki/FIFA-Weltrangliste) ausprobiert und will die beiden Verfahren nun vergleichend vorstellen.

**Die Elozahl**

Von einem Mathematiker für die Anforderungen des Schachs entwickelt, kann die *Elozahl* als vergleichbaren Stärkewert eines Spielers interpretiert werden. Spielen zwei Spieler gegeneinander, kann für jeden Ausgang der Partie eine Wahrscheinlichkeit berechnet werden. Davon abhängig gewinnen bzw verlieren Sieger und Verlierer Punkte, die die Stellung des Gegners gegenüber der eigenen Stärke ausdrücken. Ein guter Spieler bekommt so kaum Punkte, wenn er gegen einen schwachen Kontrahenten siegt, allerdings würde eine Niederlage einen deftigen Punktabzug bedeuten - je nachdem, wie wahrscheinlich das Ereignis ist. Den Punktwert einer Partie bekommt immer ein Spieler gutgeschrieben und der andere Spieler verliert ihn, so dass in einem geschlossenen System theroretisch keine Punkte verloren gehen.

Dies ist jedoch eines der Probleme, die mir in meinem Fall begegneten. Das *Elosystem* braucht einen Anfangszustand, den ich nicht anbieten kann. Gleichzeitig benötigt man für eine aussagekräftige Liste eine gewisse Zahl an Partien, die für manche Spieler nicht vorliegen - die Teilnehmer an den Turnieren schwanken. Die Annahme von initialen 1500 Punkten für jeden Spieler führte so zu einer verzerrten Darstellung. Ich als Beispiel habe so viele Spiele mit leider einem gehörigen Anteil Niederlagen hinter mir, dass meine *Elozahl* niedriger ausfällt als bei manchem Gelegenheitskicker, den ich jedoch schlagen würde.

Die Anpassungen an das Kickerspiel (Doppel mit wechselnden Partnern) waren dagegen kein Problem, hier wurde schon [genügend](http://www.hardt-edv.de/dws/?id=55) [Vorarbeit](http://www.players4players.de/elo-explanation-long.30.0.html) [geleistet](http://sourceforge.net/projects/kicker/), wo ich mich informieren konnte.

**FIFA-Weltrangliste**

Besser schien da trotz aller Kritik schon das System der FIFA zu passen. Zum Einen werden dort alte Turniere abgewertet, so dass die Liste eine relativ aktuelle Momentaufnahme darstellt - im Gegensatz zur *Elozahl* reicht es auch, die Rangliste nur nach jedem Turnier zu aktualisieren und nicht pro Spiel. Gewertet werden nur die Siege, Niederlagen bewirken keinen Abzug. Damit bleiben nicht spielende Kicker bei der Punktzahl 0 und behalten nicht ewig den nicht verteidigten Status. Die Stärke eines Teams habe ich ebenfalls als Mittelwert der Spielerstärken ermittelt und die Tordifferenz als weiteren Faktor übernommen. Dadurch wirken sich hohe Siege im Verhältnis relativ stark aus, aber mit etwas Feinjustage an den Koeffizienten sollte das noch zu korrigieren sein.

Gefühlt erlaubt die FIFA-Rangliste einen realistischeren Eindruck, da sie mehr an das System (Tisch-) Fußball angepasst ist und nicht so viele Nebenbedingungen benötigt. Das mathematische Modell der Elozahl hat zwar seinen Reiz und ist elegant, aber ohne ein stabiles System und eine gewisse Anzahl Spiele jedes Teilnehmers schwanken die Ergebnisse des Algorithmus. In meinem Fall also ein klarer Punktsieg für die FIFA-Weltrangliste.
