import { Request, Response, NextFunction } from 'express';
import { ComparisonService } from '../services/comparisonService.js';

export const comparePlayers = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { player1, player2, metricType } = req.query;

    if (!player1 || !player2) {
      res.status(400).json({
        success: false,
        status: 400,
        error: {
          code: 'MISSING_QUERY_PARAMS',
          message: 'Both player1 and player2 query parameters are required for comparison.'
        }
      });
      return;
    }

    const result = ComparisonService.compare(
      String(player1),
      String(player2),
      metricType ? String(metricType) : undefined
    );

    res.status(200).json({
      success: true,
      status: 200,
      data: result,
      meta: {
        timestamp: new Date().toISOString(),
        version: '1.0.0',
        dataSource: 'Player Head-to-Head Comparison Analytics'
      }
    });
  } catch (error: any) {
    if (error.message && error.message.includes('not found')) {
      res.status(404).json({
        success: false,
        status: 404,
        error: {
          code: 'PLAYER_NOT_FOUND',
          message: error.message
        }
      });
      return;
    }
    next(error);
  }
};
