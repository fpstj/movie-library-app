export type LoginResponse = {
  token: string;
  id: number;
  name: string;
  email: string;
};

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  userName: string;
  displayName: string;
  email: string;
  image: string;
};

export type Movie = {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  genre_ids: number[];
};

export type MovieDetails = {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  genres: { id: number; name: string }[];
  popularity: number;
  videos?: {
    id: string;
    key: string;
    name: string;
    site: string;
    type: string;
  }[];
  images?: { file_path: string; width: number; height: number }[];
};

export interface IApplicationApi {
  login(username: string, password: string): Promise<LoginResponse | null>;
  getUsers(): Promise<User[]>;
  getMovies(): Promise<Movie[]>;
  getMovieDetails(id: string): Promise<MovieDetails>;
}

export class ApplicationApi<T extends IApplicationApi> {
  private restApi: T;
  constructor(restApi: T) {
    this.restApi = restApi;
  }

  async login(username: string, password: string) {
    return this.restApi.login(username, password);
  }

  async getUsers() {
    return this.restApi.getUsers();
  }

  async getMovies() {
    return this.restApi.getMovies();
  }

  async getMovieDetails(id: string) {
    return this.restApi.getMovieDetails(id);
  }
}
