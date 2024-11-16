export interface Store<T = any> {
  setItem: (value: T) => void
  getItem: () => T | null
  clearItem: () => void
}

export class WebLocalStore<T = any> implements Store<T> {
  private storeKey: string;

  constructor(storeKey: string) {
    this.storeKey = storeKey;
  }

  clearItem() {
    localStorage.removeItem(this.storeKey);
  }

  getItem(): T | null {
    const item = localStorage.getItem(this.storeKey);
    return item ? JSON.parse(item)?.value : null;
  }

  setItem(value: T) {
    localStorage.setItem(this.storeKey, JSON.stringify({ value }));
  }
}

export class WebSessionStore<T = any> implements Store<T> {
  private storeKey: string;

  constructor(storeKey: string) {
    this.storeKey = storeKey;
  }

  clearItem() {
    sessionStorage.removeItem(this.storeKey);
  }

  getItem(): T | null {
    const item = sessionStorage.getItem(this.storeKey);
    return item ? JSON.parse(item)?.value : null;
  }

  setItem(value: T) {
    sessionStorage.setItem(this.storeKey, JSON.stringify({ value }));
  }
}


export class WebCookieStore<T = any> implements Store<T> {
  private storeKey: string;

  constructor(storeKey: string) {
    this.storeKey = storeKey;
  }

  clearItem() {
    document.cookie = `${this.storeKey}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }

  getItem() {
    const cookies = document.cookie.split(';');
    const cookie = cookies.find(c => c.trim().startsWith(`${this.storeKey}=`));
    if (!cookie) return null;
    const value = cookie.split('=')[1];
    return value ? JSON.parse(decodeURIComponent(value))?.value : null;
  }

  setItem(value: T) {
    const encodedValue = encodeURIComponent(JSON.stringify({ value }));
    document.cookie = `${this.storeKey}=${encodedValue}; path=/`;
  }
}