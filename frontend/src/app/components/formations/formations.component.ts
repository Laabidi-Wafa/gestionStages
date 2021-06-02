import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { FormationService } from 'src/app/services/formation.service';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Formation } from 'src/app/models/Formation';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-formations',
  templateUrl: './formations.component.html',
  styleUrls: ['./formations.component.scss'],
})
export class FormationsComponent implements OnInit {
  datePipeString: string;
  formations$: Observable<Formation[]>;
  userId: Pick<User, 'id'>;
  constructor(
    private formationService: FormationService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.formations$ = this.fetchAll();
    this.userId = this.authService.userId;
  }

  fetchAll(): Observable<Formation[]> {
    return this.formationService.fetchAll();
  }

  createFormation() {
    this.formations$ = this.fetchAll();
  }
  delete(formationId: Pick<Formation, 'id'>): void {
    this.formationService
      .deleteFormation(formationId)
      .subscribe(() => (this.formations$ = this.fetchAll()));
  }
}
