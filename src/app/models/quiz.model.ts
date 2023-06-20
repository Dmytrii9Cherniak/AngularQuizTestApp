import { QuizResultsModel } from './quiz.results.model';

export interface QuizModel {
  response_code: number,
  results: QuizResultsModel[]
}
