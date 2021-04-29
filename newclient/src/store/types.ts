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

export type Action = (
  profile?: Profile,
  user?: User,
  msg?: string,
  status?: number,
) => (dispatch: React.Dispatch<unknown>) => void;
