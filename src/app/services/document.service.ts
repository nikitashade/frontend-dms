import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Document } from '../models/document.model'; // Assumendo che il modello sia qui

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  
  // L'URL base del tuo backend Flask
  private apiUrl = 'http://localhost:5000/api/documents'; 

  constructor(private http: HttpClient) {}

  /**
   * Registra un nuovo documento (assegnando ID protocollo e posizione fisica).
   * @param docData I dati del documento da inviare.
   * @returns Un Observable del documento completo con l'ID protocollo.
   */
  registerDocument(docData: Document): Observable<Document> {
    // POST all'endpoint che gestisce la creazione del protocollo
    return this.http.post<Document>(this.apiUrl, docData);
  }

  /**
   * Ottiene tutti i documenti o filtra in base a una query di ricerca.
   * @param query La stringa di ricerca (opzionale).
   * @returns Un Observable di un array di documenti.
   */
  searchDocuments(query: string = ''): Observable<Document[]> {
    const url = query ? `${this.apiUrl}/search?q=${query}` : this.apiUrl;
    return this.http.get<Document[]>(url);
  }
}