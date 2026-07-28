import React, { useState } from 'react';
import { PAYMENT_METHODS } from '../data/mockServices';
import { Wallet, CheckCircle, AlertCircle, Phone, ArrowRight, ShieldCheck, RefreshCw } from 'lucide-react';

export default function AddFunds({ balance, currency, lang, onAddFunds, transactions }) {
  const isBn = lang === 'bn';

  const [selectedMethodId, setSelectedMethodId] = useState("bkash");
  const [amount, setAmount] = useState("");
  const [senderNumber, setSenderNumber] = useState("");
  const [trxId, setTrxId] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const selectedMethod = PAYMENT_METHODS.find(m => m.id === selectedMethodId);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      setErrorMsg(isBn ? "অনুগ্রহ করে সঠিক টাকার পরিমাণ ইনপুট দিন।" : "Please enter a valid amount.");
      return;
    }

    if (!trxId.trim()) {
      setErrorMsg(isBn ? "অনুগ্রহ করে ট্রানজেকশন আইডি (TrxID) দিন।" : "Please provide the Transaction ID (TrxID).");
      return;
    }

    // Process add funds
    onAddFunds({
      method: selectedMethod.name,
      amount: numAmount,
      trxId: trxId.trim(),
      senderNumber: senderNumber || 'N/A'
    });

    setSuccessMsg(
      isBn 
        ? `৳${numAmount} টাকার রিচার্জ সফলভাবে আপনার ওয়ালেটে যুক্ত করা হয়েছে!` 
        : `Successfully added ৳${numAmount} to your account balance!`
    );

    setAmount("");
    setSenderNumber("");
    setTrxId("");
  };

  const formatPrice = (bdtPrice) => {
    if (currency === 'USD') {
      return `$${(bdtPrice / 120).toFixed(2)}`;
    }
    return `৳${bdtPrice.toFixed(2)}`;
  };

  return (
    <div>
      <div className="new-order-layout">
        {/* Left Column: Payment Form */}
        <div className="glass-card" style={{ padding: '28px' }}>
          <h2 style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Wallet className="gradient-text" size={26} />
            {isBn ? 'ব্যালেন্স রিচার্জ (Add Funds)' : 'Deposit Funds'}
          </h2>

          {successMsg && (
            <div style={{
              background: 'rgba(16, 185, 129, 0.15)',
              border: '1px solid rgba(16, 185, 129, 0.4)',
              color: '#34d399',
              padding: '14px 16px',
              borderRadius: 'var(--radius-sm)',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <CheckCircle size={20} />
              <span>{successMsg}</span>
            </div>
          )}

          {errorMsg && (
            <div style={{
              background: 'rgba(239, 68, 68, 0.12)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              color: '#f87171',
              padding: '12px 16px',
              borderRadius: 'var(--radius-sm)',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <AlertCircle size={18} />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Payment Gateway Grid */}
          <div className="form-group">
            <label className="form-label">{isBn ? 'পেমেন্ট মেথড সিলেক্ট করুন' : 'Select Payment Method'}</label>
            <div className="payment-grid">
              {PAYMENT_METHODS.map(m => (
                <div 
                  key={m.id}
                  className={`payment-card ${selectedMethodId === m.id ? 'active' : ''}`}
                  onClick={() => setSelectedMethodId(m.id)}
                >
                  <div className="payment-icon">{m.logo}</div>
                  <div style={{ fontWeight: 700, fontSize: '0.92rem' }}>{m.name}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{m.type}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Method Instructions Box */}
          {selectedMethod && (
            <div style={{
              background: 'rgba(0, 242, 254, 0.04)',
              border: '1px dashed rgba(0, 242, 254, 0.25)',
              borderRadius: 'var(--radius-sm)',
              padding: '18px',
              marginBottom: '24px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary-cyan)', fontWeight: 700, marginBottom: '8px' }}>
                <Phone size={16} />
                <span>{selectedMethod.name} Number: {selectedMethod.number} ({selectedMethod.accountType})</span>
              </div>
              <pre style={{ 
                fontFamily: 'inherit', 
                whiteSpace: 'pre-line', 
                fontSize: '0.88rem', 
                color: 'var(--text-muted)',
                lineHeight: '1.6' 
              }}>
                {selectedMethod.instructions}
              </pre>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Amount */}
            <div className="form-group">
              <label className="form-label">
                {isBn ? 'টাকার পরিমাণ (Amount BDT ৳)' : 'Amount (BDT ৳)'}
              </label>
              <input 
                type="number" 
                className="form-input" 
                placeholder="e.g. 500" 
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min="50"
              />
            </div>

            {/* Sender Phone Number (Optional) */}
            <div className="form-group">
              <label className="form-label">
                {isBn ? 'প্রেরক ফোন নম্বর (আপনার বিকাশ/নগদ নম্বর)' : 'Sender Phone Number (Optional)'}
              </label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="017xxxxxxxx" 
                value={senderNumber}
                onChange={(e) => setSenderNumber(e.target.value)}
              />
            </div>

            {/* Transaction ID */}
            <div className="form-group">
              <label className="form-label">
                {isBn ? 'ট্রানজেকশন আইডি (TrxID)' : 'Transaction ID (TrxID)'}
              </label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="e.g. BAX89102K3" 
                value={trxId}
                onChange={(e) => setTrxId(e.target.value)}
              />
            </div>

            <button type="submit" className="btn-primary">
              <ShieldCheck size={18} />
              {isBn ? 'ভেরিফাই ও ব্যালেন্স যোগ করুন' : 'Verify & Add Balance'}
            </button>
          </form>
        </div>

        {/* Right Column: Transaction History */}
        <div className="glass-card" style={{ padding: '24px' }}>
          <h3 style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <RefreshCw size={18} color="var(--primary-cyan)" />
            {isBn ? 'সাম্প্রতিক ডিপোজিট হিস্ট্রি' : 'Recent Payment History'}
          </h3>

          {transactions.length === 0 ? (
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
              {isBn ? 'এখনও কোনো ডিপোজিট রেকর্ড নেই।' : 'No transaction history available.'}
            </p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {transactions.map((tx, idx) => (
                <div key={idx} style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '12px 16px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{tx.method}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                      TrxID: <span style={{ color: 'var(--primary-cyan)' }}>{tx.trxId}</span> ({tx.date})
                    </div>
                  </div>
                  <div style={{ fontWeight: 800, color: 'var(--accent-green)', fontSize: '1.05rem' }}>
                    +{formatPrice(tx.amount)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
