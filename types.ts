
export enum SymbolType {
  BOAT = 'BOAT',
  SCALE = 'SCALE',
  PADDY_SHEAF = 'PADDY_SHEAF',
  PLOUGH = 'PLOUGH',
  CLOCK = 'CLOCK',
  UMBRELLA = 'UMBRELLA',
  LANTERN = 'LANTERN',
  CHAIR = 'CHAIR'
}

export interface Candidate {
  id: string;
  symbolName: string;
  symbol: string; // Emoji or Icon
  type: SymbolType;
}

export interface Position {
  x: number;
  y: number;
}
