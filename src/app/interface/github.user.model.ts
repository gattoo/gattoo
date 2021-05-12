// Github api at https://api.github.com/users/{username}

export interface GithubUser {
  id: string;
  login: string;
  name: string;
  avatar_url: string;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
}
