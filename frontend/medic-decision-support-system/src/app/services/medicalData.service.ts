import { GlobalConstants } from '../common/global-constants';
import { Observable } from 'rxjs';
import { MedicalData } from '../interfaces/MedicalData';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MedicalDataService {
  private apiURL = GlobalConstants.apiURL + '/api/MedicalData';
  private baseUrl = GlobalConstants.apiURL;
  private httpOptions = GlobalConstants.httpOptions;

constructor(private http: HttpClient) { }

addMedicalData(MedicalData: MedicalData): Observable<any>{
  return this.http.post(this.apiURL, MedicalData, {observe: 'response'});
}

getAllMedicalDatas(): Observable<MedicalData[]>{
  return this.http.get<MedicalData[]>(this.apiURL);
}

getMedicalDataById(id: string): Observable<MedicalData>{
  return this.http.get<MedicalData>(this.apiURL + '/' + id);
}

predictMedicalDataById(id: string): Observable<MedicalData>{
  return this.http.post<MedicalData>(this.apiURL + '/' + id + '/prediction', {});
}

learn(): Observable<number>{
  return this.http.post<number>(this.apiURL + '/learn', {});
}

result(medicalData: MedicalData): Observable<void>{
  return this.http.post<void>(this.apiURL + '/' + medicalData.medicalDataId + '/result', {result: !medicalData.result});
}

}
