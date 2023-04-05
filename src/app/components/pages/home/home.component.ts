import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { FoodService } from 'src/app/service/food.service';
import { Food } from 'src/app/shared/models/food';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  foods : Food[] = []

  constructor(
    private foodService : FoodService,
    activatedRoute : ActivatedRoute
  ){
    let foodObservable : Observable<Food[]>
    activatedRoute.params.subscribe((params) => {
      if(params.searchFood){
        foodObservable = foodService.getSearchFoods(params.searchFood)
      }
      else if(params.tag){
        foodObservable = foodService.getAllFoodsByTag(params.tag)
      }
      else{
        foodObservable = foodService.getAllData()
      }

      foodObservable.subscribe((foods) => {
        this.foods = foods
      })
    })
  }


}
