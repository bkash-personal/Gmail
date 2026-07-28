import React, { useState } from 'react';
import { 
  ShieldAlert, 
  DollarSign, 
  ShoppingBag, 
  Layers, 
  Users, 
  Check, 
  X, 
  Edit, 
  Plus, 
  Save 
} from 'lucide-react';

export default function AdminPanel({ 
  orders, 
  services, 
  balance, 
  lang, 
  currency,
  onUpdateOrderStatus, 
  onUpdateServiceRate,
  onAdminAddBalance,
  onAddNewService 
}) {
  const isBn = lang === 'bn';

  const [activeAdminTab, setActiveAdminTab] = useState("orders");

  // Editing state for service rates
  const [editingServiceId, setEditingServiceId] = useState(null);
  const [newRate, setNewRate] = useState("");

  // Add custom balance state
  const [adminBalanceInput, setAdminBalanceInput] = useState("");
  const [balanceAdminMsg, setBalanceAdminMsg] = useState("");

  // Add new service state
  const [newSvcCategory, setNewSvcCategory] = useState("Facebook");
  const [newSvcName, setNewSvcName] = useState("");
  const [newSvcRate, setNewSvcRate] = useState("");
  const [newSvcMin, setNewSvcMin] = useState("100");
  const [newSvcMax, setNewSvcMax] = useState("50000");

  // Analytics calculation
  const totalRevenue = orders.reduce((acc, o) => acc + o.charge, 0);

  const formatPrice = (bdtPrice) => {
    if (currency === 'USD') {
      return `$${(bdtPrice / 120).toFixed(2)}`;
    }
    return `৳${bdtPrice.toFixed(2)}`;
  };

  const handleSaveRate = (id) => {
    const rateNum = parseFloat(newRate);
    if (!isNaN(rateNum) && rateNum > 0) {
      onUpdateServiceRate(id, rateNum);
    }
    setEditingServiceId(null);
  };

  const handleAdminBalanceSubmit = (e) => {
    e.preventDefault();
    const amount = parseFloat(adminBalanceInput);
    if (!isNaN(amount) && amount !== 0) {
      onAdminAddBalance(amount);
      setBalanceAdminMsg(`Wallet balance updated by ৳${amount}`);
      setAdminBalanceInput("");
      setTimeout(() => setBalanceAdminMsg(""), 3000);
    }
  };

  const handleCreateService = (e) => {
    e.preventDefault();
    if (!newSvcName.trim() || !newSvcRate) return;

    onAddNewService({
      category: newSvcCategory,
      name: newSvcName.trim(),
      nameBn: newSvcName.trim(),
      ratePer1000: parseFloat(newSvcRate),
      min: parseInt(newSvcMin),
      max: parseInt(newSvcMax),
      avgTime: "10-30 Mins",
      guarantee: "Auto-Refill",
      description: "Custom admin created service"
    });

    setNewSvcName("");
    setNewSvcRate("");
  };

  return (
    <div>
      {/* Admin Top Banner */}
      <div className="glass-card-neon" style={{ padding: '24px', marginBottom: '24px', borderColor: 'rgba(244, 114, 182, 0.4)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2 style={{ color: '#f472b6', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <ShieldAlert size={26} />
              {isBn ? 'এডমিন কন্ট্রোল প্যানেল' : 'System Admin Management'}
            </h2>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginTop: '4px' }}>
              {isBn 
                ? 'সাইটের সকল সার্ভিস, অর্ডার স্ট্যাটাস, সার্ভিস প্রাইস ও ইউজার ব্যালেন্স নিয়ন্ত্রণ করুন।'
                : 'Manage system services, control order statuses, modify pricing, and inject user balance.'
              }
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button 
              className={`pill-btn ${activeAdminTab === 'orders' ? 'active' : ''}`}
              onClick={() => setActiveAdminTab('orders')}
            >
              Orders ({orders.length})
            </button>
            <button 
              className={`pill-btn ${activeAdminTab === 'services' ? 'active' : ''}`}
              onClick={() => setActiveAdminTab('services')}
            >
              Services ({services.length})
            </button>
            <button 
              className={`pill-btn ${activeAdminTab === 'balance' ? 'active' : ''}`}
              onClick={() => setActiveAdminTab('balance')}
            >
              Inject Balance
            </button>
          </div>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="stats-grid">
        <div className="glass-card stat-card">
          <div className="stat-icon green">
            <DollarSign size={24} />
          </div>
          <div>
            <div className="stat-label">{isBn ? 'মোট বিক্রি (Revenue)' : 'Total Revenue'}</div>
            <div className="stat-value">{formatPrice(totalRevenue)}</div>
          </div>
        </div>

        <div className="glass-card stat-card">
          <div className="stat-icon purple">
            <ShoppingBag size={24} />
          </div>
          <div>
            <div className="stat-label">{isBn ? 'মোট অর্ডার' : 'Total Orders'}</div>
            <div className="stat-value">{orders.length}</div>
          </div>
        </div>

        <div className="glass-card stat-card">
          <div className="stat-icon cyan">
            <Layers size={24} />
          </div>
          <div>
            <div className="stat-label">{isBn ? 'মোট সার্ভিস' : 'Active Services'}</div>
            <div className="stat-value">{services.length}</div>
          </div>
        </div>

        <div className="glass-card stat-card">
          <div className="stat-icon yellow">
            <Users size={24} />
          </div>
          <div>
            <div className="stat-label">{isBn ? 'বর্তমান ওয়ালেট ব্যালেন্স' : 'Current User Balance'}</div>
            <div className="stat-value">{formatPrice(balance)}</div>
          </div>
        </div>
      </div>

      {/* Admin Tab 1: Orders Management */}
      {activeAdminTab === 'orders' && (
        <div className="glass-card table-container">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Service Name</th>
                <th>Link</th>
                <th>Qty</th>
                <th>Charge</th>
                <th>Current Status</th>
                <th>Change Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(ord => (
                <tr key={ord.id}>
                  <td style={{ fontWeight: 700, color: 'var(--primary-cyan)' }}>#{ord.id}</td>
                  <td style={{ fontSize: '0.85rem', maxWidth: '220px' }}>{ord.serviceName}</td>
                  <td style={{ fontSize: '0.8rem', maxWidth: '180px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {ord.link}
                  </td>
                  <td style={{ fontWeight: 700 }}>{ord.quantity}</td>
                  <td style={{ fontWeight: 700, color: 'var(--accent-green)' }}>{formatPrice(ord.charge)}</td>
                  <td>
                    <span className="status-badge status-processing">{ord.status}</span>
                  </td>
                  <td>
                    <select 
                      className="form-select"
                      style={{ padding: '6px 10px', fontSize: '0.82rem', width: 'auto' }}
                      value={ord.status}
                      onChange={(e) => onUpdateOrderStatus(ord.id, e.target.value)}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                      <option value="Canceled">Canceled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Admin Tab 2: Services Management */}
      {activeAdminTab === 'services' && (
        <div>
          {/* Add New Service Form */}
          <div className="glass-card" style={{ padding: '20px', marginBottom: '20px' }}>
            <h3 style={{ marginBottom: '14px', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Plus size={16} color="var(--primary-cyan)" />
              {isBn ? 'নতুন সার্ভিস যোগ করুন' : 'Add New Service'}
            </h3>
            <form onSubmit={handleCreateService} style={{ display: 'grid', gridTemplateColumns: '1fr 2fr 1fr 1fr 1fr auto', gap: '12px', alignItems: 'end' }}>
              <div>
                <label className="form-label" style={{ fontSize: '0.78rem' }}>Category</label>
                <select className="form-select" value={newSvcCategory} onChange={e => setNewSvcCategory(e.target.value)}>
                  <option value="Facebook">Facebook</option>
                  <option value="Instagram">Instagram</option>
                  <option value="YouTube">YouTube</option>
                  <option value="TikTok">TikTok</option>
                  <option value="Telegram">Telegram</option>
                  <option value="Twitter (X)">Twitter (X)</option>
                </select>
              </div>
              <div>
                <label className="form-label" style={{ fontSize: '0.78rem' }}>Service Name</label>
                <input className="form-input" type="text" placeholder="Service title" value={newSvcName} onChange={e => setNewSvcName(e.target.value)} required />
              </div>
              <div>
                <label className="form-label" style={{ fontSize: '0.78rem' }}>Rate / 1k (BDT)</label>
                <input className="form-input" type="number" placeholder="100" value={newSvcRate} onChange={e => setNewSvcRate(e.target.value)} required />
              </div>
              <div>
                <label className="form-label" style={{ fontSize: '0.78rem' }}>Min</label>
                <input className="form-input" type="number" value={newSvcMin} onChange={e => setNewSvcMin(e.target.value)} />
              </div>
              <div>
                <label className="form-label" style={{ fontSize: '0.78rem' }}>Max</label>
                <input className="form-input" type="number" value={newSvcMax} onChange={e => setNewSvcMax(e.target.value)} />
              </div>
              <button type="submit" className="btn-primary" style={{ padding: '12px 18px', width: 'auto' }}>
                Save
              </button>
            </form>
          </div>

          <div className="glass-card table-container">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Category</th>
                  <th>Service Name</th>
                  <th>Current Rate / 1k</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {services.map(svc => (
                  <tr key={svc.id}>
                    <td style={{ fontWeight: 700 }}>#{svc.id}</td>
                    <td>{svc.category}</td>
                    <td>{svc.name}</td>
                    <td style={{ fontWeight: 700, color: 'var(--accent-green)' }}>
                      {editingServiceId === svc.id ? (
                        <input 
                          type="number" 
                          className="form-input"
                          style={{ width: '100px', padding: '4px 8px' }}
                          value={newRate}
                          onChange={e => setNewRate(e.target.value)}
                        />
                      ) : (
                        formatPrice(svc.ratePer1000)
                      )}
                    </td>
                    <td>
                      {editingServiceId === svc.id ? (
                        <button 
                          className="btn-primary" 
                          style={{ padding: '4px 10px', fontSize: '0.78rem', width: 'auto' }}
                          onClick={() => handleSaveRate(svc.id)}
                        >
                          <Save size={12} /> Save
                        </button>
                      ) : (
                        <button 
                          className="btn-secondary" 
                          style={{ padding: '4px 10px', fontSize: '0.78rem' }}
                          onClick={() => {
                            setEditingServiceId(svc.id);
                            setNewRate(svc.ratePer1000.toString());
                          }}
                        >
                          <Edit size={12} /> Edit Rate
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Admin Tab 3: Balance Injection */}
      {activeAdminTab === 'balance' && (
        <div className="glass-card" style={{ padding: '24px', maxWidth: '500px' }}>
          <h3 style={{ marginBottom: '14px' }}>Manually Inject User Balance</h3>

          {balanceAdminMsg && (
            <div style={{ padding: '10px', background: 'rgba(16,185,129,0.15)', color: '#34d399', borderRadius: '8px', marginBottom: '14px', fontSize: '0.88rem' }}>
              {balanceAdminMsg}
            </div>
          )}

          <form onSubmit={handleAdminBalanceSubmit}>
            <div className="form-group">
              <label className="form-label">Add / Deduct Amount (BDT ৳)</label>
              <input 
                type="number" 
                className="form-input" 
                placeholder="e.g. 1000 or -200" 
                value={adminBalanceInput}
                onChange={e => setAdminBalanceInput(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn-primary">
              Update Wallet Balance
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
