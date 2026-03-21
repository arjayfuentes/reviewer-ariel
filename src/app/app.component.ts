import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
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
  showExtraMenus = true;
  private router = inject(Router);
  private previousRoute: string = '';

  items: MenuItem[] | undefined;

  private readonly baseItems: MenuItem[] = [
    { label: 'Angular Tutorials', icon: 'pi pi-home', routerLink: '/angular-tutorials' },
    { label: 'SpringBoot Tutorials', icon: 'pi pi-star', routerLink: '/java-tutorials' },
    { label: 'SpringBoot App', icon: 'pi pi-envelope', routerLink: '/spring-boot-app' },
    { label: 'Angular Setup', icon: 'pi pi-envelope', routerLink: '/angular-setup' },
    { label: 'Best Practices', icon: 'pi pi-file-pdf', routerLink: '/best-practices' },
    { label: 'App Study', icon: 'pi pi-file-pdf', routerLink: '/app-study' },
    { label: 'SDLC', icon: 'pi pi-file-pdf', routerLink: '/sdlc' },
  ];

  private readonly extraItems: MenuItem[] = [
    { label: 'PDF Viewer', icon: 'pi pi-file-pdf', routerLink: '/pdf-viewer' },
    { label: 'Reserba Item', icon: 'pi pi-file-pdf', routerLink: '/reserba-item' },
    { label: 'Project Code', icon: 'pi pi-file-pdf', routerLink: '/project-code' },
    { label: 'Miyembro Code', icon: 'pi pi-file-pdf', routerLink: '/miyembro-code' },
    { label: 'Intro', icon: 'pi pi-file-pdf', routerLink: '/intro' },
    { label: 'Dutch', icon: 'pi pi-file-pdf', routerLink: '/dutch' },
  ];

  ngOnInit() {
    this.buildMenu();
  }

  toggleExtraMenus() {
    this.showExtraMenus = !this.showExtraMenus;
    this.buildMenu();
    if (!this.showExtraMenus) {
      this.previousRoute = this.router.url; // save current route before leaving
      this.router.navigate([this.baseItems[0].routerLink]);
    } else {
      if (this.previousRoute) {
        this.router.navigate([this.previousRoute]);
      }
    }
  }

  private buildMenu() {
    this.items = this.showExtraMenus
      ? [...this.baseItems, ...this.extraItems]
      : [...this.baseItems];
  }
}
