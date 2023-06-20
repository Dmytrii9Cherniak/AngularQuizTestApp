import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../services/quiz.service';
import { Observable, take } from 'rxjs';
import { TestCategoryModel } from '../../models/test.category.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  public categoriesList: Observable<TestCategoryModel>;

  constructor(private quizService: QuizService, private router: Router) {}

  ngOnInit() :void {
    this.getAllTestsList();
  }

  public getAllTestsList(): void {
    this.categoriesList = this.quizService.getAllTestCategories();
  }

  public getCategory(id: any, name: string) {
    localStorage.setItem('category', id)
    this.quizService.resultsData.next(id)
    this.router.navigate(['play']);
    console.log(id, name);
  }

  public getRandomQuizCategory(): void {
    this.categoriesList.pipe(take(1)).toPromise().then((categories): void => {
      if (categories) {
        const randomIndex: number = Math.floor(Math.random() * categories.trivia_categories.length);
        const randomCategory = categories.trivia_categories[randomIndex];
        this.getCategory(randomCategory.id, randomCategory.name);
      }
    });
  }

}
