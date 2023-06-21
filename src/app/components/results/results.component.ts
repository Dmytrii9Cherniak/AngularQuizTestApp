import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../services/quiz.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {

  public totalQuizPlayed: number;
  public totalIncorrectAnswers: number;
  public totalCorrectAnswers: number;
  public categoryQuiz: string;

  constructor(
    public quizService: QuizService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.categoryQuiz = JSON.parse(JSON.stringify(localStorage.getItem('categoryName')));
    this.totalQuizPlayed = this.quizService.totalQuizzesCompleted;
    this.totalIncorrectAnswers = this.quizService.totalIncorrectAnswers;
    this.totalCorrectAnswers = this.quizService.totalCorrectAnswers;
  }

  public goToQuizList(): void {
    this.router.navigate(['']);
  }

}
