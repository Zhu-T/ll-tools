import type { 
  Tenant, CreateTenantPayload, 
  Lease, CreateLeasePayload,
  Payment 
} from "../types";

const BASE = "/api";

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(err.error ?? "Request failed");
  }
  return res.json() as Promise<T>;
}

export const landlordApi = {
  // Tenants
  getTenants: (): Promise<Tenant[]> =>
    fetch(`${BASE}/tenants`).then(handleResponse<Tenant[]>),

  createTenant: (payload: CreateTenantPayload): Promise<Tenant> =>
    fetch(`${BASE}/tenants`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).then(handleResponse<Tenant>),

  // Leases
  getLeases: (): Promise<Lease[]> =>
    fetch(`${BASE}/leases`).then(handleResponse<Lease[]>),

  createLease: (payload: CreateLeasePayload): Promise<Lease> =>
    fetch(`${BASE}/leases`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).then(handleResponse<Lease>),
};
