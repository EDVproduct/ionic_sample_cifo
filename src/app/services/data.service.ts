import { Injectable } from '@angular/core';
import { collectionData, docData, Firestore } from '@angular/fire/firestore';
import { addDoc, collection, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { Vacanca } from '../models/vacanca';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private firestore: Firestore) { }

  getVacances(): any {
    const vacancaRef = collection(this.firestore, 'categoria');
    return collectionData(vacancaRef) as any;
  }

  getVacancesById(id: string): Observable<Vacanca> {
    const vacancaDocRef = doc(this.firestore, `vacances/${id}`);
    return docData(vacancaDocRef, {idField: 'id'}) as Observable<Vacanca>;
  }

  insertVacanca(vacanca: Vacanca) {
    const vacancaRef = collection(this.firestore, 'vacances');
    return addDoc(vacancaRef, vacanca);
  }

  deleteVacanca(vacanca: Vacanca): Promise<void> {
    const vacancaDocRef = doc(this.firestore, `vacances/${vacanca.id}`);
    return deleteDoc(vacancaDocRef);
  }

  updateNote(vacanca) {
    const vacancaDocRef = doc(this.firestore, `vacances/${vacanca.id}`);
    return updateDoc(vacancaDocRef, vacanca);
  }

}

