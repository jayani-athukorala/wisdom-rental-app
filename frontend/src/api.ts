export const API = import.meta.env.VITE_API_URL ?? 'http://localhost:8080/api';

export async function request<T>(path: string, init?: RequestInit): Promise<T> {
    const r = await fetch(API + path, {
        ...init,
        headers: {'Content-Type': 'application/json', ...(init?.headers || {})}
    });
    if (!r.ok) {
        const e = await r.json().catch(() => ({message: 'Request failed'}));
        throw new Error(e.message || 'Request failed')
    }
    if (r.status === 204) return undefined as T;
    return r.json()
}
