export type Marker = {
  date: string;
  image: string;
  latitude: number;
  longitude: number;
  notes: string;
  open: boolean;
  title: string;
};

type Profile = {
  theme: string;
  fillColor: string;
  mapStyle: string;
  visited: string[];
  markers: Marker[];
};

type User = {
  date: string;
  email: string;
  username: string;
  password?: string;
};

export interface Actions {
  profile: (profile?: Profile) => (dispatch: React.Dispatch<unknown>) => void;
  auth: (user?: User) => (dispatch: React.Dispatch<unknown>) => void;
  alert: (msg?: string, status?: number) => (dispatch: React.Dispatch<unknown>) => void;
}
