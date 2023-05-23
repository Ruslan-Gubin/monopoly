
const submitButtonText = (type: 'login' | 'registration' | 'update') => {
  let result = ''
  switch (type) {
    case 'login':
      result = 'Войти'
      break;
    case 'registration':
      result = 'Регистрация'
      break;
    case 'update':
      result = 'Изменить'
      break;
  
    default:
      break;
  }
  return result
}

export { submitButtonText }