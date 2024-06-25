import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EquipmentService {
  constructor(private http: HttpClient) {}

  addAssetToSection(sectionId: string, asset: any): Observable<any> {
    const url = `http://localhost:3000/api/sections/${sectionId}/assets`;
    return this.http.post<any>(url, asset);
  }
}
