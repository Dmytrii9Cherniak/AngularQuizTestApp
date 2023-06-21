import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../services/quiz.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {

  public quizPlayed: number;
  public totalAnswers: number;
  public incorrectAnswers: number;
  public correctAnswers: number;
  public categoryQuiz: string;

  constructor(
    public quizService: QuizService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.categoryQuiz = this.quizService.categoryName.getValue();
    this.quizPlayed = this.quizService.totalQuizzesCompleted;
    this.totalAnswers = this.quizService.totalAnswers;
    this.incorrectAnswers = this.quizService.incorrectAnswers;
    this.correctAnswers = this.quizService.correctAnswers;
  }

  public goToQuizList(): void {
    this.router.navigate(['']);
  }

}
