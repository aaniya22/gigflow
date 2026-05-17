import api from './axios';
import type { LeadsResponse, Lead, LeadFilters } from '../types';

export const getLeadsApi = async (filters: Partial<LeadFilters>): Promise<LeadsResponse> => {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([k, v]) => {
    if (v !== undefined && v !== '') params.append(k, String(v));
  });
  const { data } = await api.get<LeadsResponse>(`/leads?${params.toString()}`);
  return data;
};

export const createLeadApi = async (
  lead: Omit<Lead, '_id' | 'createdBy' | 'createdAt' | 'updatedAt'>
): Promise<{ success: boolean; data: Lead }> => {
  const { data } = await api.post('/leads', lead);
  return data;
};

export const updateLeadApi = async (
  id: string, lead: Partial<Lead>
): Promise<{ success: boolean; data: Lead }> => {
  const { data } = await api.put(`/leads/${id}`, lead);
  return data;
};

export const deleteLeadApi = async (id: string): Promise<void> => {
  await api.delete(`/leads/${id}`);
};

export const exportLeadsApi = async (filters: Partial<LeadFilters>): Promise<Lead[]> => {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([k, v]) => {
    if (v !== undefined && v !== '') params.append(k, String(v));
  });
  const { data } = await api.get(`/leads/export?${params.toString()}`);
  return data.data;
};