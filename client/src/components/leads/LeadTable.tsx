import React from 'react';
import { Edit2, Trash2, Eye } from 'lucide-react';
import type { Lead } from '../../types';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { useAuthStore } from '../../store/authStore';

interface LeadTableProps {
  leads: Lead[];
  onEdit: (lead: Lead) => void;
  onDelete: (id: string) => void;
  onView: (lead: Lead) => void;
  loading: boolean;
}

export const LeadTable: React.FC<LeadTableProps> = ({ leads, onEdit, onDelete, onView, loading }) => {
  const { isAdmin } = useAuthStore();

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
    </div>
  );

  if (leads.length === 0) return (
    <div className="flex flex-col items-center justify-center h-64 text-gray-400 dark:text-gray-500">
      <svg className="w-16 h-16 mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      <p className="text-lg font-medium">No leads found</p>
      <p className="text-sm mt-1">Try adjusting your filters or create a new lead</p>
    </div>
  );

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
      <table className="w-full text-sm">
        <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <tr>
            {['Name', 'Email', 'Status', 'Source', 'Created', 'Actions'].map((h) => (
              <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
          {leads.map((lead) => (
            <tr key={lead._id} className="bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">{lead.name}</td>
              <td className="px-4 py-3 text-gray-500 dark:text-gray-400">{lead.email}</td>
              <td className="px-4 py-3"><Badge value={lead.status} type="status" /></td>
              <td className="px-4 py-3"><Badge value={lead.source} type="source" /></td>
              <td className="px-4 py-3 text-gray-500 dark:text-gray-400">{new Date(lead.createdAt).toLocaleDateString()}</td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="sm" onClick={() => onView(lead)}><Eye size={15} /></Button>
                  <Button variant="ghost" size="sm" onClick={() => onEdit(lead)}><Edit2 size={15} /></Button>
                  {isAdmin() && (
                    <Button variant="ghost" size="sm" onClick={() => onDelete(lead._id)} className="text-red-500 hover:text-red-700">
                      <Trash2 size={15} />
                    </Button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};