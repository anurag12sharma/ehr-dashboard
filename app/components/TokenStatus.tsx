'use client';

import React, { useState, useEffect } from 'react';

type TokenStatusResult = {
  success: boolean;
  error?: string;
  data?: {
    tokenExpiry?: string;
    [key: string]: unknown; // allows additional fields if needed
  };
  instructions?: string;
  [key: string]: unknown; // allows unknown keys
};


export function TokenStatus() {
  const [tokenStatus, setTokenStatus] = useState<TokenStatusResult | null>(null);
  const [loading, setLoading] = useState(false);

  const checkTokenStatus = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/test-auth');
      const result = await response.json();
      setTokenStatus(result);
    } catch (error) {
      setTokenStatus({ success: false, error: 'Failed to check token status' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkTokenStatus();
  }, []);

  if (loading) {
    return (
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-blue-800">Checking token status...</p>
      </div>
    );
  }

  if (!tokenStatus) return null;

  return (
    <div className={`border rounded-lg p-4 ${
      tokenStatus.success 
        ? 'bg-green-50 border-green-200' 
        : 'bg-red-50 border-red-200'
    }`}>
      <div className="flex items-center justify-between">
        <div>
          <h3 className={`font-medium ${
            tokenStatus.success ? 'text-green-800' : 'text-red-800'
          }`}>
            Token Status: {tokenStatus.success ? 'Valid' : 'Invalid'}
          </h3>
          {tokenStatus.success && tokenStatus.data?.tokenExpiry && (
            <p className="text-sm text-green-600 mt-1">
              Expires: {new Date(tokenStatus.data.tokenExpiry).toLocaleString()}
            </p>
          )}
          {tokenStatus.error && (
            <p className="text-sm text-red-600 mt-1">{tokenStatus.error}</p>
          )}
        </div>
        <button
          onClick={checkTokenStatus}
          className="text-sm px-3 py-1 rounded bg-white border shadow-sm hover:bg-gray-50"
        >
          Refresh
        </button>
      </div>
      
      {!tokenStatus.success && tokenStatus.instructions && (
        <details className="mt-3">
          <summary className="cursor-pointer text-sm font-medium text-gray-700">
            How to update tokens
          </summary>
          <pre className="mt-2 text-xs bg-gray-100 p-2 rounded overflow-auto whitespace-pre-wrap">
            {tokenStatus.instructions}
          </pre>
        </details>
      )}
    </div>
  );
}
