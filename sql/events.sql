-- Name
-- Datum
-- Veranstalter
-- Sonstiges
-- Volle Beschreibung
-- Ort
-- Link

DROP TABLE IF EXISTS events;


CREATE TABLE events(
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    type VARCHAR(100) DEFAULT "Events",
    organizer VARCHAR(300),
    description TEXT NOT NULL,
    place VARCHAR(300),
    event_date VARCHAR(300),
    creation_date VARCHAR(300),
    other TEXT,
    link TEXT NOT NULL,
    ts_event TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


INSERT INTO events (name, description, event_date, link) VALUES (
'Das Ferienhaus der Zukunft: Architektur-Wettbewerb für nachhaltige Erholungsräume',
'Holiday home of the future - Das Ferienhaus der Zukunft: Mit diesem Architekturwettbewerb sucht das dänische Unternehmen Sonne und Strand nachhaltige Ideen zur Weiterentwicklung von Ferienhäusern in Dänemark.
 
Die Teilnehmer sollen ein aussagekräftiges Architektur-Konzept entwickeln, welches vor allem Baumerkmale, Design und Funktionalitäten des umweltfreundlichen Ferienhauses beschreibt: Wie kann das typisch-dänische Ferienhaus neu gedacht werden?  Was macht das Ferienhaus der Zukunft besonders und hält dabei trotzdem an der dänischen Lebenskultur nach einem sozial und ökologisch nachhaltigem Prinzip fest?
 
Teilnehmen können alle Interessierten ab einem Mindestalter von 18 Jahren. Die Einsendungen werden von einer Fachjury nach folgenden Kriterien bewertet: Umsetzung der Aufgabenstellung, Berücksichtigung des Nachhaltigkeitsaspekts, Kreativität der Idee, Theoretische Umsetzbarkeit des Design Entwurfs. Die drei besten Ideen werden dann mit Preisgeldern bis zu 3.000,-EUR belohnt.

				https://www.sonneundstrand.de',
'01.11.18 | Teilnahmeschluss',
'https://www.connecticum.de/karrierefutter/event/das-ferienhaus-der-zukunft-architektur-wettbewerb-fuer-nachhaltige-erholungsraeume/');

INSERT INTO events (name, description, event_date, link) VALUES (
'4flow challenge: Fallstudienwettbewerb für Logistik-Masterstudenten',
'Big Data, Augmented Reality, selbststeuernde Materialflüsse – diese und weitere innovative Technologien gehören in den Arbeitsalltag angehender Logistiker. 4flow sucht Nachwuchsberater und bietet Studenten im Rahmen der ""4flow challenge"" die Möglichkeit, ihr Verständnis von Smart Logistics sowie ihr Beratertalent unter Beweis zu stellen und dabei Preise im Wert von über 10.000,- EUR zu gewinnen.
 
Anhand einer Fallstudie gilt es für die Teilnehmer, ein Konzept für die smarte Logistik eines fiktiven Unternehmens zu erarbeiten und einer Jury bestehend aus erfahrenen Logistikberatern vorzustellen. Den Teilnehmern stehen dabei für fachliche und berufsspezifische Fragen die Berater von 4flow als Mentoren zur Seite. Die Teams mit den überzeugendsten Konzepten werden vom 7.-8. Juni 2018 zum Finale an den Berliner Hauptsitz von 4flow eingeladen.
 
Veranstalter des Wettbewerbs ist 4flow, Anbieter von Logistikberatung, Logistiksoftware und 4PL-Dienstleistungen. Der erste Platz ist für die Gewinnerteams mit 4.000,- EUR, der zweite mit 2.000,- EUR und der dritte mit 1.000,- EUR dotiert. Lehrstühle, die die Gewinner aktiv begleitet haben, erhalten zusätzliche Preisgelder.
 
Teilnehmen können Teams von drei bis vier Masterstudenten, idealerweise mit Logistikschwerpunkt. Die Anmeldungen mit vollständigen Bewerbungsunterlagen sollten bis 18. März 2018 per E-Mail gesendet werden an: challenge@4flow.com

				www.4flow.com/challenge',
'18.03.18 | Anmeldeschluss',
'https://www.connecticum.de/karrierefutter/event/4flow-challenge-fallstudienwettbewerb-fuer-logistik-masterstudenten/');

INSERT INTO events (name, description, event_date, link) VALUES (
    'Future Design Award – Kinderzimmer Digital: Auf der Suche nach dem Spielzeug 2.0',
'Studenten, Designer, Erzieher, Pädagogen und Kreative sind aufgerufen, sich mit dem Thema ""digitale Erziehung"" auseinander zu setzen und Ideen einzureichen, wie kommende Generationen frühzeitig spielerisch auf den richtigen Umgang mit Medien vorbereiten werden können. Gefragt sind entweder medienpädagogische Konzepte oder das Design von Kinderspielzeugen. In beiden Kategorie werden die besten drei Ideen mit Preisgeldern ausgezeichnet.

In der ersten Kategorie ""Design eines Kinderspielzeugs 2.0"" sind Spielzeugideen für Kinder von 3-8 Jahren gefragt, bei dem der Fokus auf der digitalen Komponente liegt. In einem kurzen schriftlichen Konzept (max. eine A4-Seite) soll der Entwurf erklärt werden und die Jury bewertet hier insbesondere nach Kreativität, Design, Material und Nutzerbezogenheit.

In der zweiten Kategorie soll ein 1-2-seitiges medienpädagogisches Konzept für digitales Spielzeug entwickelt werden, in dem die Möglichkeiten der Förderung von Digitalkompetenzen für Kinder (ebenfalls im Alter von 3-8 Jahren) erläutert werden. Hier bewertet die Jury nach Kreativität, pädagogischer Wirkung und Schlüssigkeit des Konzepts. Preisgelder in Höhe von 1.500, 1.000 bzw. 500,- EUR warten auf die jeweils besten drei Teilnehmer pro Kategorie.

Der ""Future Design Award"" wird vom Vergleichsportal Netzsieger.de veranstaltet. Einsendungen zum Wettbewerb sind bis zum 15. Juni 2018 möglich in Form einer PDF-Datei per E-Mail an wettbewerb@netzsieger.de; Zusätzlich wird eine kurze schriftliche Vorstellung (eine A4-Seite) des Teilnehmers inkl. Angabe des aktuellen Studienfaches/Immatrikulationsbescheinigung bzw. der aktuellen Tätigkeit erbeten.

                                https://www.netzsieger.de/ratgeber/kinderzimmer-digital',
'15.06.18 | Einsendeschluss',
'https://www.connecticum.de/karrierefutter/event/future-design-award-kinderzimmer-digital-spielzeug-2-0/');

INSERT INTO events (name, description, event_date, link) VALUES (
    'bonprix: Coding Challenge für IT-Studentinnen',
'bonprix veranstaltet eine Coding Challenge für den weiblichen IT-Nachwuchs. Das internationale Modeunternehmen der Otto Group möchte damit gezielt die Geschlechterrollen in der klassischen Männerdomäne aufbrechen und die Vielfalt in der Softwareentwicklung fördern. Der Wettbewerb richtet sich an alle Mädchen und Frauen, die sich in einem IT-nahen Studium oder Ausbildungsprogramm in Deutschland befinden und ihre Developer-Expertise in der Praxis erproben wollen.
 
Aufgabe ist die Erstellung einer Tag-Cloud auf Basis von Java oder Python, die ein Filtern von Produktbewertungen nach bestimmten Kategorien erlaubt. Die Bewertung erfolgt unter den Gesichtspunkten: Funktionalität (Läuft das Programm?), Qualität (Wie gut ist der Programmiercode strukturiert?) und Usability. Außerdem erwartet die Jury eine detaillierte Dokumentation und es gibt Bonuspunkte für kreative Zusatzfeatures.
 
Die Teilnahme an der bonprix-Coding Challenge ist bis zum 30. April 2019 möglich. Den drei Gewinnerinnen winken Preisgelder in einer Gesamthöhe von 6.000 Euro. Die Auswertung und Bekanntgabe der Gewinnerinnen erfolgt bist zum 15. Juli 2019. Die Teilnehmerinnen sollten ihre Lösungen per E-Mail an wettbewerb@bonprix.net senden und dabei unbedingt eine aktuelle Immatrikulations- bzw. Ausbildungsbescheinigung mitschicken. Weitere Informationen zur Coding Challenge unter:

				https://www.bonprix.de/corporate/karriere/coding-challenge',
'30.04.19 | Einsendeschluss',
'https://www.connecticum.de/karrierefutter/event/bonprix-coding-challenge-fuer-studentinnen/');

INSERT INTO events (name, description, event_date, link) VALUES (
    '1.000 Euro Sprachreisen-Stipendium für Globetrotter von Sprachreisen.org',
'Gesucht werden neugierige und weltoffene Entdecker, Schüler, Studenten und Erwachsene aus Deutschland, Österreich und der Schweiz, die sich für andere Länder und deren Sprachen interessieren. Das Stipendium wird zweimal jährlich im Wert von jeweils 1.000,- EUR von Sprachreisen.org in Partnerschaft mit Sprachreisen-ratgeber.de vergeben.
 
Das Sprachreisen-Stipendium für Globetrotter hat zum Ziel diejenigen Sprachreisenden zu unterstützen, die verstanden haben, dass die Sprache eines Landes lernen heißt, den Austausch der Kulturen voranzubringen. Interessierte sollten daher bei ihrer Bewerbung ihre persönlichen Gründe darstellen, warum sie sich in ihrer kommenden Sprachreise mit der von ihnen gewählten Sprache beschäftigen und/oder warum sie sich für das Land entschieden haben.
 
Sprachreisen.org ist ein Vergleichs- und Buchungsportal für Sprachreiseveranstalter in Deutschland. Bewerbungen für das Sommerstipendium sind bis 31. Mai 2018 möglich. Und zwar mit einem Bewerbungsbeitrag in Form eines Kurzvideos und ein paar Sätzen zum Bewerber selbst per E-Mail an info@sprachreisen.org. So ein Video sollte max. 60 Sekunden lang sein und kann aus Video, Fotos und Text zusammengesetzt sein.
 
Die besten 10 Beiträge werden auf Facebook und Instagram gepostet und wer die meisten Likes/Shares erhält, gewinnt das Stipendium. Die Bekanntgabe für die Stipendiaten erfolgt im Juni.

				www.sprachreisen.org/static/stipendium',
'31.05.18 | Bewerbungsschluss',
'https://www.connecticum.de/karrierefutter/event/1000-euro-sprachreisen-stipendium-fuer-globetrotter-von-sprachreisen-org/');


INSERT INTO events (name, description, event_date, link) VALUES (
    'Entwerfe ein T-Shirt-Design zum Thema: Frauen halten zusammen – Design Wettbewerb von Baur und Abury',
'Die Benachteiligung von Frauen ist in vielen Teilen der Welt noch immer stark ausgeprägt  und es herrscht keine Gleichberechtigung. Daher ist es umso wichtiger, das Frauen für Frauen einstehen und der Zusammenhalt über Länder und Kulturen hinweg gefördert wird. Vor diesem Hintergrund hat BAUR gemeinsam mit der ABURY Foundation einen Design-Wettbewerb ins Leben gerufen. Die ABURY Foundation ist eine international tätige Organisation, die sich im Besonderen für die Förderung der Entwicklungszusammenarbeit und der Völkerverständigung einsetzt.
 
BAUR ruft kreative, umweltbewusste und sozial engagierte Menschen dazu auf, einen Entwurf für ein T-Shirt-Design einzusenden. Die Aufgabe für die Teilnehmer ist es, mit ihrem Entwurf ein Statement zu setzen. Sie sollen sich ein Motiv oder ein Muster, Art-Work oder Schriftzug überlegen, dass ihre persönliche Message zum Thema “Frauen halten zusammen” widerspiegelt. Der Entwurf soll zusätzlich in einem kurzen schriftlichen Konzept (max. eine A4-Seite) erklärt werden. Die besten drei Einsendungen werden mit Preisgeldern in Höhe von  2.000 EUR, 1.000 EUR und 500 EUR ausgezeichnet.
 
Bis zum 31.10.2018 können Design-Studenten, Künstler und alle Interessierten am Design Wettbewerb teilnehmen und ihre Entwürfe einreichen. Dabei ist ein Mindestalter von 18 Jahren zu berücksichtigen. Zur Teilnahme am Wettbewerb genügt es, die vollständigen Unterlagen (PDF-Datei des Entwurfes inklusive kurzer schriftlicher Erläuterung der Idee sowie kurze schriftliche Vorstellung des Teilnehmers inkl. vollständigem Namen und Kontaktdaten) per E-Mail an baur-wettbewerb@neoavantgarde.de zu senden.

				http://www.baur.de/blog/design-wettbewerb',
'31.10.18 | Einsendeschluss',
'https://www.connecticum.de/karrierefutter/event/entwerfe-ein-t-shirt-design-zum-thema-frauen-halten-zusammen-design-wettbewerb-von-baur-und-abury/');


INSERT INTO events (name, description, event_date, link) VALUES (
    'Flaconi Marketing Challenge 2018',
'Die Flaconi Marketing Challenge ist ein studentischer Wettbewerb, der 2018 erstmalig stattfindet. Studierende aus ganz Deutschland werden dazu aufgerufen, eine innovative 360-Grad-Kampagne für eine eigene Flaconi Box zu entwerfen. Die drei besten Teams erhalten die Chance, ihre Marketing-Konzepte vor der Jury im Flaconi Headquarter in Berlin zu pitchen.
 
Die Anmeldung ist für alle Bachelor- und Master-Studiengänge offen. Teilnehmen können Einzelpersonen und Teams bis zu drei Personen. Besonders angesprochen sind marketingverwandte Fachbereiche, aber auch kreative Querdenker sind willkommen. Der Bewerbungszeitraum läuft vom 15.09. bis zum 15.12.2018 um 23:59 Uhr. Die drei besten Einsendungen werden bis zum 11.01.2019 benachrichtigt. Der Pitch-Tag findet Ende Januar statt.
 
Die Challenge bietet die Chance auf Erfahrungsaustausch, Networking, Marketing- und E-Commerce-Insights sowie Teilnahmezertifikate und attraktive Preise: Einen Hauptgewinn von 2.000 EUR sowie einen Einkaufsgutschein über 400 EUR für die Zweitplatzieren und einen Einkaufsgutschein über 200 EUR für die Drittplatzierten. Wer an der Flaconi Marketing Challenge 2018 teilnehmen möchte, sollte sich bis zum 15. Dezember 2018 per E-Mail mit einem vollständigen Konzeptpapier (drei bis max. zehn DIN A4 Textseiten) bewerben. Das Anmeldeformular und alle weiteren Infos gibt es online unter:

				https://www.flaconi.de/marketing-challenge',
'15.12.18 | Bewerbungsschluss',
'https://www.connecticum.de/karrierefutter/event/flaconi-marketing-challenge-2018/');


INSERT INTO events (name, description, event_date, link) VALUES (
    'IAV Security Hackathon in Berlin für Studenten und Professionals, 25.-26. Mai 2018',
'Vom Studenten bis zum Professionals ist jeder smarte Programmierer beim Security Hackathon willkommen, sein Können unter Beweis zu stellen und sich mit Gleichgesinnten und Experten auszutauschen. In kleinen Teams gilt es, zwei Hauptaufgaben zu lösen, die gleichzeitig auch einen Einblick in die Praxis des Engineering-Partners IAV bieten. Auf die Sieger warten Gewinne im Gesamtwert von über 2.500,- EUR.
 
IAV entwickelt IT-basierte Innovationen im Automobilbereich und ermöglicht echten Fortschritt – vom effektiven Flottenmanagement bis zum autonomen Fahren. Die starke Konnektivität und zahlreiche Datenschnittstellen bergen auch Risiken und stellen große Herausforderungen an die IT-Sicherheit. In diesem Kontext lädt IAV 50 Programmierer ein, gemeinsam an progressiven Lösungsansätzen zu arbeiten und sich in lockerer Atmosphäre zu vernetzen.
 
Der ""IAV Security Hackathon"" findet vom 25.-26. Mai 2018 im IAV Digital Lab, Hallerstr. 23 in Berlin statt. Anmelden können sich Studenten und Professionals bis zum 13. Mai 2018 über das Online-Anmeldeformular. Fragen zur Veranstaltung sind per E-Mail möglich an: hackathon@iav.de

				www.iav.com/hackathon',
'13.05.18 | Anmeldeschluss',
'https://www.connecticum.de/karrierefutter/event/iav-security-hackathon-in-berlin-fuer-studenten-und-professionals/');


INSERT INTO events (name, description, event_date, link) VALUES (
    'Preis für die beste Bachelorarbeit zum Thema Digitalisierung/digitale Zukunftstechnologien: Wettbewerb der Roland Berger Stiftung für Bachelorabsolventen aller Fachrichtungen',
'Uni-Absolventen aller Fachrichtungen können ihre Bachelorarbeit einreichen und ein Preisgeld in Höhe von 3.000,- EUR gewinnen. Die Bachelorthesis sollte in den letzten 12 Monaten bewertet worden sein und sich mit dem Themenfeld Digitalisierung/digitale Zukunftstechnologien beschäftigen – unabhängig davon, in welchem Fachbereich sie entstanden ist.
 
Die Einsendungen werden von einer Jury der Philipps-Universität Marburg und der Strategieberatung Roland Berger bewertet. Die beste Abschlussarbeit wird dann von der Roland Berger Stiftung für europäische Unternehmensführung mit einem Preisgeld in Höhe von 3.000,- EUR ausgezeichnet.
 
Bewerbungen für den ""Preis für die beste Bachelorarbeit zum Thema Digitalisierung/digitale Zukunftstechnologien"" sind bis 15. Oktober 2018 online möglich. Dazu sollten der CV, Angaben zu den Noten (Abitur, Bachelor, derzeitiger Schnitt) und Praktikumsinhalten sowie die Bachelorarbeit inklusive Bewertung eingereicht werden. Kontakt: Laura Winter, Sederanger 1, 80538 München, Fon (089) 92 30 83 34

				https://rb.digital/Bachelorarbeit2018',
'15.10.18 | Einsendeschluss',
'https://www.connecticum.de/karrierefutter/event/preis-fuer-die-beste-bachelorarbeit-zum-thema-digitalisierungdigitale-zukunftstechnologien-wettbewerb-der-roland-berger-stiftung-fuer-bachelorabsolventen-aller-fachrichtungen/');


INSERT INTO events (name, description, event_date, link) VALUES (
    'Bio-Gründer Wettbewerb – innovative Geschäftsideen aus Agrar- und Ernährungswirtschaft, Biotechnologie, Biochemie o.ä. gesucht',
'Kräuter aus der Dose, laserbasierte Unkrautvernichtung oder personalisierte Ernährung – solche innovativen Ideen sind beim ""Bio-Gründer Wettbewerb"" gefragt. Ideen für innovative Produkte und Dienstleistungen, die Jungunternehmern und Existenzgründern aus der Agrar- und Ernährungswirtschaft, Biotechnologie, Biochemie oder ähnlichen Bereichen entspringen. Alle Teilnehmer erhalten ein umfassendes Feedback und die Chance auf Geld- und Sachpreise in Höhe von 7.000,- EUR.
 
Die drei besten Ideen werden bei der Weiterentwicklung unterstützt. Die Gewinner erhalten Geld- und Sachpreise in Höhe von 4.000,- EUR (1. Platz), 2.000,- EUR (2. Platz) und 1.000,- EUR (3. Platz). Einzureichen sind 6 Seiten mit einer Ideenskizze zum Produkt oder der Dienstleistung. Projekte, die sich noch in der Forschungs- und Entwicklungsphase befinden, können ebenfalls eingereicht werden.
 
Der „Bio-Gründer Wettbewerb“ wird vom Bio-Security Kompetenzzentrum für biologische Sicherheit veranstaltet. Einsendeschluss ist der 30. Juni 2018. Fragen zum Wettbewerb sind möglich an: Fon (02383) 91 90

				http://www.bio-gruender.de/index.php/wettbewerb-2018.html',
'30.06.18 | Einsendeschluss',
'https://www.connecticum.de/karrierefutter/event/bio-gruender-wettbewerb-geschaeftsideen-aus-agrar-ernaehrungswirtschaft-biotechnologie-biochemie-gesucht/');
