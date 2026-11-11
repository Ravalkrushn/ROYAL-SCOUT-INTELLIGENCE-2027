import { Request, Response, NextFunction } from 'express';
import { PlayerService } from '../services/playerService.js';
import { PlayerSearchQuery } from '../validators/index.js';

export const getPlayers = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const result = PlayerService.searchPlayers(req.query as unknown as PlayerSearchQuery);
    res.status(200).json({
      success: true,
      status: 200,
      data: result,
      meta: {
        timestamp: new Date().toISOString(),
        version: '1.0.0',
        dataSource: 'Player Directory & Eligibility Database'
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getPlayerProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const id = String(req.params.id);
    const profile = PlayerService.getPlayerById(id);

    if (!profile) {
      res.status(404).json({
        success: false,
        status: 404,
        error: {
          code: 'PLAYER_NOT_FOUND',
          message: `No player profile found matching identifier '${id}'`
        },
        meta: {
          timestamp: new Date().toISOString(),
          requestedId: id
        }
      });
      return;
    }

    res.status(200).json({
      success: true,
      status: 200,
      data: profile,
      meta: {
        timestamp: new Date().toISOString(),
        version: '1.0.0',
        dataSource: 'Player Performance & Dossier Intelligence'
      }
    });
  } catch (error) {
    next(error);
  }
};
