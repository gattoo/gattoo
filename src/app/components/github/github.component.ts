import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

import { GithubService } from '../../services/github.service';
import { GithubUser } from '../../interface/github.user.model';

@Component({
  selector: 'app-github',
  templateUrl: './github.component.html',
  styleUrls: ['./github.component.scss']
})
export class GithubComponent implements OnInit {

  public loading = false;
  private startingName = 'gattoo';
  searchTerm$: Subject<string> = new Subject();

  @Input() user: GithubUser = {
    id: '',
    login: '',
    name: '',
    avatar_url: '',
    public_repos: 0,
    public_gists: 0,
    followers: 0,
    following: 0
  };

  constructor(private githubService: GithubService) { }

  ngOnInit(): void {
    this.searchTerm$.pipe(debounceTime(500)).subscribe(inputValue => {
      this.getUser(inputValue);
    });

    this.getUser(this.startingName);
   }

   getUser(userName: string): void {
    this.githubService.getUser(userName)
      .subscribe((data: GithubUser) => {
        this.user = { ...data };
        this.loading = false;
      });
   }

  onChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const value = target.value || this.startingName;

    this.loading = true;
    this.searchTerm$.next(value);
  }
}
