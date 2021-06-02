import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators, NgForm } from '@angular/forms';

import { Router } from '@angular/router';
import { catchError, first } from 'rxjs/operators';
import { Evaluation } from 'src/app/models/Evaluation';

import { AuthService } from 'src/app/services/auth.service';
import { EvaluationService } from 'src/app/services/evaluation.service';
@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss'],
})
export class SurveyComponent implements OnInit {
  @ViewChild('formDirective') formDirective: NgForm;
  @Output() create: EventEmitter<any> = new EventEmitter();

  evaluationForm: FormGroup;

  constructor(
    private router: Router,
    private authService: AuthService,
    private evaluationService: EvaluationService
  ) {}

  createFormGroup(): FormGroup {
    return new FormGroup({
      objectif: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      note: new FormControl('', [Validators.required, Validators.maxLength(2)]),
      enligne: new FormControl('', [Validators.required]),
      fonctionnalite: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.evaluationForm = this.createFormGroup();
  }

  onSubmit(
    formData: Pick<
      Evaluation,
      'objectif' & 'note' & 'enligne' & 'fonctionnalite'
    >
  ) {
    this.evaluationService
      .createEvaluation(formData)
      .pipe(first())
      .subscribe(() => {
        this.create.emit(null);
      });
    this.evaluationForm.reset();
  }
}
