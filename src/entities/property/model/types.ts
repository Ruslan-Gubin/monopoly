export interface PropertyModel {
  cell_id: string;
  board_id: string;
  owner: string;
  current_rent: number;
  is_sindicate: boolean;
  house_count: number;
  mortgage_price: number;
  buy_back: number;
  is_mortgage: boolean;
  position: number;
  port_count: number;
  player_color: string;
  _id: string;
}

export interface PropertyInitState {
  propertyes: PropertyModel[]
}