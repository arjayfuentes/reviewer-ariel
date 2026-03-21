import { Component } from '@angular/core';
import { AccordionModule } from 'primeng/accordion';
import { IntroSentencesComponent } from '../intro-sentences/intro-sentences.component';
import { IntroQuestionsComponent } from '../intro-questions/intro-questions.component';

@Component({
  selector: 'app-intro-list',
  imports: [AccordionModule, IntroSentencesComponent, IntroQuestionsComponent],
  templateUrl: './intro-list.component.html',
  styleUrl: './intro-list.component.css',
})
export class IntroListComponent {}
