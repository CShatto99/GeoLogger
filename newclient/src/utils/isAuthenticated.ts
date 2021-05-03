const isAuthenticated: () => boolean = () => localStorage.getItem('isAuth') !== 'true';

export default isAuthenticated;
