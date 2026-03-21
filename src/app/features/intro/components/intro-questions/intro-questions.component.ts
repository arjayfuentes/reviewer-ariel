import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Question {
  english: string;
  dutch: string;
}

@Component({
  selector: 'app-intro-questions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './intro-questions.component.html',
  styleUrl: './intro-questions.component.css',
})
export class IntroQuestionsComponent {
  questions: Question[] = [
    {
      english: 'Doing anything fun or exciting lately?',
      dutch: 'Nog leuke of spannende dingen gedaan de laatste tijd?',
    },
    {
      english: 'Do you have any exciting plans for the weekend?',
      dutch: 'Heb je leuke plannen voor het weekend?',
    },
    {
      english: 'Do you have any trips or travels planned soon?',
      dutch: 'Heb je binnenkort nog reisplannen?',
    },
    {
      english: 'How was your commute this morning? Was the traffic bad?',
      dutch: 'Hoe was je rit vanmorgen? Was het druk op de weg?',
    },
    {
      english: 'Do you live nearby, or do you have a long commute?',
      dutch: 'Woon je in de buurt, of moet je van ver komen?',
    },
    {
      english: 'What do you usually do to relax after work?',
      dutch: 'Wat doe je meestal om te ontspannen na het werk?',
    },
    {
      english: 'Do you have any hobbies or things you like to do after work?',
      dutch: "Heb je hobby's of dingen die je graag doet na het werk?",
    },
    {
      english: 'Oh, that sounds interesting! How long have you been doing that?',
      dutch: 'Oh, dat klinkt interessant! Hoe lang doe je dat al?',
    },
    {
      english: 'How long have you been working here?',
      dutch: 'Hoe lang werk je hier al?',
    },
  ];
}
