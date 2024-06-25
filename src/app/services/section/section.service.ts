import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SectionService {
  private apiUrl = 'http://localhost:3000/api/sections';

  constructor(private http: HttpClient) {}

  getSections(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getSection(id: string): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<any>(url);
  }

  createSection(section: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, section);
  }

  updateSection(id: string, section: any): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<any>(url, section);
  }

  deleteSection(id: string): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<any>(url);
  }

  addAssetToSection(sectionId: string, asset: any): Observable<any> {
    const url = `${this.apiUrl}/${sectionId}/assets`;
    return this.http.post<any>(url, asset);
  }
}
