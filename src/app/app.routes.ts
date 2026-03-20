import { Routes } from '@angular/router';
import { AngularSetupListComponent } from './features/angular-setup/components/angular-setup-list/angular-setup-list.component';
import { AngularTutorialListComponent } from './features/angular-tutorials/components/angular-tutorial-list/angular-tutorial-list.component';
import { JavaTutorialListComponent } from './features/java-tutorials/components/java-tutorial-list/java-tutorial-list.component';
import { SpringBootApplicationListComponent } from './features/spring-boot-app/components/spring-boot-application-list/spring-boot-application-list.component';
import { PdfViewerComponent } from './features/reviewer-files/components/pdf-viewer/pdf-viewer.component';

export const routes: Routes = [
  { path: '', redirectTo: 'angular-tutorials', pathMatch: 'full' },
  { path: 'angular-tutorials', component: AngularTutorialListComponent },
  { path: 'java-tutorials', component: JavaTutorialListComponent },
  { path: 'spring-boot-app', component: SpringBootApplicationListComponent },
  { path: 'angular-setup', component: AngularSetupListComponent },
  { path: 'pdf-viewer', component: PdfViewerComponent },
];
