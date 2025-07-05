import { useState } from 'react';
import { Save, ChevronDown, ArrowDown, ArrowUp } from 'lucide-react';

// Mock document types
const documentTypes = [
  'Encumbrance Certificate',
  'Patta',
  'Municipality Water Bill',
  '7/12 document',
  'Sale Deed',
  'Service Agreement',
  'Lease Agreement',
  'Naksha',
  'RoR',
  'Compliance Certificate',
  'Property Tax Receipt',
  'Building Permit',
  'Occupancy Certificate',
  'Land Survey Report',
];

const ChecklistManager = () => {
  const [documentList, setDocumentList] = useState([
    { name: 'Encumbrance Certificate', mandatory: true, type: 'auto' },
    { name: 'Patta', mandatory: false, type: 'user' },
    { name: 'Municipality Water Bill', mandatory: false, type: 'auto' },
    { name: '7/12 document', mandatory: false, type: 'user' },
    { name: 'Sale Deed', mandatory: false, type: 'auto' },
    { name: 'Service Agreement', mandatory: false, type: 'auto' },
    { name: 'Lease Agreement', mandatory: false, type: 'auto' },
    { name: 'Naksha', mandatory: false, type: 'notSubmitted' },
    { name: 'RoR', mandatory: false, type: 'auto' },
    { name: 'Compliance Certificate', mandatory: false, type: 'user' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [newDocumentName, setNewDocumentName] = useState('');
  
  const filteredDocumentTypes = documentTypes.filter(
    (doc) => !documentList.some((item) => item.name === doc) && 
    doc.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleAddDocument = (docName: string) => {
    setDocumentList([
      ...documentList, 
      { 
        name: docName, 
        mandatory: false, 
        type: 'auto' as const
      }
    ]);
    setSearchTerm('');
    setNewDocumentName('');
  };
  
  const handleToggleMandatory = (index: number) => {
    const newDocuments = [...documentList];
    newDocuments[index].mandatory = !newDocuments[index].mandatory;
    setDocumentList(newDocuments);
  };
  
  const handleChangeType = (index: number, type: 'auto' | 'user' | 'notSubmitted') => {
    const newDocuments = [...documentList];
    newDocuments[index].type = type;
    setDocumentList(newDocuments);
  };
  
  const handleRemoveDocument = (index: number) => {
    const newDocuments = [...documentList];
    newDocuments.splice(index, 1);
    setDocumentList(newDocuments);
  };
  
  const handleMoveDocument = (index: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && index === 0) || 
      (direction === 'down' && index === documentList.length - 1)
    ) {
      return;
    }
    
    const newDocuments = [...documentList];
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    
    [newDocuments[index], newDocuments[newIndex]] = [newDocuments[newIndex], newDocuments[index]];
    setDocumentList(newDocuments);
  };
  
  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Checklist Documents</h1>
        
        <div className="flex items-center space-x-2">
          <button className="flex items-center bg-primary text-white rounded-md px-4 py-2">
            <Save className="mr-2 h-4 w-4" />
            Save Checklist Name
          </button>
          <div className="relative">
            <button className="p-2 text-gray-500 rounded-md border border-gray-300">
              <ChevronDown className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
      
      <div className="bg-white shadow-sm rounded-lg p-6">
        {/* Document Search */}
        <div className="mb-6">
          <label htmlFor="document-search" className="block text-sm font-medium text-gray-700 mb-1">
            Add Document
          </label>
          <div className="mt-1 flex rounded-md shadow-sm">
            <div className="relative flex-grow focus-within:z-10">
              <input
                type="text"
                name="document-search"
                id="document-search"
                className="input rounded-none rounded-l-md"
                placeholder="Search for document type"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && filteredDocumentTypes.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-white shadow-lg rounded-md border border-gray-300 max-h-60 overflow-y-auto">
                  {filteredDocumentTypes.map((doc) => (
                    <button
                      key={doc}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100"
                      onClick={() => handleAddDocument(doc)}
                    >
                      {doc}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button
              type="button"
              className="relative -ml-px btn bg-primary text-white rounded-r-md"
              onClick={() => newDocumentName && handleAddDocument(newDocumentName)}
            >
              Add
            </button>
          </div>
        </div>
        
        {/* Document List */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Document Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Mandatory
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {documentList.map((doc, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {doc.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={doc.mandatory}
                      onChange={() => handleToggleMandatory(index)}
                      className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="relative">
                      <button
                        className="px-4 py-2 border border-gray-300 rounded-md bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary flex items-center"
                        onClick={() => {
                          const nextType = doc.type === 'auto' ? 'user' : doc.type === 'user' ? 'notSubmitted' : 'auto';
                          handleChangeType(index, nextType);
                        }}
                      >
                        {doc.type === 'auto' ? 'Auto' : doc.type === 'user' ? 'User' : 'Not Submitted'}
                        <ChevronDown className="ml-2 h-4 w-4" />
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleMoveDocument(index, 'up')}
                        disabled={index === 0}
                        className="text-gray-500 hover:text-gray-700 disabled:opacity-50"
                      >
                        <ArrowUp className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleMoveDocument(index, 'down')}
                        disabled={index === documentList.length - 1}
                        className="text-gray-500 hover:text-gray-700 disabled:opacity-50"
                      >
                        <ArrowDown className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleRemoveDocument(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        &times;
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Metrics */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Checklist Adherence Rate</h3>
            <div className="flex items-end">
              <div className="text-4xl font-bold">50</div>
              <div className="ml-2 text-sm font-medium text-red-500 flex items-center">
                <span>▼ 7.5%</span>
              </div>
            </div>
            <div className="mt-4 relative h-2 bg-gray-200 rounded">
              <div
                className="absolute top-0 left-0 h-full bg-primary rounded"
                style={{ width: '50%' }}
              ></div>
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Automation Level</h3>
            <div className="flex items-end">
              <div className="text-4xl font-bold">7/10</div>
              <div className="ml-2 text-sm font-medium text-green-500 flex items-center">
                <span>▲ 100%</span>
              </div>
            </div>
            <div className="mt-4 relative pt-1">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-primary bg-primary-100">
                    Progress
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-xs font-semibold inline-block text-primary">
                    70%
                  </span>
                </div>
              </div>
              <div className="mt-1 relative h-2 bg-gray-200 rounded">
                <div
                  className="absolute top-0 left-0 h-full bg-primary rounded"
                  style={{ width: '70%' }}
                ></div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 text-right">
          <button
            type="submit"
            className="btn bg-primary text-white"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChecklistManager;