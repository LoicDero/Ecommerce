import { Component, OnInit } from '@angular/core';
import { ShoesService } from 'src/app/services/shoes.service';
import { Shoes } from 'src/app/shared/models/shoes';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  shoes:Shoes[] = [];
  constructor(private shoesService:ShoesService) {
    this.shoes = shoesService.getAll();
  }

  ngOnInit(): void {

  }

}
