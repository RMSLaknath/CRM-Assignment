import api from "./axios";

export const getActivities = (leadId) => api.get(`/activities/${leadId}`);
