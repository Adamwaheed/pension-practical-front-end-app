import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {HttpBaseServiceService} from './http-base-service.service';
import {Observable} from 'rxjs';
import { exportToCSV} from './helpers/export';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService  extends HttpBaseServiceService {

  constructor(
    public http: HttpClient
  ) {
    super();
  }

  getEmployees(): Observable<any> {
    return this.http.get<any>(this.BASEURL+'employments/M000001/123');
  }

  search(nic: string): Observable<any> {
    return this.http.get<any>(this.BASEURL+'employments/'+nic+'/123');
  }


  exportToCSV(data: { employer_name: any; dob: string | number | Date; joined_date: string | number | Date; }[]) {
    let csvContent = '';
    const header = [
      'employer_name',
      'end_date',
      'id',
      'member_name',
      'nic',
      'start_date',
    ].join(',');
    csvContent += header + '\r\n';

    data.map((item: { employer_name: any; dob: string | number | Date; joined_date: string | number | Date; }, index: number) => [
      `${index + 1}`,
      `${item.employer_name}`,
      `${this.formatDate(item.dob) || '-'}`,
      `${this.formatDate(item.joined_date) || '-'}`,
    ]).forEach( (rowArray: any[]) => {
      const row = rowArray.join(',');
      csvContent += row + '\r\n';
    });

    exportToCSV(csvContent, 'Staffs List');
  }


  formatDate(date: string | number | Date) {
    return new Date(date).toLocaleDateString();
  }

}
