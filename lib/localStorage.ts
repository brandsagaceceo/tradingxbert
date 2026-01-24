// lib/localStorage.ts
"use client";
import type { JournalEntry } from "./tradingTypes";

const JOURNAL_KEY = "tradingxbert_journal";
const DB_NAME = "TradingXbertDB";
const STORE_NAME = "journalEntries";
const MAX_ENTRIES = 50;

// Initialize IndexedDB
function getDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);
    
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
    
    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id" });
      }
    };
  });
}

export async function saveToJournal(entry: JournalEntry): Promise<void> {
  if (typeof window === "undefined") return;
  
  try {
    const db = await getDB();
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);
    
    // Get all entries
    const getAllRequest = store.getAll();
    
    return new Promise((resolve, reject) => {
      getAllRequest.onsuccess = () => {
        const entries = getAllRequest.result;
        // Sort by timestamp descending
        entries.sort((a, b) => b.timestamp - a.timestamp);
        
        // Add new entry
        entries.unshift(entry);
        
        // Keep only last MAX_ENTRIES
        const limited = entries.slice(0, MAX_ENTRIES);
        
        // Clear and repopulate
        const clearRequest = store.clear();
        clearRequest.onsuccess = () => {
          limited.forEach(e => store.add(e));
          tx.oncomplete = () => resolve();
          tx.onerror = () => reject(tx.error);
        };
        clearRequest.onerror = () => reject(clearRequest.error);
      };
      
      getAllRequest.onerror = () => reject(getAllRequest.error);
    });
  } catch (error) {
    console.error("Failed to save to journal:", error);
    // Fallback to localStorage with limited data
    try {
      const existing = getJournalSync();
      existing.unshift(entry);
      const limited = existing.slice(0, MAX_ENTRIES);
      localStorage.setItem(JOURNAL_KEY, JSON.stringify(limited));
    } catch (err) {
      console.error("Storage quota exceeded:", err);
    }
  }
}

export async function getJournal(): Promise<JournalEntry[]> {
  if (typeof window === "undefined") return [];
  
  try {
    const db = await getDB();
    const tx = db.transaction(STORE_NAME, "readonly");
    const store = tx.objectStore(STORE_NAME);
    const getAllRequest = store.getAll();
    
    return new Promise((resolve, reject) => {
      getAllRequest.onsuccess = () => {
        const entries = getAllRequest.result;
        entries.sort((a, b) => b.timestamp - a.timestamp);
        resolve(entries);
      };
      getAllRequest.onerror = () => reject(getAllRequest.error);
    });
  } catch (error) {
    console.warn("IndexedDB failed, falling back to localStorage:", error);
    return getJournalSync();
  }
}

// Synchronous fallback for localStorage
function getJournalSync(): JournalEntry[] {
  try {
    const data = localStorage.getItem(JOURNAL_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export async function deleteJournalEntry(id: string): Promise<void> {
  if (typeof window === "undefined") return;
  
  try {
    const db = await getDB();
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);
    
    return new Promise((resolve, reject) => {
      const deleteRequest = store.delete(id);
      deleteRequest.onsuccess = () => resolve();
      deleteRequest.onerror = () => reject(deleteRequest.error);
      tx.onerror = () => reject(tx.error);
    });
  } catch (error) {
    console.error("Failed to delete journal entry:", error);
    // Fallback to localStorage
    try {
      const existing = getJournalSync();
      const filtered = existing.filter(entry => entry.id !== id);
      localStorage.setItem(JOURNAL_KEY, JSON.stringify(filtered));
    } catch (err) {
      console.error("Failed to delete from storage:", err);
    }
  }
}

export async function clearJournal(): Promise<void> {
  if (typeof window === "undefined") return;
  
  try {
    const db = await getDB();
    const tx = db.transaction(STORE_NAME, "readwrite");
    const store = tx.objectStore(STORE_NAME);
    
    return new Promise((resolve, reject) => {
      const clearRequest = store.clear();
      clearRequest.onsuccess = () => resolve();
      clearRequest.onerror = () => reject(clearRequest.error);
      tx.onerror = () => reject(tx.error);
    });
  } catch (error) {
    console.error("Failed to clear journal:", error);
    // Fallback to localStorage
    localStorage.removeItem(JOURNAL_KEY);
  }
}
// Chart preview storage using IndexedDB
const CHART_PREVIEW_STORE = "chartPreview";

function getChartDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 2);
    
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
    
    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id" });
      }
      if (!db.objectStoreNames.contains(CHART_PREVIEW_STORE)) {
        db.createObjectStore(CHART_PREVIEW_STORE, { keyPath: "id" });
      }
    };
  });
}

export async function saveChartPreview(
  preview: string,
  market: string,
  style: string
): Promise<void> {
  if (typeof window === "undefined") return;
  
  try {
    const db = await getChartDB();
    const tx = db.transaction(CHART_PREVIEW_STORE, "readwrite");
    const store = tx.objectStore(CHART_PREVIEW_STORE);
    
    return new Promise((resolve, reject) => {
      const data = {
        id: "current",
        preview,
        market,
        style,
        timestamp: Date.now(),
      };
      
      const request = store.put(data);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
      tx.onerror = () => reject(tx.error);
    });
  } catch (error) {
    console.error("Failed to save chart preview:", error);
    throw error;
  }
}

export async function getChartPreview(): Promise<{
  preview: string | null;
  market: string;
  style: string;
}> {
  if (typeof window === "undefined") {
    return { preview: null, market: "Crypto", style: "Day Trade" };
  }
  
  try {
    const db = await getChartDB();
    const tx = db.transaction(CHART_PREVIEW_STORE, "readonly");
    const store = tx.objectStore(CHART_PREVIEW_STORE);
    
    return new Promise((resolve, reject) => {
      const request = store.get("current");
      request.onsuccess = () => {
        const result = request.result;
        if (result) {
          resolve({
            preview: result.preview,
            market: result.market || "Crypto",
            style: result.style || "Day Trade",
          });
        } else {
          resolve({ preview: null, market: "Crypto", style: "Day Trade" });
        }
      };
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.error("Failed to get chart preview:", error);
    return { preview: null, market: "Crypto", style: "Day Trade" };
  }
}

export async function clearChartPreview(): Promise<void> {
  if (typeof window === "undefined") return;
  
  try {
    const db = await getChartDB();
    const tx = db.transaction(CHART_PREVIEW_STORE, "readwrite");
    const store = tx.objectStore(CHART_PREVIEW_STORE);
    
    return new Promise((resolve, reject) => {
      const request = store.delete("current");
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
      tx.onerror = () => reject(tx.error);
    });
  } catch (error) {
    console.error("Failed to clear chart preview:", error);
  }
}