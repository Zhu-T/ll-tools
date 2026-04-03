import { useState } from "react";
import { useTranslation } from "react-i18next";
// CSS Reload Trigger
import { LeaseWizard } from "./components/LeaseWizard";
import { LeaseTemplate } from "./components/LeaseTemplate";
import { DocumentSelector, DocumentType } from "./components/DocumentSelector";
import "./App.css";

type View = 'dashboard' | 'documents' | 'rent' | 'events' | 'properties';

export default function App() {
  const { t, i18n } = useTranslation();
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [selectedDocType, setSelectedDocType] = useState<DocumentType | null>(null);
  const [leaseData, setLeaseData] = useState<any>(null);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  // Handle Lease Generation
  const handleGenerateLease = (data: any) => {
    setLeaseData(data);
  };

  const handleSelectDocType = (type: DocumentType) => {
    setSelectedDocType(type);
  };

  const resetDocumentFlow = () => {
    setSelectedDocType(null);
    setLeaseData(null);
  };

  if (leaseData) {
    return <LeaseTemplate data={leaseData} onBack={() => setLeaseData(null)} />;
  }

  return (
    <div className="app-container">
      <aside className="sidebar no-print">
        <div className="sidebar-header">
          <h2>LL-Tools</h2>
        </div>
        <nav className="sidebar-nav">
          <button className={currentView === 'dashboard' ? 'active' : ''} onClick={() => { setCurrentView('dashboard'); resetDocumentFlow(); }}>{t('common.dashboard')}</button>
          <button className={currentView === 'documents' ? 'active' : ''} onClick={() => { setCurrentView('documents'); resetDocumentFlow(); }}>{t('common.generate_documents')}</button>
          <button className={currentView === 'rent' ? 'active' : ''} onClick={() => setCurrentView('rent')}>{t('common.rent_payments')}</button>
          <button className={currentView === 'events' ? 'active' : ''} onClick={() => setCurrentView('events')}>{t('common.property_events')}</button>
          <button className={currentView === 'properties' ? 'active' : ''} onClick={() => setCurrentView('properties')}>{t('common.manage_properties')}</button>
        </nav>

        <div className="sidebar-footer">
          <div className="lang-switcher">
            <select 
              value={i18n.language} 
              onChange={(e) => changeLanguage(e.target.value)}
              className="lang-select"
            >
              <option value="en">English</option>
              <option value="zh">中文 (Chinese)</option>
            </select>
          </div>
        </div>
      </aside>

      <main className="main-content">
        {currentView === 'dashboard' && (
          <section className="view-section">
            <h1>{t('common.dashboard')}</h1>
            <div className="stats-grid">
              <div className="stat-card"><h3>3</h3><p>{t('dashboard.active_leases')}</p></div>
              <div className="stat-card warning"><h3>2</h3><p>{t('dashboard.payments_overdue')}</p></div>
              <div className="stat-card info"><h3>1</h3><p>{t('dashboard.upcoming_tax')}</p></div>
            </div>
          </section>
        )}

        {currentView === 'documents' && (
          <section className="view-section">
            <h1>{selectedDocType ? t('selector.generate_doc') : t('selector.select_type')}</h1>
            {!selectedDocType ? (
              <DocumentSelector onSelect={handleSelectDocType} />
            ) : (
              <div className="document-flow">
                <button className="text-btn" onClick={() => setSelectedDocType(null)}>{t('common.back_to_selector')}</button>
                {selectedDocType === 'lease' && (
                  <LeaseWizard onGenerate={handleGenerateLease} onCancel={() => setSelectedDocType(null)} />
                )}
              </div>
            )}
          </section>
        )}

        {currentView === 'rent' && (
          <section className="view-section">
            <h1>{t('rent.title')}</h1>
            <p>{t('rent.subtitle')}</p>
            <div className="placeholder-table">
              <table>
                <thead>
                  <tr>
                    <th>{t('rent.table.property')}</th>
                    <th>{t('rent.table.tenant')}</th>
                    <th>{t('rent.table.rent')}</th>
                    <th>{t('rent.table.due_date')}</th>
                    <th>{t('rent.table.status')}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>123 Main St</td>
                    <td>John Doe</td>
                    <td>$1,200</td>
                    <td>April 1st</td>
                    <td><span className="badge pending">{t('rent.table.pending')}</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        )}

        {currentView === 'events' && (
          <section className="view-section">
            <h1>{t('events.title')}</h1>
            <p>{t('events.subtitle')}</p>
            <div className="placeholder-list">
              <div className="event-item">
                <strong>Property Taxes - 123 Main St</strong>
                <span>{t('events.due')} 2026-04-15</span>
              </div>
            </div>
          </section>
        )}

        {currentView === 'properties' && (
          <section className="view-section">
            <h1>{t('properties.title')}</h1>
            <p>{t('properties.subtitle')}</p>
          </section>
        )}
      </main>
    </div>
  );
}
