export const login = key => {
  localStorage.setItem('session', key);
}
export const logout = () => {
  localStorage.removeItem('session');
}

export const authConfig = () => {
  return {
    headers: { Authorization: `${localStorage.getItem('session') ?? ''}` }
  }
}