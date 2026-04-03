import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { LeaseFormData } from "../types";

interface LeaseWizardProps {
  onGenerate: (data: LeaseFormData) => void;
  onCancel: () => void;
}

export const LeaseWizard: React.FC<LeaseWizardProps> = ({ onGenerate, onCancel }) => {
  const { t } = useTranslation();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<any>({
    agreementDate: new Date().toISOString().split('T')[0],
    landlordName: "",
    landlordAddress: "",
    tenantNames: "", // Keep as string for the input field
    propertyDescription: "",
    propertyCity: "",
    monthlyRent: "",
    rentDueDay: "1st",
    lateFeeGracePeriod: "5",
    lateFeeInitial: "50",
    lateFeeDaily: "10",
    securityDeposit: "",
    termNumber: "1",
    termUnit: "year",
    startDate: "",
    endDate: "",
    totalTermRent: "",
    renewalNumber: "1",
    renewalUnit: "month",
    noticeDays: "60",
    excludedUtilities: "",
    guestLimitDays: "7",
    consentAdvanceDays: "1",
    permittedOccupants: "",
    customClauses: t('wizard.default_clauses', { returnObjects: true }) as string[],
    isPre1978: false,
    hasLeadKnowledge: false,
    hasLeadReports: false,
    leadReportsList: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as any;
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value 
    }));
  };

  const handleClauseChange = (index: number, value: string) => {
    const updated = [...formData.customClauses];
    updated[index] = value;
    setFormData(prev => ({ ...prev, customClauses: updated }));
  };

  const addClause = () => {
    setFormData(prev => ({ ...prev, customClauses: [...prev.customClauses, ""] }));
  };

  const removeClause = (index: number) => {
    setFormData(prev => ({ 
      ...prev, 
      customClauses: prev.customClauses.filter((_, i) => i !== index) 
    }));
  };

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const numbers = Array.from({ length: 31 }, (_, i) => (i + 1).toString());
  const units = ["day", "week", "month", "year"];

  const renderStep = () => {
    switch(step) {
      case 1:
        return (
          <div className="wizard-step">
            <h4>{t('wizard.step1.title')}</h4>
            <div className="form-group">
              <label>{t('wizard.step1.agreement_date')}</label>
              <input type="date" name="agreementDate" value={formData.agreementDate} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>{t('wizard.step1.landlord_name')}</label>
              <input name="landlordName" value={formData.landlordName} onChange={handleChange} placeholder={t('wizard.step1.landlord_name_placeholder')} />
            </div>
            <div className="form-group">
              <label>{t('wizard.step1.landlord_address')}</label>
              <input name="landlordAddress" value={formData.landlordAddress} onChange={handleChange} placeholder={t('wizard.step1.landlord_address_placeholder')} />
            </div>
            <div className="form-group">
              <label>{t('wizard.step1.tenant_names')}</label>
              <input name="tenantNames" value={formData.tenantNames} onChange={handleChange} placeholder={t('wizard.step1.tenant_names_placeholder')} />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>{t('wizard.step1.property_address')}</label>
                <input name="propertyDescription" value={formData.propertyDescription} onChange={handleChange} placeholder={t('wizard.step1.property_address_placeholder')} />
              </div>
              <div className="form-group">
                <label>{t('wizard.step1.property_city')}</label>
                <input name="propertyCity" value={formData.propertyCity} onChange={handleChange} placeholder={t('wizard.step1.property_city_placeholder')} />
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="wizard-step">
            <h4>{t('wizard.step2.title')}</h4>
            <div className="form-row">
              <div className="form-group">
                <label>{t('wizard.step2.monthly_rent')}</label>
                <input type="number" name="monthlyRent" value={formData.monthlyRent} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>{t('wizard.step2.rent_due_day')}</label>
                <input name="rentDueDay" value={formData.rentDueDay} onChange={handleChange} placeholder={t('wizard.step2.rent_due_placeholder')} />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>{t('wizard.step2.late_after')}</label>
                <input type="number" name="lateFeeGracePeriod" value={formData.lateFeeGracePeriod} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>{t('wizard.step2.initial_late_fee')}</label>
                <input type="number" name="lateFeeInitial" value={formData.lateFeeInitial} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>{t('wizard.step2.daily_late_fee')}</label>
                <input type="number" name="lateFeeDaily" value={formData.lateFeeDaily} onChange={handleChange} />
              </div>
            </div>
            <div className="form-group">
              <label>{t('wizard.step2.security_deposit')}</label>
              <input type="number" name="securityDeposit" value={formData.securityDeposit} onChange={handleChange} />
            </div>
          </div>
        );
      case 3:
        return (
          <div className="wizard-step">
            <h4>{t('wizard.step3.title')}</h4>
            <div className="form-group">
              <label>{t('wizard.step3.term_length')}</label>
              <div className="form-row" style={{ gridTemplateColumns: '1fr 2fr' }}>
                <select name="termNumber" value={formData.termNumber} onChange={handleChange}>
                  {numbers.map(n => <option key={n} value={n}>{n}</option>)}
                </select>
                <select name="termUnit" value={formData.termUnit} onChange={handleChange}>
                  {units.map(u => (
                    <option key={u} value={u}>
                      {parseInt(formData.termNumber) > 1 ? t(`wizard.step3.units.${u}s`) : t(`wizard.step3.units.${u}`)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>{t('wizard.step3.start_date')}</label>
                <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>{t('wizard.step3.end_date')}</label>
                <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} />
              </div>
            </div>
            <div className="form-group">
              <label>{t('wizard.step3.total_term_rent')}</label>
              <input type="number" name="totalTermRent" value={formData.totalTermRent} onChange={handleChange} placeholder={t('wizard.step3.total_term_rent_placeholder')} />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>{t('wizard.step3.renewal_period')}</label>
                <div className="form-row" style={{ gridTemplateColumns: '1fr 2fr', gap: '0.5rem' }}>
                  <select name="renewalNumber" value={formData.renewalNumber} onChange={handleChange}>
                    {numbers.map(n => <option key={n} value={n}>{n}</option>)}
                  </select>
                  <select name="renewalUnit" value={formData.renewalUnit} onChange={handleChange}>
                    {units.map(u => (
                      <option key={u} value={u}>
                        {parseInt(formData.renewalNumber) > 1 ? t(`wizard.step3.units.${u}s`) : t(`wizard.step3.units.${u}`)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>{t('wizard.step3.notice_period')}</label>
                <input type="number" name="noticeDays" value={formData.noticeDays} onChange={handleChange} />
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="wizard-step">
            <h4>{t('wizard.step4.title')}</h4>
            <div className="form-group">
              <label>{t('wizard.step4.excluded_utilities')}</label>
              <input name="excludedUtilities" value={formData.excludedUtilities} onChange={handleChange} placeholder={t('wizard.step4.excluded_utilities_placeholder')} />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>{t('wizard.step4.guest_limit')}</label>
                <input type="number" name="guestLimitDays" value={formData.guestLimitDays} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>{t('wizard.step4.consent_advance')}</label>
                <input type="number" name="consentAdvanceDays" value={formData.consentAdvanceDays} onChange={handleChange} />
              </div>
            </div>
            <div className="form-group">
              <label>{t('wizard.step4.permitted_occupants')}</label>
              <input name="permittedOccupants" value={formData.permittedOccupants} onChange={handleChange} placeholder={t('wizard.step4.permitted_occupants_placeholder')} />
            </div>
            <div className="form-group">
              <label>{t('wizard.step4.clauses_title')}</label>
              <div className="clauses-editor">
                {formData.customClauses.map((clause: string, idx: number) => (
                  <div key={idx} className="clause-input-row">
                    <span className="clause-label">{String.fromCharCode(65 + idx)})</span>
                    <textarea 
                      value={clause} 
                      onChange={(e) => handleClauseChange(idx, e.target.value)} 
                      rows={2}
                    />
                    <button type="button" onClick={() => removeClause(idx)} className="remove-clause-btn">✕</button>
                  </div>
                ))}
                <button type="button" onClick={addClause} className="add-clause-btn">{t('wizard.step4.add_clause')}</button>
              </div>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="wizard-step">
            <h4>{t('wizard.step5.title')}</h4>
            <div className="form-group checkbox-field">
              <input type="checkbox" name="isPre1978" id="isPre1978" checked={formData.isPre1978} onChange={handleChange} />
              <label htmlFor="isPre1978">{t('wizard.step5.pre1978_label')}</label>
            </div>
            
            {formData.isPre1978 && (
              <div className="sub-section">
                <div className="form-group checkbox-field">
                  <input type="checkbox" name="hasLeadKnowledge" id="hasLeadKnowledge" checked={formData.hasLeadKnowledge} onChange={handleChange} />
                  <label htmlFor="hasLeadKnowledge">{t('wizard.step5.lead_knowledge')}</label>
                </div>
                <div className="form-group checkbox-field">
                  <input type="checkbox" name="hasLeadReports" id="hasLeadReports" checked={formData.hasLeadReports} onChange={handleChange} />
                  <label htmlFor="hasLeadReports">{t('wizard.step5.lead_reports')}</label>
                </div>
                <div className="form-group">
                  <label>{t('wizard.step5.reports_list')}</label>
                  <textarea name="leadReportsList" value={formData.leadReportsList} onChange={handleChange} placeholder={t('wizard.step5.reports_list_placeholder')} />
                </div>
              </div>
            )}
            <div className="wizard-summary">
              <p>{t('wizard.step5.summary_note')}</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="lease-wizard">
      <div className="wizard-header">
        <h3>{t('wizard.title')}</h3>
        <div className="step-indicator">{t('wizard.step_indicator', { step })}</div>
      </div>
      
      <div className="wizard-content">
        {renderStep()}
      </div>

      <div className="wizard-actions">
        <div className="actions-left">
          <button onClick={onCancel} className="cancel-link">{t('common.cancel')}</button>
        </div>
        <div className="actions-right">
          {step > 1 && <button onClick={prevStep} className="secondary-btn">{t('common.back')}</button>}
          {step < 5 ? (
            <button onClick={nextStep} className="primary-btn">{t('common.next')}</button>
          ) : (
            <button 
              onClick={() => {
                const termStr = `${formData.termNumber} ${formData.termUnit}${parseInt(formData.termNumber) > 1 ? 's' : ''}`;
                const renewalStr = `${formData.renewalNumber} ${formData.renewalUnit}${parseInt(formData.renewalNumber) > 1 ? 's' : ''}`;
                
                const submissionData = {
                  ...formData,
                  tenantNames: formData.tenantNames.split(',').map((n: string) => n.trim()).filter((n: string) => n !== ""),
                  termLength: termStr,
                  renewalTerm: renewalStr
                };
                onGenerate(submissionData);
              }} 
              className="generate-btn"
            >
              {t('common.generate_print')}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
