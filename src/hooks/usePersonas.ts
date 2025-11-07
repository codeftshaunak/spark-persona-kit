import { useState, useEffect } from 'react';
import { personaAPI, Persona } from '@/services/api';

export const usePersonas = () => {
  const [personas, setPersonas] = useState<Persona[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPersonas = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await personaAPI.getAllPersonas();
      setPersonas(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch personas');
      console.error('Error fetching personas:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPersonas();
  }, []);

  const refetch = () => {
    fetchPersonas();
  };

  return {
    personas,
    loading,
    error,
    refetch,
  };
};

export const usePersona = (personaId: string) => {
  const [persona, setPersona] = useState<Persona | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPersona = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await personaAPI.getPersona(personaId);
        setPersona(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch persona');
        console.error('Error fetching persona:', err);
      } finally {
        setLoading(false);
      }
    };

    if (personaId) {
      fetchPersona();
    }
  }, [personaId]);

  return {
    persona,
    loading,
    error,
  };
};