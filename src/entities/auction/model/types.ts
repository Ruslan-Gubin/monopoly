export interface AuctionModel {
  /** Актуальная цена */
  price: number;
  /** Список участников */
  players: string[];
  /** Лидер */
  last_player_bet: string;
  /** Активный */
  is_active: string;
  /** ID */
  _id: string;
}

export interface AuctionInitState {
  auction: AuctionModel | null;
}
