"use client";
import { useState, useEffect } from 'react';

export interface LivePrices {
  crypto: {
    BTC: { price: number; change: number };
    ETH: { price: number; change: number };
    SOL: { price: number; change: number };
    ADA: { price: number; change: number };
    XRP: { price: number; change: number };
    DOGE: { price: number; change: number };
    LINK: { price: number; change: number };
  };
  stocks: {
    AAPL: { price: number; change: number };
    TSLA: { price: number; change: number };
    NVDA: { price: number; change: number };
    GOOGL: { price: number; change: number };
    MSFT: { price: number; change: number };
    AMZN: { price: number; change: number };
    META: { price: number; change: number };
  };
  indices: {
    SPX: { price: number; change: number };
    DJI: { price: number; change: number };
  };
  commodities: {
    GOLD: { price: number; change: number };
    SILVER: { price: number; change: number };
    OIL: { price: number; change: number };
  };
  forex: {
    'EUR/USD': { price: number; change: number };
    'GBP/USD': { price: number; change: number };
    'JPY/USD': { price: number; change: number };
  };
  timestamp: string;
}

export function useLivePrices(refreshInterval = 60000) {
  const [prices, setPrices] = useState<LivePrices | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await fetch('/api/live-prices');
        if (!response.ok) throw new Error('Failed to fetch prices');
        const data = await response.json();
        setPrices(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching live prices:', err);
        setError('Failed to load prices');
      } finally {
        setLoading(false);
      }
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, refreshInterval);
    return () => clearInterval(interval);
  }, [refreshInterval]);

  return { prices, loading, error };
}

// Helper function to format price with proper spacing
export function formatPrice(price: number, decimals = 2): string {
  if (price >= 10000) {
    // Use space separator for large numbers
    return price.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  }
  return price.toFixed(decimals);
}

// Helper function to format change percentage
export function formatChange(change: number, decimals = 2): string {
  const sign = change >= 0 ? '+' : '';
  return `${sign}${change.toFixed(decimals)}%`;
}
