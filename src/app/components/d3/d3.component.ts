import { Component, OnInit } from '@angular/core';

declare global {
  interface Window {
    d3NS: any;
  }
}

@Component({
  selector: 'app-d3',
  templateUrl: './d3.component.html',
  styleUrls: ['./d3.component.scss']
})
export class D3Component implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // const node = document.createElement('script');

    // node.src = 'assets/js/d3.js';
    // node.type = 'text/javascript';
    // node.async = true;

    // document.getElementsByTagName('head')[0].appendChild(node);

    // let d3NS = window.d3NS;

    window.d3NS.f();
  }
}
