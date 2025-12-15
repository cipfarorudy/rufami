import React, { useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

/**
 * Composant générique CRUD pour listes simples persistées.
 * Props:
 * - storageKey: clé localStorage (optionnel)
 * - initialItems: valeur initiale si aucune donnée stockée
 * - fields: [{ name, label, type='text', options? }]
 *   type: 'text' | 'password' | 'select' | 'url'
 * - title: titre affiché
 * - itemRender: (item) rendu personnalisé
 * - onChange: callback(items) après modification
 * - showToast: fonction(message) notification optionnelle
 */
export default function CRUDList({
  storageKey,
  initialItems = [],
  fields = [],
  title = 'Liste',
  itemRender,
  onChange,
  onItemsChange, // priorité sur onChange si fourni (API contrôlée)
  controlledItems,
  showToast,
  itemTestId
}) {
  // Tous les hooks appelés inconditionnellement
  const internalState = useLocalStorage(storageKey || null, initialItems);
  const [form, setForm] = useState(() => emptyForm(fields));
  const [editIndex, setEditIndex] = useState(null);
  
  // Décider quelle source d'état utiliser après les hooks (pas de condition avant)
  const isControlled = controlledItems !== undefined;
  const [items, setItems] = isControlled 
    ? [controlledItems, (v) => { /* noop for controlled */ }] 
    : internalState;

  function emptyForm(flds) {
    return flds.reduce((acc, f) => ({ ...acc, [f.name]: '' }), {});
  }

  function notify(msg) { if (showToast) showToast(msg); }

  async function persist(newItems) {
    if (controlledItems !== undefined) {
      if (onItemsChange) await onItemsChange(newItems);
      else if (onChange) await onChange(newItems);
    } else {
      setItems(newItems);
      if (onItemsChange) await onItemsChange(newItems);
      else if (onChange) await onChange(newItems);
    }
  }

  async function handleAdd(e) {
    e.preventDefault();
    if (!fields.every(f => form[f.name] !== '')) return;
    const newItems = [...items, form];
    await persist(newItems);
    setForm(emptyForm(fields));
    notify('Ajouté');
  }

  function handleEdit(idx) {
    setEditIndex(idx);
    setForm(items[idx]);
  }

  async function handleUpdate(e) {
    e.preventDefault();
    if (editIndex === null) return;
    const newItems = items.map((it, i) => i === editIndex ? { ...it, ...form } : it);
    await persist(newItems);
    setEditIndex(null);
    setForm(emptyForm(fields));
    notify('Modifié');
  }

  async function handleDelete(idx) {
    const newItems = items.filter((_, i) => i !== idx);
    await persist(newItems);
    notify('Supprimé');
  }

  function handleCancel() {
    setEditIndex(null);
    setForm(emptyForm(fields));
  }

  return (
    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded shadow mt-4">
      <h2 className="text-lg font-bold mb-2">{title}</h2>
      <form onSubmit={editIndex === null ? handleAdd : handleUpdate} className="flex flex-col md:flex-row gap-2 mb-4" aria-labelledby="crudlist-title">
        {fields.map(f => {
          const id = `${storageKey || title}-${f.name}`;
          return f.type === 'select' ? (
            <div key={f.name} className="flex flex-col">
              <label htmlFor={id} className="sr-only">{f.label}</label>
              <select
                id={id}
                aria-label={f.label}
                value={form[f.name]}
                onChange={e => setForm(old => ({ ...old, [f.name]: e.target.value }))}
                className="px-2 py-1 rounded border"
              >
                <option value="" disabled>Choisir...</option>
                {(f.options || []).map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
              </select>
            </div>
          ) : (
            <div key={f.name} className="flex flex-col">
              <label htmlFor={id} className="sr-only">{f.label}</label>
              <input
                id={id}
                type={f.type || 'text'}
                placeholder={f.label}
                aria-label={f.label}
                value={form[f.name]}
                onChange={e => setForm(old => ({ ...old, [f.name]: e.target.value }))}
                className="px-2 py-1 rounded border"
              />
            </div>
          );
        })}
        <button type="submit" className="bg-blue-600 text-white px-3 py-1 rounded">
          {editIndex === null ? 'Ajouter' : 'Modifier'}
        </button>
        {editIndex !== null && (
          <button type="button" onClick={handleCancel} className="bg-gray-400 text-white px-3 py-1 rounded">Annuler</button>
        )}
      </form>
      <ul className="space-y-2">
        {items.map((item, idx) => (
          <li key={idx} className="flex flex-col md:flex-row items-center justify-between bg-white dark:bg-gray-700 p-2 rounded shadow" {...(itemTestId ? { 'data-testid': itemTestId } : {})}>
            <div className="flex-1">
              {itemRender ? itemRender(item) : (
                <span className="font-semibold">{Object.values(item).join(' — ')}</span>
              )}
            </div>
            <div className="flex gap-2 mt-2 md:mt-0">
              <button onClick={() => handleEdit(idx)} className="bg-yellow-500 text-white px-2 py-1 rounded">Modifier</button>
              <button onClick={() => handleDelete(idx)} className="bg-red-600 text-white px-2 py-1 rounded">Supprimer</button>
            </div>
          </li>
        ))}
        {items.length === 0 && <li className="text-gray-500">Aucune entrée.</li>}
      </ul>
    </div>
  );
}
