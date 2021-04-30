const isAuthenticated: () => boolean = () => !!localStorage.isAuth;

export default isAuthenticated;
