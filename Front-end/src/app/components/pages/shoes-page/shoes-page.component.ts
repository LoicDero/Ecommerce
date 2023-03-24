import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { ShoesService } from 'src/app/services/shoes.service';
import { Shoes } from 'src/app/shared/models/shoes';

@Component({
  selector: 'app-shoes-page',
  templateUrl: './shoes-page.component.html',
  styleUrls: ['./shoes-page.component.scss']
})
export class ShoesPageComponent implements OnInit {

  shoes!: Shoes;
  constructor(activatedRoute:ActivatedRoute, shoesService:ShoesService, private cartServcice:CartService,
    private router:Router){
    activatedRoute.params.subscribe((params) => {
      if(params.id)
      this.shoes = shoesService.getShoesById(params.id)
    })
  }

  ngOnInit(): void {
  }

  addToCart(){
    this.cartServcice.addToCart(this.shoes);
    // Pour aller direct dans le panier apres avoir cliqué :
    this.router.navigateByUrl('/cart-page');
  }
}
