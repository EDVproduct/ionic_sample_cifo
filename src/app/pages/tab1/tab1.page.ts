import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Vacanca } from 'src/app/models/vacanca';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  vacances: Vacanca[];
  vacancaForm: FormGroup;

  constructor(private dataService: DataService) {
    dataService.getVacances().subscribe((res) => {
      console.log(res);
      this.vacances = res;
    });
    this.createForm();
  }

  createForm(): void {
    this.vacancaForm = new FormGroup({
      titol: new FormControl({value: '', disabled: false}, [Validators.required]),
      ciutat: new FormControl({value: '', disabled: false}, [Validators.required]),
      hotel: new FormControl({value: '', disabled: false}, [Validators.required]),
      preu: new FormControl({value: '', disabled: false}, [Validators.required]),
      comentaris: new FormControl({value: '', disabled: false}, []),
    });
  }

  resetForm(): void  {
    this.vacancaForm.markAsPristine();
    this.vacancaForm.markAsUntouched();
    this.vacancaForm.get('titol')?.setValue('');
    this.vacancaForm.get('ciutat')?.setValue('');
    this.vacancaForm.get('hotel')?.setValue('');
    this.vacancaForm.get('preu')?.setValue('');
    this.vacancaForm.get('comentaris')?.setValue('');
  }

  addVacanca() {
    const vacanca: Vacanca = {} as Vacanca;
    vacanca.titol = this.vacancaForm.get('titol')?.value;
    vacanca.ciutat = this.vacancaForm.get('ciutat')?.value;
    vacanca.hotel = this.vacancaForm.get('hotel')?.value;
    vacanca.preu = this.vacancaForm.get('preu')?.value;
    vacanca.comentaris = this.vacancaForm.get('comentaris')?.value;
    this.dataService.insertVacanca(vacanca);
    this.resetForm();
  }

  deleteVacanca(vacanca: Vacanca) {
    this.dataService.deleteVacanca(vacanca);
  }

}
