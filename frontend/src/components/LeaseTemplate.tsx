import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { LeaseFormData } from "../types";

interface LeaseTemplateProps {
  data: LeaseFormData;
  onBack: () => void;
}

const formatDate = (dateStr: string | null) => {
  if (!dateStr) return null;
  try {
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      return `${parts[1]}/${parts[2]}/${parts[0]}`;
    }
  } catch(e) {}
  return dateStr;
};

const LeaseField: React.FC<{ value: string | null | undefined; isLong?: boolean; blankChars?: number }> = ({ 
  value, 
  isLong = false, 
  blankChars = 8 
}) => {
  const className = value ? (isLong ? "field-value-long" : "field-value") : "field-empty";
  const content = value || "\u00A0".repeat(blankChars); 
  return <span className={className}>{content}</span>;
};

const LeaseSection: React.FC<{ title: string; children: React.ReactNode; extraClass?: string }> = ({ title, children, extraClass = "" }) => (
  <section className={`legal-section ${extraClass}`}>
    {title && <h2 className="section-title">{title}</h2>}
    <div className="section-body">
      {children}
    </div>
  </section>
);

const PageInitials: React.FC = () => (
  <div className="page-initials"><b>Initial(s): _________</b></div>
);

export const LeaseTemplate: React.FC<LeaseTemplateProps> = ({ data, onBack }) => {
  const { t } = useTranslation();
  const handlePrint = () => window.print();

  const formattedAgreementDate = useMemo(() => formatDate(data.agreementDate), [data.agreementDate]);
  const formattedStartDate = useMemo(() => formatDate(data.startDate), [data.startDate]);
  const formattedEndDate = useMemo(() => formatDate(data.endDate), [data.endDate]);
  
  const tenants = useMemo(() => {
    if (!data.tenantNames || data.tenantNames.length === 0) return [""];
    return data.tenantNames;
  }, [data.tenantNames]);

  const tenantNamesDisplay = useMemo(() => {
    const joined = tenants.filter(t => t.trim() !== "").join(", ");
    return joined || null; // Return null so LeaseField shows blank line if no names exist
  }, [tenants]);

  return (
    <div className="lease-template-view">
      <div className="no-print actions-bar">
        <div className="actions-left">
          <button onClick={onBack} className="back-btn">{t('template.dashboard_btn')}</button>
        </div>
        <div className="actions-right">
          <button onClick={handlePrint} className="print-btn-large">{t('template.print_btn')}</button>
        </div>
      </div>

      <div className="modern-lease-container">
        {/* Page 1 */}
        <div className="lease-page">
          <article className="page-border">
            <header className="document-header">
              <h1>Residential Lease Agreement</h1>
            </header>
            
            <LeaseSection title="1. Parties:">
              <p>
                This lease made on <LeaseField value={formattedAgreementDate} blankChars={15} /> between the 
                <strong> LANDLORD:</strong> <LeaseField value={data.landlordName} isLong blankChars={25} />, 
                address: <LeaseField value={data.landlordAddress} isLong blankChars={38} /> and the 
                <strong> TENANT(S):</strong> <LeaseField value={tenantNamesDisplay} isLong blankChars={35} />
              </p>
            </LeaseSection>

            <LeaseSection title="2. Property:">
              <p>
                The landlord agrees to rent to the tenant(s) the property described as: 
                <LeaseField value={data.propertyDescription} isLong blankChars={40} /> located in 
                <LeaseField value={data.propertyCity} isLong blankChars={10} />, Pennsylvania
              </p>
            </LeaseSection>

            <LeaseSection title="3. Conditions:">
              <ol className="alpha-list">
                <li>The rent for the property is <LeaseField value={data.monthlyRent ? `$${data.monthlyRent}` : null} blankChars={5} /> per month. The <strong>TENANT(S) must pay</strong> the rent on the <LeaseField value={data.rentDueDay} blankChars={5} /> day of the month and deliver it to the <strong>LANDLORD</strong> at the above address.</li>
                <li>If the <strong>TENANT(S)</strong> fails to pay the rent on the due date, the <strong>LANDLORD</strong> may end this lease. If the rent is more than <LeaseField value={data.lateFeeGracePeriod} blankChars={5} /> days late, the <strong>TENANT(S)</strong> must pay a late fee of <LeaseField value={data.lateFeeInitial ? `$${data.lateFeeInitial}` : null} blankChars={5} /> and then another <LeaseField value={data.lateFeeDaily ? `$${data.lateFeeDaily}` : null} blankChars={5} /> for each additional day that the rent is late.</li>
                <li>The term of this lease is <LeaseField value={data.termLength} blankChars={8} /> beginning on <LeaseField value={formattedStartDate} blankChars={15} /> and ending on <LeaseField value={formattedEndDate} blankChars={15} />. The total rent due for the full term of this lease is <LeaseField value={data.totalTermRent ? `$${data.totalTermRent}` : null} blankChars={5} /> In the event that the <strong>TENANT(S)</strong> should break this lease without written permission of the <strong>LANDLORD</strong>, the unpaid rent for the remainder of this lease will become immediately due and owing to the <strong>LANDLORD</strong>.</li>
                <li>When the lease's term ends, it will automatically renew for a term of <LeaseField value={data.renewalTerm} blankChars={5} />. If the landlord or <strong>TENANT(S)</strong> does not want to renew the lease, they must give the other <LeaseField value={data.noticeDays} blankChars={5} /> days written notice before the end of the term.</li>
                <li>The <strong>TENANT(S)</strong> has checked the property and agrees that it is in clean and good condition and therefore accepts the property in a as-is condition. At the end of this lease, the <strong>TENANT(S)</strong> will return the property to the <strong>LANDLORD</strong> in the same clean and good condition.</li>
                <li>The <strong>TENANT(S)</strong> will only use the property for residential purposes.</li>
                <li>The <strong>TENANT(S)</strong> promise to pay the rent is separate from all other promises in this lease. The <strong>TENANT(S)</strong> agrees to pay the full rent each month. If the <strong>LANDLORD</strong> owes the <strong>TENANT(S)</strong> any money, the <strong>TENANT(S)</strong> agrees not to deduct it from the rent due or from and other money owed to the <strong>LANDLORD</strong>.</li>
                <li>
                  <strong>Security Deposit:</strong>
                  <ol className="numeric-list">
                    <li>The amount of the security deposit is <LeaseField value={data.securityDeposit ? `$${data.securityDeposit}` : null} blankChars={5} /></li>
                    <li>The <strong>LANDLORD</strong> cannot require the <strong>TENANT(S)</strong> to pay a security deposit that is more than (2) two months rent. After the first year, the landlord must reduce the security deposit to no more than (1) one months rent.</li>
                    <li>In the event that the security deposit paid by the <strong>TENANT(S)</strong> exceeds one (1) month's rent, the <strong>TENANT(S)</strong> agrees that, after one (1) year of tenancy, the second month's portion of the security deposit will be applied as payment for the last month's rent. This adjustment will occur automatically, and the <strong>TENANT(S)</strong> acknowledges that this portion of the security deposit will no longer be refundable at the end of the lease term.</li>
                    <li>The <strong>TENANT(S)</strong> cannot use the security deposit to pay rent without the written permission of the <strong>LANDLORD</strong>.</li>
                    <li>The <strong>LANDLORD</strong> can use the security deposit for unpaid rent and damages that are the <strong>TENANT(S)</strong> responsibility beyond normal wear and tear.</li>
                    <li>When the <strong>TENANT(S)</strong> moves out, the <strong>LANDLORD</strong> will inspect the property and prepare a list of charges if there is any damage to the property or any unpaid rent. The <strong>LANDLORD</strong> can deduct these charges, if any, from the security deposit and will return the balance within (30) thirty days. The <strong>TENANT(S)</strong> must give the <strong>LANDLORD</strong> written notice of the <strong>TENANT(S)</strong> new address or make other arrangements with the <strong>LANDLORD</strong> for the return of the security deposit.</li>
                  </ol>
                </li>
              </ol>
            </LeaseSection>
          </article>
          <PageInitials />
        </div>

        {/* Page 2 */}
        <div className="lease-page">
          <article className="page-border">
            <LeaseSection title="4. Utilities:">
              <p>
                The <strong>TENANT(S)</strong> agree to pay all utilities and/or services based upon occupancy of the premises except: 
                <LeaseField value={data.excludedUtilities} isLong blankChars={60} />
              </p>
            </LeaseSection>

            <LeaseSection title="5. Occupants:">
              <p>
                Guest(s) staying over for more than <LeaseField value={data.guestLimitDays} blankChars={2} /> days without the written consent of the 
                <strong> LANDLORD</strong> shall be considered a breach of this agreement. 
                <strong> ONLY</strong> the following individuals and/or animals, <strong>AND NO OTHERS</strong> shall occupy 
                the subject residence for more than <LeaseField value={data.guestLimitDays} blankChars={2} /> days unless the expressed written consent of the 
                <strong> LANDLORD</strong> is obtained <LeaseField value={data.consentAdvanceDays} blankChars={2} /> days in advance: <LeaseField value={data.permittedOccupants} isLong blankChars={60} />
              </p>
            </LeaseSection>

            <LeaseSection title="6. Liquid Filled Furnishings:">
              <p>No liquid filled furniture, receptacle containing more than ten gallons of liquid is permitted without prior written consent and meeting the requirements of the <strong>LANDLORD</strong>. The <strong>TENANT(S)</strong> also agrees to carry insurance deemed appropriate by the <strong>LANDLORD</strong> to cover possible losses that may be caused by such items.</p>
            </LeaseSection>

            <LeaseSection title="7. Insurance:">
              <p>The <strong>TENANT(S)</strong> acknowledges that the <strong>LANDLORD'S</strong> insurance <strong>does not</strong> cover personal property damage caused by fire, theft, rain, war, acts of God, acreage, acts of others, and/or any other causes, nor shall the <strong>LANDLORD</strong> be held liable for such losses. The <strong>TENANT(S)</strong> is hereby advised to obtain their own insurance policy to cover any personal losses.</p>
            </LeaseSection>

            <LeaseSection title="8. Repairs:">
              <p>The <strong>TENANT(S)</strong> will notify the <strong>LANDLORD</strong> promptly if any part of the property is damaged or destroyed. The <strong>TENANT(S)</strong> is/are responsible for any damage or destruction done to the property by their actions or negligence, or by the actions or negligence of their guests or family. The <strong>TENANT(S)</strong> must make all repairs and replacements to fix such damage or destruction. If the <strong>TENANT(S)</strong> fail to do so, the <strong>LANDLORD</strong> may do it and add the expense to the next month's rent.</p>
            </LeaseSection>

            <LeaseSection title="9. Landlords Entry Onto Property:">
              <p>The <strong>LANDLORD</strong> can enter the property at reasonable times on a (24) twenty-four hours notice to the <strong>TENANT(S)</strong>. The <strong>LANDLORD</strong> can enter the property to inspect it; make repairs, alterations or improvements; supply services; or, show the property to prospective buyers, lenders, contractors, insurers, or tenants. In <strong>case of emergency</strong>, the <strong>LANDLORD can enter the property at any time without notice to the tenant</strong>.</p>
            </LeaseSection>

            <LeaseSection title="10. Landlord Rights:">
              <ol className="alpha-list">
                <li>The <strong>TENANT(S)</strong> waive the <u><strong>Notice to Quit</strong></u> otherwise required by law. This means that the <strong>LANDLORD</strong> may require the tenant to vacate and surrender the premises with 10 days prior notice if the <strong>TENANT(S)</strong> fail to follow the terms of the lease.</li>
                <li>If the <strong>TENANT(S)</strong> fail to pay two month's rent, or the <strong>TENANT(S)</strong> break any other provision in this lease, the <strong>LANDLORD</strong> may end this lease with 10 days notice and file a lawsuit to evict the tenant.</li>
                <li>Besides ending this lease and evicting the tenant, the <strong>LANDLORD</strong> can sue the <strong>TENANT(S)</strong> for unpaid rent, other damages, losses or injuries. If the <strong>LANDLORD</strong> gets a judgment for money against the tenant, the <strong>LANDLORD</strong> can use the court process to take your personal goods, furniture, motor vehicles and money in banks. The <strong>LANDLORD</strong> may also be able to attach your wages to recover money for damages done to the property.</li>
                <li>The <strong>LANDLORD</strong> may recover reasonable legal fees and costs from the tenant for any legal actions relating to the payment of rent or the recovery of the property.</li>
              </ol>
            </LeaseSection>
          </article>
          <PageInitials />
        </div>

        {/* Page 3: Tenant Responsibilities, Abandonment, Transfer, Priority, Credit */}
        <div className="lease-page">
          <article className="page-border">
            <LeaseSection title="11. Tenant(s) Responsibilities:">
              <p>All <strong>TENANTS</strong> and other people the <strong>TENANT(S)</strong> allow onto the property promise to:</p>
              <ol className="alpha-list">
                <li>Obey all local, state and federal laws.</li>
                <li>Keep the property clean and safe.</li>
                <li>Use all utilities, facilities and fixtures in a safe and reasonable way.</li>
                <li>Promptly remove all trash and debris from the property as required by the <strong>LANDLORD</strong> and local ordinance.</li>
                <li>Not deliberately or negligently destroy, deface, damage, or remove any part of the property or grounds.</li>
                <li><strong>Promptly</strong> notify the <strong>LANDLORD</strong> of conditions that need repair.</li>
                <li>Make no major changes to the property, such as changing any locks, painting, rebuilding, removing, repairing or improving without the <strong>LANDLORD's</strong> written consent. Alterations become the property of the <strong>LANDLORD</strong>. The tenant <strong>cannot</strong> remove improvements and the <strong>LANDLORD</strong> does not have to pay for any changes or improvements made by the <strong>TENANT(S)</strong>.</li>
                <li>Agree not to install any external antennae, which call include buy not be limited to antenna for television, CB radio, FM reception, short-wave radio & satellite dish without prior written consent from the <strong>LANDLORD</strong>.</li>
                <li>Not bring or keep pets onto the property without written approval by the <strong>LANDLORD</strong>.</li>
                <li>Allow the <strong>LANDLORD</strong> to put up "for sale", "for rent" or other signs.</li>
                <li>Move out of the property when the lease ends.</li>
                <li>Keep nothing on the property that is highly flammable, dangerous or substantially increases the danger of fire or injury.</li>
              </ol>
            </LeaseSection>

            <LeaseSection title="12. Abandonment:">
              <p>The property will be considered abandoned by the <strong>TENANT(S)</strong> if:</p>
              <ol className="alpha-list">
                <li>The <strong>TENANT(S)</strong> give(s) the <strong>LANDLORD</strong> notice that he will not return to the property.</li>
                <li>The <strong>TENANT(S)</strong> remove their personal belongings from the property, fails to pay the rent, and does not return for (15) fifteen days.</li>
                <li>The <strong>TENANT(S)</strong> fails to pay the rent and does not return to the property for one month.</li>
                <li>Destruction of the property or personal belongings in the property after the end of the lease. *If the tenant abandons the property, the <strong>LANDLORD</strong> may enter and relet the property. In this case, the <strong>LANDLORD</strong> may also remove and dispose of any personal property left behind by the <strong>TENANT(S)</strong>.</li>
              </ol>
            </LeaseSection>

            <LeaseSection title="13. Tenant Transfer of Lease:">
              <p>The <strong>TENANT(S)</strong> <strong>cannot</strong> lease the property to any other person or let any other person take over the their rights and duties under this lease, unless the landlord first gives written approval.</p>
            </LeaseSection>

            <LeaseSection title="14. Priority of Lease & Sale of Property:">
              <ol className="alpha-list">
                <li>If the <strong>LANDLORD</strong> sells this property, the purchaser can end this lease. All mortgages that now or in the future affect the property have a priority over this lease.</li>
                <li>If the landlord sells the property, he will give the <strong>TENANT(S)</strong> written notice stating the name, address and phone number of the new landlord and where and to whom to pay rent. The landlord must also inform the <strong>TENANT(S)</strong> whether the security deposit was transferred to the new landlord. If the <strong>LANDLORD</strong> does not transfer the security deposit, the <strong>LANDLORD</strong> must return it to the tenant as described in the lease.</li>
              </ol>
            </LeaseSection>

            <LeaseSection title="15. Report to Credit/Tenant Agencies:">
              <p>You are hereby notified that a nonpayment, late payment or breach of any of the terms of this rental agreement may be submitted/reported to a credit and/or tenant reporting agency, and may create a negative credit record on your credit report.</p>
            </LeaseSection>
          </article>
          <PageInitials />
        </div>

        {/* Page 4: Additional Clauses Only */}
        <div className="lease-page">
          <article className="page-border">
            <LeaseSection title="16. Additional Clauses:">
              <div className="clauses-list">
                {data.customClauses.map((clause, idx) => (
                  <div key={idx} className="clause-item">
                    <span className="clause-alpha">{String.fromCharCode(65 + idx)})</span>
                    <span className="clause-text">{clause}</span>
                  </div>
                ))}
                {data.customClauses.length === 0 && <p>None.</p>}
              </div>
            </LeaseSection>
          </article>
          <PageInitials />
        </div>

        {/* Page 5: Lead Disclosure */}
        <div className="lease-page">
          <article className="page-border">
            <LeaseSection title="17. LEAD-BASED PAINT DISCLOURES FOR PROPERTY BUILT BEFORE 1978:">
              <ol className="alpha-list">
                <li>
                  <div className="checkbox-item">
                    <div className={`check-box ${!data.isPre1978 ? 'checked' : ''}`}>{!data.isPre1978 ? 'X' : ''}</div>
                    <label style={{ fontSize: "11pt" }}>Property was built in or after 1978. This paragraph does not apply.</label>
                  </div>
                </li>
                <li>
                  <div className="checkbox-item">
                    <div className={`check-box ${data.isPre1978 ? 'checked' : ''}`}>{data.isPre1978 ? 'X' : ''}</div>
                    <label style={{ fontSize: "11pt" }}>Property was built before 1978. Landlord and Tenant must provide information in this paragraph.</label>
                  </div>
                </li>
              </ol>

              <div className="lead-warning-statement">
                <h3 className="sub-section-title" style={{ textAlign: "left", textDecoration: "underline", margin: "0 0 0.5rem 0" }}>Lead Warning Statement</h3>
                <p>
                  Housing built before 1978 may contain lead-based paint. Lead from paint, paint chips, and dust can pose
                  health hazards if not managed properly. Lead exposure is especially harmful to young children and pregnant
                  women. Before renting pre-1978 housing, lessors must disclose the presence of known lead-based paint and/or
                  lead-based paint hazards in the dwelling. Lessees must also receive a federally approved pamphlet on lead
                  poisoning prevention.
                </p>
              </div>

              <ol className="alpha-list">
                <li>
                  <strong>Landlord does not know of any lead-based paint or lead-based paint hazards on the Property unless stated below:</strong>
                  <div className="checkbox-item sub-item" style={{ marginTop: "0.5rem" }}>
                    <div className="check-box">{data.isPre1978 && data.hasLeadKnowledge ? 'X' : ''}</div>
                    <p>Landlord knows that there is lead-based paint, or that there are lead-based paint hazards on the Property. Landlord must explain what Landlord knows about the lead-based paint and hazards, including how Landlord learned that it is there, where it is, and the conditions of the painted walls, trim and other surfaces. Landlord must give Tenant any other information Landlord has about the lead-based paint and lead-based pain hazards.</p>
                  </div>
                </li>
                
                <li>
                  <strong>Landlord has no reports or records about lead-based paint or lead-based paint hazards on the Property unless stated below:</strong>
                  <div className="checkbox-item sub-item" style={{ marginTop: "0.5rem" }}>
                    <div className="check-box">{data.isPre1978 && data.hasLeadReports ? 'X' : ''}</div>
                    <p>Landlord has given Tenants all available records and reports about lead-based paint or lead-based paint hazards on the Property. List records and reports:</p>
                  </div>
                  <div className="disclosure-line">
                    {data.isPre1978 && data.hasLeadReports ? data.leadReportsList : "\u00A0".repeat(60)}
                  </div>
                </li>

                <li>
                  <strong>Tenant Initial all that are true:</strong>
                  <ul className="initial-list">
                    <li style={{ marginBottom: "0.2rem" }}><span className="initial-line">_____</span> Tenant has received the pamphlet <em>Protect Your Family From Lead in Your Home.</em>.</li>
                    <li style={{ marginBottom: "0.2rem" }}><span className="initial-line">_____</span> Tenant has read the information given by Landlord in 17(A) and (B) above</li>
                    <li style={{ marginBottom: "0.2rem" }}><span className="initial-line">_____</span> Tenant has received all records and reports that Landlord listed in paragraph 17 (B) above, if any.</li>
                  </ul>
                </li>
                
                <li><strong>Landlord and Tenant certify, by signing this Lease, that the information given is true to the best of their knowledge</strong></li>
              </ol>
            </LeaseSection>
          </article>
          <PageInitials />
        </div>

        {/* Page 6: 18, 19, and Signatures */}
        <div className="lease-page">
          <article className="page-border">
            <LeaseSection title="18. If Property Is Taken Over by City, State, or Government:">
              <p>If any part of the property is taken for public use, this lease will end on the date the Title to the property is transferred to a City, State, or Government Agency.</p>
            </LeaseSection>

            <LeaseSection title="19. Entire Agreement:" extraClass="no-indent">
              <p style={{ paddingLeft: "1.5rem" }}>It is agreed between the <strong>LANDLORD</strong> and <strong>TENANT(S)</strong> that this lease spells out all terms, agreements and understandings between <strong>LANDLORD</strong> and the <strong>TENANT(S)</strong> regarding the leased premises.</p>
              
              <div className="signature-area">
                <p className="declaration-bold">BY SIGNING THE LEASE BELOW, I AGREE THAT I HAVE READ AND UNDERSTAND ALL THE TERMS AND CONDITIONS OF IT AND I HAVE RECEIVED THE FOLLOWING:</p>
                <ol className="numeric-list" style={{ marginBottom: "3rem" }}>
                  <li>A signed copy of this Lease</li>
                </ol>

                <div className="signature-grid">
                  {tenants.map((name, idx) => (
                    <div key={idx} className="sig-row sig-row-tenant">
                      <div className="sig-label">TENANT{tenants.length > 1 ? ` (${idx + 1})` : ""}:</div>
                      <div className="sig-underline"></div>
                      <div className="sig-date-label">DATE:</div>
                      <div className="sig-underline"></div>
                    </div>
                  ))}
                  <div className="sig-row sig-row-landlord">
                    <div className="sig-label">LANDLORD:</div>
                    <div className="sig-underline">
                      {data.landlordName ? <strong>{data.landlordName}</strong> : ""}
                    </div>
                    <div className="sig-date-label">DATE:</div>
                    <div className="sig-underline"></div>
                  </div>
                </div>
              </div>
            </LeaseSection>
          </article>
          <PageInitials />
        </div>
      </div>
    </div>
  );
};
