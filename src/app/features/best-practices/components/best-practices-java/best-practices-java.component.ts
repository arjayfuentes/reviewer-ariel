import { Component, computed, signal } from '@angular/core';
import { Chapter, CHAPTERS } from '../../models/effective-java.model';

@Component({
  selector: 'app-best-practices-java',
  imports: [],
  templateUrl: './best-practices-java.component.html',
  styleUrl: './best-practices-java.component.css',
})
export class BestPracticesJavaComponent {
  readonly chapters: Chapter[] = CHAPTERS;

  activeChapterId = signal<string>(CHAPTERS[0].id);
  openBullets = signal<Set<string>>(new Set());

  activeChapter = computed<Chapter>(
    () => this.chapters.find((c) => c.id === this.activeChapterId())!
  );

  selectChapter(id: string): void {
    this.activeChapterId.set(id);
    this.openBullets.set(new Set());
  }

  toggleBullet(key: string): void {
    this.openBullets.update((set) => {
      const next = new Set(set);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  }

  isBulletOpen(key: string): boolean {
    return this.openBullets().has(key);
  }

  bulletKey(chapterId: string, index: number): string {
    return `${chapterId}-${index}`;
  }
}
