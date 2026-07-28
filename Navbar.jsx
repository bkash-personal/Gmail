import React from 'react';
import { Zap, PlusCircle, List, History, Wallet, Code, HelpCircle, ShieldAlert, Globe } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, balance, currency, setCurrency, lang, setLang }) {
  const isBn = lang === 'bn';

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <div className="brand-logo" onClick={() => setActiveTab('new-order')}>
          <div className="brand-icon-wrapper">
            <Zap size={22} color="#07090e" fill="#07090e" />
          </div>
          <div>
            <span className="gradient-text">BDClick</span>
            <span style={{ fontSize: '0.75rem', display: 'block', color: 'var(--text-muted)', fontWeight: 500 }}>
              SMM PANEL BD
            </span>
          </div>
        </div>

        <ul className="nav-links">
          <li><button className={`nav-item-btn ${activeTab === 'new-order' ? 'active' : ''}`} onClick={() => setActiveTab('new-order')}><PlusCircle size={17} />{isBn ? 'নতুন অর্ডার' : 'New Order'}</button></li>
          <li><button className={`nav-item-btn ${activeTab === 'services' ? 'active' : ''}`} onClick={() => setActiveTab('services')}><List size={17} />{isBn ? 'সার্ভিসসমূহ' : 'Services'}</button></li>
          <li><button className={`nav-item-btn ${activeTab === 'orders' ? 'active' : ''}`} onClick={() => setActiveTab('orders')}><History size={17} />{isBn ? 'অর্ডার হিস্ট্রি' : 'Orders'}</button></li>
          <li><button className={`nav-item-btn ${activeTab === 'add-funds' ? 'active' : ''}`} onClick={() => setActiveTab('add-funds')}><Wallet size={17} />{isBn ? 'ব্যালেন্স ডিপোজিট' : 'Add Funds'}</button></li>
          <li><button className={`nav-item-btn ${activeTab === 'tickets' ? 'active' : ''}`} onClick={() => setActiveTab('tickets')}><HelpCircle size={17} />{isBn ? 'সাপোর্ট টিকেট' : 'Tickets'}</button></li>
          <li><button className={`nav-item-btn ${activeTab === 'api' ? 'active' : ''}`} onClick={() => setActiveTab('api')}><Code size={17} />API</button></li>
          <li><button className={`nav-item-btn admin-tab ${activeTab === 'admin' ? 'active' : ''}`} onClick={() => setActiveTab('admin')}><ShieldAlert size={17} />{isBn ? 'এডমিন প্যানেল' : 'Admin'}</button></li>
        </ul>

        <div className="nav-right">
          <button className="lang-btn" onClick={() => setCurrency(currency === 'BDT' ? 'USD' : 'BDT')}>
            {currency === 'BDT' ? '৳ BDT' : '$ USD'}
          </button>
          <div className="balance-pill">
            <Wallet size={16} />
            <span>{currency === 'BDT' ? `৳${balance.toFixed(2)}` : `$${(balance / 120).toFixed(2)}`}</span>
          </div>
          <button className="deposit-quick-btn" onClick={() => setActiveTab('add-funds')}>
            <PlusCircle size={16} />{isBn ? 'টাকা রিচার্জ' : 'Deposit'}
          </button>
          <button className="lang-btn" onClick={() => setLang(lang === 'bn' ? 'en' : 'bn')}>
            <Globe size={15} />{lang === 'bn' ? 'English' : 'বাংলা'}
          </button>
        </div>
      </div>
    </nav>
  );
}
