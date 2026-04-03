import React from "react";
import { useTranslation } from "react-i18next";

export type DocumentType = 'lease' | 'notice_to_quit' | 'rent_increase' | 'payment_receipt';

interface DocumentSelectorProps {
  onSelect: (type: DocumentType) => void;
}

export const DocumentSelector: React.FC<DocumentSelectorProps> = ({ onSelect }) => {
  const { t } = useTranslation();
  
  const documents = [
    {
      id: 'lease' as DocumentType,
      title: t('selector.lease_title'),
      description: t('selector.lease_desc'),
      icon: '📄'
    },
    {
      id: 'notice_to_quit' as DocumentType,
      title: t('selector.notice_quit_title'),
      description: t('selector.notice_quit_desc'),
      icon: '⚠️',
      disabled: true
    },
    {
      id: 'rent_increase' as DocumentType,
      title: t('selector.rent_increase_title'),
      description: t('selector.rent_increase_desc'),
      icon: '📈',
      disabled: true
    },
    {
      id: 'payment_receipt' as DocumentType,
      title: t('selector.payment_receipt_title'),
      description: t('selector.payment_receipt_desc'),
      icon: '💰',
      disabled: true
    }
  ];

  return (
    <div className="document-selector">
      <div className="doc-grid">
        {documents.map((doc) => (
          <div 
            key={doc.id} 
            className={`doc-card ${doc.disabled ? 'disabled' : ''}`}
            onClick={() => !doc.disabled && onSelect(doc.id)}
          >
            <div className="doc-icon">{doc.icon}</div>
            <div className="doc-info">
              <h3>{doc.title}</h3>
              <p>{doc.description}</p>
            </div>
            {!doc.disabled && <div className="doc-arrow">→</div>}
          </div>
        ))}
      </div>
    </div>
  );
};
