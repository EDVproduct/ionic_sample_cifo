import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Vacanca } from 'src/app/models/vacanca';
import { DataService } from 'src/app/services/data.service';
import { IonRouterOutlet, ModalController } from '@ionic/angular';
import { VacancaModalComponent } from './vacanca-modal/vacanca-modal.component';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  vacances: Vacanca[];

  test: string;

  constructor(private dataService: DataService,
    private modalCtrl: ModalController,
    private routerOutlet: IonRouterOutlet) {
    dataService.getVacances().subscribe((res) => {
      console.log(res);
      this.vacances = res;
    });
    this.test = 'v2.3.2';
  }

  deleteVacanca(vacanca: Vacanca) {
    this.dataService.deleteVacanca(vacanca);
  }

  async presentModal() {
    const modal = await this.modalCtrl.create({
      component: VacancaModalComponent
    });
    await modal.present();
  }

}
