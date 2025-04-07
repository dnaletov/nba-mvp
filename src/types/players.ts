export interface Player {
  id: number;
  name: string;
  imageUrl: string;
}

export interface RawPlayer {
  id: number;
  full_name: string;
}

export interface RawPlayerStats {
  PLAYER_AGE: number;
  TEAM_ABBREVIATION: string;
  AST: number;
  BLK: number;
  PTS: number;
  REB: number;
  STL: number;
}
