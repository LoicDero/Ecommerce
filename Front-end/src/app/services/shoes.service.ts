import { Injectable } from '@angular/core';
import { sample_shoes } from 'src/data';
import { Shoes } from '../shared/models/shoes';

@Injectable({
  providedIn: 'root'
})
export class ShoesService {

  constructor() { }

  getAll():Shoes[]{
    return sample_shoes;
  }

  getAllShoesBySearchTerm(searchTerm:string){
    return this.getAll().filter(food => food.name.toLowerCase().includes(searchTerm.toLowerCase()))
  }
}
