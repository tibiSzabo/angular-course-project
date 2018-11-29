import {Recipe} from './recipe-list/recipe.model';
import {EventEmitter, Injectable} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list/shopping-list.service.';

@Injectable()
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe [] = [

    new Recipe(
      'Test Recipe',
      'Test Recipe Description',
      'https://media.defense.gov/2017/Jul/14/2001778344/780/780/0/170713-F-BI157-009.JPG',
      [new Ingredient('Coffee', 1), new Ingredient('Sprite', 20)]
    ),

    new Recipe(
      'Another Recipe',
      'Another Recipe Description',
      'https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/frying-pan-pizza-easy-recipe-collection.jpg',
      [new Ingredient('Cat', 3), new Ingredient('Dog', 21)]
    )
  ];

  constructor(private shoppingListService: ShoppingListService) { }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }
}
