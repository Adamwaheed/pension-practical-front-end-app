import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../auth.service';
import {DomSanitizer} from '@angular/platform-browser';
import {FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {EmployeeService} from '../../employee.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {
  employees: any;

  search: string = '';


  constructor(
    public employeeService: EmployeeService,
    public domSanitizer: DomSanitizer,
    private fb: FormBuilder,
    private router: Router
  ) {
  }

  ngOnInit(): void {

    this.load();

  }

  onChange(ev: any) {
    if (ev === "") {
      this.load()
    }
  }

  load() {
    this.employeeService.getEmployees().subscribe(res => {
      this.employees = res;
    });
  }

  callSearch() {
    this.employeeService.search(this.search).subscribe(res => {
      this.employees = res;
    }, error => {
      this.employees = [];
    });
  }

  downloadFile(employees: any) {
    this.employeeService.exportToCSV(employees);

  }

}
