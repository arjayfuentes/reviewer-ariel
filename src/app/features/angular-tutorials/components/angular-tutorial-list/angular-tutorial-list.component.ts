import { Component } from '@angular/core';
import { AccordionModule } from 'primeng/accordion';
import { AngularCreateAppComponent } from '../angular-create-app/angular-create-app.component';
import { AngularPrimengTailwindComponent } from '../angular-primeng-tailwind/angular-primeng-tailwind.component';

@Component({
  selector: 'app-angular-tutorial-list',
  imports: [AccordionModule, AngularCreateAppComponent, AngularPrimengTailwindComponent],
  templateUrl: './angular-tutorial-list.component.html',
  styleUrl: './angular-tutorial-list.component.css',
})
export class AngularTutorialListComponent {
  activeIndex: string | null = '0';
}
