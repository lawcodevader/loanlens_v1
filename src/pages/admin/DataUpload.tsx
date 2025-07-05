import { useState } from 'react';
import { Upload, FileText, CheckCircle, XCircle } from 'lucide-react';

interface UploadedFile {
  name: string;
  size: string;
  status: 'uploading' | 'success' | 'error';
  progress: number;
}

const ETSRBeta = () => {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    handleFiles(droppedFiles);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files ? Array.from(e.target.files) : [];
    handleFiles(selectedFiles);
  };

  const handleFiles = (newFiles: File[]) => {
    const uploadedFiles = newFiles.map(file => ({
      name: file.name,
      size: formatFileSize(file.size),
      status: 'uploading' as const,
      progress: 0
    }));

    setFiles(prev => [...prev, ...uploadedFiles]);

    // Simulate file upload
    uploadedFiles.forEach((file, index) => {
      simulateUpload(file, index);
    });
  };

  const simulateUpload = (file: UploadedFile, index: number) => {
    const interval = setInterval(() => {
      setFiles(prev => {
        const newFiles = [...prev];
        if (newFiles[index].progress < 100) {
          newFiles[index].progress += 10;
        } else {
          clearInterval(interval);
          newFiles[index].status = Math.random() > 0.1 ? 'success' : 'error';
        }
        return newFiles;
      });
    }, 300);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Upload className="h-6 w-6" />
          eTSR (beta)
        </h1>
        <p className="text-gray-600 mt-2">
          Upload and manage your property verification documents
        </p>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div 
          className={`p-8 border-2 border-dashed rounded-lg ${
            dragActive ? 'border-primary bg-primary/5' : 'border-gray-300'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div className="text-center">
            <FileText className="mx-auto h-12 w-12 text-gray-400" />
            <div className="mt-4">
              <label className="cursor-pointer">
                <span className="mt-2 text-base leading-normal">
                  Drag and drop files here, or{' '}
                  <span className="text-primary hover:underline">browse</span>
                </span>
                <input
                  type="file"
                  className="hidden"
                  multiple
                  onChange={handleFileInput}
                />
              </label>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Supported file types: PDF, DOC, DOCX, XLS, XLSX
            </p>
          </div>
        </div>

        {files.length > 0 && (
          <div className="p-6 border-t">
            <h3 className="text-lg font-medium mb-4">Uploaded Files</h3>
            <div className="space-y-4">
              {files.map((file, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <FileText className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{file.name}</p>
                      <p className="text-xs text-gray-500">{file.size}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    {file.status === 'uploading' ? (
                      <div className="w-24">
                        <div className="h-1 bg-gray-200 rounded">
                          <div 
                            className="h-1 bg-primary rounded transition-all duration-300"
                            style={{ width: `${file.progress}%` }}
                          />
                        </div>
                      </div>
                    ) : file.status === 'success' ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-500" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ETSRBeta;