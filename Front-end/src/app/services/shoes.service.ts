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
}
