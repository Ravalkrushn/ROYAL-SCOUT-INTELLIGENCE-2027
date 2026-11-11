import { Request, Response, NextFunction } from 'express';
import { RankingsService } from '../services/rankingsService.js';

export const getTop10Batters = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const data = RankingsService.getTop10Batters();
    res.status(200).json({
      success: true,
      status: 200,
      data,
      meta: {
        timestamp: new Date().toISOString(),
        version: '1.0.0',
        totalRecords: data.length,
        dataSource: 'Official Colab Pressure Intelligence Final Batters Ranking'
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getTop10Bowlers = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const data = RankingsService.getTop10Bowlers();
    res.status(200).json({
      success: true,
      status: 200,
      data,
      meta: {
        timestamp: new Date().toISOString(),
        version: '1.0.0',
        totalRecords: data.length,
        dataSource: 'Official Colab Pressure Intelligence Final Bowlers Ranking'
      }
    });
  } catch (error) {
    next(error);
  }
};
