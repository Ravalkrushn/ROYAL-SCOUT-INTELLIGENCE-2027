import { inMemoryStore } from './dataImportService.js';
import { PlayerService } from './playerService.js';

export class ComparisonService {
  public static compare(player1Id: string, player2Id: string, metricType?: string) {
    const profile1 = PlayerService.getPlayerById(player1Id);
    const profile2 = PlayerService.getPlayerById(player2Id);

    if (!profile1) {
      throw new Error(`Player not found: ${player1Id}`);
    }
    if (!profile2) {
      throw new Error(`Player not found: ${player2Id}`);
    }

    // Determine comparison mode
    let effectiveType = metricType;
    if (!effectiveType || effectiveType === 'AUTO') {
      if (profile1.battingStats && profile2.battingStats) {
        effectiveType = 'BATTER';
      } else if (profile1.bowlingStats && profile2.bowlingStats) {
        effectiveType = 'BOWLER';
      } else {
        effectiveType = 'HYBRID';
      }
    }

    const headToHead: Record<string, string> = {};

    if (effectiveType === 'BATTER' && profile1.battingStats && profile2.battingStats) {
      headToHead.higherCompositeScore =
        profile1.battingStats.compositeScore > profile2.battingStats.compositeScore
          ? profile1.player.name
          : profile2.player.name;

      headToHead.higherPressureStrikeRate =
        profile1.battingStats.strikeRatePressure > profile2.battingStats.strikeRatePressure
          ? profile1.player.name
          : profile2.player.name;

      headToHead.higherPressureAverage =
        profile1.battingStats.averagePressure > profile2.battingStats.averagePressure
          ? profile1.player.name
          : profile2.player.name;

      headToHead.greaterStrikeRateImprovement =
        profile1.battingStats.strikeRateImprovement > profile2.battingStats.strikeRateImprovement
          ? profile1.player.name
          : profile2.player.name;

      headToHead.largerPressureSampleSize =
        profile1.battingStats.ballsPressure > profile2.battingStats.ballsPressure
          ? profile1.player.name
          : profile2.player.name;
    } else if (effectiveType === 'BOWLER' && profile1.bowlingStats && profile2.bowlingStats) {
      headToHead.higherCompositeScore =
        profile1.bowlingStats.compositeScore > profile2.bowlingStats.compositeScore
          ? profile1.player.name
          : profile2.player.name;

      headToHead.morePressureWickets =
        profile1.bowlingStats.wickets > profile2.bowlingStats.wickets
          ? profile1.player.name
          : profile2.player.name;

      headToHead.higherPressureWicketRate =
        profile1.bowlingStats.wicketsPerSixBalls > profile2.bowlingStats.wicketsPerSixBalls
          ? profile1.player.name
          : profile2.player.name;

      headToHead.betterProvisionalEconomy =
        profile1.bowlingStats.candidateEconomyPressure < profile2.bowlingStats.candidateEconomyPressure
          ? profile1.player.name
          : profile2.player.name;

      headToHead.largerPressureSampleSize =
        profile1.bowlingStats.legalBallsPressure > profile2.bowlingStats.legalBallsPressure
          ? profile1.player.name
          : profile2.player.name;
    }

    return {
      comparisonType: effectiveType,
      player1: profile1,
      player2: profile2,
      headToHeadEdge: headToHead
    };
  }
}
