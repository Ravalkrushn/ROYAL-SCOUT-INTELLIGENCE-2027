import { z } from 'zod';

export const PaginationQuerySchema = z.object({
  page: z.string().optional().transform((val) => (val ? Math.max(1, parseInt(val, 10)) : 1)),
  limit: z.string().optional().transform((val) => (val ? Math.min(100, Math.max(1, parseInt(val, 10))) : 20)),
  sortBy: z.string().optional().default('compositeScore'),
  order: z.enum(['asc', 'desc']).optional().default('desc')
});

export const PlayerIdParamSchema = z.object({
  id: z.string().min(1, 'Player ID is required').trim()
});

export const PlayerSearchQuerySchema = PaginationQuerySchema.extend({
  q: z.string().optional().default(''),
  role: z.enum(['ALL', 'BATTER', 'BOWLER', 'ALL_ROUNDER', 'WICKET_KEEPER_BATTER']).optional().default('ALL'),
  team: z.string().optional(),
  eligibleOnly: z.string().optional().transform((val) => val === 'true')
});

export const PlayerComparisonQuerySchema = z.object({
  player1: z.string().min(1, 'player1 ID is required'),
  player2: z.string().min(1, 'player2 ID is required'),
  metricType: z.enum(['BATTER', 'BOWLER', 'AUTO']).optional().default('AUTO')
});

export const RankingsQuerySchema = z.object({
  category: z.enum(['BATTER', 'BOWLER']),
  limit: z.string().optional().transform((val) => (val ? Math.min(50, Math.max(1, parseInt(val, 10))) : 10))
});

export type PaginationQuery = z.infer<typeof PaginationQuerySchema>;
export type PlayerIdParam = z.infer<typeof PlayerIdParamSchema>;
export type PlayerSearchQuery = z.infer<typeof PlayerSearchQuerySchema>;
export type PlayerComparisonQuery = z.infer<typeof PlayerComparisonQuerySchema>;
export type RankingsQuery = z.infer<typeof RankingsQuerySchema>;

