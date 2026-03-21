import { Component } from '@angular/core';
import { AccordionModule } from 'primeng/accordion';
import { IntroSentencesComponent } from '../intro-sentences/intro-sentences.component';

@Component({
  selector: 'app-intro-list',
  imports: [AccordionModule, IntroSentencesComponent],
  templateUrl: './intro-list.component.html',
  styleUrl: './intro-list.component.css',
})
export class IntroListComponent {}
