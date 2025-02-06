import { Component, ViewChild, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  @ViewChild('draggableBox') draggableBox!: ElementRef;

  private isDragging = false;
  private offsetX = 0;
  private offsetY = 0;

  private windowWidth = window.innerWidth;
  private windowHeight = window.innerHeight;

  private boxWidth = 0;
  private boxHeight = 0;

  ngAfterViewInit() {
    const box = this.draggableBox.nativeElement;
    this.boxWidth = box.offsetWidth;
    this.boxHeight = box.offsetHeight;

    // Calculate the initial position (center of the screen)
    const initialLeft = (this.windowWidth - this.boxWidth) / 2;
    const initialTop = (this.windowHeight - this.boxHeight) / 2;

    // Set initial position with respect to the center of the screen
    box.style.left = `${initialLeft}px`;
    box.style.top = `${initialTop}px`;

    const header = box.querySelector('#drag-header');
    if (!header) return;

    header.addEventListener('mousedown', (event: MouseEvent) => {
      this.isDragging = true;
      this.offsetX = event.clientX - box.offsetLeft;
      this.offsetY = event.clientY - box.offsetTop;
      box.style.cursor = 'grabbing';
    });

    document.addEventListener('mousemove', (event: MouseEvent) => {
      if (this.isDragging) {
        let newLeft = event.clientX - this.offsetX;
        let newTop = event.clientY - this.offsetY;

        // Add boundaries to prevent dragging off the screen
        if (newLeft < 0) newLeft = 0;
        if (newTop < 40) newTop = 40;
        if (newLeft + this.boxWidth > this.windowWidth) newLeft = this.windowWidth - this.boxWidth;
        if (newTop + this.boxHeight > this.windowHeight) newTop = this.windowHeight - this.boxHeight;

        box.style.left = `${newLeft}px`;
        box.style.top = `${newTop}px`;
      }
    });

    document.addEventListener('mouseup', () => {
      this.isDragging = false;
      box.style.cursor = 'grab';
    });
  }
}
