const checkUpdateUser = (newName: string | undefined, prevName: string | undefined, newImag: string | null ) => {
  return newName && newName !== prevName || newImag 
}

export { checkUpdateUser }