import React, { useState, useEffect, useCallback } from 'react';
import { Plus, Download } from 'lucide-react';
import toast from 'react-hot-toast';
import type { Lead, LeadFilters } from '../types';
import { getLeadsApi, createLeadApi, updateLeadApi, deleteLeadApi, exportLeadsApi } from '../api/leads';
import { useDebounce } from '../hooks/useDebounce';
import { exportToCSV } from '../utils/csv';
import { LeadTable } from '../components/leads/LeadTable';
import { LeadFiltersBar } from '../components/leads/LeadFilters';
import { Modal } from '../components/ui/Modal';
import { LeadForm } from '../components/leads/LeadForm';
import { Button } from '../components/ui/Button';

const DEFAULT_FILTERS: LeadFilters = { page: 1, limit: 10, status: '', source: '', search: '', sort: 'latest' };

const DashboardPage: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [pagination, setPagination] = useState({ total: 0, totalPages: 1, page: 1 });
  const [filters, setFilters] = useState<LeadFilters>(DEFAULT_FILTERS);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [editLead, setEditLead] = useState<Lead | undefined>();
  const [viewLead, setViewLead] = useState<Lead | undefined>();

  const debouncedSearch = useDebounce(search, 500);

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getLeadsApi({ ...filters, search: debouncedSearch });
      setLeads(res.data);
      setPagination({ total: res.pagination.total, totalPages: res.pagination.totalPages, page: res.pagination.page });
    } catch {
      toast.error('Failed to fetch leads');
    } finally {
      setLoading(false);
    }
  }, [filters, debouncedSearch]);

  useEffect(() => { fetchLeads(); }, [fetchLeads]);

  const handleFilterChange = (key: keyof LeadFilters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value, page: 1 }));
  };

  const handleSubmit = async (data: Omit<Lead, '_id' | 'createdBy' | 'createdAt' | 'updatedAt'>) => {
    setFormLoading(true);
    try {
      if (editLead) {
        await updateLeadApi(editLead._id, data);
        toast.success('Lead updated!');
      } else {
        await createLeadApi(data);
        toast.success('Lead created!');
      }
      setIsModalOpen(false);
      setEditLead(undefined);
      fetchLeads();
    } catch {
      toast.error('Something went wrong');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this lead?')) return;
    try {
      await deleteLeadApi(id);
      toast.success('Lead deleted');
      fetchLeads();
    } catch {
      toast.error('Failed to delete');
    }
  };

  const handleExport = async () => {
    try {
      const data = await exportLeadsApi({ status: filters.status, source: filters.source, search: debouncedSearch });
      exportToCSV(data);
      toast.success('CSV exported!');
    } catch {
      toast.error('Export failed');
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Leads</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{pagination.total} total leads</p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" onClick={handleExport}>
            <Download size={16} /> Export CSV
          </Button>
          <Button size="sm" onClick={() => { setEditLead(undefined); setIsModalOpen(true); }}>
            <Plus size={16} /> Add Lead
          </Button>
        </div>
      </div>

      <div className="mb-4">
        <LeadFiltersBar
          filters={filters}
          search={search}
          onSearchChange={setSearch}
          onFilterChange={handleFilterChange}
          onReset={() => { setFilters(DEFAULT_FILTERS); setSearch(''); }}
        />
      </div>

      <LeadTable
        leads={leads}
        loading={loading}
        onEdit={(lead) => { setEditLead(lead); setIsModalOpen(true); }}
        onDelete={handleDelete}
        onView={(lead) => { setViewLead(lead); setIsViewOpen(true); }}
      />

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="flex items-center justify-between mt-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">Page {filters.page} of {pagination.totalPages}</p>
          <div className="flex gap-2">
            <Button variant="secondary" size="sm" disabled={filters.page <= 1}
              onClick={() => setFilters((p) => ({ ...p, page: p.page - 1 }))}>Previous</Button>
            <Button variant="secondary" size="sm" disabled={filters.page >= pagination.totalPages}
              onClick={() => setFilters((p) => ({ ...p, page: p.page + 1 }))}>Next</Button>
          </div>
        </div>
      )}

      {/* Create/Edit Modal */}
      <Modal isOpen={isModalOpen} onClose={() => { setIsModalOpen(false); setEditLead(undefined); }}
        title={editLead ? 'Edit Lead' : 'New Lead'}>
        <LeadForm lead={editLead} onSubmit={handleSubmit} onCancel={() => setIsModalOpen(false)} loading={formLoading} />
      </Modal>

      {/* View Modal */}
      <Modal isOpen={isViewOpen} onClose={() => setIsViewOpen(false)} title="Lead Details">
        {viewLead && (
          <div className="flex flex-col gap-3 text-sm">
            {[['Name', viewLead.name], ['Email', viewLead.email], ['Status', viewLead.status],
              ['Source', viewLead.source], ['Created', new Date(viewLead.createdAt).toLocaleString()],
              ['Added by', viewLead.createdBy?.name ?? 'N/A']].map(([label, value]) => (
              <div key={label} className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-800">
                <span className="text-gray-500 dark:text-gray-400">{label}</span>
                <span className="font-medium text-gray-900 dark:text-white">{value}</span>
              </div>
            ))}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default DashboardPage;