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
  public testsList: Observable<QuizModel>;
  public isQuizInProgress: Observable<boolean>;
  public currentQuestionIndex: number = 0;
  public categoryValue: string;

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
    this.categoryValue = JSON.parse(JSON.stringify(localStorage.getItem('category')));
    this.testsList = this.quizService.getAllTestsQuestions(this.categoryValue);
    console.log(this.categoryValue)
  }

  public nextQuestion(): void {
    if (this.currentQuestionIndex != 9) {
      this.currentQuestionIndex++;
    }
  }

  public getQuizFormValue() {
    return this.quizForm.get('selectedOption');
  }

  public getValue() {
    const ty = this.getQuizFormValue()?.value;
    console.log(ty);
  }

  public startQuiz(): void {
    this.quizService.isQuizInProgress.next(true);
  }

  public goHomeCancelQuiz(): void {
    this.quizService.isQuizInProgress.next(false);
    this.router.navigate(['home']);
  }

  public finishQuiz(): void {
    this.getQuizFormValue()?.reset();
    this.quizService.isQuizInProgress.next(false);
    this.router.navigate(['results']);
  }

}
