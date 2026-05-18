// app/x7k9m2/page.tsx
'use client';

import dynamic from 'next/dynamic';

const AdminReviews = dynamic(() => import('@/components/AdminReviews'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-bg-primary flex items-center justify-center">
      <div className="text-text-secondary">Загрузка...</div>
    </div>
  ),
});

export default function AdminPage() {
  return <AdminReviews />;
}