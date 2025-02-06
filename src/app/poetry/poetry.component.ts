import { Component, ElementRef, AfterViewInit, ViewChild, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule  } from '@angular/common/http';
import { CommonModule } from '@angular/common';

interface Poem {
  title: string;
  filename: string;
  content?: string;
}

@Component({
  selector: 'app-poetry',
  imports: [CommonModule, HttpClientModule],
  templateUrl: './poetry.component.html',
  styleUrl: './poetry.component.css'
})
export class PoetryComponent implements OnInit {
  poems: Poem[] = [];
  selectedPoem: Poem | null = null;

  @ViewChild('poemBox') poemBox!: ElementRef;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.loadPoems();
  }

  loadPoems() {
    this.http.get<Poem[]>('/assets/poems.json').subscribe(poems => {
      this.poems = poems;
    });
  }

  selectPoem(poem: Poem) {
    this.http.get(`/assets/poems/${poem.filename}`, { responseType: 'text' }).subscribe(content => {
      poem.content = content;
      this.selectedPoem = poem;
    });
  }

  ngAfterViewInit() {
    if (this.poemBox) {
      const box = this.poemBox.nativeElement;
      box.style.position = 'absolute';
      box.style.top = '50%';
      box.style.left = '50%';
      box.style.transform = 'translate(-50%, -50%)';
      box.style.zIndex = '1000';
    }
  }
}