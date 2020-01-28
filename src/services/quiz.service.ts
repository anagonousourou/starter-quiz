import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Quiz } from '../models/quiz.model';
import { QUIZ_LIST } from '../mocks/quiz-list.mock';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  /**
   * Services Documentation:
   * https://angular.io/docs/ts/latest/tutorial/toh-pt4.html
   */

  /**
   * The list of quiz.
   * The list is retrieved from the mock.
   */
  private quizzes: Quiz[] = QUIZ_LIST;
  private url = 'https://​api.myjson.com/bins/silu2';

  /**
   * Observable which contains the list of the quiz.
   * Naming convention: Add '$' at the end of the variable name to highlight it as an Observable.
   */
  public quizzes$: BehaviorSubject<Quiz[]> = new BehaviorSubject(this.quizzes);

  constructor(private http: HttpClient) {
  }

  addQuiz(quiz: Quiz) {
    this.quizzes.push(quiz);
    this.quizzes$.next(this.quizzes);
    // You need here to update the list of quiz and then update our observable (Subject) with the new list
    // More info: https://angular.io/tutorial/toh-pt6#the-searchterms-rxjs-subject
  }

  deleteQuiz(deleted: Quiz) {
    this.quizzes = this.quizzes.filter(q => q.name !== deleted.name && q.theme !== deleted.name);
    this.quizzes$.next(this.quizzes);
  }

  getQuizzes() {
    return this.http.request('GET', this.url, { responseType: 'json' }).subscribe(result => {
      const key = 'quizzes';
      this.quizzes = result[key];
      this.quizzes$.next(this.quizzes);
    });
  }
}
