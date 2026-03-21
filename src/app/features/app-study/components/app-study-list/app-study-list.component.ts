import { Component } from '@angular/core';
import { AccordionModule } from 'primeng/accordion';
import { AppStudySheetComponent } from '../app-study-sheet/app-study-sheet.component';
import { AppStudyQuestionsComponent } from '../app-study-questions/app-study-questions.component';

@Component({
  selector: 'app-app-study-list',
  imports: [AccordionModule, AppStudySheetComponent, AppStudyQuestionsComponent],
  templateUrl: './app-study-list.component.html',
  styleUrl: './app-study-list.component.css',
})
export class AppStudyListComponent {}
