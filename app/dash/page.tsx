"use client"
import React, { useState } from 'react';
import { RecordData } from '../types';
import Dashboard from './Dashboard';
import Records from './Records';
import FormLayout from './FormLayout';
import EditModal from './EditModal';
import Sidebar from './sidebar';
import Header from '../components/Header';
import ScanDocument from '../components/ScanDocument';
import PrintDocument from '../components/PrintDocument';


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
      case 'Records':
        return <Records onEdit={handleEdit} />;
      case 'ScanDocument':
          return <ScanDocument />;
      case 'PrintDocument':
        return <PrintDocument />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen" style={{ backgroundColor: '#ffffff' }}>
      <Header />
      <Sidebar onSelectView={setSelectedView} />
      <div className="flex-grow p-4 overflow-auto">
        {renderView()}
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
