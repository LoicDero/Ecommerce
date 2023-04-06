import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
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
    let shoesObservable:Observable<Shoes[]>;
    activatedRoute.params.subscribe((params) => {
      if(params.searchTerm)
        shoesObservable = this.shoesService.getAllShoesBySearchTerm(params.searchTerm);
      else if (params.tag)
        shoesObservable = this.shoesService.getAllShoesByTag(params.tag);
      else
        shoesObservable = shoesService.getAll();

        shoesObservable.subscribe((serverShoes) => {
          this.shoes = serverShoes;
        })
    })
  }

  ngOnInit(): void {

  }

}
