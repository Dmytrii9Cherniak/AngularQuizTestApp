import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { QuizModel } from '../../models/quiz.model';
import { QuizService } from '../../services/quiz.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.scss']
})
export class PlayComponent implements OnInit {

  public quizForm: FormGroup;
  public testsList: QuizModel;
  public isQuizInProgress: Observable<boolean>;
  public currentQuestionIndex: number = 0;
  public categoryValue: string;
  public categoryName: string;
  public isAnswerCorrect: boolean = false;

  constructor(
    private quizService: QuizService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.quizForm = this.formBuilder.group({
      selectedOption: ['', Validators.required]
    });

    this.isQuizInProgress = this.quizService.isQuizInProgress;
    this.categoryName = JSON.parse(JSON.stringify(localStorage.getItem('categoryName')));
    this.categoryValue = JSON.parse(JSON.stringify(localStorage.getItem('category')));
    this.quizService
      .getAllTestsQuestions(this.categoryValue)
      .subscribe((value: QuizModel) :void => {
        this.testsList = value;
      });
  }

  public nextQuestion(): void {
    if (this.currentQuestionIndex !== 9) {
      this.currentQuestionIndex++;
      this.quizForm.reset();
    }
    this.quizService.recordAnswer(this.isAnswerCorrect);
  }

  public getQuizFormValue() {
    return this.quizForm.get('selectedOption');
  }

  public getValueAndCheckCorrectAnswer(): void {
    const formValue = this.getQuizFormValue()?.value.trim();
    const quizData: string = this.testsList.results[this.currentQuestionIndex].correct_answer;
    this.isAnswerCorrect = formValue === quizData;
  }

  public startQuiz(): void {
    this.quizService.isQuizInProgress.next(true);
  }

  public goHomeCancelQuiz(): void {
    this.quizService.isQuizInProgress.next(false);
    this.router.navigate(['']);
  }

  public finishQuiz(): void {
    this.quizService.isQuizInProgress.next(false);
    this.nextQuestion();
    this.quizService.totalQuizzesCompleted++;
    this.router.navigate(['results']);
  }
}
