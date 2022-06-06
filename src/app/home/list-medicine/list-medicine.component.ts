import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MedicineDetails } from '../model/medicineDetails';
import { MedicineDetailsService } from '../service/medicine-details.service';

@Component({
  selector: 'app-list-medicine',
  templateUrl: './list-medicine.component.html',
  styleUrls: ['./list-medicine.component.css'],
})
export class ListMedicineComponent implements OnInit {
  medicineDetails: MedicineDetails[] = [];

  filters = {
    keyword: '',
  };

  constructor(
    private medicineDetailsService: MedicineDetailsService,
    private _router: Router
  ) {}
  
  
  ngOnInit(): void {
    this.medicineDetailsService
      .getMedicineDetails()
      .subscribe((data) => (this.medicineDetails = data));
  }

  editMedicine(id: any) {
    this._router.navigateByUrl(`/addMedicine/${id}`);
  }

  deleteMedicine(id: any) {
    this.medicineDetailsService.deleteMedicine(id).subscribe((data) => {
      console.log('delete response', data);
      this.medicineDetailsService
        .getMedicineDetails()
        .subscribe((data) => (this.medicineDetails = data));
      this._router.navigateByUrl('/dashboard');
    });
  }

  nameFilter() {
    this.medicineDetailsService
      .getMedicineDetails()
      .subscribe((data) => (this.medicineDetails = this.filterEmployeeName(data)));
  }

  filterEmployeeName(medicineDetails: MedicineDetails[]) {
    return medicineDetails.filter((e) => {
      return e.name
        ?.toLowerCase()
        .includes(this.filters.keyword.toLowerCase());
    });
  }

}
