import api from "./axios";

// Create note
export const createNote = (leadId, data) => api.post(`/notes/${leadId}`, data);

// Get notes
export const getNotes = (leadId) => api.get(`/notes/${leadId}`);
