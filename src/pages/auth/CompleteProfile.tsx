import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { roles, UserRole } from '../../constants/roles';

const CompleteProfile = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole | ''>('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  const { completeProfile, user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !selectedRole) {
      setError('All fields are required');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      await completeProfile(name, email, selectedRole as UserRole);
      
      // Navigate based on role
      if (selectedRole === roles.ADVOCATE) {
        navigate('/advocate-panel');
      } else if (selectedRole === roles.ADMIN) {
        navigate('/portfolio');
      } else {
        navigate('/');
      }
    } catch (err) {
      setError('Failed to update profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <h3 className="text-lg font-medium text-gray-900">Complete Your Profile</h3>
      
      {user && (
        <div className="bg-blue-50 p-3 rounded-md text-sm text-blue-800">
          <p>Mobile Number: {user.mobile}</p>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <div className="mt-1">
            <input
              id="name"
              name="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              className="input w-full"
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <div className="mt-1">
            <input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="input w-full"
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="role" className="block text-sm font-medium text-gray-700">
            Select Role
          </label>
          <div className="mt-1">
            <select
              id="role"
              name="role"
              required
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value as UserRole)}
              className="input w-full"
            >
              <option value="">Select a role</option>
              <option value={roles.ADMIN}>Admin</option>
              <option value={roles.ADVOCATE}>Advocate</option>
              <option value={roles.BORROWER}>Borrower</option>
            </select>
          </div>
        </div>
        
        {error && <p className="text-sm text-red-600">{error}</p>}
        
        <div>
          <button
            type="submit"
            disabled={isLoading}
            className="btn btn-primary w-full"
          >
            {isLoading ? 'Saving...' : 'Complete Profile'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CompleteProfile;