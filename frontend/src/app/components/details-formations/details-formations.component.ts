import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { FormationService } from 'src/app/services/formation.service';
import { AuthService } from 'src/app/services/auth.service';

import { Formation } from 'src/app/models/Formation';
import { User } from 'src/app/models/User';
@Component({
  selector: 'app-details-formations',
  templateUrl: './details-formations.component.html',
  styleUrls: ['./details-formations.component.scss'],
})
export class DetailsFormationsComponent implements OnInit {
  datePipeString: string;
  formations$: Observable<Formation[]>;
  userId: Pick<User, 'id'>;
  constructor(
    private formationService: FormationService,
    private authService: AuthService
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
