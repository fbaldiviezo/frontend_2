import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment.development';
import { RolmeRequest } from '../../../../core/models/aplication-requests';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class RolmeService {
    private http = inject(HttpClient)
    private apiUrl = environment.apiUrl

    insertRolme(rolme: RolmeRequest): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}api/asign/rolme`, rolme)
    }

    deleteRolme(rolme: RolmeRequest): Observable<any> {
        return this.http.delete<any>(`${this.apiUrl}api/asign/rolme/${rolme.codr}/${rolme.codm}`)
    }
}