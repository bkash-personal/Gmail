import React, { useState } from 'react';
import { HelpCircle, Send, MessageSquare, Plus, CheckCircle, User, Shield } from 'lucide-react';

export default function Tickets({ tickets, lang, onCreateTicket, onSendMessage }) {
  const isBn = lang === 'bn';

  const [activeTicketId, setActiveTicketId] = useState(tickets[0]?.id || null);
  const [showCreateForm, setShowCreateForm] = useState(false);

  // New ticket fields
  const [subject, setSubject] = useState("");
  const [orderId, setOrderId] = useState("");
  const [message, setMessage] = useState("");

  // Reply message field
  const [replyText, setReplyText] = useState("");

  const activeTicket = tickets.find(t => t.id === activeTicketId);

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    if (!subject.trim() || !message.trim()) return;

    const newTck = onCreateTicket({
      subject: subject.trim(),
      orderId: orderId.trim(),
      message: message.trim()
    });

    setSubject("");
    setOrderId("");
    setMessage("");
    setShowCreateForm(false);
    setActiveTicketId(newTck.id);
  };

  const handleReplySubmit = (e) => {
    e.preventDefault();
    if (!replyText.trim() || !activeTicketId) return;

    onSendMessage(activeTicketId, replyText.trim());
    setReplyText("");
  };

  return (
    <div>
      <div className="new-order-layout">
        {/* Left Column: Tickets List */}
        <div className="glass-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <HelpCircle color="var(--primary-cyan)" size={20} />
              {isBn ? 'সাপোর্ট টিকেটসমূহ' : 'Support Tickets'}
            </h3>
            <button 
              className="btn-primary"
              style={{ padding: '8px 14px', fontSize: '0.85rem', width: 'auto' }}
              onClick={() => setShowCreateForm(!showCreateForm)}
            >
              <Plus size={16} />
              {isBn ? 'নতুন টিকেট' : 'New Ticket'}
            </button>
          </div>

          {showCreateForm && (
            <div style={{
              background: 'rgba(0, 242, 254, 0.04)',
              border: '1px solid rgba(0, 242, 254, 0.2)',
              borderRadius: 'var(--radius-sm)',
              padding: '18px',
              marginBottom: '20px'
            }}>
              <h4 style={{ marginBottom: '12px', fontSize: '1rem' }}>
                {isBn ? 'নতুন সাপোর্ট টিকেট খুলুন' : 'Create New Support Ticket'}
              </h4>
              <form onSubmit={handleCreateSubmit}>
                <div className="form-group">
                  <label className="form-label">{isBn ? 'বিষয় (Subject)' : 'Subject'}</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="e.g. Order refill request" 
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">{isBn ? 'অর্ডার আইডি (Optional)' : 'Order ID (Optional)'}</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="e.g. 98015" 
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">{isBn ? 'বার্তা (Message)' : 'Message'}</label>
                  <textarea 
                    className="form-textarea" 
                    rows="3"
                    placeholder="Describe your issue in detail..." 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  ></textarea>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button type="submit" className="btn-primary" style={{ width: 'auto' }}>
                    <Send size={15} />
                    {isBn ? 'টিকেট জমা দিন' : 'Submit Ticket'}
                  </button>
                  <button type="button" className="btn-secondary" onClick={() => setShowCreateForm(false)}>
                    {isBn ? 'বাতিল' : 'Cancel'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Tickets List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {tickets.map(tck => (
              <div 
                key={tck.id}
                onClick={() => {
                  setActiveTicketId(tck.id);
                  setShowCreateForm(false);
                }}
                style={{
                  background: activeTicketId === tck.id ? 'rgba(0, 242, 254, 0.1)' : 'rgba(255, 255, 255, 0.03)',
                  border: activeTicketId === tck.id ? '1px solid var(--primary-cyan)' : '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '14px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <span style={{ fontWeight: 700, fontSize: '0.9rem', color: '#fff' }}>{tck.subject}</span>
                  <span className="status-badge status-processing">{tck.status}</span>
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  ID: {tck.id} | {tck.date}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Chat Conversation Thread */}
        <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', minHeight: '450px' }}>
          {activeTicket ? (
            <>
              <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '14px', marginBottom: '16px' }}>
                <h3 style={{ fontSize: '1.1rem' }}>{activeTicket.subject}</h3>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                  Ticket ID: {activeTicket.id} {activeTicket.orderId && `| Associated Order: #${activeTicket.orderId}`}
                </div>
              </div>

              {/* Chat Thread */}
              <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '20px' }}>
                {activeTicket.messages.map((msg, idx) => (
                  <div 
                    key={idx}
                    style={{
                      alignSelf: msg.sender === 'User' ? 'flex-end' : 'flex-start',
                      maxWidth: '80%',
                      background: msg.sender === 'User' ? 'rgba(79, 172, 254, 0.15)' : 'rgba(157, 78, 221, 0.15)',
                      border: msg.sender === 'User' ? '1px solid rgba(79, 172, 254, 0.3)' : '1px solid rgba(157, 78, 221, 0.3)',
                      borderRadius: 'var(--radius-sm)',
                      padding: '12px 16px'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                      {msg.sender === 'User' ? <User size={12} color="var(--primary-blue)" /> : <Shield size={12} color="var(--accent-purple)" />}
                      <strong style={{ color: msg.sender === 'User' ? 'var(--primary-blue)' : 'var(--accent-purple)' }}>
                        {msg.sender === 'User' ? (isBn ? 'আপনি' : 'You') : (isBn ? 'সাপোর্ট এডমিন' : 'Support Agent')}
                      </strong>
                      <span>• {msg.time}</span>
                    </div>
                    <div style={{ fontSize: '0.9rem', color: '#fff', lineHeight: '1.5' }}>
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>

              {/* Reply Form */}
              <form onSubmit={handleReplySubmit} style={{ display: 'flex', gap: '10px' }}>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder={isBn ? "এখানে বার্তা টাইপ করুন..." : "Type your message..."}
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                />
                <button type="submit" className="btn-primary" style={{ width: 'auto', padding: '0 20px' }}>
                  <Send size={16} />
                </button>
              </form>
            </>
          ) : (
            <div style={{ textAlign: 'center', margin: 'auto', color: 'var(--text-muted)' }}>
              <MessageSquare size={36} color="var(--text-dim)" style={{ marginBottom: '10px' }} />
              <p>{isBn ? 'বামপাশ থেকে একটি টিকেট নির্বাচন করুন।' : 'Select a ticket from the left panel to view conversation.'}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
