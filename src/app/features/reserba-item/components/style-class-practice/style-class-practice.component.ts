import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-style-class-practice',
  imports: [CommonModule],
  templateUrl: './style-class-practice.component.html',
  styleUrl: './style-class-practice.component.css',
})
export class StyleClassPracticeComponent {
  activeTheme: 'light' | 'dark' = 'light';
  get themeStyles() {
    return this.activeTheme === 'dark'
      ? { background: '#222', color: '#fff', padding: '10px' }
      : { background: '#eee', color: '#000', padding: '10px' };
  }
  get themeClass() {
    return this.activeTheme === 'dark' ? 'dark-mode' : 'light-mode';
  }

  //@ViewChild, the element is not available in ngOnInit. You must use ngAfterViewInit.
  @ViewChild('nameInput') inputElement!: ElementRef<HTMLInputElement>;

  focusInput() {
    // Access the native DOM element
    this.inputElement.nativeElement.focus();
  }

  toggleTheme() {
    this.activeTheme = this.activeTheme === 'dark' ? 'light' : 'dark';
  }
}
