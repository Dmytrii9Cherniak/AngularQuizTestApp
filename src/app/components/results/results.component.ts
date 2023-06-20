import {Component, OnInit} from '@angular/core';
import {QuizService} from "../../services/quiz.service";

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {

  constructor(private quizService: QuizService) {
  }

  ngOnInit() {
  }

}
