import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShoesService } from 'src/app/services/shoes.service';
import { Shoes } from 'src/app/shared/models/shoes';

@Component({
  selector: 'app-shoes-page',
  templateUrl: './shoes-page.component.html',
  styleUrls: ['./shoes-page.component.scss']
})
export class ShoesPageComponent implements OnInit {

  shoes!: Shoes;
  constructor(activatedRoute:ActivatedRoute, shoesService:ShoesService){
    activatedRoute.params.subscribe((params) => {
      if(params.id)
      this.shoes = shoesService.getShoesById(params.id)
    })
  }

  ngOnInit(): void {

  }
}
