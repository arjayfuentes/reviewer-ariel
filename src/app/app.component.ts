import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { AngularTutorialListComponent } from './features/angular-tutorials/components/angular-tutorial-list/angular-tutorial-list.component';
import { JavaTutorialListComponent } from './features/java-tutorials/components/java-tutorial-list/java-tutorial-list.component';
import { SpringBootApplicationListComponent } from './features/spring-boot-app/components/spring-boot-application-list/spring-boot-application-list.component';
import { AngularSetupListComponent } from './features/angular-setup/components/angular-setup-list/angular-setup-list.component';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    ButtonModule,
    AngularTutorialListComponent,
    JavaTutorialListComponent,
    SpringBootApplicationListComponent,
    AngularSetupListComponent,
    MenubarModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'reserba-ui';
  public myUnusedVariable = 'Hello';

  items: MenuItem[] | undefined;

  ngOnInit() {
    const unusedVariable = 'hello'; // ESLint should warn on this
    const x = { a: 1, b: 2, c: 3 };
    this.items = [
      {
        label: 'Angular Tutorials',
        icon: 'pi pi-home',
        routerLink: '/angular-tutorials', // ← add this
      },
      {
        label: 'SpringBoot Tutorials',
        icon: 'pi pi-star',
        routerLink: '/java-tutorials', // ← add this
      },
      {
        label: 'SpringBoot App',
        icon: 'pi pi-envelope',
        routerLink: '/spring-boot-app', // ← add this
      },
      {
        label: 'Angular Setup',
        icon: 'pi pi-envelope',
        routerLink: '/angular-setup', // ← add this
      },
      { label: 'Best Practices', icon: 'pi pi-file-pdf', routerLink: '/best-practices' },

      { label: 'PDF Viewer', icon: 'pi pi-file-pdf', routerLink: '/pdf-viewer' },
      { label: 'Reserba Item', icon: 'pi pi-file-pdf', routerLink: '/reserba-item' },
    ];
  }
}
