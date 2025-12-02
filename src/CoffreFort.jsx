import React from "react";
import CRUDList from './components/CRUDList';

function CoffreFort({ showToast }) {
  return (
    <CRUDList
      storageKey="coffreFort"
      initialItems={[]}
      title="Coffre-fort (codes & mots de passe)"
      fields={[
        { name: 'site', label: 'Site ou service' },
        { name: 'login', label: 'Identifiant' },
        { name: 'password', label: 'Mot de passe/code', type: 'password' }
      ]}
      itemRender={(item) => (
        <span className="font-semibold">{item.site}</span> — <span>{item.login}</span> — <span className="font-mono">••••••••</span>
      )}
      showToast={showToast}
    />
  );
}

export default CoffreFort;
