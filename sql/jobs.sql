-- Firmen Name
-- Link
-- Job Name
-- Ort
-- Volle Beschreibung
-- Sonstiges

DROP TABLE IF EXISTS jobs;


CREATE TABLE jobs(
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    type VARCHAR(100) DEFAULT "Jobs",
    organizer VARCHAR(300),
    description TEXT NOT NULL,
    place VARCHAR(300),
    event_date VARCHAR(300),
    creation_date VARCHAR(300),
    other TEXT,
    link TEXT NOT NULL,
    ts_event TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



-- INSERT INTO jobs (name, description, place, other, link) VALUES (
-- 'Studenten aufgepasst! Werde Disponent (m/w) bei der Deutschen Telekom  in Ulm',
-- 'Du bist ein Allrounder und hast Freude am erfolgreichen Troubleshooting? Du kommunizierst gerne und das zeitnahe Lösen von Problemen ist für dich eine Herausforderung? Dann suchen wir genau dich zum nächstmöglichen Zeitpunkt für die Deutsche Telekom als Disponent (m/w) in Ulm!',
-- 'Ulm',
-- 'Ulm, Teilzeitjob, Nebenjob/Wochenendjob, Werkstudentenstelle, Minijob',
-- 'LINK HERE');





-- Connecticum Karriere Entries


INSERT INTO jobs (name, description, event_date, other, link) VALUES (
'BASF Automation Days für Studierende der Ingenieurwissenschaften, 14.-16. November 2018, Ludwigshafen',
'Bei den Automation Days lädt der Chemiekonzern BASF Ingenieurstudenten ein, Einblicke in die Automatisierungstechnik der chemischen Prozessindustrie zu erhalten: Wie sieht das Arbeitsumfeld eines Automatisierungsingenieurs aus, wie der Produktionsbetrieb und wie sind die Einstiegs- und die Weiterbildungsmöglichkeiten?
 
Auf dem Programm stehen Fachvorträge, Gespräche mit Mitarbeitern und Führungskräften aus dem Fachzentrum für Automatisierungstechnik und anderen BASF-Bereichen, die Besichtigung eines Produktionsbetriebe sowie eine Werksrundfahrt durch das größte zusammenhängende Chemieareal der Welt. Eingeladen sind Studierende der Automatisierungstechnik und IT-affine Ingenieursstudenten oder Naturwissenschaftler aus höheren Semestern sowie Doktoranden.
 
Wer sich für die Einstiegsmöglichkeiten bei BASF interessiert, kann sich bis zum 10. August 2018 für die “BASF Automation Days” bewerben. Diese finden vom 14.-16. November 2018 in Ludwigshafen statt. Die Kosten für Anreise, Übernachtung und Verpflegung werden von BASF übernommen. Zur Bewerbung sollten der CV, ein kurzes Motivationsschreiben und eine Notenübersicht per E-Mail gesendet werden an: automation-days@basf.com

				http://on.basf.com/AutomationDays',
'10.08.18 | Bewerbungsschluss',
'https://www.connecticum.de/karrierefutter/event/basf-automation-days-2018/',
'http://on.basf.com/AutomationDays');

INSERT INTO jobs (name, description, event_date, other, link) VALUES (
'Reiseberichte-Stipendium von Enchanting Travels für Studenten – Preisgeld, Praktikum und Abschlussarbeit zu gewinnen',
'Der Spezialreiseveranstalter Enchanting Travels ruft Studenten der Bereiche Tourismus, Journalismus, Germanistik o. ä. dazu auf, selbst verfasste Reiseberichte einzureichen, die die Freude am Reisen und die Begeisterung der Entdeckung und Begegnung neuer Orte und Menschen widerspiegeln. Zu gewinnen gibt es drei Preisgelder in Höhe von 1.000, 200 und 100,- EUR sowie die Möglichkeit, in Form eines Praktikums oder einer Abschlussarbeit hinter die Kulissen von Enchanting Travels zu blicken.
 
Um an der Bewerbung für das „Enchanting Travels Reiseberichte-Stipendium” teilzunehmen, sollten Bewerber ihren selbst verfassten Reisebericht mit maximal 1.000 Wörtern und drei Fotos einsenden. Aus allen Bewerbungen wird eine Shortlist von zehn Kandidaten bestimmt, deren Reiseberichte auf der Homepage und Facebookseite von Enchanting Travels im Juni 2018 veröffentlicht werden. In einer öffentlichen Online-Abstimmung vom 1.-31. Juli 2018 werden hieraus die Gewinner durch die meisten „Likes“ ermittelt. Die Bewerbung ist bis zum 31. Mai 2018 in Form einer PDF-Datei zu senden an: stipendium@enchantingtravels.de; Fragen sind an dieselbe E-Mail-Adresse möglich.

				https://www.enchantingtravels.de/ueber-uns/karriere/reiseberichte-stipendium-2018/',
'31.05.18 | Einsendeschluss',
'https://www.connecticum.de/karrierefutter/event/reiseberichte-stipendium-enchanting-travels-fuer-studenten-preisgeld-praktikum-abschlussarbeit-zu-gewinnen/',
'https://www.enchantingtravels.de/ueber-uns/karriere/reiseberichte-stipendium-2018/');

INSERT INTO jobs (name, description, event_date, other, link) VALUES (
'IT-Meetup@comdirect, 17. Januar 2019 in Rostock',
'IT-Begeisterte aufgepasst: Die comdirect-Bank lädt interessierte Studenten und Absolventen nach Rostock zu einem IT-Meetup ein, um das Unternehmen und die Einstiegsmöglichkeiten kennenzulernen.
 
Für eine Direktbank ist der IT-Bereich ist das Herzstück. Bei comdirect wird die Plattform inhouse mit OpenSource entwickelt, agil und in bereichsübergreifenden Projekten. Der Tech Stack umfasst: Java, Oracle DB (PL/SQL), JPA (Hibernate), Spring, SWIFT (iOS)/Java (Android), Node.js/Angular.js, AI/Machine Learning.
 
Auf dem Programm des IT-Meetup stehen die Themen: Arbeiten@comdirect, Fachsimpeln über die genutzten Technologien, ein Blick in die Werkstatt und zum Abschluss ein Get-together mit Fingerfood und Kaltgetränken.
 
Das Meetup findet am Donnerstag, den 17.01.2019 von 11 Uhr bis 15 Uhr am IT-Standort von comdirect in der Grubenstraße 44-47, 18055 Rostock im 3.OG statt. Anmeldungen bitte per per E-Mail bis zum 07. Januar an Sina Gunkel (sina.gunkel@comdirect.de).

				http://www.comdirect.de/it-meetup',
'07.01.19 | Anmeldeschluss',
'https://www.connecticum.de/karrierefutter/event/meetupcomdirect-17-januar-2019-rostock/',
'http://www.comdirect.de/it-meetup');

INSERT INTO jobs (name, description, event_date, other, link) VALUES (
'Job Night Berlin bei Sopra Steria Consulting',
'Was macht eigentlich eine Management- und Technologieberatung? Und wie sieht deren Arbeit aus? Das können interessierte Studenten und Absolventen auf der Job Night Berlin bei Sopra Steria Consulting erfahren.
 
In Kurzvorträgen in lockerer Atmosphäre lernen die Teilnehmer verschiedene Tätigkeitsbereiche, das Unternehmen und die Einstiegsmöglichkeiten kennen. Dabei stehen insbesondere folgende Themen Themen stehen auf dem Programm: Prozess- und Organisationsberatung im Banking, B2B-Portale und ihre Herausforderungen sowie Transformationspartner der Digitalisierung.
 
Die Job Night Berlin bei Sopra Steria Consulting findet am 6. Dezember 2018 in der Geschäftsstelle Berlin (Friedrichstraße 148, 10117 Berlin) statt. Start ist um 17:30 Uhr. Anmeldungen werden erbeten mit Kurzlebenslauf oder Xing-Profil an Anna Lena Blank (annalena.blank@soprasteria.com).

				https://www.soprasteria.de/karriere/absolventen/job-night',
'06.12.18 - 17:30 Uhr | Berlin',
'https://www.connecticum.de/karrierefutter/event/job-night-berlin-bei-sopra-steria-consulting/',
'https://www.soprasteria.de/karriere/absolventen/job-night');

INSERT INTO jobs (name, description, event_date, other, link) VALUES (
'Deloitte Business Intelligence Consulting Workshop für examensnahe Studenten und Doktoranden der WiWi, NaWi und Technik, 28.-29. Juni 2018, Hannover',
'Der Workshop bietet einen umfassenden Einblick in die Welt des Consultings, in die Praxis und die Einstiegsmöglichkeiten bei BCG – The Boston Consulting Group. Die Teilnehmer bearbeiten eine Business-Intelligence-Fallstudie und können im Rahmen eines anschließenden Abendevents erste Kontakte mit dem BCG-Team knüpfen.
 
BCG sucht Studenten, die sich kurz vor Abschluss ihres wirtschaftswissenschaftlichen, naturwissenschaftlichen oder technischen Bachelor-, Master- oder Promotionsstudiengangs befinden. Interessierte können sich bis 10. Juni 2018 mit ihrem Lebenslauf und einem kurzen Motivationsschreiben unter career.consulting@deloitte.de (Betreff: Shape the Future) bewerben.
 
Der ""Deloitte Business Intelligence Consulting Workshop"" findet vom 28.-29. Juni 2018 in Hannover statt. Die Kosten für An- und Abreise sowie Übernachtung werden übernommen. Kontakt für Fragen: Hannah Lahrssen, career.consulting@deloitte.de

				https://www2.deloitte.com/de/de/pages/careers/articles/business-intelligence-workshop.html',
'10.06.18 | Bewerbungsschluss',
'https://www.connecticum.de/karrierefutter/event/deloitte-business-intelligence-consulting-workshop-fuer-studenten-doktoranden-hannover/',
'https://www2.deloitte.com/de/de/pages/careers/articles/business-intelligence-workshop.html');

INSERT INTO jobs (name, description, event_date, other, link) VALUES (
'Strategie-Event zum Thema Disruptive Innovation: BCG Strategy School für alle Fachbereiche, 06.-08. September 2018 in München',
'The Boston Consulting Group lädt zu einem dreitägigen Event ein, bei dem Studierende aller Fachbereich in Vorträgen und Workshops die Arbeit bei der Strategieberatung kennenlernen können.
 
Am ersten Tag  lernen die Teilnehmer bei einem Speeddating Kollegen kennen, die in verschiedenen Branchen für die BCG tätig sind. Danach finden Masterclasses statt, in denen man eine von drei digitalen Technologien selbst ausprobieren kann (Artifical Intelligence, Internet of Things, Blockchain). Am zweiten Tag ist es das Ziel, bei der Bearbeitung von Fallstudien entweder einen Business-Case für den Eintritt eines Plastik- und Polymerherstellers in den 3-D-Printing-Markt zu entwickeln oder ein Raumfahrtunternehmen dabei zu unterstützen, flächendeckenden Internetservice in Entwicklungs- und Schwellenländer zu bringen. Die Ergebnisse werden einer Expertenjury vorgestellt.
 
Teilnehmen können herausragende Universitätsstudenten (Bachelors ab 4. Semester, Diplom- und Magisterstudierende im Hauptstudium, Masterstudierende), Doktoranden und Professionals aller Fachbereiche mit maximal vier Jahren Berufserfahrung (idealerweise wirtschaftsrelevanter Bezug). Für die Bewerbung sollten ein tabellarischer Lebenslauf, alle Zeugnisse (inkl. Abiturzeugnis) und die Beantwortung eines kurzen Fragebogens bis zum 3. August 2018 online eingereicht werden.
 
Die “BCG Strategy School zum Thema Disruptive Innovation ” findet vom 06.-08. September 2018 in München statt. Die Teilnehmer werden automatisch in das EMERALDS-Programm, einem Karriereprogramm für Strategietalente, aufgenommen, das u. a. vielfältige Trainings für Hard und Soft Skills, Networking-Events und Einladungen zu ersten Gesprächsrunden und Briefings zur Interviewvorbereitung umfasst.
 
Die Kosten für die Teilnahme am Event, An- und Abreise sowie Übernachtungskosten, übernimmt BCG. Fragen zur Veranstaltung sind möglich an: Patricia Wörner, Fon (089) 23 17 53 69

				http://strategyschool.bcg.de',
'03.08.18 | München',
'https://www.connecticum.de/karrierefutter/event/strategie-event-zum-thema-disruptive-innovation-bcg-strategy-school-fuer-alle-fachbereiche-06-08-september-2018-muenchen/',
'http://strategyschool.bcg.de');

INSERT INTO jobs (name, description, event_date, other, link) VALUES (
'Deloitte-Recruitingevent auf Mallorca: Ab in den Süden, 19.-21.10.2018',
'Deloitte lädt Masterstudierende nach Mallorca ein: Beim Recruiting-Event ""Ab in den Süden"" lösen die Teilnehmer Case Studies, können bei Teamevents erste Kontakte knüpfen und die Berater von Deloitte persönlich kennen lernen.
 
Die Case Studies finden zu Controlling- und Accounting-Themen statt. Sie vermitteln einen Einblick in die Beraterpraxis und insbesondere den Bereich Finance Consulting bei Deloitte, der Finanzvorstände internationaler Industrieunternehmen berät. Die Veranstaltung wird mit einem Überraschungsevent am ersten Abend, Teamevents und spanischen Delikatessen unter der Sonne Mallorcas abgerundet.
 
Eingeladen sind Studierende eines Masterstudiengangs idealerweise mit Schwerpunkt Controlling oder Accounting, die über ein hohes analytisches Denkvermögen verfügen und fließend Deutsch und Englisch sprechen. Das ""Deloitte-Recruitingevent auf Mallorca"" findet vom 19.-21. Oktober 2018 statt. Bewerbungsschluss ist der 23. September 2018. Bewerbungen sollen online eingereicht werden. Kontakt für Fragen: Sabine Uhlenbrock, Fon (0211) 87 72 41 11, sueden@deloitte.de

				www.deloitte.com/de/abindensueden',
'23.09.18 | Bewerbungsschluss',
'https://www.connecticum.de/karrierefutter/event/deloitte-recruitingevent-auf-mallorca-ab-den-sueden-19-21-10-2018/',
'www.deloitte.com/de/abindensueden');

INSERT INTO jobs (name, description, event_date, other, link) VALUES (
'Curacon Camp – Recruiting Event für Wirtschaftsprüfung, Unternehmens- und Steuerberatung, examensnahe Studenten gesucht: 28.-31. August 2018 in Hamburg',
'Die Curacon GmbH Wirtschaftsprüfungsgesellschaft nimmt für vier Tage eine Gruppe von 15 bis 20 Studierenden mit in die Hansestadt, um mit ihnen an Fallstudien echter Mandate zu arbeiten. Ein abwechslungsreiches – manchmal auch sportliches und kulinarisch spektakuläres – Programm umrahmt das Event und bietet ausreichend Gelegenheit, um mit Curacon-Moderatoren aus der Geschäftsführung, Niederlassungs- und Personalleitung ins Gespräch zu kommen.
 
Bei der gemeinsamen Fallstudienarbeit haben die Teilnehmer direkten Kontakt zu Curacon-Mandaten und erhalten Feedback auf ihre Arbeit. Schon einige „Curacon Camper” haben im Anschluss ihren Weg zu Curacon als Werkstudenten, Praktikanten oder als Berufseinsteiger gefunden. Bewerber sollten sich für betriebswirtschaftliche Fragestellungen aus dem Gesundheits- und Sozialbereich sowie dem öffentlichen Sektor interessieren und sich idealerweise im letzten Jahr ihres Master- oder Bachelorstudiums befinden.
 
Bewerbungen für das ""Curacon Camp – Recruiting Event"" sind bis 15. Juni 2018 möglich. Dazu sollte der Lebenslauf und ein aktueller Notenauszug zusammen mit einem kurzen Anschreiben per E-Mail gesendet werden an: curaconcamp@curacon.de; Die Kosten für An- und Abreise, Unterkunft und Verpflegung sowie für das Rahmenprogramm werden übernommen.
 
Fragen zum Curacon Recruiting Event sind möglich an: Susanne Menges, Personalreferentin, Fon (0251) 92 20 82 49, karriere@curacon.de

				https://www.curacon.de/wissensspeicher/karriere/studierende/curacon-camp/',
'15.06.18 | Bewerbungsschluss',
'https://www.connecticum.de/karrierefutter/event/curacon-camp-recruiting-event-fuer-wirtschaftspruefung-unternehmens-und-steuerberatung-fuer-studenten-hamburg/',
'https://www.curacon.de/wissensspeicher/karriere/studierende/curacon-camp/');

INSERT INTO jobs (name, description, event_date, other, link) VALUES (
'adesso University Circle: Studenten entwickeln eigenes HoloLens-Projekt, 15.-16. Juni 2018, Hamburg',
'Im Rahmen des Mixed-Reality-Workshops nähern sich besonders engagierte Studenten gemeinsam mit adesso den IT-Themen der Zukunft auf ganz praktische Weise: Sie tauchen in die Welt der Microsoft HoloLens ein und entwickeln und implementieren in kleinen Gruppen ein eigenes Mixed Reality Projekt. Keynotespeaker vermitteln an spannenden Beispielen aus der Praxis die Grundlagen und führen in die Programmierung der HoloLens ein. Nach zwei intensiven Tagen haben die Teilnehmer einen guten Überblick über die Zukunftstechnologie gewonnen und sind in der Lage, die Microsoft HoloLens zu programmieren.
 
Der Studentenworkshop ""adesso University Circle"" findet vom 15.-16. Juni 2018 in Hamburg (im Hyperion Hotel) statt. Die Kosten für die Anfahrt, Übernachtung und Verpflegung werden übernommen. Interessierte Studenten sollten sich bis zum 5. Juni 2018 mit ihrem aktuellen Lebenslauf und aktueller Notenübersicht per E-Mail bewerben an: university-circle@adesso.de

				www.adesso.de/UniversityCircle',
'05.06.18 | Bewerbungsschluss',
'https://www.connecticum.de/karrierefutter/event/adesso-university-circle-studenten-entwickeln-eigenes-hololens-projekt-hamburg/',
'www.adesso.de/UniversityCircle');

INSERT INTO jobs (name, description, event_date, other, link) VALUES (
'DiscoverIT – Karriereevent der KVWL für Studenten, Absolventen und Professionals, 28. Juni 2018, Dortmund',
'IT-Karriere in der Zukunftsbranche Healthcare? Die Kassenärztliche Vereinigung Westfalen-Lippe (KVWL) stellt sich als Arbeitgeber und die Möglichkeiten für den Nachwuchs aus dem technisch-mathematischen und Informatik-Bereich vor. Die Teilnehmer erfahren, was die IT-Experten bei KVWL antreibt, wie sich die tägliche Arbeit in crossfunktionalen Teams gestaltet und welche Herausforderungen die Digitalisierung des Medizinsektors mit sich bringt.
 
Die Entdeckungstour startet mit einem Get-together und einer Unternehmenspräsentation, gefolgt von einem Rundgang durch den Geschäftsbereich IT, wo das Arbeiten an der Schnittstelle zwischen IT und Healthcare, die Arbeitsschwerpunkte und innovativen Projekte vorgestellt werden. Beim anschließenden Tech-Talk können sich die Teilnehmer mit den Mitarbeitern aus diesem Bereich austauschen oder beim Speed Dating mit Personal- und IT-Vertretern ihre persönlichen Einstiegsmöglichkeiten ausloten.
 
Mit mehr als 100 Mitarbeitern ist die IT einer der Kernbereiche der KVWL. Der Ärzteschaft in Westfalen-Lippe und den internen Fachbereichen bietet die KVWL ein Full-Service-Paket mit Beratungs- und Unterstützungsleistungen, maßgeschneiderte Softwareentwicklung, den Betrieb von Systemen und die Einführung und Anpassung von Standardsystemen. Darüber hinaus beteiligt sich das Unternehmen an digitalen EU-geförderten Innovationsprojekten, z. B. IT-unterstütztem Arzneimitteltherapiemanagement und Pilotprojekten zur elektronischen Arztvisite.
 
Das IT-Karriereevent der KVWL ""DiscoverIT"" richtet sich an Studierende, Absolventen und Professionals mit technisch-mathematischen Schwerpunkten sowie aus der Fachrichtung Informatik und ähnlichem. Es findet am 28. Juni 2018 von 13-17.30 Uhr im Forum der KVWL, Robert-Schimrigk-Str. 4-6, in Dortmund statt. Eine Anmeldung ist per E-Mail möglich an: discover-it@kvwl.de

				http://karriere-kvwl.de/neuigkeiten/discoverit/',
'20.06.18 | Anmeldeschluss',
'https://www.connecticum.de/karrierefutter/event/discoverit-karriereevent-kvwl-fuer-studenten-absolventen-professionals-dortmund/',
'http://karriere-kvwl.de/neuigkeiten/discoverit/');
