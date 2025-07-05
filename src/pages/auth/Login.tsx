import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Login = () => {
  const [step, setStep] = useState<'mobile' | 'otp'>('mobile');
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  const { login, verifyOtp } = useAuth();

  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!mobile || mobile.length < 10) {
      setError('Please enter a valid mobile number');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      await login(mobile);
      setStep('otp');
    } catch (err) {
      setError('Failed to send OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!otp || otp.length !== 4) {
      setError('Please enter a valid 4-digit OTP');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      const isExistingUser = await verifyOtp(otp);
      
      // If user exists, navigate to dashboard, otherwise to complete profile
      if (isExistingUser) {
        navigate('/portfolio');
      } else {
        navigate('/complete-profile');
      }
    } catch (err) {
      setError('Invalid OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setIsLoading(true);
    setError('');
    
    try {
      await login(mobile);
      setError('');
    } catch (err) {
      setError('Failed to resend OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {step === 'mobile' ? (
        <>
          <h3 className="text-lg font-medium text-gray-900">Sign in with OTP</h3>
          
          <form onSubmit={handleRequestOtp} className="space-y-4">
            <div>
              <label htmlFor="mobile" className="block text-sm font-medium text-gray-700">
                Mobile Number
              </label>
              <div className="mt-1">
                <input
                  id="mobile"
                  name="mobile"
                  type="tel"
                  required
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  placeholder="Enter your mobile number"
                  className="input w-full"
                />
              </div>
            </div>
            
            {error && <p className="text-sm text-red-600">{error}</p>}
            
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="btn btn-primary w-full"
              >
                {isLoading ? 'Sending OTP...' : 'Send OTP'}
              </button>
            </div>
          </form>
        </>
      ) : (
        <>
          <h3 className="text-lg font-medium text-gray-900">Verify OTP</h3>
          
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div>
              <label htmlFor="otp" className="block text-sm font-medium text-gray-700">
                Enter OTP sent to {mobile}
              </label>
              <div className="mt-1">
                <input
                  id="otp"
                  name="otp"
                  type="text"
                  required
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  maxLength={4}
                  placeholder="Enter 4-digit OTP"
                  className="input w-full"
                />
              </div>
            </div>
            
            {error && <p className="text-sm text-red-600">{error}</p>}
            
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={handleResendOtp}
                disabled={isLoading}
                className="text-sm text-primary hover:underline"
              >
                Resend OTP
              </button>
              
              <button
                type="button"
                onClick={() => setStep('mobile')}
                className="text-sm text-gray-600 hover:underline"
              >
                Change Number
              </button>
            </div>
            
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="btn btn-primary w-full"
              >
                {isLoading ? 'Verifying...' : 'Verify OTP'}
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default Login;