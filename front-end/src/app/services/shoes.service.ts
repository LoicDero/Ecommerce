import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ObservedValueOf } from 'rxjs';
import { sample_shoes, sample_tags } from 'src/data';
import { SHOES_BY_ID_URL, SHOES_BY_SEARCH_URL, SHOES_BY_TAG_URL, SHOES_TAGS_URL, SHOES_URL } from '../shared/constants/urls';
import { Shoes } from '../shared/models/shoes';
import { Tag } from '../shared/models/Tag';

@Injectable({
  providedIn: 'root'
})
export class ShoesService {

  constructor(private http:HttpClient) { }

  getAll(): Observable<Shoes[]> {
    return this.http.get<Shoes[]>(SHOES_URL);
  }

  getAllShoesBySearchTerm(searchTerm:string){
    return this.http.get<Shoes[]>(SHOES_BY_SEARCH_URL + searchTerm);
  }

  getAllTags(): Observable<Tag[]>{
    return this.http.get<Tag[]>(SHOES_TAGS_URL);
  }

  getAllShoesByTag(tag:string): Observable<Shoes[]>{
    return tag == 'All'?
      this.getAll():
      this.http.get<Shoes[]>(SHOES_BY_TAG_URL + tag);
  }

  getShoesById(shoesId:string): Observable<Shoes>{
    return this.http.get<Shoes>(SHOES_BY_ID_URL + shoesId);
  }
}
