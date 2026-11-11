import { Request, Response, NextFunction } from 'express';
import { MethodologyService } from '../services/methodologyService.js';

export const getMethodology = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const methodology = MethodologyService.getMethodology();
    res.status(200).json({
      success: true,
      status: 200,
      data: methodology,
      meta: {
        timestamp: new Date().toISOString(),
        version: methodology.config.version,
        dataSource: 'Official SupeRR Selector Season 2 Analytical Methodology'
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getEvidence = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const evidence = MethodologyService.getEvidence();
    res.status(200).json({
      success: true,
      status: 200,
      data: evidence,
      meta: {
        timestamp: new Date().toISOString(),
        version: '1.0.0',
        dataSource: 'Official Colab Ball-by-Ball Analysis (2022-2026)'
      }
    });
  } catch (error) {
    next(error);
  }
};
