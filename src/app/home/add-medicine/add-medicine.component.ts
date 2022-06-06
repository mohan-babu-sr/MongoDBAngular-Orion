import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MedicineDetails } from '../model/medicineDetails';
import { MedicineDetailsService } from '../service/medicine-details.service';

@Component({
  selector: 'app-add-medicine',
  templateUrl: './add-medicine.component.html',
  styleUrls: ['./add-medicine.component.css'],
})
export class AddMedicineComponent implements OnInit {
  medicineDetails: MedicineDetails = new MedicineDetails();
  isIdPresent: any;
  id: number = Math.floor(Math.random() * 1000);

  constructor(
    private medicineDetailsService: MedicineDetailsService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.isIdPresent = this._activatedRoute.snapshot.paramMap.has('id');
    if (this.isIdPresent) {
      const id = +this._activatedRoute.snapshot.paramMap.getAll('id');
      this.medicineDetailsService.getMedicine(id).subscribe((data) => {
        console.log(data);
        this.medicineDetails = data;
        console.log(this.medicineDetails);
      });
    }
  }

  saveMedicineDetails() {
    if(!this.isIdPresent){
      this.medicineDetailsService
      .saveMedicineDetails(this.medicineDetails)
      .subscribe((data) => {
        console.log('response', data);
        this._router.navigateByUrl('/dashboard');
      });
    }else{
      this.medicineDetailsService
      .updateMedicine(this.medicineDetails.id, this.medicineDetails)
      .subscribe((data) => {
        console.log('updateResponse', data);
        this._router.navigateByUrl('/dashboard');
      });
    }
  }
}
