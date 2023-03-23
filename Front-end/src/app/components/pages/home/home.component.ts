import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShoesService } from 'src/app/services/shoes.service';
import { Shoes } from 'src/app/shared/models/shoes';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  shoes:Shoes[] = [];
  constructor(private shoesService:ShoesService, activatedRoute:ActivatedRoute) {
    activatedRoute.params.subscribe((params) => {
      if(params.searchTerm)
      this.shoes = this.shoesService.getAllShoesBySearchTerm(params.searchTerm);
      else
      this.shoes = shoesService.getAll();
    })
  }

  ngOnInit(): void {

  }

}
