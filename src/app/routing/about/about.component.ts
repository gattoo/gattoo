import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about-route',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  techs: any[] = [
    'angular',
    'd3',
    'sass',
    'typescript',
    'leaflet',
    'parallax',
    'fontsquirrel',
    'gitlab',
    'github',
    'desk'
  ];

  constructor() {}

  ngOnInit(): void {
  }

}
