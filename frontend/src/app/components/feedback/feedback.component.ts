import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { EvaluationService } from 'src/app/services/evaluation.service';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Evaluation } from 'src/app/models/Evaluation';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss'],
})
export class FeedbackComponent implements OnInit {
  evaluations$: Observable<Evaluation[]>;
  userId: Pick<User, 'id'>;
  constructor(
    private evaluationService: EvaluationService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.evaluations$ = this.fetchAll();
    this.userId = this.authService.userId;
  }

  fetchAll(): Observable<Evaluation[]> {
    return this.evaluationService.fetchAll();
  }

  createFormation() {
    this.evaluations$ = this.fetchAll();
  }
  delete(evaluationId: Pick<Evaluation, 'id'>): void {
    this.evaluationService
      .deleteEvaluation(evaluationId)
      .subscribe(() => (this.evaluations$ = this.fetchAll()));
  }
}
