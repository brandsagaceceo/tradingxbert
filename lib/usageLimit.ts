import axios from 'axios';

// Usage limit tracking for free tier
const FREE_MONTHLY_LIMIT = 10;
const STORAGE_KEY = 'tradingxbert_usage';

interface UsageData {
  count: number;
  month: string; // Format: YYYY-MM
}

function getCurrentMonth(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
}

export function getUsageData(): UsageData {
  if (typeof window === 'undefined') {
    return { count: 0, month: getCurrentMonth() };
  }

  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    return { count: 0, month: getCurrentMonth() };
  }

  try {
    const data: UsageData = JSON.parse(stored);
    const currentMonth = getCurrentMonth();
    
    // Reset count if it's a new month
    if (data.month !== currentMonth) {
      return { count: 0, month: currentMonth };
    }
    
    return data;
  } catch {
    return { count: 0, month: getCurrentMonth() };
  }
}

export function incrementUsage(): void {
  if (typeof window === 'undefined') return;

  const data = getUsageData();
  data.count += 1;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export async function validateProSubscription(): Promise<boolean> {
  try {
    const response = await axios.get('/api/validate-subscription');
    return response.data.isPro;
  } catch (error) {
    console.error('Error validating subscription:', error);
    return false;
  }
}

export async function canAnalyze(): Promise<boolean> {
  if (typeof window !== 'undefined') {
    const isPro = await validateProSubscription();
    if (isPro) return true;
  }

  const usage = getUsageData();
  return usage.count < FREE_MONTHLY_LIMIT;
}

export function getRemainingAnalyses(): number {
  // Pro users get unlimited
  if (typeof window !== 'undefined') {
    const isPro = localStorage.getItem('tradingxbert_pro') === 'true';
    if (isPro) return Infinity;
  }

  const usage = getUsageData();
  return Math.max(0, FREE_MONTHLY_LIMIT - usage.count);
}

export function getFreeLimit(): number {
  return FREE_MONTHLY_LIMIT;
}
