'use client';

import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

export const OFFICIAL_DISCIPLINES = [] as const;
export const PROJECT_STAGES = [] as const;
export const TARGET_TIMELINES = [] as const;

export interface IncomingContext {
  label: string;
  source?: string;
}

interface ContactContextValue {
  name: string;
  setName: (name: string) => void;
  email: string;
  setEmail: (email: string) => void;
  company: string;
  setCompany: (company: string) => void;
  message: string;
  setMessage: (message: string) => void;
  incomingContext: IncomingContext | null;
  clearIncomingContext: () => void;
  resetAll: () => void;
}

const ContactContext = createContext<ContactContextValue | undefined>(undefined);

export function ContactProvider({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [message, setMessage] = useState('');
  const [incomingContext, setIncomingContext] = useState<IncomingContext | null>(null);

  useEffect(() => {
    const solutionParam = searchParams.get('solution') || searchParams.get('discipline') || searchParams.get('interest');
    const sourceParam = searchParams.get('source') || undefined;

    if (solutionParam) {
      setIncomingContext({
        label: solutionParam.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
        source: sourceParam ? sourceParam.replace(/-/g, ' ') : undefined,
      });
    } else if (sourceParam) {
      setIncomingContext({
        label: 'General Inquiry',
        source: sourceParam.replace(/-/g, ' '),
      });
    }
  }, [searchParams]);

  const clearIncomingContext = () => {
    setIncomingContext(null);
  };

  const resetAll = () => {
    setName('');
    setEmail('');
    setCompany('');
    setMessage('');
    setIncomingContext(null);
  };

  const value = useMemo(
    () => ({
      name,
      setName,
      email,
      setEmail,
      company,
      setCompany,
      message,
      setMessage,
      incomingContext,
      clearIncomingContext,
      resetAll,
    }),
    [name, email, company, message, incomingContext]
  );

  return <ContactContext.Provider value={value}>{children}</ContactContext.Provider>;
}

export function useContact() {
  const context = useContext(ContactContext);
  if (!context) {
    throw new Error('useContact must be used within a ContactProvider');
  }
  return context;
}
