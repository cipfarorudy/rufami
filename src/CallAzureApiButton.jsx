

import React, { useState } from 'react';

function CallAzureApiButton() {
  const [apiData, setApiData] = useState(null);
  const [error, setError] = useState(null);

  // Stub : appel API désactivé, affiche un message
  const callApi = async () => {
    setError("Connexion Azure désactivée. Impossible d’appeler l’API.");
    setApiData(null);
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
