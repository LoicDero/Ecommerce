import { Component, OnInit } from '@angular/core';
import { ShoesService } from 'src/app/services/shoes.service';
import { Tag } from 'src/app/shared/models/Tag';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit {

  tags?:Tag[];
  constructor(shoesService:ShoesService){
    this.tags = shoesService.getAllTags();
  }

  ngOnInit(): void {

  }
}
