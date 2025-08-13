'use client';

import { useState, useEffect } from 'react';
import { Save, Edit3, X } from 'lucide-react';

interface CharacterNotesProps {
  characterId: number;
  characterName: string;
}

interface Note {
  id: string;
  text: string;
  createdAt: string;
  updatedAt: string;
}

export function CharacterNotes({ characterId, characterName }: CharacterNotesProps) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newNoteText, setNewNoteText] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const storageKey = `character-notes-${characterId}`;
    const storedNotes = localStorage.getItem(storageKey);
    if (storedNotes) {
      try {
        setNotes(JSON.parse(storedNotes));
      } catch (error) {
        console.error('Failed to parse notes:', error);
      }
    }
  }, [characterId]);

  const saveNotes = (updatedNotes: Note[]) => {
    const storageKey = `character-notes-${characterId}`;
    localStorage.setItem(storageKey, JSON.stringify(updatedNotes));
    setNotes(updatedNotes);
  };

  const validateNote = (text: string): string | null => {
    if (!text.trim()) {
      return 'Note cannot be empty';
    }
    if (text.length > 500) {
      return 'Note must be less than 500 characters';
    }
    if (text.length < 3) {
      return 'Note must be at least 3 characters';
    }
    return null;
  };

  const handleAddNote = () => {
    const error = validateNote(newNoteText);
    if (error) {
      setErrors({ new: error });
      return;
    }

    const newNote: Note = {
      id: Date.now().toString(),
      text: newNoteText.trim(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const updatedNotes = [...notes, newNote];
    saveNotes(updatedNotes);
    setNewNoteText('');
    setIsAdding(false);
    setErrors({});
  };

  const handleEditNote = (id: string) => {
    const error = validateNote(editText);
    if (error) {
      setErrors({ [id]: error });
      return;
    }

    const updatedNotes = notes.map(note =>
      note.id === id
        ? { ...note, text: editText.trim(), updatedAt: new Date().toISOString() }
        : note
    );
    saveNotes(updatedNotes);
    setEditingId(null);
    setEditText('');
    setErrors({});
  };

  const handleDeleteNote = (id: string) => {
    const updatedNotes = notes.filter(note => note.id !== id);
    saveNotes(updatedNotes);
  };

  const startEditing = (note: Note) => {
    setEditingId(note.id);
    setEditText(note.text);
    setErrors({});
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditText('');
    setErrors({});
  };

  const cancelAdding = () => {
    setIsAdding(false);
    setNewNoteText('');
    setErrors({});
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 mt-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Notes for {characterName}
        </h3>
        {!isAdding && (
          <button
            onClick={() => setIsAdding(true)}
            className="inline-flex items-center px-3 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          >
            <Edit3 className="w-4 h-4 mr-2" />
            Add Note
          </button>
        )}
      </div>

      {isAdding && (
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-4">
          <div className="space-y-3">
            <div>
              <label htmlFor="new-note" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Add a note about this character
              </label>
              <textarea
                id="new-note"
                value={newNoteText}
                onChange={(e) => {
                  setNewNoteText(e.target.value);
                  if (errors.new) setErrors({});
                }}
                placeholder="What do you think about this character?"
                rows={3}
                className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-600 dark:text-white ${
                  errors.new ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-500'
                }`}
              />
              {errors.new && (
                <p className="text-red-500 text-sm mt-1">{errors.new}</p>
              )}
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {newNoteText.length}/500 characters
              </p>
            </div>
            <div className="flex justify-end space-x-2">
              <button
                onClick={cancelAdding}
                className="px-3 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 focus:outline-none"
              >
                <X className="w-4 h-4 inline mr-1" />
                Cancel
              </button>
              <button
                onClick={handleAddNote}
                disabled={!newNoteText.trim()}
                className="inline-flex items-center px-3 py-2 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Note
              </button>
            </div>
          </div>
        </div>
      )}

      {notes.length === 0 && !isAdding ? (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          <Edit3 className="w-12 h-12 mx-auto mb-3 text-gray-300 dark:text-gray-600" />
          <p>No notes yet. Add one to remember your thoughts about this character!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {notes.map((note) => (
            <div key={note.id} className="border dark:border-gray-600 rounded-lg p-4">
              {editingId === note.id ? (
                <div className="space-y-3">
                  <textarea
                    value={editText}
                    onChange={(e) => {
                      setEditText(e.target.value);
                      if (errors[note.id]) {
                        const newErrors = { ...errors };
                        delete newErrors[note.id];
                        setErrors(newErrors);
                      }
                    }}
                    rows={3}
                    className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-600 dark:text-white ${
                      errors[note.id] ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-500'
                    }`}
                  />
                  {errors[note.id] && (
                    <p className="text-red-500 text-sm">{errors[note.id]}</p>
                  )}
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {editText.length}/500 characters
                  </p>
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={cancelEditing}
                      className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 focus:outline-none"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleEditNote(note.id)}
                      className="text-green-600 hover:text-green-700 focus:outline-none"
                    >
                      Save
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <p className="text-gray-900 dark:text-white mb-2">{note.text}</p>
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {note.createdAt !== note.updatedAt ? (
                        <span>Updated {new Date(note.updatedAt).toLocaleDateString()}</span>
                      ) : (
                        <span>Created {new Date(note.createdAt).toLocaleDateString()}</span>
                      )}
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => startEditing(note)}
                        className="text-blue-600 hover:text-blue-700 focus:outline-none"
                        title="Edit note"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteNote(note.id)}
                        className="text-red-600 hover:text-red-700 focus:outline-none"
                        title="Delete note"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}