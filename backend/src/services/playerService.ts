import { inMemoryStore } from './dataImportService.js';
import { PlayerSearchQuery } from '../validators/index.js';

export class PlayerService {
  public static searchPlayers(query: PlayerSearchQuery) {
    const { q, role, eligibleOnly, page = 1, limit = 20 } = query;
    let list = Array.from(inMemoryStore.playerProfiles.values());

    // Search query filter (name or playerId)
    if (q && q.trim().length > 0) {
      const searchTerm = q.trim().toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(searchTerm) ||
          p.displayName.toLowerCase().includes(searchTerm) ||
          p.playerId.toLowerCase().includes(searchTerm)
      );
    }

    // Role filter
    if (role && role !== 'ALL') {
      list = list.filter((p) => p.primaryRole === role);
    }

    // Eligible filter
    if (eligibleOnly) {
      list = list.filter((p) => p.isEligibleBatter || p.isEligibleBowler);
    }

    // Sort by rank / compositeScore
    list.sort((a, b) => (a.rank || 999) - (b.rank || 999));

    const totalRecords = list.length;
    const totalPages = Math.ceil(totalRecords / limit) || 1;
    const startIndex = (page - 1) * limit;
    const paginated = list.slice(startIndex, startIndex + limit);

    return {
      players: paginated,
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

  public static getPlayerById(id: string) {
    const cleanId = id.trim().toLowerCase();
    
    // Check in playerProfiles or search by name
    let profile = inMemoryStore.playerProfiles.get(cleanId);
    if (!profile) {
      profile = Array.from(inMemoryStore.playerProfiles.values()).find(
        (p) => p.playerId.toLowerCase() === cleanId || p.name.toLowerCase() === cleanId
      );
    }

    if (!profile) {
      return null;
    }

    const batterStats = inMemoryStore.batters.get(profile.playerId) || null;
    const bowlerStats = inMemoryStore.bowlers.get(profile.playerId) || null;

    return {
      player: {
        playerId: profile.playerId,
        name: profile.name,
        displayName: profile.displayName,
        country: profile.country,
        primaryRole: profile.primaryRole,
        battingStyle: profile.battingStyle,
        bowlingStyle: profile.bowlingStyle,
        isEligibleBatter: profile.isEligibleBatter,
        isEligibleBowler: profile.isEligibleBowler,
        rank: profile.rank,
        compositeScore: profile.compositeScore
      },
      battingStats: batterStats
        ? {
            rank: batterStats.rank,
            isEligible: true,
            compositeScore: batterStats.compositeScore,
            runs: batterStats.runs,
            ballsPressure: batterStats.ballsPressure,
            dismissals: batterStats.dismissals,
            matchesPressure: batterStats.matchesPressure,
            strikeRatePressure: batterStats.strikeRatePressure,
            averagePressure: batterStats.averagePressure,
            strikeRateNormal: batterStats.strikeRateNormal,
            strikeRateImprovement: batterStats.strikeRateDifference,
            fours: batterStats.fours,
            sixes: batterStats.sixes,
            notes: batterStats.notes
          }
        : null,
      bowlingStats: bowlerStats
        ? {
            rank: bowlerStats.rank,
            isEligible: true,
            compositeScore: bowlerStats.compositeScore,
            runsConceded: bowlerStats.runs,
            legalBallsPressure: bowlerStats.legalBallsPressure,
            wickets: bowlerStats.wickets,
            matchesPressure: bowlerStats.matchesPressure,
            wicketsPerSixBalls: bowlerStats.wicketsPerSixBalls,
            candidateEconomyPressure: bowlerStats.candidateEconomyPressure,
            candidateEconomyNormal: bowlerStats.candidateEconomyNormal,
            economyStatus: 'Provisional - bowling economy pending complete resolution of extras calculations',
            notes: bowlerStats.notes
          }
        : null
    };
  }
}
