import { Component } from '@angular/core';
import { AccordionModule } from 'primeng/accordion';
import { SpringBootCreateAppComponent } from '../spring-boot-create-app/spring-boot-create-app.component';
import { SpringBootConfigComponent } from '../spring-boot-config/spring-boot-config.component';
import { SpringBootDatabaseDockerComponent } from '../spring-boot-database-docker/spring-boot-database-docker.component';
import { SpringBootDatabaseConnectIntellijComponent } from '../spring-boot-database-connect-intellij/spring-boot-database-connect-intellij.component';
import { SpringBootFlywayComponent } from '../spring-boot-flyway/spring-boot-flyway.component';
import { MavenTutorialComponent } from '../maven-tutorial/maven-tutorial.component';

@Component({
  selector: 'app-java-tutorial-list',
  imports: [
    AccordionModule,
    SpringBootCreateAppComponent,
    SpringBootConfigComponent,
    SpringBootDatabaseDockerComponent,
    SpringBootDatabaseConnectIntellijComponent,
    SpringBootFlywayComponent,
    MavenTutorialComponent,
  ],
  templateUrl: './java-tutorial-list.component.html',
  styleUrl: './java-tutorial-list.component.css',
})
export class JavaTutorialListComponent {}
