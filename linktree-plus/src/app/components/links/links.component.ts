import { LinkService } from './../../services/link.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-links',
  imports: [],
  templateUrl: './links.component.html',
  styleUrl: './links.component.scss'
})
export class LinksComponent implements OnInit{
  links:any =[];
  constructor(private LinkService: LinkService){}

  ngOnInit(): void {
   this.LinkService.getLinks().then((links) =>{
      this.links = links.filter(link => link.isVisible);
   });
  }
}
