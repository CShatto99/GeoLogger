const isAuthenticated: () => boolean = () => !!localStorage.userToken;

export default isAuthenticated;
