import React, { useState } from 'react';
import { Search, Copy, Check, ExternalLink, History } from 'lucide-react';

export default function Orders({ orders, currency, lang }) {
  const isBn = lang === 'bn';

  const [selectedStatus, setSelectedStatus] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedId, setCopiedId] = useState(null);

  const statuses = ["All", "Pending", "Processing", "In Progress", "Completed", "Canceled"];

  // Filter orders
  const filtered = orders.filter(ord => {
    const matchesStatus = selectedStatus === "All" || ord.status === selectedStatus;
    const matchesSearch = 
      ord.id.toString().includes(searchQuery) ||
      ord.link.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ord.serviceName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const formatPrice = (bdtPrice) => {
    if (currency === 'USD') {
      return `$${(bdtPrice / 120).toFixed(3)}`;
    }
    return `৳${bdtPrice.toFixed(2)}`;
  };

  const getStatusBadge = (status) => {
    const s = status.toLowerCase().replace(/\s+/g, '');
    let cls = 'status-pending';
    if (s === 'completed') cls = 'status-completed';
    else if (s === 'processing') cls = 'status-processing';
    else if (s === 'inprogress') cls = 'status-inprogress';
    else if (s === 'canceled') cls = 'status-canceled';

    return <span className={`status-badge ${cls}`}>{status}</span>;
  };

  const copyToClipboard = (id) => {
    navigator.clipboard.writeText(id.toString());
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div>
      <div className="glass-card" style={{ padding: '24px', marginBottom: '24px' }}>
        <h2 style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <History className="gradient-text" size={24} />
          {isBn ? 'আপনার অর্ডারের তালিকা' : 'Order History & Logs'}
        </h2>

        {/* Status Filter Pills */}
        <div className="category-pills">
          {statuses.map(st => (
            <button
              key={st}
              className={`pill-btn ${selectedStatus === st ? 'active' : ''}`}
              onClick={() => setSelectedStatus(st)}
            >
              {st}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="search-wrapper">
          <Search className="search-icon" size={18} />
          <input 
            type="text" 
            className="search-input" 
            placeholder={isBn ? "অর্ডার আইডি বা লিংক দিয়ে খুঁজুন..." : "Search by Order ID or link..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Orders Table */}
      <div className="glass-card table-container">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>{isBn ? 'তারিখ' : 'Date'}</th>
              <th>{isBn ? 'সার্ভিস' : 'Service'}</th>
              <th>{isBn ? 'টার্গেট লিংক' : 'Link'}</th>
              <th>{isBn ? 'পরিমাণ' : 'Quantity'}</th>
              <th>{isBn ? 'চার্জ' : 'Charge'}</th>
              <th>{isBn ? 'স্ট্যাটাস' : 'Status'}</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center', padding: '30px', color: 'var(--text-muted)' }}>
                  {isBn ? 'কোনো অর্ডার রেকর্ড পাওয়া যায়নি।' : 'No orders found matching your filter.'}
                </td>
              </tr>
            ) : (
              filtered.map(ord => (
                <tr key={ord.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700, color: 'var(--primary-cyan)' }}>
                      #{ord.id}
                      <button 
                        onClick={() => copyToClipboard(ord.id)}
                        style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex' }}
                        title="Copy ID"
                      >
                        {copiedId === ord.id ? <Check size={14} color="var(--accent-green)" /> : <Copy size={14} />}
                      </button>
                    </div>
                  </td>
                  <td style={{ fontSize: '0.82rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
                    {ord.date}
                  </td>
                  <td style={{ fontWeight: 500, maxWidth: '240px' }}>
                    <div style={{ fontSize: '0.88rem' }}>{ord.serviceName}</div>
                  </td>
                  <td style={{ maxWidth: '200px' }}>
                    <a 
                      href={ord.link.startsWith('http') ? ord.link : `https://${ord.link}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      style={{ color: 'var(--primary-blue)', textDecoration: 'none', fontSize: '0.84rem', display: 'flex', alignItems: 'center', gap: '4px' }}
                    >
                      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{ord.link}</span>
                      <ExternalLink size={12} />
                    </a>
                  </td>
                  <td style={{ fontWeight: 700 }}>
                    {ord.quantity.toLocaleString()}
                  </td>
                  <td style={{ fontWeight: 700, color: 'var(--accent-green)' }}>
                    {formatPrice(ord.charge)}
                  </td>
                  <td>
                    {getStatusBadge(ord.status)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
