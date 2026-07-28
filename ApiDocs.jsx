import React, { useState } from 'react';
import { Code, Key, Copy, Check, Terminal, ExternalLink } from 'lucide-react';

export default function ApiDocs({ lang }) {
  const isBn = lang === 'bn';
  const [apiKey, setApiKey] = useState("bdclick_live_api_982410a8c71b");
  const [copiedKey, setCopiedKey] = useState(false);

  const generateNewKey = () => {
    const randomHex = Math.random().toString(16).substring(2, 14);
    setApiKey(`bdclick_live_api_${randomHex}`);
  };

  const copyKey = () => {
    navigator.clipboard.writeText(apiKey);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  return (
    <div>
      {/* API Key Box */}
      <div className="glass-card" style={{ padding: '24px', marginBottom: '24px' }}>
        <h2 style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Code className="gradient-text" size={24} />
          {isBn ? 'রিটেইলার / রিসেলার এপিআই (Developer API v2)' : 'Developer API Documentation'}
        </h2>

        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '20px' }}>
          {isBn 
            ? 'আমাদের RESTful API ব্যবহার করে আপনার নিজস্ব ওয়েবসাইট বা প্যানেলের সাথে বিডি ক্লিক এর সার্ভিস অটোমেটিক কানেক্ট করুন।'
            : 'Integrate BDClick services directly into your website or reseller SMM panel via our high-speed REST API.'
          }
        </p>

        <div style={{ background: 'rgba(0, 242, 254, 0.05)', border: '1px solid rgba(0, 242, 254, 0.2)', padding: '16px', borderRadius: 'var(--radius-sm)' }}>
          <div style={{ fontWeight: 600, fontSize: '0.88rem', marginBottom: '8px', color: 'var(--primary-cyan)' }}>
            <Key size={14} style={{ display: 'inline', marginRight: '6px' }} />
            {isBn ? 'আপনার ইউনিক এপিআই কী (API Key):' : 'Your Unique API Key:'}
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <input 
              type="text" 
              className="form-input" 
              value={apiKey} 
              readOnly 
              style={{ fontFamily: 'monospace', color: 'var(--primary-cyan)', fontWeight: 700 }}
            />
            <button className="btn-secondary" onClick={copyKey} style={{ whiteSpace: 'nowrap' }}>
              {copiedKey ? <Check size={16} color="var(--accent-green)" /> : <Copy size={16} />}
              {copiedKey ? (isBn ? 'কপি হয়েছে' : 'Copied') : (isBn ? 'কপি করুন' : 'Copy')}
            </button>
            <button className="btn-secondary" onClick={generateNewKey} style={{ whiteSpace: 'nowrap' }}>
              {isBn ? 'নতুন কী তৈরি করুন' : 'Generate New'}
            </button>
          </div>
        </div>
      </div>

      {/* Endpoint documentation */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* Endpoint 1: Add Order */}
        <div className="glass-card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
            <span style={{ background: 'var(--accent-green)', color: '#07090e', fontWeight: 800, padding: '4px 10px', borderRadius: '4px', fontSize: '0.8rem' }}>POST</span>
            <span style={{ fontFamily: 'monospace', fontWeight: 700, fontSize: '1rem' }}>https://bdclick.com/api/v2?action=add</span>
          </div>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '14px' }}>
            {isBn ? 'নতুন অর্ডার প্লেস করার জন্য।' : 'Place a new automated SMM order.'}
          </p>

          <pre style={{ 
            background: '#07090e', 
            padding: '14px', 
            borderRadius: '8px', 
            fontFamily: 'monospace', 
            fontSize: '0.84rem', 
            color: 'var(--primary-cyan)',
            overflowX: 'auto' 
          }}>
{`// Required Form Parameters:
key      : "${apiKey}"
action   : "add"
service  : 101          // Service ID
link     : "https://..." // Target URL
quantity : 1000         // Quantity

// JSON Response:
{
  "status": "success",
  "order": 98017
}`}
          </pre>
        </div>

        {/* Endpoint 2: Order Status */}
        <div className="glass-card" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
            <span style={{ background: 'var(--accent-green)', color: '#07090e', fontWeight: 800, padding: '4px 10px', borderRadius: '4px', fontSize: '0.8rem' }}>POST</span>
            <span style={{ fontFamily: 'monospace', fontWeight: 700, fontSize: '1rem' }}>https://bdclick.com/api/v2?action=status</span>
          </div>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '14px' }}>
            {isBn ? 'অর্ডারের বর্তমান স্ট্যাটাস জানতে।' : 'Check the status of an existing order.'}
          </p>

          <pre style={{ 
            background: '#07090e', 
            padding: '14px', 
            borderRadius: '8px', 
            fontFamily: 'monospace', 
            fontSize: '0.84rem', 
            color: 'var(--primary-cyan)',
            overflowX: 'auto' 
          }}>
{`// Required Form Parameters:
key    : "${apiKey}"
action : "status"
order  : 98017

// JSON Response:
{
  "charge": "120.00",
  "start_count": "4520",
  "status": "Completed",
  "remains": "0",
  "currency": "BDT"
}`}
          </pre>
        </div>
      </div>
    </div>
  );
}
