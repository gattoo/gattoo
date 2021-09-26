import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { GithubUser } from '../interface/github.user.model';

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  private githubApiUrl = 'https://api.github.com/users/';

  constructor(private http: HttpClient) { }

  getUser(name: string): any {
    return this.http.get<GithubUser>(this.githubApiUrl + name);
  }
}
