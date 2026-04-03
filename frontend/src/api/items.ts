import type { Item, CreateItemPayload, UpdateItemPayload } from "../types";

const BASE = "/api";

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(err.error ?? "Request failed");
  }
  return res.json() as Promise<T>;
}

export const api = {
  getItems: (): Promise<Item[]> =>
    fetch(`${BASE}/items`).then(handleResponse<Item[]>),

  createItem: (payload: CreateItemPayload): Promise<Item> =>
    fetch(`${BASE}/items`, {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify(payload),
    }).then(handleResponse<Item>),

  updateItem: (id: number, payload: UpdateItemPayload): Promise<Item> =>
    fetch(`${BASE}/items/${id}`, {
      method:  "PUT",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify(payload),
    }).then(handleResponse<Item>),

  deleteItem: (id: number): Promise<{ success: boolean }> =>
    fetch(`${BASE}/items/${id}`, { method: "DELETE" })
      .then(handleResponse<{ success: boolean }>),
};
