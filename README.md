# Fullstack Test (DE)

## Zielsetzung

Das Ziel ist es ein REST – Interface zu implementieren und dieses in einer Webanwendung aufzurufen und die Daten zu visualisieren. Für die REST Schnittstelle stehen .NET(C#) oder Java und die Webanwendung mit Angular oder React als Frameworks zur Verfügung. Dabei sind die folgenden Anforderungen zu erfüllen:

* Es soll möglich sein, Personen und ihre Lieblingsfarbe über das Interface zu verwalten
* Die Daten sollen aus einer CSV Datei lesbar sein, ohne dass die CSV angepasst werden muss
* Alle Personen mit exakten Lieblingsfarben können über das Interface identifiziert werden
* Übersichts- und die Detailseiten sollen in der Webanwendung visualisiert sein
* Die Daten auf der Übersichtsseite sollen filter- und sortierbar sein

Einige Beispieldatensätze finden sich in `sample-input.csv`. Die Zahlen der ersten Spalte sollen den folgenden Farben entsprechen:

| ID | Farbe |
| --- | --- |
| 1 | blau |
| 2 | grün |
| 3 | violett |
| 4 | rot |
| 5 | gelb |
| 6 | türkis |
| 7 | weiß |

Das Ausgabeformat der Daten ist als `application/json` festgelegt. Die Schnittstelle soll folgende Endpunkte anbieten:

**GET** /persons
```json
[{
"id" : 1,
"name" : "Hans",
"lastname": "Müller",
"zipcode" : "67742",
"city" : "Lauterecken",
"color" : "blau"
},{
"id" : 2,
...
}]
```

**GET** /persons/{id}

*Hinweis*: als **ID** kann hier die Zeilennummer verwendet werden.
```json
{
"id" : 1,
"name" : "Hans",
"lastname": "Müller",
"zipcode" : "67742",
"city" : "Lauterecken",
"color" : "blau"
}
```

**GET** /persons/color/{color}
```json
[{
"id" : 1,
"name" : "Hans",
"lastname": "Müller",
"zipcode" : "67742",
"city" : "Lauterecken",
"color" : "blau"
},{
"id" : 2,
...
}]
```

## Akzeptanzkriterien

1. Die CSV Datei wurde eingelesen, und wird programmintern durch eine dem Schema entsprechende Modellklasse repräsentiert.
2. Der Zugriff auf die Datensätze soll so abstrahiert werden, dass eine andere Datenquelle angebunden werden kann, ohne den Aufruf anpassen zu müssen.
3. Die oben beschriebene REST-Schnittstelle wurde implementiert und liefert die korrekten Antworten.
4. Der Zugriff auf die Datensätze, bzw. auf die zugreifende Klasse wird über Dependency Injection gehandhabt.
5. Die REST-Schnittstelle ist mit Unit-Tests getestet. 
6. Die `sample-input.csv` wurde nicht verändert. 
7. Die Daten werden in der Webanwedung visualisiert.
8. Responsive Design wurde berücksichtigt.

## Bonuspunkte
* Implementiere eine zusätzliche Methode POST/ Personen mit Anbindung an ein Formular zur Erstellung neuer Einträge.
* Implementierung als MSBuild Projekt für kontinuierliche Integration auf TFS (C#/.NET) oder als Maven/Gradle Projekt (Java).
* Anbindung einer zweiten Datenquelle (z.B. Datenbank via Entity Framework).

Denk an deine zukünftigen Kolleg:innen und mach es ihnen nicht zu einfach, indem du deine Lösung öffentlich zur Schau stellst. Danke & viel Spaß!

