import { apiRequest } from './queryClient';
import { InsertMatch, InsertResult, InsertPrediction, ScraperConfig } from '@shared/schema';

export const fetchMatches = async () => {
  return apiRequest('/api/matches');
};

export const fetchMatchById = async (id: number) => {
  return apiRequest(`/api/matches/${id}`);
};

export const createMatch = async (data: InsertMatch) => {
  return apiRequest('/api/matches', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

export const createResult = async (data: InsertResult) => {
  return apiRequest('/api/results', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

export const createPrediction = async (data: InsertPrediction) => {
  return apiRequest('/api/predictions', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

export const fetchPatterns = async () => {
  return apiRequest('/api/patterns');
};

export const fetchScraperConfig = async () => {
  return apiRequest('/api/scraper/config');
};

export const updateScraperConfig = async (data: Partial<ScraperConfig>) => {
  return apiRequest('/api/scraper/config', {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
};

export const runScraper = async () => {
  return apiRequest('/api/scraper/run', {
    method: 'POST',
  });
};

export const fetchStats = async () => {
  return apiRequest('/api/stats');
};

export const formatLastScrape = (lastScrapeTime: string | Date | undefined): string => {
  if (!lastScrapeTime) return 'Never';
  
  const lastScrape = new Date(lastScrapeTime);
  const now = new Date();
  const diffMs = now.getTime() - lastScrape.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  
  if (diffMins < 1) return 'Just now';
  if (diffMins === 1) return '1 minute ago';
  if (diffMins < 60) return `${diffMins} minutes ago`;
  
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours === 1) return '1 hour ago';
  if (diffHours < 24) return `${diffHours} hours ago`;
  
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 30) return `${diffDays} days ago`;
  
  return lastScrape.toLocaleDateString();
};
