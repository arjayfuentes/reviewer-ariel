import { Component } from '@angular/core';
import { ItemListComponent } from '../item-list/item-list.component';
import { ItemSelectedComponent } from '../item-selected/item-selected.component';
import { StyleClassPracticeComponent } from '../style-class-practice/style-class-practice.component';

@Component({
  selector: 'app-reserba-item',

  imports: [ItemListComponent, ItemSelectedComponent, StyleClassPracticeComponent],
  templateUrl: './reserba-item.component.html',
  styleUrl: './reserba-item.component.css',
})
export class ReserbaItemComponent {}
