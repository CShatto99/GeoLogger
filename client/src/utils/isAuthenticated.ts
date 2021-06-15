const isAuthenticated: () => boolean = () => localStorage.getItem('gl_is_auth') === 'true';

export default isAuthenticated;
