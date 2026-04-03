import React, { useState } from "react";
import { Lease, LeasePrintOptions } from "../types";

interface LeaseOptionsFormProps {
  lease: Lease;
  onGenerate: (options: LeasePrintOptions) => void;
  onCancel: () => void;
}

export const LeaseOptionsForm: React.FC<LeaseOptionsFormProps> = ({ lease, onGenerate, onCancel }) => {
  const [options, setOptions] = useState<LeasePrintOptions>({
    landlordName: "",
    landlordAddress: "",
    city: "Pennsylvania",
    rentDueDay: "1st",
    lateFeeBase: "50",
    lateFeeDaily: "10",
    termLength: "one year",
    renewalTerm: "one month",
    noticeDays: "60",
    securityDeposit: (lease.monthly_rent).toString(),
    utilitiesExcluded: "",
    maxGuests: "7",
    additionalOccupants: "",
    leadPaintYear: "after",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setOptions(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate(options);
  };

  return (
    <div className="lease-options-form">
      <h3>Lease Agreement Details</h3>
      <p className="subtitle">Fill in the details for: {lease.property_address}</p>
      
      <form onSubmit={handleSubmit}>
        <div className="form-section">
          <h4>Landlord Information</h4>
          <div className="form-group">
            <label>Landlord Name</label>
            <input name="landlordName" value={options.landlordName} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Landlord Address</label>
            <input name="landlordAddress" value={options.landlordAddress} onChange={handleChange} required placeholder="123 Landlord St, City, State Zip" />
          </div>
        </div>

        <div className="form-section">
          <h4>Lease Terms & Fees</h4>
          <div className="form-row">
            <div className="form-group">
              <label>Term (e.g. "one year")</label>
              <input name="termLength" value={options.termLength} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Renewal Term</label>
              <input name="renewalTerm" value={options.renewalTerm} onChange={handleChange} />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Rent Due Day</label>
              <input name="rentDueDay" value={options.rentDueDay} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Security Deposit ($)</label>
              <input name="securityDeposit" value={options.securityDeposit} onChange={handleChange} />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Late Fee ($)</label>
              <input name="lateFeeBase" value={options.lateFeeBase} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Daily Late Fee ($)</label>
              <input name="lateFeeDaily" value={options.lateFeeDaily} onChange={handleChange} />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h4>Property Details</h4>
          <div className="form-group">
            <label>City/Location (for Section 2)</label>
            <input name="city" value={options.city} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Excluded Utilities</label>
            <input name="utilitiesExcluded" value={options.utilitiesExcluded} onChange={handleChange} placeholder="None" />
          </div>
          <div className="form-group">
            <label>Additional Occupants/Animals</label>
            <input name="additionalOccupants" value={options.additionalOccupants} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Built Before 1978?</label>
            <select name="leadPaintYear" value={options.leadPaintYear} onChange={handleChange}>
              <option value="after">No (1978 or later)</option>
              <option value="before">Yes (Before 1978)</option>
            </select>
          </div>
        </div>

        <div className="actions">
          <button type="button" onClick={onCancel} className="secondary-btn">Cancel</button>
          <button type="submit" className="primary-btn">Generate Lease</button>
        </div>
      </form>
    </div>
  );
};
