import { useState, useCallback, useEffect } from 'react';
import { HealthResult, PatientInfo } from '@/types/health';

const HISTORY_KEY = 'doctor_uncle_history';

export interface AssessmentRecord {
  id: string;
  createdAt: string; // ISO string
  patientInfo: PatientInfo;
  initialSymptom: string;
  result: HealthResult;
}

export const useHistory = () => {
  const [records, setRecords] = useState<AssessmentRecord[]>([]);

  const load = useCallback(() => {
    try {
      const raw = localStorage.getItem(HISTORY_KEY);
      if (raw) setRecords(JSON.parse(raw));
    } catch {
      setRecords([]);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const saveRecord = useCallback((record: AssessmentRecord) => {
    setRecords(prev => {
      const updated = [record, ...prev];
      localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const deleteRecord = useCallback((id: string) => {
    setRecords(prev => {
      const updated = prev.filter(r => r.id !== id);
      localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const clearAll = useCallback(() => {
    localStorage.removeItem(HISTORY_KEY);
    setRecords([]);
  }, []);

  return { records, saveRecord, deleteRecord, clearAll };
};
