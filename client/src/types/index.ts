export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'sales';
}

export interface Lead {
  _id: string;
  name: string;
  email: string;
  status: 'New' | 'Contacted' | 'Qualified' | 'Lost';
  source: 'Website' | 'Instagram' | 'Referral';
  createdBy: { name: string; email: string };
  createdAt: string;
  updatedAt: string;
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface LeadsResponse {
  success: boolean;
  data: Lead[];
  pagination: PaginationMeta;
}

export interface AuthResponse {
  success: boolean;
  token: string;
  user: User;
}

export interface LeadFilters {
  page: number;
  limit: number;
  status: string;
  source: string;
  search: string;
  sort: 'latest' | 'oldest';
}