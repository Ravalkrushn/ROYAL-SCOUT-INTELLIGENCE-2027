import {
  IBatterRanking,
  IBowlerRanking,
  IDashboardSummary,
  IMethodologyConfig,
  IPlayerSummary,
  IPlayerDetail,
  IApiResponse
} from '@/types';
import {
  OFFICIAL_DASHBOARD_SUMMARY,
  OFFICIAL_TOP_10_BATTERS,
  OFFICIAL_TOP_10_BOWLERS,
  OFFICIAL_PLAYERS,
  OFFICIAL_METHODOLOGY_CONFIG,
  getPlayerProfileById
} from '@/data/official-analytics';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

async function fetchFromBackend<T>(endpoint: string): Promise<T | null> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      signal: controller.signal,
      headers: {
        'Accept': 'application/json',
      },
      next: { revalidate: 30 }
    });
    clearTimeout(timeoutId);

    if (!response.ok) return null;
    const json: IApiResponse<T> = await response.json();
    return json.success ? json.data : null;
  } catch {
    return null;
  }
}

export async function fetchHealth(): Promise<{ status: string; isConnected: boolean; message: string }> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 1500);
    const res = await fetch(`http://localhost:5000/health`, { signal: controller.signal });
    clearTimeout(timeoutId);
    if (res.ok) {
      const data = await res.json();
      return { status: 'ONLINE', isConnected: true, message: data.message || 'Backend Connected' };
    }
  } catch {
    // Backend offline / pending startup
  }
  return { status: 'OFFLINE_BASELINE', isConnected: false, message: 'Official Verified Baseline Active' };
}

export async function fetchDashboardSummary(): Promise<{ data: IDashboardSummary; source: 'LIVE_API' | 'VERIFIED_BASELINE' }> {
  const live = await fetchFromBackend<IDashboardSummary>('/dashboard/summary');
  if (live) {
    return { data: live, source: 'LIVE_API' };
  }
  return { data: OFFICIAL_DASHBOARD_SUMMARY, source: 'VERIFIED_BASELINE' };
}

export async function fetchTop10Batters(): Promise<{ data: IBatterRanking[]; source: 'LIVE_API' | 'VERIFIED_BASELINE' }> {
  const live = await fetchFromBackend<IBatterRanking[]>('/rankings/batters/top10');
  if (live && live.length > 0) {
    return { data: live, source: 'LIVE_API' };
  }
  return { data: OFFICIAL_TOP_10_BATTERS, source: 'VERIFIED_BASELINE' };
}

export async function fetchTop10Bowlers(): Promise<{ data: IBowlerRanking[]; source: 'LIVE_API' | 'VERIFIED_BASELINE' }> {
  const live = await fetchFromBackend<IBowlerRanking[]>('/rankings/bowlers/top10');
  if (live && live.length > 0) {
    return { data: live, source: 'LIVE_API' };
  }
  return { data: OFFICIAL_TOP_10_BOWLERS, source: 'VERIFIED_BASELINE' };
}

export async function fetchPlayers(params?: {
  q?: string;
  role?: string;
  page?: number;
  limit?: number;
}): Promise<{ data: IPlayerSummary[]; total: number; source: 'LIVE_API' | 'VERIFIED_BASELINE' }> {
  const queryParts: string[] = [];
  if (params?.q) queryParts.push(`q=${encodeURIComponent(params.q)}`);
  if (params?.role && params.role !== 'ALL') queryParts.push(`role=${encodeURIComponent(params.role)}`);
  if (params?.page) queryParts.push(`page=${params.page}`);
  if (params?.limit) queryParts.push(`limit=${params.limit}`);

  const queryString = queryParts.length ? `?${queryParts.join('&')}` : '';
  const live = await fetchFromBackend<{ players: IPlayerSummary[]; pagination: { totalRecords: number } }>(`/players${queryString}`);

  if (live?.players) {
    return { data: live.players, total: live.pagination.totalRecords, source: 'LIVE_API' };
  }

  // Filter verified baseline
  let filtered = [...OFFICIAL_PLAYERS];
  if (params?.q) {
    const qLower = params.q.toLowerCase();
    filtered = filtered.filter(p => p.name.toLowerCase().includes(qLower));
  }
  if (params?.role && params.role !== 'ALL') {
    filtered = filtered.filter(p => p.primaryRole === params.role);
  }

  return {
    data: filtered,
    total: filtered.length,
    source: 'VERIFIED_BASELINE'
  };
}

export async function fetchPlayerById(id: string): Promise<{ data: IPlayerDetail | null; source: 'LIVE_API' | 'VERIFIED_BASELINE' }> {
  const live = await fetchFromBackend<IPlayerDetail>(`/players/${id}`);
  if (live) {
    return { data: live, source: 'LIVE_API' };
  }
  const baseline = getPlayerProfileById(id);
  return { data: baseline, source: 'VERIFIED_BASELINE' };
}

export async function fetchMethodology(): Promise<{ data: IMethodologyConfig; source: 'LIVE_API' | 'VERIFIED_BASELINE' }> {
  const live = await fetchFromBackend<IMethodologyConfig>('/methodology');
  if (live) {
    return { data: live, source: 'LIVE_API' };
  }
  return { data: OFFICIAL_METHODOLOGY_CONFIG, source: 'VERIFIED_BASELINE' };
}

