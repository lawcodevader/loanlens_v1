import { useState } from 'react';
import { FileText, Upload, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

interface Document {
  id: string;
  name: string;
  description: string;
  mandatory: boolean;
  status: 'pending' | 'uploaded' | 'rejected';
  feedback?: string;
}

const DocumentUpload = () => {
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: '1',
      name: 'Encumbrance Certificate',
      description: 'Latest EC from the registration office',
      mandatory: true,
      status: 'pending'
    },
    {
      id: '2',
      name: 'Property Tax Receipt',
      description: 'Last 3 years property tax payment receipts',
      mandatory: true,
      status: 'rejected',
      feedback: 'Please provide all three years of receipts'
    },
    {
      id: '3',
      name: 'Building Permit',
      description: 'Approved building permit from local authority',
      mandatory: true,
      status: 'uploaded'
    },
    {
      id: '4',
      name: 'Land Survey Report',
      description: 'Recent land survey report',
      mandatory: false,
      status: 'pending'
    }
  ]);

  const handleFileUpload = (documentId: string, file: File) => {
    // In a real app, this would upload to a server
    setDocuments(prev => prev.map(doc => 
      doc.id === documentId 
        ? { ...doc, status: 'uploaded' }
        : doc
    ));
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'uploaded':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'rejected':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'uploaded':
        return 'Uploaded';
      case 'rejected':
        return 'Rejected';
      default:
        return 'Pending';
    }
  };

  const allMandatoryUploaded = documents
    .filter(doc => doc.mandatory)
    .every(doc => doc.status === 'uploaded');

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <FileText className="h-6 w-6" />
          Document Upload
        </h1>
        <p className="text-gray-600 mt-2">
          Upload the required documents for your loan application
        </p>
      </div>

      <div className="grid gap-6">
        {documents.map(document => (
          <div key={document.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
                  {document.name}
                  {document.mandatory && (
                    <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">
                      Required
                    </span>
                  )}
                </h3>
                <p className="text-gray-600 mt-1">{document.description}</p>
                {document.feedback && (
                  <p className="text-red-600 text-sm mt-2">{document.feedback}</p>
                )}
              </div>
              <div className="flex items-center gap-2">
                {getStatusIcon(document.status)}
                <span className={`text-sm ${
                  document.status === 'uploaded' ? 'text-green-600' :
                  document.status === 'rejected' ? 'text-red-600' :
                  'text-yellow-600'
                }`}>
                  {getStatusText(document.status)}
                </span>
              </div>
            </div>

            {document.status !== 'uploaded' && (
              <div className="mt-4">
                <label className="block">
                  <span className="sr-only">Choose file</span>
                  <input
                    type="file"
                    className="block w-full text-sm text-gray-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-full file:border-0
                      file:text-sm file:font-semibold
                      file:bg-primary file:text-white
                      hover:file:bg-primary/90"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFileUpload(document.id, file);
                    }}
                  />
                </label>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-end">
        <button
          className="btn bg-primary text-white"
          disabled={!allMandatoryUploaded}
        >
          Submit All Documents
        </button>
      </div>
    </div>
  );
};

export default DocumentUpload;