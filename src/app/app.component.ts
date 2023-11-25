import { Component, ElementRef, NgZone, afterNextRender, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ng-fun-windows';
  el = inject(ElementRef);
  zone = inject(NgZone);
  constructor() {
    afterNextRender(() => {
      this.tick();
    });
  }

  tick() {
    requestAnimationFrame(() => {
      this.placeContent();
      this.tick();
    })
  }
  placeContent() {
    const windowDetails = {
      screenX: window.screenX,
      screenY: window.screenY,
      screenWidth: window.screen.availWidth,
      screenHeight: window.screen.availHeight,
    };
    const content = document.querySelector('.content') as HTMLElement;
    if (!content) {
      return;
    }
    const { screenX, screenY, screenWidth, screenHeight } = windowDetails;
    const contentWidth = content.clientWidth;
    const contentHeight = content.clientHeight;
    const screenCenterX = screenWidth / 2;
    const screenCenterY = screenHeight / 2;
    const contentX = screenCenterX - (contentWidth / 2);
    const contentY = screenCenterY - (contentHeight / 2);
    content.style.transform = `translate(${-(screenX - contentX)}px, ${-(screenY - contentY)}px)`;
  }
}
