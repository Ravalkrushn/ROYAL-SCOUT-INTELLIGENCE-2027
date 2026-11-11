import { inMemoryStore } from './dataImportService.js';
import { IBatterRankingDetail, IBowlerRankingDetail } from '../data/rankings.js';

export class RankingsService {
  public static getTop10Batters(): IBatterRankingDetail[] {
    const list = Array.from(inMemoryStore.batters.values());
    list.sort((a, b) => a.rank - b.rank);
    return list.slice(0, 10);
  }

  public static getTop10Bowlers(): IBowlerRankingDetail[] {
    const list = Array.from(inMemoryStore.bowlers.values());
    list.sort((a, b) => a.rank - b.rank);
    return list.slice(0, 10);
  }
}
