"use client"
import React, { useState } from 'react';
import Dashboard from './Dashboard';
import Records from './dashboard/Records';
import FormLayout from './dashboard/FormLayout';
import EditModal from './components/EditModal';
import { RecordData } from './types'; // Adjust the import path as needed
import Sidebar from './dashboard/sidebar';

const MainComponent: React.FC = () => {
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
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen" style={{ backgroundColor: '#ffffff' }}>
      <Sidebar onSelectView={setSelectedView} />
      <main className="flex-grow p-4 overflow-auto">
        {renderView()}
        <EditModal
          record={editRecord}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
        />
      </main>
    </div>
  );
};

export default MainComponent;
