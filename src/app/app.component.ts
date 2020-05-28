import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  appTitle = 'Todos app';
  public isVisible: boolean = false;

  showSidebar() {
    this.isVisible = !this.isVisible
    alert(this.isVisible);
  }
}
