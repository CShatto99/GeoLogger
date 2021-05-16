export type Marker = {
  date: string;
  image: string;
  latitude: number;
  longitude: number;
  notes: string;
  open: boolean;
  title: string;
};

export type Profile = {
  theme: string;
  fillColor: string;
  mapStyle: string;
  visited: string[];
  markers: Marker[];
};

type User = {
  date?: string;
  username?: string;
  email: string;
  password?: string;
  passVerify?: string;
  profileSetUp?: boolean;
};

export interface Actions {
  profile: (profile?: Profile) => (dispatch: React.Dispatch<unknown>) => void;
  auth: (user?: User) => (dispatch: React.Dispatch<unknown>) => void;
  alert: (msg?: string, status?: number) => (dispatch: React.Dispatch<unknown>) => void;
}
