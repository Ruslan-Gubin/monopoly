import { BoardModel, PlayerModel } from "@/entities"
import { IPropertyUpdateObj } from "../ui"

export const checkGameOver = (updateList: IPropertyUpdateObj[], player: PlayerModel, board: BoardModel) => {
    const totalMortgage = updateList.reduce((acc, property) =>  acc + property.price, 0)
    const playerMoney = player.money
    const needPay = board.price
    return (totalMortgage + playerMoney) < needPay
}