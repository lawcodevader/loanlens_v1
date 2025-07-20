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
  X,
  Package
} from 'lucide-react';
import { sendBulkEmails, EmailTemplate } from '../../services/emailService';

// Communication templates for different document types
const communicationTemplates: Record<string, EmailTemplate> = {
  'basic-docs': {
    title: 'Basic Documentation Request',
    documents: [
      'Identity Proof (Aadhar/PAN)',
      'Address Proof',
      'Income Proof (Salary Slips)',
      'Bank Statements (Last 6 months)',
      'Employment Certificate'
    ],
    message: 'Please provide the following basic documents to proceed with your loan application.'
  },
  'property-docs': {
    title: 'Property Documentation Request',
    documents: [
      'Property Registration Documents',
      'Encumbrance Certificate',
      'Property Tax Receipts',
      'Building Approval Plans',
      'NOC from Society/Association',
      'Property Valuation Report'
    ],
    message: 'Please submit the following property-related documents for verification.'
  },
  'advanced-docs': {
    title: 'Advanced Documentation Request',
    documents: [
      'Business Financial Statements',
      'IT Returns (Last 3 years)',
      'GST Registration Certificate',
      'Partnership Deed/Company Documents',
      'Projected Financial Statements',
      'Collateral Security Documents',
      'Insurance Policies'
    ],
    message: 'Please provide the following advanced documents for comprehensive loan processing.'
  }
};

// Mock data with email addresses and additional property fields
const mockLoans = [
  { 
    id: 'L001', 
    applicantName: 'Rajesh Kumar', 
    email: 'macman.chris@gmail.com', 
    city: 'Mumbai', 
    state: 'Maharashtra', 
    mortgageAmount: 8500000, 
    propertyValue: 12000000,
    propertyArea: 1200,
    propertyType: 'Residential Apartment',
    propertyAddress: 'Flat 15B, Sunshine Towers, Andheri West, Mumbai - 400058',
    branch: 'Mumbai Central',
    status: 'pending', 
    tags: ['residential', 'first-time'], 
    checklist: 'Basic Property' 
  },
  { 
    id: 'L002', 
    applicantName: 'Priya Sharma', 
    email: 'priya.sharma@example.com', 
    city: 'Delhi', 
    state: 'Delhi', 
    mortgageAmount: 6500000, 
    propertyValue: 9000000,
    propertyArea: 950,
    propertyType: 'Commercial Office',
    propertyAddress: 'Office 302, Business Park, Connaught Place, New Delhi - 110001',
    branch: 'Connaught Place',
    status: 'verified', 
    tags: ['commercial'], 
    checklist: 'Commercial Property' 
  },
  { 
    id: 'L003', 
    applicantName: 'Amit Patel', 
    email: 'amit.patel@example.com', 
    city: 'Bangalore', 
    state: 'Karnataka', 
    mortgageAmount: 5500000, 
    propertyValue: 7800000,
    propertyArea: 1100,
    propertyType: 'Residential Villa',
    propertyAddress: 'Villa 25, Green Meadows, Whitefield, Bangalore - 560066',
    branch: 'Koramangala',
    status: 'pending', 
    tags: ['residential'], 
    checklist: 'Basic Property' 
  },
  { 
    id: 'L004', 
    applicantName: 'Sunita Reddy', 
    email: 'sunita.reddy@example.com', 
    city: 'Hyderabad', 
    state: 'Telangana', 
    mortgageAmount: 4200000, 
    propertyValue: 6000000,
    propertyArea: 850,
    propertyType: 'Residential Plot',
    propertyAddress: 'Plot 45, Sector 12, Gachibowli, Hyderabad - 500032',
    branch: 'Banjara Hills',
    status: 'allocated', 
    tags: ['residential', 'refinance'], 
    checklist: 'Refinance' 
  },
  { 
    id: 'L005', 
    applicantName: 'Vikram Singh', 
    email: 'vikram.singh@example.com', 
    city: 'Pune', 
    state: 'Maharashtra', 
    mortgageAmount: 3800000, 
    propertyValue: 5200000,
    propertyArea: 750,
    propertyType: 'Commercial Shop',
    propertyAddress: 'Shop 12, Phoenix Mall, Viman Nagar, Pune - 411014',
    branch: 'Koregaon Park',
    status: 'noDocuments', 
    tags: ['commercial'], 
    checklist: 'Commercial Property' 
  },
  { 
    id: 'L006', 
    applicantName: 'Meera Iyer', 
    email: 'meera.iyer@example.com', 
    city: 'Chennai', 
    state: 'Tamil Nadu', 
    mortgageAmount: 7200000, 
    propertyValue: 9500000,
    propertyArea: 1400,
    propertyType: 'Residential Apartment',
    propertyAddress: 'Flat 8C, Marina Heights, T Nagar, Chennai - 600017',
    branch: 'Anna Nagar',
    status: 'verified', 
    tags: ['residential'], 
    checklist: 'Basic Property' 
  },
  { 
    id: 'L007', 
    applicantName: 'Arjun Mehta', 
    email: 'arjun.mehta@example.com', 
    city: 'Ahmedabad', 
    state: 'Gujarat', 
    mortgageAmount: 3200000, 
    propertyValue: 4500000,
    propertyArea: 680,
    propertyType: 'Commercial Warehouse',
    propertyAddress: 'Warehouse 5, Industrial Estate, Vatva, Ahmedabad - 382445',
    branch: 'Satellite',
    status: 'allocated', 
    tags: ['commercial', 'refinance'], 
    checklist: 'Commercial Refinance' 
  },
  { 
    id: 'L008', 
    applicantName: 'Kavita Joshi', 
    email: 'kavita.joshi@example.com', 
    city: 'Kolkata', 
    state: 'West Bengal', 
    mortgageAmount: 4800000, 
    propertyValue: 6500000,
    propertyArea: 920,
    propertyType: 'Residential Apartment',
    propertyAddress: 'Flat 22D, Lake View Complex, Salt Lake, Kolkata - 700091',
    branch: 'Park Street',
    status: 'noDocuments', 
    tags: ['residential'], 
    checklist: 'Basic Property' 
  },
  { 
    id: 'L009', 
    applicantName: 'Rahul Verma', 
    email: 'rahul.verma@example.com', 
    city: 'Jaipur', 
    state: 'Rajasthan', 
    mortgageAmount: 3500000, 
    propertyValue: 4800000,
    propertyArea: 800,
    propertyType: 'Commercial Office',
    propertyAddress: 'Office 15, Business Center, Malviya Nagar, Jaipur - 302017',
    branch: 'C-Scheme',
    status: 'verified', 
    tags: ['commercial'], 
    checklist: 'Commercial Property' 
  },
  { 
    id: 'L010', 
    applicantName: 'Anjali Desai', 
    email: 'anjali.desai@example.com', 
    city: 'Lucknow', 
    state: 'Uttar Pradesh', 
    mortgageAmount: 2800000, 
    propertyValue: 3800000,
    propertyArea: 650,
    propertyType: 'Residential Plot',
    propertyAddress: 'Plot 78, Sector 8, Gomti Nagar, Lucknow - 226010',
    branch: 'Hazratganj',
    status: 'pending', 
    tags: ['residential', 'first-time'], 
    checklist: 'Basic Property' 
  },
  { 
    id: 'L011', 
    applicantName: 'Suresh Kumar', 
    email: 'suresh.kumar@example.com', 
    city: 'Indore', 
    state: 'Madhya Pradesh', 
    mortgageAmount: 4200000, 
    propertyValue: 5800000,
    propertyArea: 900,
    propertyType: 'Commercial Mall',
    propertyAddress: 'Shop 45, Treasure Island Mall, Vijay Nagar, Indore - 452010',
    branch: 'Palasia',
    status: 'allocated', 
    tags: ['commercial'], 
    checklist: 'Commercial Property' 
  },
  { 
    id: 'L012', 
    applicantName: 'Rashmi Gupta', 
    email: 'rashmi.gupta@example.com', 
    city: 'Chandigarh', 
    state: 'Chandigarh', 
    mortgageAmount: 6800000, 
    propertyValue: 9200000,
    propertyArea: 1300,
    propertyType: 'Luxury Villa',
    propertyAddress: 'Villa 12, Elite Gardens, Sector 5, Chandigarh - 160005',
    branch: 'Sector 17',
    status: 'collected', 
    tags: ['residential', 'luxury'], 
    checklist: 'Luxury Property' 
  },
  { 
    id: 'L013', 
    applicantName: 'Deepak Sharma', 
    email: 'deepak.sharma@example.com', 
    city: 'Dehradun', 
    state: 'Uttarakhand', 
    mortgageAmount: 5200000, 
    propertyValue: 7200000,
    propertyArea: 1100,
    propertyType: 'Commercial Complex',
    propertyAddress: 'Office 8, Business Hub, Rajpur Road, Dehradun - 248001',
    branch: 'Paltan Bazaar',
    status: 'collected', 
    tags: ['commercial', 'office'], 
    checklist: 'Commercial Property' 
  },
  { 
    id: 'L014', 
    applicantName: 'Pooja Singh', 
    email: 'pooja.singh@example.com', 
    city: 'Bhopal', 
    state: 'Madhya Pradesh', 
    mortgageAmount: 3800000, 
    propertyValue: 5200000,
    propertyArea: 850,
    propertyType: 'Eco-Friendly Apartment',
    propertyAddress: 'Flat 33, Green Valley, Arera Colony, Bhopal - 462016',
    branch: 'MP Nagar',
    status: 'collected', 
    tags: ['residential', 'eco-friendly'], 
    checklist: 'Green Property' 
  },
  { 
    id: 'L015', 
    applicantName: 'Manoj Tiwari', 
    email: 'manoj.tiwari@example.com', 
    city: 'Patna', 
    state: 'Bihar', 
    mortgageAmount: 3200000, 
    propertyValue: 4200000,
    propertyArea: 720,
    propertyType: 'Investment Property',
    propertyAddress: 'Flat 18, Capital Heights, Bailey Road, Patna - 800001',
    branch: 'Gandhi Maidan',
    status: 'collected', 
    tags: ['residential', 'investment'], 
    checklist: 'Investment Property' 
  },
  { 
    id: 'L016', 
    applicantName: 'Neha Kapoor', 
    email: 'neha.kapoor@example.com', 
    city: 'Gurgaon', 
    state: 'Haryana', 
    mortgageAmount: 5800000, 
    propertyValue: 7800000,
    propertyArea: 1100,
    propertyType: 'Residential Apartment',
    propertyAddress: 'Flat 45, Cyber City Heights, DLF Phase 2, Gurgaon - 122002',
    branch: 'Cyber City',
    status: 'tsrReady', 
    tags: ['residential', 'first-time'], 
    checklist: 'Basic Property' 
  },
  { 
    id: 'L017', 
    applicantName: 'Sanjay Malhotra', 
    email: 'sanjay.malhotra@example.com', 
    city: 'Noida', 
    state: 'Uttar Pradesh', 
    mortgageAmount: 4500000, 
    propertyValue: 6200000,
    propertyArea: 950,
    propertyType: 'Commercial Office',
    propertyAddress: 'Office 12, Sector 62, Noida - 201301',
    branch: 'Sector 18',
    status: 'tsrReady', 
    tags: ['commercial'], 
    checklist: 'Commercial Property' 
  },
  { 
    id: 'L018', 
    applicantName: 'Ritu Sharma', 
    email: 'ritu.sharma@example.com', 
    city: 'Faridabad', 
    state: 'Haryana', 
    mortgageAmount: 3800000, 
    propertyValue: 5200000,
    propertyArea: 850,
    propertyType: 'Residential Villa',
    propertyAddress: 'Villa 8, Green Valley, Sector 21C, Faridabad - 121001',
    branch: 'Sector 15',
    status: 'tsrReady', 
    tags: ['residential'], 
    checklist: 'Basic Property' 
  },
];

const Portfolio = () => {
  console.log('Portfolio component rendering...');
  
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
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handlePropCollectAction = (type: string) => {
    const template = communicationTemplates[type as keyof typeof communicationTemplates];
    if (template) {
      setSelectedTemplate(type);
      console.log(`Template selected: ${type}`);
    }
    
    setShowPropCollectDropdown(false);
  };

  const handleSubmit = async () => {
    if (!selectedTemplate || selectedLoans.length === 0) {
      alert('Please select a template and at least one applicant.');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const template = communicationTemplates[selectedTemplate as keyof typeof communicationTemplates];
      const selectedApplicants = mockLoans.filter(loan => selectedLoans.includes(loan.id));
      
      // Send emails using the email service
      const results = await sendBulkEmails(selectedApplicants, template);
      
      // Show detailed results
      const successMessage = `✅ Successfully sent "${template.title}" to ${results.success} applicant(s)`;
      const failedMessage = results.failed > 0 ? `\n❌ Failed to send to ${results.failed} applicant(s)` : '';
      const detailsMessage = results.details.length > 0 ? `\n\nDetails:\n${results.details.join('\n')}` : '';
      
      alert(successMessage + failedMessage + detailsMessage);
      
      // Reset states
      setSelectedLoans([]);
      setSelectedTemplate(null);
      setActiveAction(null);
      
    } catch (error) {
      console.error('Error sending emails:', error);
      alert('❌ Failed to send emails. Please check your API key and try again.');
    } finally {
      setIsSubmitting(false);
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
      case 'collected':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
            <Package className="mr-1 h-3 w-3" />
            Collected
          </span>
        );
      case 'tsrReady':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
            <CheckCircle className="mr-1 h-3 w-3" />
            TSR Ready
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
      loan.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loan.propertyType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loan.propertyAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loan.branch.toLowerCase().includes(searchTerm.toLowerCase());
      
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
                  <button 
                    className="text-left w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => handlePropCollectAction('basic-docs')}
                  >
                    Basic Docs
                  </button>
                  <button 
                    className="text-left w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => handlePropCollectAction('property-docs')}
                  >
                    Property Docs
                  </button>
                  <button 
                    className="text-left w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => handlePropCollectAction('advanced-docs')}
                  >
                    Advanced Docs
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
              onClick={() => setActiveFilter(activeFilter === 'noDocuments' ? null : 'noDocuments')}
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                activeFilter === 'noDocuments' 
                  ? 'bg-red-500 text-white' 
                  : 'bg-red-100 text-red-800 hover:bg-red-200'
              }`}
            >
              No Documents
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
              onClick={() => setActiveFilter(activeFilter === 'collected' ? null : 'collected')}
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                activeFilter === 'collected' 
                  ? 'bg-purple-500 text-white' 
                  : 'bg-purple-100 text-purple-800 hover:bg-purple-200'
              }`}
            >
              Collected
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
              onClick={() => setActiveFilter(activeFilter === 'tsrReady' ? null : 'tsrReady')}
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                activeFilter === 'tsrReady' 
                  ? 'bg-orange-500 text-white' 
                  : 'bg-orange-100 text-orange-800 hover:bg-orange-200'
              }`}
            >
              TSR Ready
            </button>
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
              <h3 className="text-sm font-medium text-gray-700 mb-2">Product Type</h3>
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
                  Property Value
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Property Area (sq ft)
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Property Type
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Property Address
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Branch
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tags
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  PRODUCT TYPE
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
                    ₹{loan.mortgageAmount.toLocaleString('en-IN')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ₹{loan.propertyValue.toLocaleString('en-IN')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {loan.propertyArea} sq ft
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {loan.propertyType}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {loan.propertyAddress}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {loan.branch}
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
            {selectedTemplate && (
              <p className="text-purple-600 font-medium">
                Template: {communicationTemplates[selectedTemplate as keyof typeof communicationTemplates]?.title}
              </p>
            )}
          </div>
          
          {selectedTemplate && selectedLoans.length > 0 && (
            <button 
              className={`btn ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary hover:bg-primary/90'} text-white flex items-center gap-2`}
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Sending...
                </>
              ) : (
                <>
                  📧 Send Email
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Portfolio;