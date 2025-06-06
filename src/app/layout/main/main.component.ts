import {Component} from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {RouterOutlet} from '@angular/router';
import { TimelineLite } from 'gsap';

@Component({
  selector: 'app-main',
  imports: [MatSidenavModule,
    MatToolbarModule, MatButtonModule, MatIconModule, RouterOutlet,],
  templateUrl: './main.component.html',
  standalone: true,
  styleUrl: './main.component.css'
})
export class MainComponent {

  something () {
    const tl: TimelineLite = new TimelineLite()
  }
}
