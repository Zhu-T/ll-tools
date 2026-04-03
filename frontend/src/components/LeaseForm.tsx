import React, { useState, useEffect } from "react";
import { Property, Tenant, Lease } from "../types";
import { api } from "../api";

interface LeaseFormProps {
  onLeaseAdded: (lease: Lease) => void;
}

export const LeaseForm: React.FC<LeaseFormProps> = ({ onLeaseAdded }) => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [tenants, setTenants] = useState<Tenant[]>([]);
  
  const [propertyId, setPropertyId] = useState<string>("");
  const [tenantName, setTenantName] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [monthlyRent, setMonthlyRent] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([api.getProperties(), api.getTenants()])
      .then(([p, t]) => {
        setProperties(p);
        setTenants(t);
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // 1. Get or Create Tenant
      let finalTenantId: number;
      const existingTenant = tenants.find(t => t.name.toLowerCase() === tenantName.toLowerCase());
      if (existingTenant) {
        finalTenantId = existingTenant.id;
      } else {
        const newT = await api.createTenant({ name: tenantName });
        finalTenantId = newT.id;
      }

      // 2. Create Lease
      const newLease = await api.createLease({
        property_id: parseInt(propertyId),
        tenant_id: finalTenantId,
        start_date: startDate,
        monthly_rent: parseFloat(monthlyRent)
      });

      onLeaseAdded(newLease);
      setTenantName("");
      setMonthlyRent("");
      setPropertyId("");
      setStartDate("");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="lease-form-container">
      <h3>Create New Lease</h3>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Property *</label>
          <select value={propertyId} onChange={(e) => setPropertyId(e.target.value)} required>
            <option value="">Select Property</option>
            {properties.map(p => <option key={p.id} value={p.id}>{p.address}</option>)}
          </select>
        </div>

        <div className="form-group">
          <label>Tenant Name *</label>
          <input 
            list="tenant-list" 
            value={tenantName} 
            onChange={(e) => setTenantName(e.target.value)} 
            placeholder="Search or new name"
            required 
          />
          <datalist id="tenant-list">
            {tenants.map(t => <option key={t.id} value={t.name} />)}
          </datalist>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Start Date *</label>
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Monthly Rent *</label>
            <input type="number" step="0.01" value={monthlyRent} onChange={(e) => setMonthlyRent(e.target.value)} required />
          </div>
        </div>

        <button type="submit" disabled={loading} className="primary-btn">
          {loading ? "Creating..." : "Generate Lease Record"}
        </button>
      </form>
    </div>
  );
};
