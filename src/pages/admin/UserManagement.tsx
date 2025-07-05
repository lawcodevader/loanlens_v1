import { useState } from 'react';
import { FileText, Users, FolderOpen } from 'lucide-react';

// Mock data
const mockAdvocates = [
  { id: '001', name: 'John Doe', email: 'john.doe@email.com', profilePhoto: '/avatars/1.jpg' },
  { id: '002', name: 'Jane Smith', email: 'jane.smith@email.com', profilePhoto: '/avatars/2.jpg' },
  { id: '003', name: 'Michael Johnson', email: 'michael.johnson@email.com', profilePhoto: '/avatars/3.jpg' },
  { id: '004', name: 'Emily Brown', email: 'emily.brown@email.com', profilePhoto: '/avatars/4.jpg' },
  { id: '005', name: 'David Wilson', email: 'david.wilson@email.com', profilePhoto: '/avatars/5.jpg' },
  { id: '006', name: 'Sarah Miller', email: 'sarah.miller@email.com', profilePhoto: '/avatars/6.jpg' },
  { id: '007', name: 'Kevin Lee', email: 'kevin.lee@email.com', profilePhoto: '/avatars/7.jpg' },
];

const UserManagement = () => {
  const [activeTab, setActiveTab] = useState('advocate');
  
  return (
    <div className="animate-fade-in">
      <h1 className="text-2xl font-bold mb-6">User Management</h1>
      
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab('advocate')}
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                activeTab === 'advocate'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                Advocate
              </div>
            </button>
            <button
              onClick={() => setActiveTab('admin')}
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                activeTab === 'admin'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                Admin Users
              </div>
            </button>
            <button
              onClick={() => setActiveTab('other')}
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                activeTab === 'other'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center">
                <FolderOpen className="h-5 w-5 mr-2" />
                Other Users
              </div>
            </button>
          </nav>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Profile Photo
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {activeTab === 'advocate' ? 'Advocate' : activeTab === 'admin' ? 'Admin' : 'User'}
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mockAdvocates.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {user.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                      {user.profilePhoto ? (
                        <img
                          src={`https://i.pravatar.cc/150?img=${Number(user.id)}`}
                          alt={user.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-gray-500 text-lg font-semibold">
                          {user.name.charAt(0)}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="bg-primary rounded-md px-4 py-1 text-white text-sm hover:bg-primary/90">
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="mt-6 text-right">
        <button className="btn bg-primary text-white">
          Submit Documents
        </button>
      </div>
    </div>
  );
};

export default UserManagement;