const BASE = "/api";

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(err.error ?? "Request failed");
  }
  return res.json() as Promise<T>;
}

export const api = {
  // Properties
  getProperties: () => fetch(`${BASE}/properties`).then(handleResponse<any[]>),
  createProperty: (data: any) => fetch(`${BASE}/properties`, {
    method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data)
  }).then(handleResponse<any>),

  // Tenants
  getTenants: () => fetch(`${BASE}/tenants`).then(handleResponse<any[]>),
  createTenant: (data: any) => fetch(`${BASE}/tenants`, {
    method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data)
  }).then(handleResponse<any>),

  // Leases
  getLeases: () => fetch(`${BASE}/leases`).then(handleResponse<any[]>),
  createLease: (data: any) => fetch(`${BASE}/leases`, {
    method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data)
  }).then(handleResponse<any>),

  // Events
  getEvents: () => fetch(`${BASE}/events`).then(handleResponse<any[]>),
  createEvent: (data: any) => fetch(`${BASE}/events`, {
    method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data)
  }).then(handleResponse<any>),

  // Payments
  getPayments: (leaseId?: number) => fetch(`${BASE}/payments${leaseId ? `?lease_id=${leaseId}` : ""}`).then(handleResponse<any[]>),
  createPayment: (data: any) => fetch(`${BASE}/payments`, {
    method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data)
  }).then(handleResponse<any>),
};
