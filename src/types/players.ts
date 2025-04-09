export interface TPPlayer {
  id: number;
  name: string;
  imageUrl: string;
}

export interface TPRawPlayer {
  id: number;
  full_name: string;
}

export interface TPRawPlayerStats {
  PLAYER_AGE: number;
  TEAM_ABBREVIATION: string;
  AST: number;
  BLK: number;
  PTS: number;
  REB: number;
  STL: number;
  PLAYER_ID: number;
  PLAYER: string;
}
