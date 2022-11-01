---
title: "Markdown rules the world"
date: "2022-11-01T21:48:00"
categories: [gedacht,getan]
---

OK, vielleicht nicht die gesamte Welt. Aber seitdem Github Markdown nativ unterstützt, ist es aus der Welt der Softwareentwicklung nicht mehr wegzudenken. Und so schreibe ich in meinem Job relativ häufig in der Markdown-Syntax und beherrsche diese inzwischen fließend.

Da lag der Gedanke nahe, dass ich auch in Markdown bloggen könnte. Ich benötigte keines der tausend Experimente, die Wordpress mit ihrem Editor angestellt hat, mir genügt ein reiner Texteditor.

Mit dieser Prämisse eines möglichst einfachen Blogsystems auf Basis von Markdown-Files kam ich schließlich auf [Quarto](https://quarto.org/). Der Funktionsumfang der Software, die aus dem Bereich der wissenschaftlichen Publikations stammt und [Pandoc](https://pandoc.org/) zur Konvertierung nutzt, ist eigentlich schon wieder zu viel für meine bescheidenen Bedürfnisse.

Aber *Quarto* macht eben auch genau das, was ich brauche: Ich schreibe meine Posts in Markdown, packe ggf noch Bilder in denselben Ordner, und checke das in ein Repo ein (*Quarto* ist datenbanklos, yeah!). Eine Github Action läuft dann los, generiert das Blog als Static Pages und lädt es in meinen Webspace - fertig!

Gut, viele Optionen im Styling gibt es nicht, mit meinen fast 800 Posts ist die Performance nicht mehr optimal und es gibt in dem noch recht jungen Projekt auch noch viele kleine Bugs. Aber dafür konnte ich die Ordnerstruktur an meine Bedürfnisse anpassen und damit sogar meine Permalinks erhalten.

Somit endet nach 17 Jahren die Ära Wordpress für mich. Endlich bin ich die grauenhafte Vermischung von Content, Layout und Logik los (die Migration war dementsprechend nicht einfach), endlich muss ich nicht mehr ständig updaten, ohne dass irgendwelche meiner Kritikpunkte angegangen werden - und beim Ausfall der Datenbank (wie erst vor ein paar Tagen) läuft das Blog immer noch; sogar mit einer besseren Suche.

Und als wäre das nicht genug, nutze ich mit [Obsidian](https://obsidian.md/) inzwischen auch ein vielseitiges Wissensmanagementsystem auf Markdown-Basis als Notizspeicher; gesynct über meinen eigenen Webspace. Es hat also etwas gedauert (Markdown wurde 2004 final spezifiziert), aber meine Welt wird inzwischen von Markdown regiert, und es ist schön zu sehen was für ein vielfältiges Ökosystem sich rund um die Auszeichnungssprache entwickelt hat.