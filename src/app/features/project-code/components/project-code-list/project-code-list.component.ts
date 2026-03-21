import { Component } from '@angular/core';
import { AccordionModule } from 'primeng/accordion';
import { ProjectCodeReserbaBackEndComponent } from '../project-code-reserba-back-end/project-code-reserba-back-end.component';
import { ProjectCodeReserbaUiOldComponent } from '../project-code-reserba-ui-old/project-code-reserba-ui-old.component';
import { ProjectCodeReserbaUiNewComponent } from '../project-code-reserba-ui-new/project-code-reserba-ui-new.component';
import { ProjectCodeReserbaUiPageComponent } from '../project-code-reserba-ui-page/project-code-reserba-ui-page.component';

@Component({
  selector: 'app-project-code-list',
  imports: [
    AccordionModule,
    ProjectCodeReserbaBackEndComponent,
    ProjectCodeReserbaUiOldComponent,
    ProjectCodeReserbaUiNewComponent,
    ProjectCodeReserbaUiPageComponent,
  ],
  templateUrl: './project-code-list.component.html',
  styleUrl: './project-code-list.component.css',
})
export class ProjectCodeListComponent {}
