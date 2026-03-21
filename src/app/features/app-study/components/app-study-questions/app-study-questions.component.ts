import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface TechQuestion {
  topic: string;
  english: string;
  dutch: string;
}

@Component({
  selector: 'app-app-study-questions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app-study-questions.component.html',
  styleUrl: './app-study-questions.component.css',
})
export class AppStudyQuestionsComponent {
  questions: TechQuestion[] = [
    {
      topic: 'Documentation',
      english:
        'Is there any documentation on the application I can start with — like an architecture overview, API docs, or a README? And is there a wiki or Confluence page where the team keeps general knowledge about the project?',
      dutch:
        'Is er documentatie waar ik mee kan beginnen, zoals een architectuuroverzicht, API-docs of een README? En is er een wiki of Confluence met algemene projectinformatie?',
    },
    {
      topic: 'Deployment',
      english: 'How does the CI/CD pipeline work, and how often do you deploy?',
      dutch: 'Hoe werkt de CI/CD-pipeline en hoe vaak releasen we?',
    },
    {
      topic: 'Branching',
      english:
        'What does the branching strategy look like — where do I branch from, what should I name my branches, and where do I merge back into?',
      dutch:
        'Wat is de branching-strategie? Waarvandaan moet ik branchen, hoe noem ik ze, en waar merge ik naar terug?',
    },
    {
      topic: 'Definition of Done',
      english:
        'Just to make sure I handle this correctly — what does done look like for a ticket here? Is there a Definition of Done I should follow? How do you guys know when something is truly done? Is there a checklist or process you follow?',
      dutch:
        "Wanneer is een ticket hier precies 'done'? Is er een 'Definition of Done' of een checklist die ik moet volgen?",
    },
    {
      topic: 'Agile Process',
      english: "What's the sprint length here, and which ceremonies does the team do regularly?",
      dutch:
        'Hoe lang duurt een sprint hier en welke meetings (ceremonies) heeft het team regelmatig?',
    },
  ];

  topicIcons: Record<string, string> = {
    Documentation: '📄',
    Deployment: '🚀',
    Branching: '🌿',
    'Definition of Done': '✅',
    'Agile Process': '🔄',
  };

  topicColors: Record<string, string> = {
    Documentation: '#60a5fa',
    Deployment: '#fb923c',
    Branching: '#4ade80',
    'Definition of Done': '#2dd4bf',
    'Agile Process': '#c084fc',
  };

  topicBgs: Record<string, string> = {
    Documentation: 'rgba(96,165,250,0.12)',
    Deployment: 'rgba(251,146,60,0.12)',
    Branching: 'rgba(74,222,128,0.12)',
    'Definition of Done': 'rgba(45,212,191,0.12)',
    'Agile Process': 'rgba(192,132,252,0.12)',
  };
}
