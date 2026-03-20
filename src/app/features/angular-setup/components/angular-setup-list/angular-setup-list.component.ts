import { Component } from '@angular/core';
import { AccordionModule } from 'primeng/accordion';
import { AngularEslintVscodeComponent } from '../angular-eslint-vscode/angular-eslint-vscode.component';
import { AngularPrettierVscodeComponent } from '../angular-prettier-vscode/angular-prettier-vscode.component';
import { AngularPluginsVscodeComponent } from '../angular-plugins-vscode/angular-plugins-vscode.component';

@Component({
  selector: 'app-angular-setup-list',
  imports: [
    AccordionModule,
    AngularEslintVscodeComponent,
    AngularPrettierVscodeComponent,
    AngularPluginsVscodeComponent,
  ],
  templateUrl: './angular-setup-list.component.html',
  styleUrl: './angular-setup-list.component.css',
})
export class AngularSetupListComponent {}
