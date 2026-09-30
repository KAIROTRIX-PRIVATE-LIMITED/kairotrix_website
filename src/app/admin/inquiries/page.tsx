'use client';

import React, { useState, useEffect } from 'react';
import { MessageSquare, Mail, RefreshCw, Clock, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface InquiryItem {
  id: string;
  name: string;
  email: string;
  interest: string;
  message: string;
  status: string;
  createdAt: string;
}

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<InquiryItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchInquiries = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/inquiries');
      if (res.ok) {
        const data = await res.json();
        setInquiries(data.inquiries || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  return (
    <div className="space-y-6 text-neutral-900">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-neutral-950 tracking-tight font-display">
            Contact Messages
          </h1>
          <p className="text-xs sm:text-sm text-neutral-600 mt-1">
            Messages sent by visitors through the public <code className="text-brand-700 bg-brand-50 px-1.5 py-0.5 rounded font-mono font-semibold">/contact</code> form.
          </p>
        </div>

        <button
          onClick={fetchInquiries}
          className="px-3.5 py-2 rounded-xl bg-white border border-neutral-200 hover:bg-neutral-50 text-neutral-700 text-xs font-mono flex items-center gap-2 transition-colors cursor-pointer self-start sm:self-auto shadow-xs"
        >
          <RefreshCw className={cn('w-3.5 h-3.5 text-neutral-500', loading && 'animate-spin')} />
          <span>Refresh</span>
        </button>
      </div>

      <div className="bg-white border border-neutral-200/80 rounded-2xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-neutral-50/90 border-b border-neutral-200/80 text-neutral-500 font-mono uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3 px-4">Contact Info</th>
                <th className="py-3 px-4">Area of Interest</th>
                <th className="py-3 px-4">Message / Requirements</th>
                <th className="py-3 px-4">Received</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {inquiries.map((inq) => (
                <tr key={inq.id} className="hover:bg-neutral-50/70 transition-colors">
                  <td className="py-3.5 px-4">
                    <span className="font-semibold text-neutral-900 block">{inq.name}</span>
                    <a
                      href={`mailto:${inq.email}`}
                      className="text-neutral-500 hover:text-brand-600 font-mono text-[11px] flex items-center gap-1 mt-0.5"
                    >
                      <Mail className="w-3 h-3 text-neutral-400" />
                      <span>{inq.email}</span>
                    </a>
                  </td>

                  <td className="py-3.5 px-4 font-mono text-[11px]">
                    <span className="px-2.5 py-0.5 rounded-full bg-brand-50 text-brand-700 border border-brand-200 inline-block font-semibold">
                      {inq.interest || 'General'}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 max-w-md">
                    <p className="text-neutral-700 text-xs line-clamp-3 leading-relaxed">
                      {inq.message}
                    </p>
                  </td>

                  <td className="py-3.5 px-4 font-mono text-[11px] text-neutral-500 whitespace-nowrap">
                    {new Date(inq.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </td>

                  <td className="py-3.5 px-4">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1 w-fit shadow-xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span>{inq.status || 'NEW'}</span>
                    </span>
                  </td>
                </tr>
              ))}

              {inquiries.length === 0 && !loading && (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-xs text-neutral-500 font-mono">
                    No client inquiries captured yet. Inquiries from /contact will appear here automatically.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
