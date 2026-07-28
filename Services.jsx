import React, { useState } from 'react';
import { CATEGORIES } from '../data/mockServices';
import { Search, Info, ExternalLink, Zap } from 'lucide-react';

export default function Services({ services, currency, lang, setActiveTab }) {
  const isBn = lang === 'bn';
  const [selectedCat, setSelectedCat] = useState("All Categories");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeModalSvc, setActiveModalSvc] = useState(null);

  // Filter services based on category and search query
  const filtered = services.filter(svc => {
    const matchesCat = selectedCat === "All Categories" || svc.category === selectedCat;
    const matchesSearch = 
      svc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (svc.nameBn && svc.nameBn.toLowerCase().includes(searchQuery.toLowerCase())) ||
      svc.id.toString().includes(searchQuery);
    return matchesCat && matchesSearch;
  });

  const formatPrice = (bdtPrice) => {
    if (currency === 'USD') {
      return `$${(bdtPrice / 120).toFixed(3)}`;
    }
    return `৳${bdtPrice.toFixed(2)}`;
  };

  return (
    <div>
      <div className="glass-card" style={{ padding: '24px', marginBottom: '24px' }}>
        <h2 style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Zap className="gradient-text" size={24} />
          {isBn ? 'সার্ভিস তালিকা ও রেট কার্ড' : 'Services & Pricing List'}
        </h2>

        {/* Category Pills */}
        <div className="category-pills">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              className={`pill-btn ${selectedCat === cat ? 'active' : ''}`}
              onClick={() => setSelectedCat(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="search-wrapper">
          <Search className="search-icon" size={18} />
          <input 
            type="text" 
            className="search-input" 
            placeholder={isBn ? "সার্ভিস আইডি বা নাম দিয়ে খুঁজুন..." : "Search by Service ID or keyword..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Services Table */}
      <div className="glass-card table-container">
        <table className="custom-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>{isBn ? 'ক্যাটাগরি' : 'Category'}</th>
              <th>{isBn ? 'সার্ভিসের নাম' : 'Service Name'}</th>
              <th>{isBn ? 'রেট (প্রতি ১০০০)' : 'Rate / 1k'}</th>
              <th>{isBn ? 'সর্বনিম্ন / সর্বোচ্চ' : 'Min / Max'}</th>
              <th>{isBn ? 'গড় গতি' : 'Avg Speed'}</th>
              <th>{isBn ? 'অ্যাকশন' : 'Action'}</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center', padding: '30px', color: 'var(--text-muted)' }}>
                  {isBn ? 'কোনো সার্ভিস পাওয়া যায়নি।' : 'No services found matching your criteria.'}
                </td>
              </tr>
            ) : (
              filtered.map(svc => (
                <tr key={svc.id}>
                  <td style={{ fontWeight: 700, color: 'var(--primary-cyan)' }}>#{svc.id}</td>
                  <td>
                    <span style={{ 
                      background: 'rgba(255, 255, 255, 0.06)', 
                      padding: '4px 10px', 
                      borderRadius: 'var(--radius-full)', 
                      fontSize: '0.78rem' 
                    }}>
                      {svc.category}
                    </span>
                  </td>
                  <td style={{ fontWeight: 500, maxWidth: '360px' }}>
                    <div>{isBn ? svc.nameBn : svc.name}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', marginTop: '2px' }}>
                      {svc.guarantee}
                    </div>
                  </td>
                  <td style={{ fontWeight: 800, color: 'var(--accent-green)', fontSize: '1.02rem' }}>
                    {formatPrice(svc.ratePer1000)}
                  </td>
                  <td style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    {svc.min.toLocaleString()} / {svc.max.toLocaleString()}
                  </td>
                  <td style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    {svc.avgTime}
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button 
                        className="btn-secondary" 
                        style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                        onClick={() => setActiveModalSvc(svc)}
                      >
                        <Info size={14} style={{ marginRight: '4px' }} />
                        {isBn ? 'বিস্তারিত' : 'Details'}
                      </button>
                      <button 
                        className="btn-primary" 
                        style={{ padding: '6px 14px', fontSize: '0.8rem', width: 'auto' }}
                        onClick={() => setActiveTab('new-order')}
                      >
                        {isBn ? 'অর্ডার' : 'Order'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Details Modal */}
      {activeModalSvc && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(7, 9, 14, 0.8)',
          backdropFilter: 'blur(8px)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div className="glass-card" style={{ maxWidth: '500px', width: '100%', padding: '24px', border: '1px solid var(--primary-cyan)' }}>
            <h3 style={{ marginBottom: '10px', color: 'var(--primary-cyan)' }}>
              Service #{activeModalSvc.id} Details
            </h3>
            <h4 style={{ marginBottom: '16px', fontWeight: 600 }}>
              {isBn ? activeModalSvc.nameBn : activeModalSvc.name}
            </h4>
            <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '20px' }}>
              {activeModalSvc.description}
            </div>

            <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '12px', borderRadius: '8px', marginBottom: '20px', fontSize: '0.85rem' }}>
              <div><strong>Category:</strong> {activeModalSvc.category}</div>
              <div><strong>Rate:</strong> {formatPrice(activeModalSvc.ratePer1000)} / 1,000</div>
              <div><strong>Min / Max:</strong> {activeModalSvc.min} - {activeModalSvc.max}</div>
              <div><strong>Speed:</strong> {activeModalSvc.avgTime}</div>
              <div><strong>Refill Guarantee:</strong> {activeModalSvc.guarantee}</div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button className="btn-secondary" onClick={() => setActiveModalSvc(null)}>
                {isBn ? 'বন্ধ করুন' : 'Close'}
              </button>
              <button 
                className="btn-primary" 
                style={{ width: 'auto' }}
                onClick={() => {
                  setActiveModalSvc(null);
                  setActiveTab('new-order');
                }}
              >
                {isBn ? 'অর্ডার করুন' : 'Place Order'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
