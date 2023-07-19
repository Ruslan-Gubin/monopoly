export interface PlayerModel {
    name: string;
    position: number;
    previous_position: number;
    is_active: boolean;
    money: number; 
    properties: string[]; 
    in_jail: boolean;
    getOutOfJailCards: number;
    board_id: string;
    color: string; 
}