import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import NewOrder from './components/NewOrder';
import Services from './components/Services';
import Orders from './components/Orders';
import AddFunds from './components/AddFunds';
import Tickets from './components/Tickets';
import ApiDocs from './components/ApiDocs';
import AdminPanel from './components/AdminPanel';

import { 
  INITIAL_SERVICES, 
  INITIAL_ORDERS, 
  INITIAL_TICKETS 
} from './data/mockServices';

import { CheckCircle, AlertCircle } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('new-order');
  const [lang, setLang] = useState(() => localStorage.getItem('bdclick_lang') || 'bn');
  const [currency, setCurrency] = useState(() => localStorage.getItem('bdclick_curr') || 'BDT');

  const [balance, setBalance] = useState(() => {
    const saved = localStorage.getItem('bdclick_balance');
    return saved ? parseFloat(saved) : 500;
  });

  const [services, setServices] = useState(() => {
    const saved = localStorage.getItem('bdclick_services');
    return saved ? JSON.parse(saved) : INITIAL_SERVICES;
  });

  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('bdclick_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  const [tickets, setTickets] = useState(() => {
    const saved = localStorage.getItem('bdclick_tickets');
    return saved ? JSON.parse(saved) : INITIAL_TICKETS;
  });

  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('bdclick_transactions');
    return saved ? JSON.parse(saved) : [
      { method: "bKash Send Money", amount: 500, trxId: "BK7910294", date: "2026-07-24 09:30 AM" }
    ];
  });

  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  useEffect(() => { localStorage.setItem('bdclick_lang', lang); }, [lang]);
  useEffect(() => { localStorage.setItem('bdclick_curr', currency); }, [currency]);
  useEffect(() => { localStorage.setItem('bdclick_balance', balance.toString()); }, [balance]);
  useEffect(() => { localStorage.setItem('bdclick_services', JSON.stringify(services)); }, [services]);
  useEffect(() => { localStorage.setItem('bdclick_orders', JSON.stringify(orders)); }, [orders]);
  useEffect(() => { localStorage.setItem('bdclick_tickets', JSON.stringify(tickets)); }, [tickets]);
  useEffect(() => { localStorage.setItem('bdclick_transactions', JSON.stringify(transactions)); }, [transactions]);

  const handlePlaceOrder = (newOrderData) => {
    const newId = Math.floor(10000 + Math.random() * 90000);
    const nowStr = new Date().toLocaleString('en-US', { hour12: true });

    const newOrder = {
      id: newId,
      serviceId: newOrderData.serviceId,
      serviceName: newOrderData.serviceName,
      link: newOrderData.link,
      quantity: newOrderData.quantity,
      charge: newOrderData.charge,
      status: "Pending",
      startCount: Math.floor(Math.random() * 1000) + 100,
      remains: newOrderData.quantity,
      date: nowStr
    };

    setBalance(prev => prev - newOrderData.charge);
    setOrders(prev => [newOrder, ...prev]);

    showToast(
      lang === 'bn' ? `অর্ডার #${newId} সফলভাবে গ্রহণ করা হয়েছে!` : `Order #${newId} placed successfully!`,
      'success'
    );

    setActiveTab('orders');
  };

  const handleAddFunds = (fundData) => {
    const nowStr = new Date().toLocaleString('en-US', { hour12: true });
    setBalance(prev => prev + fundData.amount);
    setTransactions(prev => [{
      method: fundData.method,
      amount: fundData.amount,
      trxId: fundData.trxId,
      date: nowStr
    }, ...prev]);

    showToast(
      lang === 'bn' ? `৳${fundData.amount} সফলভাবে ওয়ালেটে যুক্ত হয়েছে!` : `৳${fundData.amount} added to wallet balance!`,
      'success'
    );
  };

  const handleCreateTicket = (ticketData) => {
    const tckId = `TCK-${Math.floor(1000 + Math.random() * 9000)}`;
    const nowStr = new Date().toLocaleString('en-US', { hour12: true });

    const newTicket = {
      id: tckId,
      subject: ticketData.subject,
      orderId: ticketData.orderId || '',
      category: 'General',
      status: 'Open',
      date: nowStr,
      messages: [{ sender: 'User', text: ticketData.message, time: 'Just now' }]
    };

    setTickets(prev => [newTicket, ...prev]);
    showToast(lang === 'bn' ? 'সাপোর্ট টিকেট জমা দেওয়া হয়েছে।' : 'Support ticket submitted.', 'success');
    return newTicket;
  };

  const handleSendTicketMessage = (ticketId, text) => {
    const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setTickets(prev => prev.map(t => {
      if (t.id === ticketId) {
        return {
          ...t,
          status: 'Open',
          messages: [...t.messages, { sender: 'User', text, time: nowStr }]
        };
      }
      return t;
    }));
  };

  const handleUpdateOrderStatus = (orderId, newStatus) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    showToast(`Order #${orderId} status changed to ${newStatus}`, 'success');
  };

  const handleUpdateServiceRate = (serviceId, newRate) => {
    setServices(prev => prev.map(s => s.id === serviceId ? { ...s, ratePer1000: newRate } : s));
    showToast(`Service #${serviceId} rate updated`, 'success');
  };

  const handleAdminAddBalance = (amount) => {
    setBalance(prev => prev + amount);
    showToast(`Admin updated balance by ৳${amount}`, 'success');
  };

  const handleAddNewService = (newSvc) => {
    const newId = services.length > 0 ? Math.max(...services.map(s => s.id)) + 1 : 101;
    setServices(prev => [{ id: newId, ...newSvc }, ...prev]);
    showToast(`New service #${newId} created!`, 'success');
  };

  return (
    <div className="app-container">
      {toast && (
        <div className="toast-container">
          <div className={`toast ${toast.type}`}>
            {toast.type === 'success' ? <CheckCircle size={20} color="var(--accent-green)" /> : <AlertCircle size={20} color="var(--accent-red)" />}
            <span>{toast.message}</span>
          </div>
        </div>
      )}

      <Navbar 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        balance={balance}
        currency={currency}
        setCurrency={setCurrency}
        lang={lang}
        setLang={setLang}
      />

      <main className="main-content">
        {activeTab === 'new-order' && (
          <NewOrder 
            services={services}
            balance={balance}
            currency={currency}
            lang={lang}
            onPlaceOrder={handlePlaceOrder}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'services' && (
          <Services 
            services={services}
            currency={currency}
            lang={lang}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'orders' && (
          <Orders 
            orders={orders}
            currency={currency}
            lang={lang}
          />
        )}

        {activeTab === 'add-funds' && (
          <AddFunds 
            balance={balance}
            currency={currency}
            lang={lang}
            onAddFunds={handleAddFunds}
            transactions={transactions}
          />
        )}

        {activeTab === 'tickets' && (
          <Tickets 
            tickets={tickets}
            lang={lang}
            onCreateTicket={handleCreateTicket}
            onSendMessage={handleSendTicketMessage}
          />
        )}

        {activeTab === 'api' && (
          <ApiDocs lang={lang} />
        )}

        {activeTab === 'admin' && (
          <AdminPanel 
            orders={orders}
            services={services}
            balance={balance}
            lang={lang}
            currency={currency}
            onUpdateOrderStatus={handleUpdateOrderStatus}
            onUpdateServiceRate={handleUpdateServiceRate}
            onAdminAddBalance={handleAdminAddBalance}
            onAddNewService={handleAddNewService}
          />
        )}
      </main>

      <footer className="footer">
        <div>
          © 2026 <strong style={{ color: '#fff' }}>BDClick SMM Panel</strong>. All rights reserved. Built for high performance in Bangladesh 🇧🇩
        </div>
      </footer>
    </div>
  );
}
