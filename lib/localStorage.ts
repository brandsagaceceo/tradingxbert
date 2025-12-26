// lib/localStorage.ts
"use client";
import type { JournalEntry } from "./tradingTypes";

const JOURNAL_KEY = "tradingxbert_journal";

export function saveToJournal(entry: JournalEntry): void {
  if (typeof window === "undefined") return;
  
  const existing = getJournal();
  existing.unshift(entry); // Add to beginning
  
  // Keep only last 50 entries
  const limited = existing.slice(0, 50);
  
  localStorage.setItem(JOURNAL_KEY, JSON.stringify(limited));
}

export function getJournal(): JournalEntry[] {
  if (typeof window === "undefined") return [];
  
  try {
    const data = localStorage.getItem(JOURNAL_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function deleteJournalEntry(id: string): void {
  if (typeof window === "undefined") return;
  
  const existing = getJournal();
  const filtered = existing.filter(entry => entry.id !== id);
  
  localStorage.setItem(JOURNAL_KEY, JSON.stringify(filtered));
}

export function clearJournal(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(JOURNAL_KEY);
}
