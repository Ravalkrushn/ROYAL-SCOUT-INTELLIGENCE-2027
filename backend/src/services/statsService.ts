import { inMemoryStore } from './dataImportService.js';
import { PaginationQuery } from '../validators/index.js';

export class StatsService {
  public static getBatterStats(query: PaginationQuery & { eligibleOnly?: boolean }) {
    const { page = 1, limit = 20, sortBy = 'compositeScore', order = 'desc' } = query;
    let list = Array.from(inMemoryStore.batters.values());

    // Sort
    list.sort((a: any, b: any) => {
      const fieldA = a[sortBy] ?? a.compositeScore;
      const fieldB = b[sortBy] ?? b.compositeScore;
      if (order === 'asc') return fieldA > fieldB ? 1 : -1;
      return fieldA < fieldB ? 1 : -1;
    });

    const totalRecords = list.length;
    const totalPages = Math.ceil(totalRecords / limit) || 1;
    const startIndex = (page - 1) * limit;
    const paginated = list.slice(startIndex, startIndex + limit);

    return {
      batters: paginated,
      pagination: {
        page,
        limit,
        totalRecords,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      }
    };
  }

  public static getBowlerStats(query: PaginationQuery & { eligibleOnly?: boolean }) {
    const { page = 1, limit = 20, sortBy = 'compositeScore', order = 'desc' } = query;
    let list = Array.from(inMemoryStore.bowlers.values());

    // Sort
    list.sort((a: any, b: any) => {
      const fieldA = a[sortBy] ?? a.compositeScore;
      const fieldB = b[sortBy] ?? b.compositeScore;
      if (order === 'asc') return fieldA > fieldB ? 1 : -1;
      return fieldA < fieldB ? 1 : -1;
    });

    const totalRecords = list.length;
    const totalPages = Math.ceil(totalRecords / limit) || 1;
    const startIndex = (page - 1) * limit;
    const paginated = list.slice(startIndex, startIndex + limit);

    return {
      bowlers: paginated,
      pagination: {
        page,
        limit,
        totalRecords,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      },
      provisionalEconomyNotice: 'Bowling economy is provisional because extras calculations remain unresolved across all competitions.'
    };
  }
}
