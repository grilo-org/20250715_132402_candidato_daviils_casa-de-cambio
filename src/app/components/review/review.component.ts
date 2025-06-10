import { Component } from '@angular/core';
import {MatButton} from '@angular/material/button';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-review',
  imports: [
    MatButton,
    RouterLink
  ],
  templateUrl: './review.component.html',
  standalone: true,
  styleUrl: './review.component.css'
})
export class ReviewComponent {

}
