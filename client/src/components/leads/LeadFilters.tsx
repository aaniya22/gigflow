import React from 'react';
import { Search, X } from 'lucide-react';
import { Select } from '../ui/Select';
import type { LeadFilters as IFilters } from '../../types';

interface LeadFiltersProps {
  filters: IFilters;
  search: string;
  onSearchChange: (v: string) => void;
  onFilterChange: (key: keyof IFilters, value: string) => void;
  onReset: () => void;
}

export const LeadFiltersBar: React.FC<LeadFiltersProps> = ({
  filters, search, onSearchChange, onFilterChange, onReset,
}) => (
  <div className="flex flex-wrap gap-3 items-end">
    <div className="relative flex-1 min-w-48">
      <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
      <input
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search by name or email..."
        className="w-full pl-9 pr-4 py-2 rounded-lg border text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
    <div className="w-36">
      <Select
        value={filters.status}
        onChange={(e) => onFilterChange('status', e.target.value)}
        options={[
          { value: '', label: 'All Status' },
          { value: 'New', label: 'New' },
          { value: 'Contacted', label: 'Contacted' },
          { value: 'Qualified', label: 'Qualified' },
          { value: 'Lost', label: 'Lost' },
        ]}
      />
    </div>
    <div className="w-36">
      <Select
        value={filters.source}
        onChange={(e) => onFilterChange('source', e.target.value)}
        options={[
          { value: '', label: 'All Sources' },
          { value: 'Website', label: 'Website' },
          { value: 'Instagram', label: 'Instagram' },
          { value: 'Referral', label: 'Referral' },
        ]}
      />
    </div>
    <div className="w-36">
      <Select
        value={filters.sort}
        onChange={(e) => onFilterChange('sort', e.target.value)}
        options={[
          { value: 'latest', label: 'Latest First' },
          { value: 'oldest', label: 'Oldest First' },
        ]}
      />
    </div>
    <button onClick={onReset} className="flex items-center gap-1 px-3 py-2 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
      <X size={16} /> Reset
    </button>
  </div>
);