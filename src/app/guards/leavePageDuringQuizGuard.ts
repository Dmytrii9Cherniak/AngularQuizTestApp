import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { QuizService } from '../services/quiz.service';

@Injectable()
export class QuizInProgressGuard implements CanDeactivate<any> {

  constructor(private quizService: QuizService) { }

  canDeactivate(
    component: any,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return !this.quizService.isQuizInProgress.getValue();
  }
}
