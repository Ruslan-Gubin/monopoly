export interface DiceModel {
  current_id: string; // активный игрок
  dice1: number; // выпавшее значение на игровом кубике
  dice2: number; // выпавшее значение на игровом кубике
  value: number; // общее значение кубиков
  prev_value: number; // предыдущее значение на игровом кубике
  prev_player: string; // id предыдущего игрока
  isDouble: boolean; // выпало ли игроку две одинаковые грани
  _id: string;
}

export interface DiceInitState {
  dice: DiceModel | null
}