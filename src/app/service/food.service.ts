import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { sample_foods, sample_tags } from 'src/data';
import { FOODS_ID_URL, FOODS_SEARCH_URL, FOODS_TAGS_URL, FOODS_TAG_URL, FOODS_URL } from '../shared/constants/urls';
import { Food } from '../shared/models/food';
import { Tag } from '../shared/models/tag';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor(
    private http : HttpClient
  ) { }

  getAllData(): Observable<Food[]>{
    return this.http.get<Food[]>(FOODS_URL)
  }

  getSearchFoods(search : string): Observable<Food[]> {
    console.log(FOODS_SEARCH_URL + search)
    return this.http.get<Food[]>(FOODS_SEARCH_URL + search)
  }

  getAllTags():Observable<Tag[]>{
    return this.http.get<Tag[]>(FOODS_TAGS_URL)
  }

  getAllFoodsByTag(tag:string):Observable<Food[]>{
    return tag === "All" ?
      this.getAllData() :
      this.http.get<Food[]>(FOODS_TAG_URL + tag)
  }

  getFoodByID(foodID: string):Observable<Food>{
    return this.http.get<Food>(FOODS_ID_URL + foodID)
  }
}
