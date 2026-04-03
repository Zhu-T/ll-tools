import React from "react";
import { LeasePrintOptions } from "../../types";

interface LeadPaintDisclosureProps {
  options: LeasePrintOptions;
}

export const LeadPaintDisclosure: React.FC<LeadPaintDisclosureProps> = ({ options }) => {
  const isBefore1978 = options.leadPaintYear === "before";

  return (
    <div className="lead-disclosure">
      <div className="checkbox-row">
        <input type="checkbox" checked={!isBefore1978} readOnly />
        <label>Property was built in or after 1978. This paragraph does not apply.</label>
      </div>
      <div className="checkbox-row">
        <input type="checkbox" checked={isBefore1978} readOnly />
        <label>Property was built before 1978. Landlord and Tenant must provide information in this paragraph.</label>
      </div>

      {isBefore1978 && (
        <div className="lead-warning-box">
          <h5>Lead Warning Statement</h5>
          <p>
            Housing built before 1978 may contain lead-based paint. Lead from paint, paint chips, and dust can pose
            health hazards if not managed properly. Lead exposure is especially harmful to young children and pregnant
            women. Before renting pre-1978 housing, lessors must disclose the presence of known lead-based paint and/or
            lead-based paint hazards in the dwelling. Lessees must also receive a federally approved pamphlet on lead
            poisoning prevention.
          </p>
          <ol type="A">
            <li>Landlord does not know of any lead-based paint or lead-based paint hazards on the Property unless stated below:
              <div className="checkbox-row sub">
                <input type="checkbox" /> <label>Landlord knows that there is lead-based paint, or that there are lead-based paint hazards on the Property.</label>
              </div>
            </li>
            <li>Landlord has no reports or records about lead-based paint or lead-based paint hazards on the Property unless stated below:
              <div className="checkbox-row sub">
                <input type="checkbox" /> <label>Landlord has given Tenants all available records and reports about lead-based paint or lead-based paint hazards on the Property.</label>
              </div>
            </li>
            <li>Tenant Initial all that are true:
              <ul className="lead-initials">
                <li>_____ Tenant has received the pamphlet <em>Protect Your Family From Lead in Your Home.</em>.</li>
                <li>_____ Tenant has read the information given by Landlord in 17(A) and (B) above</li>
                <li>_____ Tenant has received all records and reports that Landlord listed in paragraph 17 (B) above, if any.</li>
              </ul>
            </li>
            <li>Landlord and Tenant certify, by signing this Lease, that the information given is true to the best of their knowledge</li>
          </ol>
        </div>
      )}
    </div>
  );
};
