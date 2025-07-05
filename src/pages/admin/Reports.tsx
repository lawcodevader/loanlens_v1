import React from 'react';
import { FileText } from 'lucide-react';

const Reports = () => {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <FileText className="h-6 w-6" />
          Reports
        </h1>
        <p className="text-gray-600 mt-2">
          View and generate reports for your organization
        </p>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="text-center py-8">
          <FileText className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No reports generated yet
          </h3>
          <p className="text-gray-500">
            Create your first report to get started
          </p>
        </div>
      </div>
    </div>
  );
};

export default Reports;