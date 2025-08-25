import type {
  IApplicationApi,
  User,
  LoginResponse,
  Movie,
  MovieDetails,
} from "../application-api";

export class ApplicationRestApi implements IApplicationApi {
  private readonly apiKey = "0aca85c0958f05298e8f8bb9263937d0";

  async login(
    username: string,
    password: string
  ): Promise<LoginResponse | null> {
    try {
      const response = await fetch("https://randomuser.me/api/?results=1");
      const data = await response.json();
      const user = data.results[0];
      if (user.login.username === username) {
        return {
          token: "demo-token",
          id: 1,
          name: `${user.name.first} ${user.name.last}`,
          email: user.email,
        };
      }
      if (username === "demouser" && password === "demo") {
        return {
          token: "demo-token",
          id: 1,
          name: "Demo User",
          email: "demo.user@example.com",
        };
      }
      return null;
    } catch {
      if (username === "demouser" && password === "demo") {
        return {
          token: "demo-token",
          id: 1,
          name: "Demo User",
          email: "demo.user@example.com",
        };
      }
      return null;
    }
  }

  async getUsers(): Promise<User[]> {
    try {
      const response = await fetch("https://randomuser.me/api/?results=5");
      const data = await response.json();
      type RandomUser = {
        name: { first: string; last: string };
        login: { username: string };
        email: string;
        picture: { large: string };
      };

      return data.results.map((user: RandomUser, idx: number) => ({
        id: idx + 1,
        firstName: user.name.first,
        lastName: user.name.last,
        userName: user.login.username,
        displayName: `${user.name.first} ${user.name.last}`,
        email: user.email,
        image: user.picture.large,
      }));
    } catch {
      return [
        {
          id: 1,
          firstName: "Demo",
          lastName: "User",
          userName: "demouser",
          displayName: "Demo User",
          email: "demo.user@example.com",
          image: "https://randomuser.me/api/portraits/men/1.jpg",
        },
      ];
    }
  }

  async getMovies(): Promise<Movie[]> {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${this.apiKey}`
    );
    const data = await response.json();
    return data.results;
  }

  async getMovieDetails(id: string): Promise<MovieDetails> {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${this.apiKey}&append_to_response=videos,images`
    );
    return response.json();
  }
}
