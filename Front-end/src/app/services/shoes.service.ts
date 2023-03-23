import { Injectable } from '@angular/core';
import { sample_shoes, sample_tags } from 'src/data';
import { Shoes } from '../shared/models/shoes';
import { Tag } from '../shared/models/Tag';

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

  getAllTags():Tag[]{
    return sample_tags;
  }

  getAllShoesByTag(tag:string):Shoes[]{
    return tag == 'All'?
    this.getAll():
    this.getAll().filter(shoes => shoes.tags?.includes(tag));
  }

  getShoesById(shoesId:string):Shoes{
    return this.getAll().find(shoes => shoes.id == shoesId) ?? new Shoes();
  }
}
