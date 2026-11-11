import { inMemoryStore } from './dataImportService.js';
import {
  OFFICIAL_METHODOLOGY_CONFIG,
  OFFICIAL_EVIDENCE_SUMMARY
} from '../data/constants.js';

export class MethodologyService {
  public static getMethodology() {
    return {
      config: OFFICIAL_METHODOLOGY_CONFIG,
      sheets: {
        methodologyTable: inMemoryStore.methodology,
        scoringWeights: inMemoryStore.scoringWeights,
        limitationsAndAssumptions: inMemoryStore.limitations,
        datasetOverview: inMemoryStore.datasetOverview
      }
    };
  }

  public static getEvidence() {
    return {
      summary: OFFICIAL_EVIDENCE_SUMMARY,
      pressureDistribution: inMemoryStore.pressureDistribution,
      reconciliationDetails: {
        rawDeliveries: OFFICIAL_EVIDENCE_SUMMARY.rawBallByBallDeliveries,
        analyzedDeliveries: OFFICIAL_EVIDENCE_SUMMARY.analyzedDeliveries,
        pressureCategorizedDeliveries: 193650,
        differenceDeliveries: OFFICIAL_EVIDENCE_SUMMARY.reconciliationDifference,
        status: 'Documented and accounted for'
      }
    };
  }
}
