import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { QuizModel } from '../models/quiz.model';
import { TestCategoryModel } from '../models/test.category.model';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  public userAnswers: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  public isQuizInProgress: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private httpClient: HttpClient) { }

  public getAllTestsQuestions(categoryId: string): Observable<QuizModel> {
    return this.httpClient.get<QuizModel>(`${environment.apiUrl}/api.php?amount=10&category=${categoryId}`);
  }

  public getAllTestCategories() :Observable<TestCategoryModel> {
    return this.httpClient.get<TestCategoryModel>(`${environment.apiUrl}/api_category.php`);
  }

}
