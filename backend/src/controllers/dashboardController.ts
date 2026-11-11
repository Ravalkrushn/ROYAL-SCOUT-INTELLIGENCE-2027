import { Request, Response, NextFunction } from 'express';
import { DashboardService } from '../services/dashboardService.js';

export const getDashboardSummary = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const summary = DashboardService.getSummary();
    res.status(200).json({
      success: true,
      status: 200,
      data: summary,
      meta: {
        timestamp: new Date().toISOString(),
        version: '1.0.0',
        dataSource: 'Official Colab Pressure Intelligence Final Analytics'
      }
    });
  } catch (error) {
    next(error);
  }
};
