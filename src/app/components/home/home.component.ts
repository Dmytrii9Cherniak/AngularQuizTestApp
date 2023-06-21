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

  constructor(
    private quizService: QuizService,
    private router: Router
  ) {}

  ngOnInit() :void {
    localStorage.removeItem('categoryName');
    this.quizService.isQuizInProgress.next(false);
    this.categoriesList = this.quizService.getAllTestCategories();
  }

  public getCategory(id: number, name: string) :void {
    localStorage.setItem('category', JSON.stringify(id));
    localStorage.setItem('categoryName', name);
    this.router.navigate(['play']);
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
