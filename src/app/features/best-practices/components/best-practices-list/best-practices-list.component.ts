import { Component } from '@angular/core';
import { AccordionModule } from 'primeng/accordion';
import { BestPracticesJavaComponent } from '../best-practices-java/best-practices-java.component';
import { BestPracticesAngularComponent } from '../best-practices-angular/best-practices-angular.component';
import { BestPracticesCssComponent } from '../best-practices-css/best-practices-css.component';
import { BestPracticesSpringBootComponent } from '../best-practices-spring-boot/best-practices-spring-boot.component';

@Component({
  selector: 'app-best-practices-list',
  imports: [
    AccordionModule,
    BestPracticesJavaComponent,
    BestPracticesAngularComponent,
    BestPracticesCssComponent,
    BestPracticesSpringBootComponent,
  ],
  templateUrl: './best-practices-list.component.html',
  styleUrl: './best-practices-list.component.css',
})
export class BestPracticesListComponent {}
