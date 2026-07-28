import React, { useState, useEffect } from 'react';
import { CATEGORIES } from '../data/mockServices';
import { Zap, Clock, ShieldCheck, AlertCircle, CheckCircle, Info, Wallet } from 'lucide-react';

export default function NewOrder({ services, balance, currency, lang, onPlaceOrder, setActiveTab }) {
  const isBn = lang === 'bn';
  const [selectedCategory, setSelectedCategory] = useState("Facebook");
  const [filteredServices, setFilteredServices] = useState([]);
  const [selectedServiceId, setSelectedServiceId] = useState("");
  const [selectedService, setSelectedService] = useState(null);
  const [link, setLink] = useState("");
  const [quantity, setQuantity] = useState("");
  const [calculatedCharge, setCalculatedCharge] = useState(0);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const list = services.filter(s => s.category === selectedCategory);
    setFilteredServices(list);
    if (list.length > 0) {
      setSelectedServiceId(list[0].id.toString());
      setSelectedService(list[0]);
      setQuantity(list[0].min.toString());
    } else {
      setSelectedService(null);
    }
  }, [selectedCategory, services]);

  const handleServiceChange = (e) => {
    const sId = parseInt(e.target.value);
    setSelectedServiceId(e.target.value);
    const found = services.find(s => s.id === sId);
    if (found) {
      setSelectedService(found);
      setQuantity(found.min.toString());
    }
  };

  useEffect(() => {
    if (!selectedService || !quantity) {
      setCalculatedCharge(0);
      return;
    }
    const qty = parseInt(quantity) || 0;
    setCalculatedCharge((qty / 1000) * selectedService.ratePer1000);
  }, [quantity, selectedService]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!selectedService || !link.trim()) {
      setErrorMsg(isBn ? "সঠিক তথ্য প্রদান করুন।" : "Please fill in all details.");
      return;
    }

    const qty = parseInt(quantity);
    if (isNaN(qty) || qty < selectedService.min || qty > selectedService.max) {
      setErrorMsg(isBn ? `পরিমাণ ${selectedService.min}-${selectedService.max} এর মধ্যে হতে হবে।` : "Invalid quantity.");
      return;
    }

    if (calculatedCharge > balance) {
      setErrorMsg(isBn ? "পর্যাপ্ত ব্যালেন্স নেই! টাকা রিচার্জ করুন।" : "Insufficient balance.");
      return;
    }

    onPlaceOrder({
      serviceId: selectedService.id,
      serviceName: selectedService.name,
      link: link,
      quantity: qty,
      charge: calculatedCharge
    });

    setLink("");
  };

  const formatPrice = (bdtPrice) => currency === 'USD' ? `$${(bdtPrice / 120).toFixed(3)}` : `৳${bdtPrice.toFixed(2)}`;

  return (
    <div>
      <div className="notice-banner">
        <div className="notice-content">
          <span className="badge-new">{isBn ? 'নতুন আপডেট' : 'NOTICE'}</span>
          <span>{isBn ? '⚡ বিডি ক্লিক প্যানেলে স্বাগতম! আমাদের সকল ফেসবুক ও ইনস্টাগ্রাম সার্ভিস ১০০% চালু আছে।' : '⚡ Welcome to BDClick Panel!'}</span>
        </div>
      </div>

      <div className="new-order-layout">
        <div className="glass-card" style={{ padding: '28px' }}>
          <h2 style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Zap className="gradient-text" size={26} />
            {isBn ? 'নতুন অর্ডার করুন' : 'Place New Order'}
          </h2>

          {errorMsg && (
            <div style={{ background: 'rgba(239, 68, 68, 0.12)', color: '#f87171', padding: '12px', borderRadius: '8px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <AlertCircle size={18} /><span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">{isBn ? 'ক্যাটাগরি' : 'Category'}</label>
              <select className="form-select" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                {CATEGORIES.filter(c => c !== "All Categories").map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">{isBn ? 'সার্ভিস' : 'Service'}</label>
              <select className="form-select" value={selectedServiceId} onChange={handleServiceChange}>
                {filteredServices.map(svc => (
                  <option key={svc.id} value={svc.id}>
                    ID {svc.id} - {isBn ? svc.nameBn : svc.name} ({formatPrice(svc.ratePer1000)} / 1K)
                  </option>
                ))}
              </select>
            </div>

            {selectedService && (
              <div className="service-info-box">
                <div style={{ fontWeight: 600, color: 'var(--primary-cyan)', marginBottom: '6px' }}>{isBn ? selectedService.nameBn : selectedService.name}</div>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>{selectedService.description}</p>
                <div className="service-info-meta">
                  <div className="meta-item"><Clock size={14} color="var(--primary-cyan)" /><span>Avg: <strong>{selectedService.avgTime}</strong></span></div>
                  <div className="meta-item"><ShieldCheck size={14} color="var(--accent-green)" /><span>Guarantee: <strong>{selectedService.guarantee}</strong></span></div>
                </div>
              </div>
            )}

            <div className="form-group">
              <label className="form-label">{isBn ? 'টার্গেট লিংক (URL)' : 'Target Link'}</label>
              <input type="text" className="form-input" placeholder="https://facebook.com/..." value={link} onChange={(e) => setLink(e.target.value)} />
            </div>

            <div className="form-group">
              <label className="form-label">{isBn ? 'পরিমাণ (Quantity)' : 'Quantity'}</label>
              <input type="number" className="form-input" placeholder="1000" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
            </div>

            <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '16px', borderRadius: '8px', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{isBn ? 'মোট খরচ:' : 'Total Charge:'}</span>
                <span style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--accent-green)', display: 'block' }}>{formatPrice(calculatedCharge)}</span>
              </div>
              {calculatedCharge > balance && (
                <button type="button" className="btn-secondary" onClick={() => setActiveTab('add-funds')}>
                  <Wallet size={15} style={{ display: 'inline', marginRight: '6px' }} />{isBn ? 'রিচার্জ করুন' : 'Add Balance'}
                </button>
              )}
            </div>

            <button type="submit" className="btn-primary">
              <Zap size={18} />{isBn ? 'অর্ডার কনফার্ম করুন' : 'Submit Order'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
