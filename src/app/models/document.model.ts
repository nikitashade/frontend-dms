// src/app/models/document.model.ts

export interface Document {
    // Campi inviati dal Form:
    title: string;
    author: string;
    category: string;
    doc_date: string; // Utilizziamo stringa per il formato data YYYY-MM-DD
    physical_archive: string;
    cabinet: string;
    folder: string;
    notes?: string; // Campo opzionale

    // Campi aggiunti dal Backend (Flask) dopo la registrazione:
    protocol_id?: string; // ID univoco/Protocollo assegnato dal backend
    registration_date?: string; // Data/Timestamp di registrazione nel sistema
}