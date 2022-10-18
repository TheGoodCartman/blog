---
title: "A groovy kind of language"
date: "2009-05-05T22:10:45"
categories: [gedacht,gefunden]
---

Eigentlich versuche ich, Inhalte meiner Arbeit weitestgehend aus diesem Blog fernzuhalten. Doch neulich hatten wir den Projektleiter von [Groovy](http://groovy.codehaus.org/), [Guillaume Laforge](http://glaforge.free.fr/weblog/), als Berater zu Gast und der häufige Umgang mit der auf Java basierenden Skriptsprache hat nun dazu geführt, dass ich für ein kleines Privatprojekt ebenfalls darauf zurückgegriffen habe.

Und inzwischen total begeistert davon bin. Denn für viele der alltäglichen kleinen Probleme, die man in Java nur mit vielen Blöcken Code erschlagen kann, gibt es in Groovy Abkürzungen, die nur eine Zeile lang sind. Ein Beispiel ist die Sortierung von Maps nach den Values. In Java muss man dazu die EntrySets in eine Liste packen, eine Comparator-Implementierung schreiben und Collections.sort übergeben. Danach hat man eine sortierte Liste, aus der man wieder eine Map erzeugen kann.

In Groovy ist das Vorgehen eigentlich identisch, nur dass die Syntax der Sprache darauf abzielt, einem viel Arbeit abzunehmen. Mein Java-Beispiel sieht dann so aus:

`[:].putAll(m.entrySet().sort{it.value}.reverse())`

Die eckigen Klammern mit dem Doppelpunkt erzeugen eine leere Map, der man die sortierten EntrySets hinzufügt. Groovy bietet für den Umgang mit Collections einfache Operatoren an wie `.each` für Schleifen und eben `.sort` für die Sortierung. Diesem Operator übergibt man per [Closure](http://groovy.codehaus.org/Closures) (kleine Codestücke als Parameter) das Sortierkriterium. In diesem Fall ist das der Value des Map-EntrySets; `it` steht für ein einzelnes EntrySet (dabei gehe ich davon aus, dass der Value Comparable implementiert). Danach kann man die Sortierung mit einem weiteren Operator ganz einfach umdrehen und ist fertig.

Groovy schafft es also mit kleinen Erweiterungen der Java-Sprache und Konventionen ähnlich [Ruby](/2008/02/13/programmieren-wie-auf-schienen/), dem Entwickler deutlich Arbeit abzunehmen und eleganten Code zu erzeugen. Für kleine Aufgaben zwischendurch ist die Skriptsprache also besonders gut geeignet.

Bei großen Projekten sieht das freilich anders aus. Als dynamisch getypte Skriptsprache werden viele Fehler erst zur Laufzeit erkannt, zudem ist das flexible Metamodell, welches Anpassung an Klassen zur Laufzeit erlaubt, ein Performance-Killer. Als Gegenwert erhält man aber die Möglichkeit, [DSL](http://de.wikipedia.org/wiki/Domänenspezifische_Sprache)s umzusetzen, die den Code für Nicht-Programmierer lesbar machen. Die Konventionen, die zum Beispiel das XML-Processing über Library-Grenzen hinweg so wunderbar einfach gestalten, sind auf der anderen Seite eine hohe Einstiegshürde, und an der syntaktischen Flexibilität der Sprache scheitern momentan noch die meisten IDEs.

Wer aber mal schnell ein paar Daten aus einer Datenbank auslesen und manipulieren will und sich ohnehin mit Java auskennt, der sollte ruhig einen Blick auf den Komfort werfen, den Groovy bietet.
