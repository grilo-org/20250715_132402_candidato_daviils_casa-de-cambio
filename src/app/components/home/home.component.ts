import { Component, OnInit } from '@angular/core';
import { gsap } from "gsap"

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
    gsap.to(".gsap-item", { x: -100, y: -100, duration: 1 });
  }

}
