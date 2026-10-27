import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter, Link, Route, Routes, useLocation } from 'react-router-dom';
import homeSource from './content/index.html?raw';
import aboutSource from './content/about.html?raw';
import workSource from './content/work.html?raw';
import contactSource from './content/contact.html?raw';
import './style.css';

const pages = [
  { label: 'Home', to: '/' }, { label: 'About', to: '/about' },
  { label: 'Work', to: '/work' }, { label: 'Contacts', to: '/contact' },
  { label: 'Budget Tracker', to: '/budget-tracker' }
];
function Header() {
  const [desktopOpen, setDesktopOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileDropdown, setMobileDropdown] = useState(false);
  const location = useLocation();
  useEffect(() => { setDesktopOpen(false); setMobileOpen(false); setMobileDropdown(false); }, [location.pathname]);
  useEffect(() => {
    const close = e => { if (e.key === 'Escape') { setDesktopOpen(false); setMobileOpen(false); setMobileDropdown(false); } };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, []);
  return <header className="site-header"><div className="nav-wrap">
    <Link className="brand" to="/"><span className="brand-mark">AV</span><span>Andrei Vincent P. Padillo</span></Link>
    <nav className="desktop-nav" aria-label="Primary navigation"><div className="dropdown">
      <button className="nav-link dropdown-toggle" type="button" aria-expanded={desktopOpen} onClick={() => setDesktopOpen(v => !v)}>Explore <span className={`dropdown-arrow ${desktopOpen ? 'is-open' : ''}`} aria-hidden="true">⌄</span></button>
      <ul className={`dropdown-menu ${desktopOpen ? 'show' : ''}`}>{pages.map(p => <li key={p.to}><Link to={p.to}>{p.label} <span aria-hidden="true">↗</span></Link></li>)}</ul>
    </div></nav>
    <button className="mobile-toggle" type="button" aria-expanded={mobileOpen} aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'} onClick={() => setMobileOpen(v => !v)}>{mobileOpen ? '×' : '☰'}</button>
  </div>
  <nav className={`mobile-menu ${mobileOpen ? 'is-open' : ''}`} aria-label="Mobile navigation"><div className="mobile-dropdown">
    <button className="mobile-dropdown-toggle" type="button" aria-expanded={mobileDropdown} onClick={() => setMobileDropdown(v => !v)}>Explore <span className={`mobile-dropdown-arrow ${mobileDropdown ? 'is-open' : ''}`}>⌄</span></button>
    <ul className={`mobile-dropdown-menu ${mobileDropdown ? 'show' : ''}`}>{pages.map(p => <li key={p.to}><Link to={p.to}>{p.label} <span aria-hidden="true">↗</span></Link></li>)}</ul>
  </div></nav></header>;
}
function Footer() { return <footer className="footer"><div className="container footer-inner"><p>© {new Date().getFullYear()} Andrei Vincent P. Padillo</p><span className="mono-label">Made while learning / Tangub City</span></div></footer>; }
function getMain(source) {
  const match = source.match(/<main>([\s\S]*?)<\/main>/i);
  return (match ? match[1] : '<section class="section-pad"><div class="container">Page content unavailable.</div></section>')
    .replaceAll('https://raw.githubusercontent.com/FateMorningStar/fatemorningstar.github.io/refs/heads/main/', '/images/')
    .replaceAll('index.html', '/').replaceAll('about.html', '/about').replaceAll('work.html', '/work').replaceAll('contact.html', '/contact').replaceAll('budget-tracker.html', '/budget-tracker');
}
function StaticPage({ source }) {
  const html = getMain(source);
  useEffect(() => {
    document.body.classList.remove('menu-open');
    const onClick = e => {
      const trigger = e.target.closest('[data-gallery-image]');
      if (trigger) {
        const overlay = document.querySelector('[data-react-lightbox]');
        if (!overlay) return;
        const img = overlay.querySelector('img');
        img.src = trigger.dataset.image || trigger.querySelector('img')?.src || '';
        img.alt = trigger.dataset.alt || '';
        overlay.querySelector('[data-react-caption]').textContent = trigger.dataset.label || 'Image preview';
        overlay.hidden = false;
        document.body.classList.add('menu-open');
      }
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [source]);
  return <><main dangerouslySetInnerHTML={{ __html: html }} /><div className="lightbox" data-react-lightbox hidden><button type="button" className="lightbox-close" aria-label="Close image preview" onClick={() => { const el=document.querySelector('[data-react-lightbox]'); if(el) el.hidden=true; document.body.classList.remove('menu-open'); }}>×</button><figure><img src="" alt=""/><figcaption data-react-caption>Image preview</figcaption></figure></div></>;
}
function BudgetTracker() {
  const [salary, setSalary] = useState('');
  const [expenses, setExpenses] = useState([]);
  const remaining = (Number(salary) || 0) - expenses.filter(e => e.saved).reduce((sum, e) => sum + e.amount, 0);
  const money = n => n.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const add = () => setExpenses(prev => [...prev, { id: Date.now() + Math.random(), value: '', amount: 0, saved: false }]);
  const update = (id, value) => setExpenses(prev => prev.map(e => e.id === id ? {...e, value} : e));
  const save = id => setExpenses(prev => prev.map(e => e.id === id && Number(e.value) > 0 ? {...e, amount: Number(e.value), saved: true} : e));
  return <main><section className="budget-section"><div className="container"><div className="budget-heading"><div className="eyebrow">04 / Budget Tracker</div><h1>Track your <em>budget.</em></h1><p>Enter your total amount, add your expenses, and keep track of the amount you have remaining.</p></div><div className="budget-box"><label className="budget-label" htmlFor="salary">Total Amount / Salary</label><input className="budget-input" id="salary" type="number" min="0" placeholder="Enter total amount" value={salary} onChange={e=>setSalary(e.target.value)}/><label className="budget-label">Expenses</label><div className="expense-list">{expenses.map(e=><div className="expense-row" key={e.id}><input type="number" min="0" placeholder="Enter expense amount" value={e.value} disabled={e.saved} onChange={event=>update(e.id,event.target.value)}/><button className="save-expense" type="button" disabled={e.saved} onClick={()=>save(e.id)}>{e.saved ? 'Saved' : 'Save'}</button></div>)}</div><button className="add-expense" type="button" onClick={add}>+ Add Expense</button><div className="budget-footer"><span className="remaining-label">Remaining Amount</span><span className="remaining-amount">₱{money(remaining)}</span></div></div></div></section></main>;
}
function App() {
  function App() {
  return <HashRouter><Header/><Routes>
    <Route path="/" element={<StaticPage source={homeSource}/>}/>
    <Route path="/about" element={<StaticPage source={aboutSource}/>}/>
    <Route path="/work" element={<StaticPage source={workSource}/>}/>
    <Route path="/contact" element={<StaticPage source={contactSource}/>}/>
    <Route path="/budget-tracker" element={<BudgetTracker/>}/>
    <Route path="*" element={<StaticPage source={homeSource}/>}/>
  </Routes><Footer/></BrowserRouter>;
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App/></React.StrictMode>);
