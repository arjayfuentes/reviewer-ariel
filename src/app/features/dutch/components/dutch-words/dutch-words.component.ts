import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface DutchWord {
  english: string;
  dutch: string;
  sentence: string;
  category: string;
}

interface Category {
  name: string;
  icon: string;
  color: string;
  colorBg: string; // ← add this
  expanded: boolean;
  words: DutchWord[];
}

@Component({
  selector: 'app-dutch-words',
  imports: [CommonModule, FormsModule],
  templateUrl: './dutch-words.component.html',
  styleUrl: './dutch-words.component.css',
})
export class DutchWordsComponent {
  categories: Category[] = [
    {
      name: 'Meetings & Communication',
      icon: '🗣️',
      color: '#60a5fa',
      colorBg: 'rgba(96,165,250,0.1)',
      expanded: true,
      words: [
        {
          english: 'Meeting',
          dutch: 'Vergadering / Meeting',
          sentence: 'We hebben om 10 uur een vergadering.',
          category: 'Meetings',
        },
        {
          english: 'Agenda',
          dutch: 'Agenda',
          sentence: 'Kun jij de agenda voor de meeting sturen?',
          category: 'Meetings',
        },
        {
          english: 'Minutes / Notes',
          dutch: 'Notulen',
          sentence: 'Wie schrijft de notulen van vandaag?',
          category: 'Meetings',
        },
        {
          english: 'Standup',
          dutch: 'Standup / Dagelijkse standup',
          sentence: 'De standup begint om 9 uur.',
          category: 'Meetings',
        },
        {
          english: 'Presentation',
          dutch: 'Presentatie',
          sentence: 'Ik geef morgen een presentatie over de nieuwe feature.',
          category: 'Meetings',
        },
        {
          english: 'Question',
          dutch: 'Vraag',
          sentence: 'Ik heb een vraag over de requirements.',
          category: 'Meetings',
        },
        {
          english: 'Answer',
          dutch: 'Antwoord',
          sentence: 'Wat is het antwoord op mijn vraag?',
          category: 'Meetings',
        },
        {
          english: 'Explanation',
          dutch: 'Uitleg',
          sentence: 'Kun je me een uitleg geven over dit proces?',
          category: 'Meetings',
        },
        {
          english: 'Summary',
          dutch: 'Samenvatting',
          sentence: 'Kun je een samenvatting geven van de sprint?',
          category: 'Meetings',
        },
        {
          english: 'Feedback',
          dutch: 'Feedback',
          sentence: 'Ik heb feedback gekregen op mijn code.',
          category: 'Meetings',
        },
        {
          english: 'Decision',
          dutch: 'Beslissing',
          sentence: 'We moeten een beslissing nemen over de architectuur.',
          category: 'Meetings',
        },
        {
          english: 'Agreement',
          dutch: 'Afspraak',
          sentence: 'We hebben een afspraak gemaakt over de deadline.',
          category: 'Meetings',
        },
        {
          english: 'Proposal',
          dutch: 'Voorstel',
          sentence: 'Ik heb een voorstel voor de nieuwe aanpak.',
          category: 'Meetings',
        },
        {
          english: 'Clarification',
          dutch: 'Verduidelijking',
          sentence: 'Ik heb verduidelijking nodig over de acceptatiecriteria.',
          category: 'Meetings',
        },
        {
          english: 'Update',
          dutch: 'Update / Bijwerken',
          sentence: 'Kun je me een update geven over de status?',
          category: 'Meetings',
        },
      ],
    },
    {
      name: 'Agile & Scrum',
      icon: '🏉',
      color: '#c084fc',
      colorBg: 'rgba(192,132,252,0.1)',
      expanded: true,
      words: [
        {
          english: 'Sprint',
          dutch: 'Sprint',
          sentence: 'We starten een nieuwe sprint volgende week.',
          category: 'Agile',
        },
        {
          english: 'Backlog',
          dutch: 'Backlog',
          sentence: 'Er staan veel taken in de backlog.',
          category: 'Agile',
        },
        {
          english: 'User Story',
          dutch: 'Gebruikersverhaal / User story',
          sentence: 'Deze user story is te groot voor één sprint.',
          category: 'Agile',
        },
        {
          english: 'Ticket / Task',
          dutch: 'Ticket / Taak',
          sentence: 'Welk ticket pak jij op vandaag?',
          category: 'Agile',
        },
        {
          english: 'Sprint Planning',
          dutch: 'Sprintplanning',
          sentence: 'De sprintplanning duurt twee uur.',
          category: 'Agile',
        },
        {
          english: 'Retrospective',
          dutch: 'Retrospectief',
          sentence: 'Wat ging er goed tijdens het retrospectief?',
          category: 'Agile',
        },
        {
          english: 'Sprint Review / Demo',
          dutch: 'Sprintreview / Demo',
          sentence: 'We laten de nieuwe functie zien tijdens de demo.',
          category: 'Agile',
        },
        {
          english: 'Refinement / Grooming',
          dutch: 'Refinement / Verfijning',
          sentence: 'We bespreken de tickets tijdens de refinement.',
          category: 'Agile',
        },
        {
          english: 'Velocity',
          dutch: 'Snelheid / Velocity',
          sentence: 'Onze velocity is gestegen deze sprint.',
          category: 'Agile',
        },
        {
          english: 'Story Points',
          dutch: 'Storypunten',
          sentence: 'Hoeveel storypunten geef jij aan deze taak?',
          category: 'Agile',
        },
        {
          english: 'Definition of Done',
          dutch: 'Definitie van Klaar',
          sentence: 'Voldoet dit ticket aan de definitie van klaar?',
          category: 'Agile',
        },
        {
          english: 'Blocker / Impediment',
          dutch: 'Blokkade / Belemmering',
          sentence: 'Ik heb een blokkade — ik kan niet verder zonder toegang.',
          category: 'Agile',
        },
        {
          english: 'Priority',
          dutch: 'Prioriteit',
          sentence: 'Wat is de prioriteit van dit ticket?',
          category: 'Agile',
        },
        {
          english: 'Estimate',
          dutch: 'Schatting',
          sentence: 'Wat is jouw schatting voor deze taak?',
          category: 'Agile',
        },
        {
          english: 'Acceptance Criteria',
          dutch: 'Acceptatiecriteria',
          sentence: 'Zijn de acceptatiecriteria duidelijk?',
          category: 'Agile',
        },
        {
          english: 'In Progress',
          dutch: 'In uitvoering / Bezig',
          sentence: 'Dit ticket is in uitvoering.',
          category: 'Agile',
        },
        {
          english: 'Done',
          dutch: 'Klaar / Afgerond',
          sentence: 'Is het ticket al klaar?',
          category: 'Agile',
        },
        {
          english: 'To Do',
          dutch: 'Te doen',
          sentence: 'Dit staat nog op de lijst van te doen taken.',
          category: 'Agile',
        },
      ],
    },
    {
      name: 'Development Terms',
      icon: '💻',
      color: '#4ade80',
      colorBg: 'rgba(74,222,128,0.1)',
      expanded: true,
      words: [
        {
          english: 'Feature',
          dutch: 'Functionaliteit / Feature',
          sentence: 'We bouwen een nieuwe functionaliteit voor de gebruiker.',
          category: 'Dev',
        },
        {
          english: 'Bug / Defect',
          dutch: 'Bug / Fout',
          sentence: 'Er is een fout gevonden in de productieomgeving.',
          category: 'Dev',
        },
        {
          english: 'Fix',
          dutch: 'Oplossing / Repareren',
          sentence: 'Ik ga de bug vandaag oplossen.',
          category: 'Dev',
        },
        {
          english: 'Deploy / Release',
          dutch: 'Uitrollen / Releasen',
          sentence: 'We rollen de nieuwe versie uit naar productie.',
          category: 'Dev',
        },
        {
          english: 'Build',
          dutch: 'Bouwen / Build',
          sentence: 'De build is mislukt — er is een fout in de pipeline.',
          category: 'Dev',
        },
        {
          english: 'Test',
          dutch: 'Testen',
          sentence: 'Heb je de nieuwe functie al getest?',
          category: 'Dev',
        },
        {
          english: 'Pull Request / PR',
          dutch: 'Pull Request / PR',
          sentence: 'Mijn PR staat klaar voor review.',
          category: 'Dev',
        },
        {
          english: 'Code Review',
          dutch: 'Code review',
          sentence: 'Kun jij mijn code review doen?',
          category: 'Dev',
        },
        {
          english: 'Branch',
          dutch: 'Branch / Tak',
          sentence: 'Ik heb een nieuwe branch aangemaakt voor deze feature.',
          category: 'Dev',
        },
        {
          english: 'Merge',
          dutch: 'Samenvoegen / Mergen',
          sentence: 'We kunnen de branch samenvoegen na de review.',
          category: 'Dev',
        },
        {
          english: 'Commit',
          dutch: 'Commit / Vastleggen',
          sentence: 'Vergeet niet je wijzigingen te committen.',
          category: 'Dev',
        },
        {
          english: 'Repository',
          dutch: 'Repository / Opslagplaats',
          sentence: 'De code staat in onze repository.',
          category: 'Dev',
        },
        {
          english: 'Environment',
          dutch: 'Omgeving',
          sentence: 'Werkt het in de testomgeving?',
          category: 'Dev',
        },
        {
          english: 'Production',
          dutch: 'Productie',
          sentence: 'We mogen geen fouten hebben in productie.',
          category: 'Dev',
        },
        {
          english: 'Staging',
          dutch: 'Staging / Testomgeving',
          sentence: 'Test het eerst in de stagingomgeving.',
          category: 'Dev',
        },
        {
          english: 'Database',
          dutch: 'Database / Databank',
          sentence: 'De gegevens worden opgeslagen in de database.',
          category: 'Dev',
        },
        {
          english: 'API',
          dutch: 'API',
          sentence: 'De frontend communiceert via de API met de backend.',
          category: 'Dev',
        },
        {
          english: 'Endpoint',
          dutch: 'Eindpunt / Endpoint',
          sentence: 'Welk endpoint gebruik je voor de gebruikersdata?',
          category: 'Dev',
        },
        {
          english: 'Frontend',
          dutch: 'Frontend',
          sentence: 'Ik werk aan de frontend in Angular.',
          category: 'Dev',
        },
        {
          english: 'Backend',
          dutch: 'Backend',
          sentence: 'De businesslogica zit in de backend.',
          category: 'Dev',
        },
        {
          english: 'Integration',
          dutch: 'Integratie',
          sentence: 'We moeten de integratie met het externe systeem testen.',
          category: 'Dev',
        },
        {
          english: 'Performance',
          dutch: 'Prestaties',
          sentence: 'De prestaties van de applicatie zijn verbeterd.',
          category: 'Dev',
        },
        {
          english: 'Refactor',
          dutch: 'Refactoren / Herstructureren',
          sentence: 'We moeten deze code refactoren — het is moeilijk leesbaar.',
          category: 'Dev',
        },
        {
          english: 'Documentation',
          dutch: 'Documentatie',
          sentence: 'De documentatie is nog niet bijgewerkt.',
          category: 'Dev',
        },
      ],
    },
    {
      name: 'Common Verbs at Work',
      icon: '🔤',
      color: '#fb923c',
      colorBg: 'rgba(251,146,60,0.1)',
      expanded: true,
      words: [
        {
          english: 'To work on',
          dutch: 'Werken aan',
          sentence: 'Ik werk aan de loginpagina.',
          category: 'Verbs',
        },
        {
          english: 'To finish / complete',
          dutch: 'Afronden / Voltooien',
          sentence: 'Ik moet dit ticket vandaag afronden.',
          category: 'Verbs',
        },
        {
          english: 'To review',
          dutch: 'Beoordelen / Reviewen',
          sentence: 'Kun jij mijn code beoordelen?',
          category: 'Verbs',
        },
        {
          english: 'To implement',
          dutch: 'Implementeren',
          sentence: 'Ik ga de nieuwe functie implementeren.',
          category: 'Verbs',
        },
        {
          english: 'To fix / solve',
          dutch: 'Oplossen',
          sentence: 'Ik probeer dit probleem op te lossen.',
          category: 'Verbs',
        },
        {
          english: 'To check',
          dutch: 'Controleren / Nakijken',
          sentence: 'Kun je dit even controleren?',
          category: 'Verbs',
        },
        {
          english: 'To discuss',
          dutch: 'Bespreken',
          sentence: 'We moeten dit bespreken in de vergadering.',
          category: 'Verbs',
        },
        {
          english: 'To plan',
          dutch: 'Plannen',
          sentence: 'We plannen de nieuwe sprint morgen.',
          category: 'Verbs',
        },
        {
          english: 'To estimate',
          dutch: 'Inschatten / Schatten',
          sentence: 'Hoe schat jij de tijd in voor dit ticket?',
          category: 'Verbs',
        },
        {
          english: 'To deploy',
          dutch: 'Uitrollen / Deployen',
          sentence: 'We rollen de applicatie uit naar productie.',
          category: 'Verbs',
        },
        {
          english: 'To test',
          dutch: 'Testen',
          sentence: 'Heb je de functie al getest?',
          category: 'Verbs',
        },
        {
          english: 'To update',
          dutch: 'Bijwerken / Updaten',
          sentence: 'Kun je de documentatie bijwerken?',
          category: 'Verbs',
        },
        {
          english: 'To help',
          dutch: 'Helpen',
          sentence: 'Kun je me helpen met dit probleem?',
          category: 'Verbs',
        },
        {
          english: 'To explain',
          dutch: 'Uitleggen',
          sentence: 'Kun je uitleggen hoe dit werkt?',
          category: 'Verbs',
        },
        {
          english: 'To understand',
          dutch: 'Begrijpen',
          sentence: 'Ik begrijp de vereisten niet helemaal.',
          category: 'Verbs',
        },
        {
          english: 'To ask',
          dutch: 'Vragen',
          sentence: 'Ik wil iets vragen over de architectuur.',
          category: 'Verbs',
        },
        {
          english: 'To confirm',
          dutch: 'Bevestigen',
          sentence: 'Kun je bevestigen dat dit correct is?',
          category: 'Verbs',
        },
        {
          english: 'To change',
          dutch: 'Wijzigen / Aanpassen',
          sentence: 'We moeten de aanpak wijzigen.',
          category: 'Verbs',
        },
        {
          english: 'To wait for',
          dutch: 'Wachten op',
          sentence: 'Ik wacht op de goedkeuring van de PR.',
          category: 'Verbs',
        },
        {
          english: 'To start',
          dutch: 'Beginnen / Starten',
          sentence: 'Ik begin vandaag aan het nieuwe ticket.',
          category: 'Verbs',
        },
        {
          english: 'To deliver',
          dutch: 'Opleveren',
          sentence: 'We moeten dit aan het einde van de sprint opleveren.',
          category: 'Verbs',
        },
        {
          english: 'To investigate',
          dutch: 'Onderzoeken',
          sentence: 'Ik ga de bug onderzoeken.',
          category: 'Verbs',
        },
        {
          english: 'To merge',
          dutch: 'Samenvoegen / Mergen',
          sentence: 'Ik ga de branch samenvoegen.',
          category: 'Verbs',
        },
      ],
    },
    {
      name: 'Phrases for Meetings',
      icon: '💬',
      color: '#2dd4bf',
      colorBg: 'rgba(45,212,191,0.1)',
      expanded: true,
      words: [
        {
          english: "I don't understand",
          dutch: 'Ik begrijp het niet',
          sentence: 'Sorry, ik begrijp het niet helemaal — kun je het herhalen?',
          category: 'Phrases',
        },
        {
          english: 'Can you repeat that?',
          dutch: 'Kun je dat herhalen?',
          sentence: 'Sorry, kun je dat herhalen? Ik verstond je niet goed.',
          category: 'Phrases',
        },
        {
          english: 'Can you speak slower?',
          dutch: 'Kun je langzamer praten?',
          sentence: 'Kun je iets langzamer praten? Mijn Nederlands is nog niet perfect.',
          category: 'Phrases',
        },
        {
          english: 'What does that mean?',
          dutch: 'Wat betekent dat?',
          sentence: 'Wat betekent dat precies in deze context?',
          category: 'Phrases',
        },
        {
          english: 'I have a question',
          dutch: 'Ik heb een vraag',
          sentence: 'Ik heb een vraag over de laatste user story.',
          category: 'Phrases',
        },
        {
          english: 'I agree',
          dutch: 'Ik ben het eens / Akkoord',
          sentence: 'Ik ben het eens met jouw voorstel.',
          category: 'Phrases',
        },
        {
          english: 'I disagree',
          dutch: 'Ik ben het er niet mee eens',
          sentence: 'Ik ben het er niet mee eens — ik denk dat er een betere aanpak is.',
          category: 'Phrases',
        },
        {
          english: "That's a good idea",
          dutch: 'Dat is een goed idee',
          sentence: 'Dat is een goed idee — laten we dat proberen.',
          category: 'Phrases',
        },
        {
          english: "I'm working on it",
          dutch: 'Ik ben er mee bezig',
          sentence: 'Ik ben er mee bezig — het is bijna klaar.',
          category: 'Phrases',
        },
        {
          english: "I'm blocked / stuck",
          dutch: 'Ik zit vast / Ik heb een blokkade',
          sentence: 'Ik zit vast — ik heb hulp nodig met de database configuratie.',
          category: 'Phrases',
        },
        {
          english: "It's almost done",
          dutch: 'Het is bijna klaar',
          sentence: 'Het is bijna klaar — nog een paar uur.',
          category: 'Phrases',
        },
        {
          english: "It's finished / done",
          dutch: 'Het is klaar / Afgerond',
          sentence: 'Het ticket is afgerond en klaar voor review.',
          category: 'Phrases',
        },
        {
          english: "I'll look into it",
          dutch: 'Ik ga het bekijken / onderzoeken',
          sentence: 'Ik ga het bekijken en kom er op terug.',
          category: 'Phrases',
        },
        {
          english: 'Can you help me?',
          dutch: 'Kun je me helpen?',
          sentence: 'Kun je me helpen met dit probleem?',
          category: 'Phrases',
        },
        {
          english: 'Let me check',
          dutch: 'Laat me even kijken',
          sentence: 'Laat me even kijken — ik kom zo bij je terug.',
          category: 'Phrases',
        },
        {
          english: "I'll get back to you",
          dutch: 'Ik kom er op terug',
          sentence: 'Ik kom er op terug zodra ik meer weet.',
          category: 'Phrases',
        },
        {
          english: 'No problem',
          dutch: 'Geen probleem',
          sentence: 'Geen probleem — ik pak het op.',
          category: 'Phrases',
        },
        {
          english: "Sorry, I'm late",
          dutch: 'Sorry, ik ben te laat',
          sentence: 'Sorry dat ik te laat ben voor de standup.',
          category: 'Phrases',
        },
        {
          english: 'Good morning',
          dutch: 'Goedemorgen',
          sentence: 'Goedemorgen iedereen — klaar voor de standup?',
          category: 'Phrases',
        },
        {
          english: 'See you tomorrow',
          dutch: 'Tot morgen',
          sentence: 'Fijne avond iedereen — tot morgen!',
          category: 'Phrases',
        },
        {
          english: 'Have a nice weekend',
          dutch: 'Fijn weekend',
          sentence: 'Fijn weekend allemaal!',
          category: 'Phrases',
        },
        {
          english: 'Well done / Good job',
          dutch: 'Goed gedaan / Goed werk',
          sentence: 'Goed gedaan met de release gisteren!',
          category: 'Phrases',
        },
      ],
    },
    {
      name: 'Office & HR Terms',
      icon: '🏢',
      color: '#f87171',
      colorBg: 'rgba(248,113,113,0.1)',
      expanded: true,
      words: [
        {
          english: 'Colleague',
          dutch: 'Collega',
          sentence: 'Mijn collega helpt me met de onboarding.',
          category: 'Office',
        },
        {
          english: 'Manager / Team lead',
          dutch: 'Manager / Teamleider',
          sentence: 'Mijn teamleider heeft me de taak gegeven.',
          category: 'Office',
        },
        {
          english: 'Team',
          dutch: 'Team',
          sentence: 'Ons team bestaat uit vijf developers.',
          category: 'Office',
        },
        {
          english: 'Department',
          dutch: 'Afdeling',
          sentence: 'Ik werk op de IT-afdeling.',
          category: 'Office',
        },
        {
          english: 'Office',
          dutch: 'Kantoor',
          sentence: 'Ik ga morgen naar kantoor.',
          category: 'Office',
        },
        {
          english: 'Work from home',
          dutch: 'Thuiswerken',
          sentence: 'Ik werk vandaag thuis.',
          category: 'Office',
        },
        {
          english: 'Leave / Day off',
          dutch: 'Verlof / Vrije dag',
          sentence: 'Ik neem vrijdag verlof.',
          category: 'Office',
        },
        {
          english: 'Sick leave',
          dutch: 'Ziekteverlof / Ziek zijn',
          sentence: 'Ik ben ziek vandaag — ik neem ziekteverlof.',
          category: 'Office',
        },
        {
          english: 'Deadline',
          dutch: 'Deadline / Uiterste datum',
          sentence: 'Wat is de deadline voor dit project?',
          category: 'Office',
        },
        {
          english: 'Contract',
          dutch: 'Contract',
          sentence: 'Ik heb mijn contract gisteren getekend.',
          category: 'Office',
        },
        {
          english: 'Salary',
          dutch: 'Salaris / Loon',
          sentence: 'Het salaris wordt aan het einde van de maand betaald.',
          category: 'Office',
        },
        {
          english: 'Onboarding',
          dutch: 'Onboarding / Inwerkperiode',
          sentence: 'De onboarding duurt twee weken.',
          category: 'Office',
        },
        {
          english: 'Training',
          dutch: 'Training / Opleiding',
          sentence: 'Er is een training over de nieuwe tools.',
          category: 'Office',
        },
        {
          english: 'Lunch break',
          dutch: 'Lunchpauze',
          sentence: 'De lunchpauze is van 12 tot 13 uur.',
          category: 'Office',
        },
        {
          english: 'Password / Access',
          dutch: 'Wachtwoord / Toegang',
          sentence: 'Ik heb nog geen toegang tot het systeem.',
          category: 'Office',
        },
      ],
    },
  ];

  searchQuery = '';

  getFiltered(words: DutchWord[]): DutchWord[] {
    if (!this.searchQuery.trim()) return words;
    const q = this.searchQuery.toLowerCase();
    return words.filter(
      (w) =>
        w.english.toLowerCase().includes(q) ||
        w.dutch.toLowerCase().includes(q) ||
        w.sentence.toLowerCase().includes(q)
    );
  }

  get totalWords(): number {
    return this.categories.reduce((sum, c) => sum + c.words.length, 0);
  }

  get filteredTotal(): number {
    return this.categories.reduce((sum, c) => sum + this.getFiltered(c.words).length, 0);
  }

  toggleCategory(cat: any): void {
    cat.expanded = !cat.expanded;
  }
}
