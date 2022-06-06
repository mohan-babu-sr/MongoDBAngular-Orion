import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MedicineDetails } from '../model/medicineDetails';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MedicineDetailsService {
  [x: string]: any;

  private getUrl: string = "http://localhost:8080"

  constructor(private _httpClient: HttpClient) { }

  getMedicineDetails():Observable<MedicineDetails[]>{
    return this._httpClient.get<MedicineDetails[]>(this.getUrl+"/getMedicine").pipe(
      map(response => response)
    )
  }

  getMedicine(id: number):Observable<MedicineDetails>{
    return this._httpClient.get<MedicineDetails>(`${this.getUrl}/getMedicine/${id}`).pipe(
      map(response => response)
    )
  }

  updateMedicine(id: any,medicine: MedicineDetails):Observable<MedicineDetails>{
    return this._httpClient.put<MedicineDetails>(`${this.getUrl}/updateMedicine/${id}`, medicine);
  }

  saveMedicineDetails(medicine: MedicineDetails):Observable<MedicineDetails>{
    return this._httpClient.post<MedicineDetails>(this.getUrl+"/saveMedicine",medicine);
  }

  deleteMedicine(id: number):Observable<any>{
    return this._httpClient.delete(`${this.getUrl}/deleteMedicine/${id}`,{responseType: 'text'});
  }
  
}
