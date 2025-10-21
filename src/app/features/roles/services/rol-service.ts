import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Roles } from '../models/role-response';
import { Observable } from 'rxjs';
import { RolRequest } from '../models/role-request';

@Injectable({providedIn: 'root'})
export class RolApiService {
    private http = inject(HttpClient)
    private apiUrl = environment.apiUrl

    insertRol(rol: RolRequest): Observable<Roles> {
        return this.http.post<Roles>(`${this.apiUrl}api/roles`, rol)
    }

    updateRol(rol: RolRequest, id: number) :Observable<Roles> {
        return this.http.put<Roles>(`${this.apiUrl}api/roles/${id}`, rol)
    }

    enableRol(id: number, state: number) {
        return this.http.put(`${this.apiUrl}api/roles/${id}/${state}`, null)
    }

    disableRol(id: number, state: number) {
        return this.http.put(`${this.apiUrl}api/roles/${id}/${state}`, null)
    }
}