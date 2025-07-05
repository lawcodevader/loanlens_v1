import { useState } from 'react';
import { FileText, Upload, Search, Tag, CheckCircle, Trash2, Eye, Download } from 'lucide-react';
import { PDFViewer, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

interface Template {
  id: string;
  name: string;
  description: string;
  tags: string[];
  checklists: string[];
  dateUploaded: string;
  lastModified: string;
  content?: string;
}

// Create styles for PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 30,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  text: {
    fontSize: 12,
    marginBottom: 10,
  },
  tag: {
    fontSize: 10,
    color: '#1e40af',
    marginRight: 5,
  },
});

// PDF Preview Component
const PDFPreview = ({ template }: { template: Template }) => (
  <PDFViewer style={{ width: '100%', height: '600px' }}>
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.header}>{template.name}</Text>
          <Text style={styles.text}>{template.description}</Text>
          
          <Text style={styles.text}>Tags:</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {template.tags.map((tag, index) => (
              <Text key={index} style={styles.tag}>#{tag}</Text>
            ))}
          </View>
          
          <Text style={styles.text}>Connected Checklists:</Text>
          {template.checklists.map((checklist, index) => (
            <Text key={index} style={styles.text}>• {checklist}</Text>
          ))}
          
          {template.content && (
            <>
              <Text style={styles.text}>Template Content:</Text>
              <Text style={styles.text}>{template.content}</Text>
            </>
          )}
        </View>
      </Page>
    </Document>
  </PDFViewer>
);

const TemplateManager = () => {
  const [templates, setTemplates] = useState<Template[]>([
    {
      id: '1',
      name: 'Standard Property Report',
      description: 'Default template for property verification reports',
      tags: ['property_address', 'owner_name', 'property_type'],
      checklists: ['Basic Property Verification', 'Legal Documentation'],
      dateUploaded: '2024-02-15',
      lastModified: '2024-02-20',
      content: 'This is a sample template content with placeholders for property details.'
    },
    {
      id: '2',
      name: 'Legal Review Template',
      description: 'Comprehensive legal review report template',
      tags: ['legal_status', 'encumbrance_details', 'litigation_status'],
      checklists: ['Legal Documentation', 'Title Verification'],
      dateUploaded: '2024-02-10',
      lastModified: '2024-02-18',
      content: 'Legal review template with sections for property documentation analysis.'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        const newTemplate: Template = {
          id: `${templates.length + 1}`,
          name: file.name.replace(/\.[^/.]+$/, ""),
          description: 'New template uploaded',
          tags: [],
          checklists: [],
          dateUploaded: new Date().toISOString().split('T')[0],
          lastModified: new Date().toISOString().split('T')[0],
          content
        };
        setTemplates([...templates, newTemplate]);
      };
      reader.readAsText(file);
    }
  };

  const handleDeleteTemplate = (templateId: string) => {
    setTemplates(templates.filter(t => t.id !== templateId));
  };

  const filteredTemplates = templates.filter(template =>
    template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    template.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Template Manager</h1>
        <label className="btn bg-primary text-white cursor-pointer">
          <Upload className="h-4 w-4 mr-2" />
          Upload Template
          <input
            type="file"
            className="hidden"
            accept=".docx,.doc,.pdf"
            onChange={handleFileUpload}
          />
        </label>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-4 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search templates..."
              className="input pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Template Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tags
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Connected Checklists
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Modified
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTemplates.map((template) => (
                <tr key={template.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{template.name}</div>
                      <div className="text-sm text-gray-500">{template.description}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-2">
                      {template.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-800"
                        >
                          <Tag className="h-3 w-3 mr-1" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-2">
                      {template.checklists.map((checklist, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800"
                        >
                          <CheckCircle className="h-3 w-3 mr-1" />
                          {checklist}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {template.lastModified}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          setSelectedTemplate(template);
                          setShowPreview(true);
                        }}
                        className="text-primary hover:text-primary/90"
                        title="Preview"
                      >
                        <Eye className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDeleteTemplate(template.id)}
                        className="text-red-500 hover:text-red-700"
                        title="Delete"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredTemplates.length === 0 && (
          <div className="text-center py-8">
            <FileText className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No templates found</h3>
            <p className="mt-1 text-sm text-gray-500">Upload a new template to get started.</p>
          </div>
        )}
      </div>

      {showPreview && selectedTemplate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-4xl h-[80vh] flex flex-col">
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="text-xl font-semibold">{selectedTemplate.name}</h2>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowPreview(false)}
                  className="text-gray-400 hover:text-gray-500 p-2"
                >
                  ×
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-hidden p-4">
              <PDFPreview template={selectedTemplate} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TemplateManager;