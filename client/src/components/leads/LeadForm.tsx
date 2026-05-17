import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import type { Lead } from '../../types';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Valid email required'),
  status: z.enum(['New', 'Contacted', 'Qualified', 'Lost']),
  source: z.enum(['Website', 'Instagram', 'Referral']),
});

type FormData = z.infer<typeof schema>;

interface LeadFormProps {
  lead?: Lead;
  onSubmit: (data: FormData) => Promise<void>;
  onCancel: () => void;
  loading: boolean;
}

export const LeadForm: React.FC<LeadFormProps> = ({ lead, onSubmit, onCancel, loading }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: lead?.name ?? '',
      email: lead?.email ?? '',
      status: lead?.status ?? 'New',
      source: lead?.source ?? 'Website',
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <Input label="Name" placeholder="John Doe" error={errors.name?.message} {...register('name')} />
      <Input label="Email" type="email" placeholder="john@example.com" error={errors.email?.message} {...register('email')} />
      <Select label="Status" error={errors.status?.message} {...register('status')}
        options={[
          { value: 'New', label: 'New' },
          { value: 'Contacted', label: 'Contacted' },
          { value: 'Qualified', label: 'Qualified' },
          { value: 'Lost', label: 'Lost' },
        ]}
      />
      <Select label="Source" error={errors.source?.message} {...register('source')}
        options={[
          { value: 'Website', label: 'Website' },
          { value: 'Instagram', label: 'Instagram' },
          { value: 'Referral', label: 'Referral' },
        ]}
      />
      <div className="flex gap-3 pt-2">
        <Button type="button" variant="secondary" onClick={onCancel} className="flex-1">Cancel</Button>
        <Button type="submit" loading={loading} className="flex-1">{lead ? 'Update Lead' : 'Create Lead'}</Button>
      </div>
    </form>
  );
};