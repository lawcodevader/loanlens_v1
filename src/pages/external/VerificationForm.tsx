import React from 'react';
import { useParams } from 'react-router-dom';

const VerificationForm = () => {
  const { token } = useParams();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Verification Form
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Please complete your verification
          </p>
        </div>
        {/* Form content will be implemented based on specific requirements */}
        <div className="bg-white p-8 rounded-lg shadow">
          <p className="text-gray-700">
            Verification token: {token}
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerificationForm;