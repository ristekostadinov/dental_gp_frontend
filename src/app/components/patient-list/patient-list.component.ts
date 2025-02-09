import { Component, OnInit } from '@angular/core';
import { PatientDTO } from '../domains/Patient';
import { PatientService } from '../../services/patient.service';
import { Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-patient-list',
  imports: [RouterLink, MatCardModule, MatTableModule, MatButtonModule, MatListModule, MatInputModule],
  templateUrl: './patient-list.component.html',
  styleUrl: './patient-list.component.css'
})
export class PatientListComponent implements OnInit{
  dataSource: PatientDTO[] = [];
  displayedColumns: string [] = ['id', 'firstName', 'lastName','insurance', 'edit/delete'];

  constructor(private _patientService: PatientService, private _router: Router){

  }
  ngOnInit(): void {
    this._patientService.findAll().subscribe(response => this.dataSource = response);
  }

  delete(id: string){
    this._patientService.delete(id).subscribe(()=>{
      this.ngOnInit();
    })
  }
}
