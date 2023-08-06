

export const checkFinishMove = (targetX: number, targetY: number, playerX: number, playerY: number) => {
  const step = 20

 const horizont = ((targetX + step) > playerX) && ((targetX - step) < playerX)
 const vertical = ((targetY + step) > playerY) && ((targetY - step) < playerY)

  if (horizont && vertical) {
    return true
  }

return false
}