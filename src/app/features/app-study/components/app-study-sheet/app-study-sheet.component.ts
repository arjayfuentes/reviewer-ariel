import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface CheatItem {
  question: string;
  answer: string;
}

interface CheatSection {
  title: string;
  icon: string;
  color: string;
  expanded: boolean;
  items: CheatItem[];
}

interface ActionItem {
  action: string;
  goal: string;
}

@Component({
  selector: 'app-app-study-sheet',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app-study-sheet.component.html',
  styleUrl: './app-study-sheet.component.css',
})
export class AppStudySheetComponent {
  sections: CheatSection[] = [
    {
      title: 'Architecture',
      icon: '🏗️',
      color: 'section-blue',
      expanded: true,
      items: [
        {
          question: 'Is this a Monolith or Microservices?',
          answer:
            'In Azure, are we looking at one App Service or several communicating via a Service Bus/REST?',
        },
        {
          question: 'How is the communication between Java and Angular handled?',
          answer:
            'Are we using a standard REST API, or is there a GraphQL/BFF (Backend-for-Frontend) layer?',
        },
        {
          question: "Where is the 'Source of Truth' for data?",
          answer: 'Is it a SQL database like Azure SQL, or a NoSQL like Cosmos DB?',
        },
        {
          question: 'How do we handle Authentication/Authorization?',
          answer: 'Are we using Azure AD/MSAL on the frontend and Spring Security on the backend?',
        },
      ],
    },
    {
      title: 'Angular Frontend',
      icon: '🅰️',
      color: 'section-red',
      expanded: false,
      items: [
        {
          question: 'What is the State Management strategy?',
          answer:
            'Do you see NgRx folders, or is the team using simple RxJS BehaviorSubjects in Services?',
        },
        {
          question: 'Are we using Standalone Components or NgModules?',
          answer: 'Newer Angular versions favor Standalone; older apps use Modules.',
        },
        {
          question: 'How are shared styles handled?',
          answer:
            'Look for a styles folder — are they using Tailwind, Bootstrap, or a custom Material theme?',
        },
        {
          question: 'Are there Interceptors?',
          answer:
            'Look for http-interceptor.ts. This is usually where tokens and error handling are injected into every request.',
        },
      ],
    },
    {
      title: 'Java Backend',
      icon: '☕',
      color: 'section-orange',
      expanded: false,
      items: [
        {
          question: 'How are Database Migrations managed?',
          answer:
            'Look for a db/migration folder. If you see .sql or .xml files, they are using Flyway or Liquibase.',
        },
        {
          question: 'What is the Mapping strategy?',
          answer:
            'Do they use MapStruct or ModelMapper to convert Entities to DTOs? Tip: Mediors never expose Entities directly to the frontend.',
        },
        {
          question: 'How is Exception Handling globalized?',
          answer:
            'Look for a @ControllerAdvice class. This tells you how errors are formatted before they reach the UI.',
        },
        {
          question: 'Are there custom Annotations or AOP (Aspect Oriented Programming)?',
          answer: 'Sometimes teams use these for logging or custom security checks.',
        },
      ],
    },
    {
      title: 'Dev Experience (Azure & Local)',
      icon: '⚙️',
      color: 'section-teal',
      expanded: false,
      items: [
        {
          question: 'Can I run the entire stack locally with Docker?',
          answer: 'Check for a docker-compose.yml file.',
        },
        {
          question: 'Where are the environment variables stored?',
          answer: 'Are they in application.properties or pulled from Azure Key Vault?',
        },
        {
          question: "How do I trigger a 'Dev' build manually in Azure DevOps?",
          answer: 'Ask the team for the pipeline name and manual trigger steps in Azure DevOps.',
        },
        {
          question: "What is the 'Definition of Done' for a Pull Request?",
          answer:
            'Do I need a certain % of code coverage? Do I need a screenshot of the UI change?',
        },
      ],
    },
  ];

  actions: ActionItem[] = [
    {
      action: 'Trace a "Get" Request',
      goal: 'Find a button in Angular → See the Service → Find the Java Controller → Trace to the DB.',
    },
    {
      action: 'Check the .spec and Test files',
      goal: 'See how they mock data. This is the fastest way to learn the business logic.',
    },
    {
      action: 'Read the README.md',
      goal: "Even if it's outdated, it tells you what the original intent was.",
    },
    {
      action: 'Look at the Git History',
      goal: 'Who are the main contributors? Read the last 3-4 Pull Requests to see what reviewers complain about.',
    },
  ];

  toggleSection(section: CheatSection): void {
    section.expanded = !section.expanded;
  }

  getSectionGradient(color: string): string {
    const map: Record<string, string> = {
      'section-blue': 'linear-gradient(135deg, #1e3a5f, #0f2040)',
      'section-green': 'linear-gradient(135deg, #064e1e, #032e12)',
      'section-purple': 'linear-gradient(135deg, #3b0764, #1e0336)',
      'section-orange': 'linear-gradient(135deg, #7c2d12, #4a1a08)',
      'section-teal': 'linear-gradient(135deg, #134e4a, #062e2b)',
      'section-red': 'linear-gradient(135deg, #5c0a0a, #380606)',
      'section-yellow': 'linear-gradient(135deg, #713f12, #3d2006)',
      'section-indigo': 'linear-gradient(135deg, #1e1b4b, #0f0d2b)',
    };
    return map[color] ?? '#13161e';
  }

  getAccentColor(color: string): string {
    const map: Record<string, string> = {
      'section-blue': '#60a5fa',
      'section-green': '#4ade80',
      'section-purple': '#c084fc',
      'section-orange': '#fb923c',
      'section-teal': '#2dd4bf',
      'section-red': '#f87171',
      'section-yellow': '#fbbf24',
      'section-indigo': '#818cf8',
    };
    return map[color] ?? '#94a3b8';
  }

  getAccentBg(color: string): string {
    const map: Record<string, string> = {
      'section-blue': 'rgba(96,165,250,0.12)',
      'section-green': 'rgba(74,222,128,0.12)',
      'section-purple': 'rgba(192,132,252,0.12)',
      'section-orange': 'rgba(251,146,60,0.12)',
      'section-teal': 'rgba(45,212,191,0.12)',
      'section-red': 'rgba(248,113,113,0.12)',
      'section-yellow': 'rgba(251,191,36,0.12)',
      'section-indigo': 'rgba(129,140,248,0.12)',
    };
    return map[color] ?? 'rgba(148,163,184,0.12)';
  }
}
