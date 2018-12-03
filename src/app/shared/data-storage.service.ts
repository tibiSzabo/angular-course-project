import { Injectable } from '@angular/core';
import { Http, Response } from "@angular/http";
import { RecipeService } from "../recipes/recipe.service";
import { map } from "rxjs/operators";
import { Recipe } from "../recipes/recipe-list/recipe.model";

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: Http,
              private recipeService: RecipeService) { }

  storeRecipes() {
    this.http.put('https://ng-course-project-56427.firebaseio.com/recipes.json', this.recipeService.getRecipes())
      .pipe(map(
        response => { return response.json(); }
      ))
      .subscribe( response => console.log(response) )
  }

  getRecipes() {
    this.http.get('https://ng-course-project-56427.firebaseio.com/recipes.json')
      .pipe(map(
        (response: Response) => {
          const recipes: Recipe[] = response.json();
          for (let recipe of recipes) {
            if (!recipe['ingredients']) {
              recipe['ingredients'] = [];
            }
          }
          return recipes;
        }
      ))
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipeService.setRecipes(recipes);
        }
      );
  }
}
