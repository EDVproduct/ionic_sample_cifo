import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Vacanca } from 'src/app/models/vacanca';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-vacanca-modal',
  templateUrl: './vacanca-modal.component.html',
  styleUrls: ['./vacanca-modal.component.scss'],
})
export class VacancaModalComponent implements OnInit {

  vacancaForm: FormGroup;
  constructor(private modalCtrl: ModalController,
    private dataService: DataService) { }

  ngOnInit() {
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
    this.dataService.insertVacanca(vacanca).then((data) => {
      console.log(data);
      this.closeModal();
      this.resetForm();
    });
  }

  async closeModal() {
    await this.modalCtrl.dismiss();
  }

}
