import Register from '../components/auth/Register';
import Login from '../components/auth/Login';
import CreateProfile from '../components/layout/CreateProfile';
import Home from '../components/Home';
import Mapbox from '../components/Mapbox';
import Settings from '../components/Settings';

export type RouteType = {
  path: string;
  component: React.FC;
  title: string;
  needsAuth: boolean;
};

const routes: RouteType[] = [
  {
    path: '/',
    component: Home,
    title: 'Home',
    needsAuth: false,
  },
  {
    path: '/register',
    component: Register,
    title: 'Register',
    needsAuth: false,
  },
  {
    path: '/login',
    component: Login,
    title: 'Login',
    needsAuth: false,
  },
  {
    path: '/map',
    component: Mapbox,
    title: 'My Map',
    needsAuth: true,
  },
  {
    path: '/settings',
    component: Settings,
    title: 'Settings',
    needsAuth: true,
  },
  {
    path: '/create',
    component: CreateProfile,
    title: 'Create Profile',
    needsAuth: true,
  },
];

export default routes;
