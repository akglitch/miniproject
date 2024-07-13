"use client"
import React, { useState, Suspense } from 'react';
import { RecordData } from '../types';
import EditModal from './EditModal';
import Sidebar from './sidebar';

// Lazy-loaded components
const Dashboard = React.lazy(() => import('./Dashboard'));
const Incoming = React.lazy(() => import('./Incoming'));
const FormLayout = React.lazy(() => import('./FormLayout'));
const ScanDocument = React.lazy(() => import('../components/ScanDocument'));
const PrintDocument = React.lazy(() => import('../components/PrintDocument'));

const Page: React.FC = () => {
  const [selectedView, setSelectedView] = useState('Dashboard');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editRecord, setEditRecord] = useState<RecordData | null>(null);

  const handleEdit = (record: RecordData) => {
    setEditRecord(record);
    setIsModalOpen(true);
  };

  const handleSave = (updatedRecord: RecordData) => {
    // Handle save logic
    setIsModalOpen(false);
  };

  const renderView = () => {
    switch (selectedView) {
      case 'Dashboard':
        return <Dashboard />;
      case 'FormLayout':
        return <FormLayout />;
      case 'Incoming':
        return <Incoming onEdit={handleEdit} />;
      case 'ScanDocument':
        return <ScanDocument />;
      case 'PrintDocument':
        return <PrintDocument />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen dark:bg-gray-900">
      <Sidebar onSelectView={setSelectedView} />
      <div className="flex-grow p-4 overflow-auto">
        <Suspense fallback={<div>Loading...</div>}>
          {renderView()}
        </Suspense>
        <EditModal
          record={editRecord}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
        />
      </div>
    </div>
  );
};

export default Page;
