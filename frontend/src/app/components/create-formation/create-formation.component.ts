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
import { Formation } from 'src/app/models/Formation';

import { AuthService } from 'src/app/services/auth.service';
import { FormationService } from 'src/app/services/formation.service';

@Component({
  selector: 'app-create-formation',
  templateUrl: './create-formation.component.html',
  styleUrls: ['./create-formation.component.scss'],
})
export class CreateFormationComponent implements OnInit {
  @ViewChild('formDirective') formDirective: NgForm;
  @Output() create: EventEmitter<any> = new EventEmitter();

  formationForm: FormGroup;
  constructor(
    private router: Router,
    private authService: AuthService,
    private formationService: FormationService
  ) {}

  ngOnInit(): void {
    this.formationForm = this.createFormGroup();
  }

  createFormGroup(): FormGroup {
    return new FormGroup({
      titre: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
      lieu: new FormControl('', [Validators.required, Validators.minLength(5)]),
      dateDeb: new FormControl('', [Validators.required]),
      dateFin: new FormControl('', [Validators.required]),
    });
  }

  onSubmit(
    formData: Pick<Formation, 'titre' & 'lieu' & 'dateDeb' & 'dateFin'>
  ) {
    this.formationService
      .createFormation(formData)
      .pipe(first())
      .subscribe(() => {
        this.create.emit(null);
      });
    this.formationForm.reset();
    this.formDirective.resetForm();
  }
}
