import { Component } from '@angular/core';
import { AccordionModule } from 'primeng/accordion';
import { SdlcInfoComponent } from '../sdlc-info/sdlc-info.component';

@Component({
  selector: 'app-sdlc-list',
  imports: [AccordionModule, SdlcInfoComponent],
  templateUrl: './sdlc-list.component.html',
  styleUrl: './sdlc-list.component.css',
})
export class SdlcListComponent {}
