import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings as SettingsIcon, FileCheck, List, Variable } from 'lucide-react';

const Settings = () => {
  const navigate = useNavigate();
  
  const settingsCategories = [
    {
      id: 'checklist',
      name: 'Checklist Manager',
      description: 'Create and manage property verification checklists',
      icon: <FileCheck className="h-8 w-8 text-primary" />,
      action: () => navigate('/settings/checklist-manager'),
    },
    {
      id: 'templates',
      name: 'Template Manager',
      description: 'Manage title search report templates',
      icon: <List className="h-8 w-8 text-primary" />,
      action: () => navigate('/settings/template-manager'),
    },
    {
      id: 'variables',
      name: 'Variable Manager',
      description: 'Create and manage variables for templates',
      icon: <Variable className="h-8 w-8 text-primary" />,
      action: () => console.log('Navigate to Variable Manager'),
    },
    {
      id: 'general',
      name: 'General Settings',
      description: 'Configure system-wide settings',
      icon: <SettingsIcon className="h-8 w-8 text-primary" />,
      action: () => console.log('Navigate to General Settings'),
    },
  ];
  
  return (
    <div className="animate-fade-in">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {settingsCategories.map((category) => (
          <div
            key={category.id}
            className="bg-white rounded-lg shadow hover:shadow-md transition-shadow p-6 flex flex-col items-start"
          >
            <div className="p-3 rounded-full bg-primary/10 mb-4">
              {category.icon}
            </div>
            <h3 className="text-lg font-semibold mb-2">{category.name}</h3>
            <p className="text-gray-600 mb-4">{category.description}</p>
            <button
              onClick={category.action}
              className="mt-auto btn btn-primary"
            >
              Manage
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Settings;