// Esempio in app.routes.ts (se usi standalone)
import { Routes } from '@angular/router';
import { DocumentFormComponent } from './components/document-form/document-form.component';

export const routes: Routes = [
  { path: 'register', component: DocumentFormComponent },
  // ... altre rotte
];