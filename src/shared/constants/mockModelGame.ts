export const game = {
  "id": 123,
  "num_players": 4,
  "status": "free"
}

export const player = {
  "name": "John",
  "id": 456,
  "current_position": 7,
  "previous_position": 5,
  "active_cards": [101, 102],
  "balance": 500,
  "color": "red",
  "num_fines": 2,
  "num_jail_cards": 1,
  "status": "free",
}

export const card = {
  "id": 101,
  "name": "Chance",
  "position": 3,
  "category": "event",
  "description": "Advance to go and collect $200",
  "effect": {
      "type": "move",
      "value": 40
  }
}