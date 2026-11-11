import { Request, Response, NextFunction } from 'express';
import { StatsService } from '../services/statsService.js';
import { PaginationQuery } from '../validators/index.js';

export const getBatterStats = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const result = StatsService.getBatterStats(req.query as unknown as PaginationQuery);
    res.status(200).json({
      success: true,
      status: 200,
      data: result,
      meta: {
        timestamp: new Date().toISOString(),
        version: '1.0.0',
        dataSource: 'Eligible Batters Pressure Statistics'
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getBowlerStats = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const result = StatsService.getBowlerStats(req.query as unknown as PaginationQuery);
    res.status(200).json({
      success: true,
      status: 200,
      data: result,
      meta: {
        timestamp: new Date().toISOString(),
        version: '1.0.0',
        dataSource: 'Eligible Bowlers Pressure Statistics'
      }
    });
  } catch (error) {
    next(error);
  }
};
