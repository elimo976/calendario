import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CalendarioComponent } from "./components/calendario/calendario.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CalendarioComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'calendario';
}
