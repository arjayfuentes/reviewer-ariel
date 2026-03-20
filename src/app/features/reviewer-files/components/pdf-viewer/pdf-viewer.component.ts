import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import * as pdfjsLib from 'pdfjs-dist';

pdfjsLib.GlobalWorkerOptions.workerSrc = '/assets/pdf.worker.min.mjs';

@Component({
  selector: 'app-pdf-viewer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pdf-viewer.component.html',
  styleUrl: './pdf-viewer.component.css',
})
export class PdfViewerComponent implements OnInit {
  @ViewChild('pdfContainer') pdfContainer!: ElementRef;

  fileName: string = '';
  isLoading: boolean = false;
  errorMessage: string = '';
  totalPages: number = 0;
  storedPdfs: string[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<string[]>('pdfs/pdfs.json').subscribe({
      next: (files) => (this.storedPdfs = files),
      error: () => (this.errorMessage = 'Could not load PDF list.'),
    });
  }

  async loadStoredPdf(filename: string): Promise<void> {
    this.fileName = filename;
    await this.renderPdf(`pdfs/${filename}`);
  }

  async onFileSelected(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.pdf')) {
      this.errorMessage = 'Only .pdf files are supported.';
      return;
    }

    this.fileName = file.name;
    const arrayBuffer = await file.arrayBuffer();
    await this.renderPdf(arrayBuffer);
  }

  async renderPdf(source: string | ArrayBuffer): Promise<void> {
    this.isLoading = true;
    this.errorMessage = '';
    this.totalPages = 0;
    this.pdfContainer.nativeElement.innerHTML = '';

    try {
      const loadingTask =
        typeof source === 'string'
          ? pdfjsLib.getDocument(source)
          : pdfjsLib.getDocument({ data: source });

      const pdf = await loadingTask.promise;
      this.totalPages = pdf.numPages;

      for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
        const page = await pdf.getPage(pageNum);
        const viewport = page.getViewport({ scale: 1.5 });

        const canvas = document.createElement('canvas');
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        canvas.classList.add('pdf-page');

        this.pdfContainer.nativeElement.appendChild(canvas);

        await page.render({
          canvasContext: canvas.getContext('2d')!,
          viewport,
        }).promise;
      }
    } catch (e) {
      console.error('PDF Error:', e);
      this.errorMessage = 'Failed to load PDF. Please try again.';
    }

    this.isLoading = false;
  }
}
