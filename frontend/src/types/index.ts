export interface Property {
  id: number;
  address: string;
  city: string;
  notes: string | null;
  created_at: string;
}

export interface Tenant {
  id: number;
  name: string;
  email: string | null;
  phone: string | null;
  created_at: string;
}

export interface Lease {
  id: number;
  property_id: number;
  tenant_id: number;
  property_address?: string;
  tenant_name?: string;
  start_date: string;
  end_date: string | null;
  monthly_rent: number;
  security_deposit: number;
  rent_due_day: number;
  late_fee_base: number;
  late_fee_daily: number;
  status: 'active' | 'ended';
  created_at: string;
}

/**
 * Data required to populate the Residential Lease Agreement (Lease.html)
 */
export interface LeaseFormData {
  // Page 1: Parties & Property
  agreementDate: string;      // Date the lease is generated (defaults to today)
  landlordName: string;       // Individual owner or Corporate/LLC entity
  landlordAddress: string;    // Mailing address for rent delivery
  tenantNames: string[];      // Array of full names of all adult tenants signing the lease
  propertyDescription: string;// Street address and unit number
  propertyCity: string;       // Specific city/borough in Pennsylvania

  // Page 1: Financials & Late Fees
  monthlyRent: string;        // Dollar amount due each month
  rentDueDay: string;         // The day of the month rent is due (e.g., "1st")
  lateFeeGracePeriod: string; // Days allowed before a fee is charged (default "5")
  lateFeeInitial: string;     // Flat fee charged once rent is late (default "50")
  lateFeeDaily: string;       // Daily penalty for continued non-payment (default "10")
  securityDeposit: string;    // Refundable deposit amount

  // Page 1: Lease Term
  termLength: string;         // Duration written in words (e.g., "one year")
  startDate: string;          // The first day of the lease
  endDate: string;            // The last day of the lease
  totalTermRent: string;      // Sum of all rent for the entire term duration
  renewalTerm: string;        // Automatic renewal duration (e.g., "one month")
  noticeDays: string;         // Days required to terminate (default "60")

  // Page 1 & 2: Utilities & Occupancy
  excludedUtilities: string;  // List of utilities paid by Landlord (e.g., "Trash, Water")
  guestLimitDays: string;     // Max days a guest can stay without consent (default "7")
  consentAdvanceDays: string; // Days advance notice for new occupants (default "1")
  permittedOccupants: string; // Names of specific children or pets allowed

  // Page 3 & 4: Compliance & Clauses
  customClauses: string[];    // Section 16: Array of specific rules (No Smoking, etc.)
  isPre1978: boolean;         // Toggle for Lead-Based Paint disclosure
  hasLeadKnowledge: boolean;  // Does landlord know of lead hazards?
  hasLeadReports: boolean;    // Does landlord have lead records?
  leadReportsList: string;    // List of reports provided to tenant
}

export interface DocumentPrintOptions extends LeaseFormData {}
