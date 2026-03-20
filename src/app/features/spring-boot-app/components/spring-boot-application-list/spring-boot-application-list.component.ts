import { Component } from '@angular/core';
import { AccordionModule } from 'primeng/accordion';
import { SpringBootApplicationLayersComponent } from '../spring-boot-application-layers/spring-boot-application-layers.component';
import { SpringBootApplicationOthersComponent } from '../spring-boot-application-others/spring-boot-application-others.component';
import { SpringBootApplicationTestComponent } from '../spring-boot-application-test/spring-boot-application-test.component';
import { SpringBootApplicationLayersTestComparisonComponent } from '../spring-boot-application-layers-test-comparison/spring-boot-application-layers-test-comparison.component';

@Component({
  selector: 'app-spring-boot-application-list',
  imports: [
    AccordionModule,
    SpringBootApplicationLayersComponent,
    SpringBootApplicationOthersComponent,
    SpringBootApplicationTestComponent,
    SpringBootApplicationLayersTestComparisonComponent,
  ],
  templateUrl: './spring-boot-application-list.component.html',
  styleUrl: './spring-boot-application-list.component.css',
})
export class SpringBootApplicationListComponent {}
