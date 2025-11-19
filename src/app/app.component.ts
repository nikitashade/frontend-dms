import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DocumentFormComponent } from './components/document-form/document-form.component';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, DocumentFormComponent, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontend-dms';
}
