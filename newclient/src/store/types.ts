type Marker = {
  date: string;
  image: string;
  latitude: number;
  longitude: number;
  notes: string;
  open: boolean;
  title: string;
};

type Profile = {
  date: string;
  theme: string;
  fillColor: string;
  mapStyle: string;
  visited: string[];
  markers: Marker[];
  user: {
    date: string;
    email: string;
    username: string;
  };
};

type User = {
  email: string;
  password: string;
};

export interface AlertState {
  msg: string;
  status: string;
}

export interface AuthState {
  user: User;
  isAuth: boolean;
  loading: boolean;
}

export interface ProfileState {
  profile: Profile;
  loading: boolean;
}

export interface Actions {
  profile: (profile?: Profile) => (dispatch: React.Dispatch<unknown>) => void;
  auth: (user?: User) => (dispatch: React.Dispatch<unknown>) => void;
  alert: (msg?: string, status?: string) => (dispatch: React.Dispatch<unknown>) => void;
}
