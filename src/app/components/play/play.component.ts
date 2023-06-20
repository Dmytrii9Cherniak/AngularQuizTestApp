import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { QuizModel } from '../../models/quiz.model';
import { QuizService } from '../../services/quiz.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss']
})

export class PlayComponent implements OnInit {

  public testsList: Observable<QuizModel>;
  public isQuizInProgress: Observable<boolean>;
  public currentQuestionIndex: number = 0;
  public userAnswers: string[] = [];
  public categoryValue: string;

  constructor(private quizService: QuizService, private router: Router) {}

  ngOnInit(): void {
    this.isQuizInProgress = this.quizService.isQuizInProgress;
    this.categoryValue = JSON.parse(JSON.stringify(localStorage.getItem('category')));
    this.testsList = this.quizService.getAllTestsQuestions(this.categoryValue);
  }

  startQuiz(): void {
    this.quizService.isQuizInProgress.next(true);
  }

  nextQuestion(selectedAnswer: string): void {
    this.userAnswers.push(selectedAnswer);
    this.currentQuestionIndex++;
    if (this.currentQuestionIndex === 10) {
      // Handle end of quiz
    }
  }

  public cancelQuiz(): void {
    this.quizService.isQuizInProgress.next(false);
    this.router.navigate(['home']);
  }
}
