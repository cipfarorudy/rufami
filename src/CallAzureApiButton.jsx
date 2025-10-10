
import React, { useState } from 'react';
import { useMsal } from '@azure/msal-react';

function CallAzureApiButton() {
  const { instance } = useMsal();
  const [apiData, setApiData] = useState(null);
  const [error, setError] = useState(null);

  const callApi = async () => {
    const apiScope = 'api://VOTRE_API_CLIENT_ID/.default';
    const apiUrl = 'https://votre-api.azurewebsites.net/endpoint';
    try {
      const response = await instance.acquireTokenSilent({ scopes: [apiScope] });
      const token = response.accessToken;
      const apiResponse = await fetch(apiUrl, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await apiResponse.json();
      setApiData(data);
      setError(null);
    } catch (err) {
      setError(err.message || 'Erreur appel API Azure');
      setApiData(null);
    }
  };

  return (
    <div className="mb-4">
      <button onClick={callApi} className="bg-blue-600 text-white px-4 py-2 rounded-md mb-2">
        Appeler l’API Azure
      </button>
      {apiData && (
        <div className="bg-gray-100 p-4 rounded mt-2">
          <h4 className="font-semibold mb-2">Données API Azure :</h4>
          <pre className="text-xs whitespace-pre-wrap">{JSON.stringify(apiData, null, 2)}</pre>
        </div>
      )}
      {error && (
        <div className="text-red-600 mt-2">{error}</div>
      )}
    </div>
  );
}

export default CallAzureApiButton;
