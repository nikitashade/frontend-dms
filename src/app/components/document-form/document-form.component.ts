// src/app/document-form/document-form.component.ts

import { Component, OnInit } from '@angular/core';
// Importiamo i moduli necessari per i Reactive Forms e i tipi
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormControl,
} from '@angular/forms';
import { DocumentService } from '../../services/document.service';
import { Document } from '../../models/document.model';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common'; // Necessario per standalone components

@Component({
  selector: 'app-document-form',
  standalone: true,
  templateUrl: './document-form.component.html',
  styleUrls: ['./document-form.component.scss'],
  imports: [
    ReactiveFormsModule,
    RouterModule,
    CommonModule, // Aggiunto CommonModule per direttive come *ngIf, *ngFor, ecc.
  ],
})
export class DocumentFormComponent implements OnInit {
  // La proprietà è già definita
  documentForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private docService: DocumentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Inizializza il Reactive Form con la struttura dei dati
    this.documentForm = this.fb.group({
      // Metadati Fondamentali
      title: ['', Validators.required],
      author: ['', Validators.required], // Aggiunto per tracciare chi lo ha creato
      category: ['Generale', Validators.required], // Tipo/Categoria del documento // Data // Imposta la data di default su oggi in formato YYYY-MM-DD
      doc_date: [
        new Date().toISOString().substring(0, 10),
        Validators.required,
      ], // Mappatura Fisica (Come da te richiesto)
      physical_archive: ['', Validators.required], // Es. "Archivio Principale"
      cabinet: ['', Validators.required], // Es. "Armadio C"
      folder: ['', Validators.required], // Es. "Cartella 2025/11"

      // Campo per note opzionali
      notes: [''],
    });
  }

  onSubmit(): void {
    if (this.documentForm.valid) {
      // DEBUG:
      // console.log('Dati da inviare:', this.documentForm.value);

      // Chiama il servizio per inviare i dati al backend Flask
      this.docService
        .registerDocument(this.documentForm.value as Document)
        .subscribe({
          next: (response: Document) => {
            alert(
              `Documento registrato con successo! ID Protocollo: ${response.protocol_id}`
            );
            console.log('Documento Registrato:', response); // Reset del form e mantenimento della data di default
            this.documentForm.reset({
              doc_date: new Date().toISOString().substring(0, 10),
              author: '',
              category: 'Generale',
              // ... e altri valori di default se necessario
            }); // In un'applicazione reale, reindirizzeresti qui (es. this.router.navigate(['/dashboard']))
          },
          error: (err) => {
            console.error('Errore nella registrazione:', err); // Controlla il corpo dell'errore per maggiori dettagli se possibile
            alert(
              'Si è verificato un errore durante la registrazione del documento. Controlla la console per i dettagli.'
            );
          },
        });
    } else {
      // Marca tutti i controlli come "touched" per mostrare subito gli errori di validazione
      this.documentForm.markAllAsTouched();
      alert('Per favore, compila tutti i campi obbligatori.');
    }
  }
}
