import { Component } from '@angular/core';
import { AccordionModule } from 'primeng/accordion';
import { DutchWordsComponent } from '../dutch-words/dutch-words.component';

@Component({
  selector: 'app-dutch-list',
  imports: [AccordionModule, DutchWordsComponent],
  templateUrl: './dutch-list.component.html',
  styleUrl: './dutch-list.component.css',
})
export class DutchListComponent {}
