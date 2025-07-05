import { useState } from 'react';
import { 
  Search, 
  Filter, 
  List, 
  CheckCircle, 
  Clock, 
  UserCheck,
  ChevronDown,
  AlertCircle,
  X
} from 'lucide-react';

// Mock data
const mockLoans = [
  { id: 'L001', applicantName: 'John Doe', city: 'Los Angeles', state: 'CA', mortgageAmount: 350000, status: 'pending', tags: ['residential', 'first-time'], checklist: 'Basic Property' },
  { id: 'L002', applicantName: 'Jane Smith', city: 'New York', state: 'NY', mortgageAmount: 420000, status: 'verified', tags: ['commercial'], checklist: 'Commercial Property' },
  { id: 'L003', applicantName: 'Michael Johnson', city: 'Chicago', state: 'IL', mortgageAmount: 275000, status: 'pending', tags: ['residential'], checklist: 'Basic Property' },
  { id: 'L004', applicantName: 'Emily Brown', city: 'Houston', state: 'TX', mortgageAmount: 300000, status: 'allocated', tags: ['residential', 'refinance'], checklist: 'Refinance' },
  { id: 'L005', applicantName: 'David Wilson', city: 'Phoenix', state: 'AZ', mortgageAmount: 390000, status: 'noDocuments', tags: ['commercial'], checklist: 'Commercial Property' },
  { id: 'L006', applicantName: 'Sarah White', city: 'San Francisco', state: 'CA', mortgageAmount: 500000, status: 'verified', tags: ['residential'], checklist: 'Basic Property' },
  { id: 'L007', applicantName: 'Kevin Lee', city: 'Austin', state: 'TX', mortgageAmount: 260000, status: 'allocated', tags: ['commercial', 'refinance'], checklist: 'Commercial Refinance' },
  { id: 'L008', applicantName: 'Jessica Green', city: 'Philadelphia', state: 'PA', mortgageAmount: 325000, status: 'noDocuments', tags: ['residential'], checklist: 'Basic Property' },
  { id: 'L009', applicantName: 'Daniel Kim', city: 'San Diego', state: 'CA', mortgageAmount: 400000, status: 'verified', tags: ['commercial'], checklist: 'Commercial Property' },
  { id: 'L010', applicantName: 'Laura Brown', city: 'Dallas', state: 'TX', mortgageAmount: 275000, status: 'pending', tags: ['residential', 'first-time'], checklist: 'Basic Property' },
  { id: 'L011', applicantName: 'Tom Harris', city: 'Seattle', state: 'WA', mortgageAmount: 370000, status: 'allocated', tags: ['commercial'], checklist: 'Commercial Property' },
];

const Portfolio = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLoans, setSelectedLoans] = useState<string[]>([]);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [activeAction, setActiveAction] = useState<'propCollect' | 'eTSR' | 'eVerify' | null>(null);
  const [showPropCollectDropdown, setShowPropCollectDropdown] = useState(false);
  const [showTSRDropdown, setShowTSRDropdown] = useState(false);
  const [showVerifyDropdown, setShowVerifyDropdown] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedChecklists, setSelectedChecklists] = useState<string[]>([]);

  // Extract unique tags and checklists
  const allTags = Array.from(new Set(mockLoans.flatMap(loan => loan.tags)));
  const allChecklists = Array.from(new Set(mockLoans.map(loan => loan.checklist)));

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedLoans(filteredLoans.map(loan => loan.id));
    } else {
      setSelectedLoans([]);
    }
  };

  const handleSelectLoan = (loanId: string) => {
    if (selectedLoans.includes(loanId)) {
      setSelectedLoans(selectedLoans.filter(id => id !== loanId));
    } else {
      setSelectedLoans([...selectedLoans, loanId]);
    }
  };

  const handleActionClick = (action: 'propCollect' | 'eTSR' | 'eVerify') => {
    // Don't allow eTSR for loans with no documents
    if (action === 'eTSR' && selectedLoans.some(id => 
      mockLoans.find(loan => loan.id === id)?.status === 'noDocuments'
    )) {
      return;
    }

    if (activeAction === action) {
      setActiveAction(null);
      setShowPropCollectDropdown(false);
      setShowTSRDropdown(false);
      setShowVerifyDropdown(false);
    } else {
      setActiveAction(action);
      setShowPropCollectDropdown(action === 'propCollect');
      setShowTSRDropdown(action === 'eTSR');
      setShowVerifyDropdown(action === 'eVerify');
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'verified':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle className="mr-1 h-3 w-3" />
            Verified
          </span>
        );
      case 'allocated':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <UserCheck className="mr-1 h-3 w-3" />
            Allocated
          </span>
        );
      case 'noDocuments':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <AlertCircle className="mr-1 h-3 w-3" />
            No Documents
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            <Clock className="mr-1 h-3 w-3" />
            Pending
          </span>
        );
    }
  };

  // Filter loans based on all criteria
  const filteredLoans = mockLoans.filter(loan => {
    const matchesSearch = 
      loan.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loan.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loan.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loan.state.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesStatus = !activeFilter || loan.status === activeFilter;
    const matchesTags = selectedTags.length === 0 || selectedTags.every(tag => loan.tags.includes(tag));
    const matchesChecklists = selectedChecklists.length === 0 || selectedChecklists.includes(loan.checklist);

    return matchesSearch && matchesStatus && matchesTags && matchesChecklists;
  });

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Company Loan Portfolio</h1>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 flex flex-col sm:flex-row gap-4">
          {/* Action Buttons */}
          <div className="relative">
            <button 
              onClick={() => handleActionClick('propCollect')}
              className={`btn ${activeAction === 'propCollect' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700'} flex items-center`}
              disabled={activeAction !== null && activeAction !== 'propCollect'}
            >
              PropCollect
              <ChevronDown className="ml-2 h-4 w-4" />
            </button>
            
            {showPropCollectDropdown && (
              <div className="absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                <div className="py-1" role="none">
                  <button className="text-left w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Basic Property
                  </button>
                  <button className="text-left w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Commercial Property
                  </button>
                  <button className="text-left w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Refinance
                  </button>
                </div>
              </div>
            )}
          </div>
          
          <div className="relative">
            <button 
              onClick={() => handleActionClick('eTSR')}
              className={`btn ${activeAction === 'eTSR' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700'} flex items-center`}
              disabled={
                (activeAction !== null && activeAction !== 'eTSR') ||
                selectedLoans.some(id => mockLoans.find(loan => loan.id === id)?.status === 'noDocuments')
              }
            >
              eTSR
              <ChevronDown className="ml-2 h-4 w-4" />
            </button>
            
            {showTSRDropdown && (
              <div className="absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                <div className="py-1" role="none">
                  <button className="text-left w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Generate TSR
                  </button>
                  <button className="text-left w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    View TSR Reports
                  </button>
                </div>
              </div>
            )}
          </div>
          
          <div className="relative">
            <button 
              onClick={() => handleActionClick('eVerify')}
              className={`btn ${activeAction === 'eVerify' ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700'} flex items-center`}
              disabled={activeAction !== null && activeAction !== 'eVerify'}
            >
              eVerify
              <ChevronDown className="ml-2 h-4 w-4" />
            </button>
            
            {showVerifyDropdown && (
              <div className="absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                <div className="py-1" role="none">
                  <div className="px-4 py-2">
                    <div className="flex items-center">
                      <input
                        id="allocate-loans"
                        type="checkbox"
                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                      />
                      <label htmlFor="allocate-loans" className="ml-2 block text-sm text-gray-900">
                        Allocate Loans
                      </label>
                    </div>
                    <div className="flex items-center mt-2">
                      <input
                        id="generate-sign"
                        type="checkbox"
                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                      />
                      <label htmlFor="generate-sign" className="ml-2 block text-sm text-gray-900">
                        Generate Sign
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search Bar */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input pl-10 pr-10"
            />
            {searchTerm && (
              <button
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setSearchTerm('')}
              >
                <span className="text-gray-400 hover:text-gray-500">×</span>
              </button>
            )}
          </div>
          
          {/* Quick Filters */}
          <div className="flex gap-2 items-center overflow-x-auto">
            <span className="text-sm font-medium text-gray-700">Quick Filters:</span>
            <button
              onClick={() => setActiveFilter(activeFilter === 'verified' ? null : 'verified')}
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                activeFilter === 'verified' 
                  ? 'bg-green-500 text-white' 
                  : 'bg-green-100 text-green-800 hover:bg-green-200'
              }`}
            >
              Verified
            </button>
            <button
              onClick={() => setActiveFilter(activeFilter === 'pending' ? null : 'pending')}
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                activeFilter === 'pending' 
                  ? 'bg-gray-500 text-white' 
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              Pending
            </button>
            <button
              onClick={() => setActiveFilter(activeFilter === 'allocated' ? null : 'allocated')}
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                activeFilter === 'allocated' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
              }`}
            >
              Allocated
            </button>
            <button
              onClick={() => setActiveFilter(activeFilter === 'noDocuments' ? null : 'noDocuments')}
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                activeFilter === 'noDocuments' 
                  ? 'bg-red-500 text-white' 
                  : 'bg-red-100 text-red-800 hover:bg-red-200'
              }`}
            >
              No Documents
            </button>
          </div>
          
          {/* View Controls */}
          <div className="flex gap-2">
            <button className="p-2 rounded-md hover:bg-gray-100">
              <List className="h-5 w-5 text-gray-500" />
            </button>
            <button 
              className={`p-2 rounded-md hover:bg-gray-100 ${showFilters ? 'bg-gray-100' : ''}`}
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-5 w-5 text-gray-500" />
            </button>
          </div>
        </div>
      </div>

      {/* Advanced Filters */}
      {showFilters && (
        <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {allTags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => {
                      if (selectedTags.includes(tag)) {
                        setSelectedTags(selectedTags.filter(t => t !== tag));
                      } else {
                        setSelectedTags([...selectedTags, tag]);
                      }
                    }}
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      selectedTags.includes(tag)
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Checklists</h3>
              <div className="flex flex-wrap gap-2">
                {allChecklists.map(checklist => (
                  <button
                    key={checklist}
                    onClick={() => {
                      if (selectedChecklists.includes(checklist)) {
                        setSelectedChecklists(selectedChecklists.filter(c => c !== checklist));
                      } else {
                        setSelectedChecklists([...selectedChecklists, checklist]);
                      }
                    }}
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      selectedChecklists.includes(checklist)
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {checklist}
                  </button>
                ))}
              </div>
            </div>
          </div>
          {(selectedTags.length > 0 || selectedChecklists.length > 0) && (
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => {
                  setSelectedTags([]);
                  setSelectedChecklists([]);
                }}
                className="text-sm text-gray-600 hover:text-gray-900 flex items-center"
              >
                <X className="h-4 w-4 mr-1" />
                Clear Filters
              </button>
            </div>
          )}
        </div>
      )}
      
      <div className="bg-white shadow overflow-hidden rounded-lg">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedLoans.length === filteredLoans.length && filteredLoans.length > 0}
                      onChange={handleSelectAll}
                      className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                    />
                    <span className="ml-2">Select</span>
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Loan ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Applicant Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  City
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  State
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Mortgage Amount
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tags
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Checklist
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredLoans.map((loan) => (
                <tr key={loan.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={selectedLoans.includes(loan.id)}
                      onChange={() => handleSelectLoan(loan.id)}
                      className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {loan.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {loan.applicantName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {loan.city}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {loan.state}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${loan.mortgageAmount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {getStatusBadge(loan.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex flex-wrap gap-1">
                      {loan.tags.map((tag, index) => (
                        <span key={index} className="px-2 py-1 rounded-full text-xs bg-gray-100">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {loan.checklist}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredLoans.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-gray-500">No loans found</p>
          </div>
        )}
        
        <div className="bg-gray-50 px-6 py-3 border-t border-gray-200 flex justify-between items-center">
          <div className="text-sm text-gray-500">
            {selectedLoans.length > 0 ? (
              <p>Selected {selectedLoans.length} of {filteredLoans.length} loans</p>
            ) : (
              <p>Total {filteredLoans.length} loans</p>
            )}
          </div>
          
          {activeAction && selectedLoans.length > 0 && (
            <button className="btn bg-primary text-white">
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Portfolio;