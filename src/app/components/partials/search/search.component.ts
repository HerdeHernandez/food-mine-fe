import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  searchFood = '';

  constructor (
    activatedRoute: ActivatedRoute,
    private router : Router
  ) {
    activatedRoute.params.subscribe((params) => {
      if(params.searchFood){
        this.searchFood = params.searchFood
      }
    })
  }

  search(food : string): void{
    if(food){
      this.router.navigateByUrl('/search/' + food)
    }
  }
}
