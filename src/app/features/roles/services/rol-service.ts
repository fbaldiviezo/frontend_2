import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { RoleApiResponse } from '../../../core/models/aplication-response';
import { Observable } from 'rxjs';
import { RolRequest } from '../../../core/models/aplication-requests';

@Injectable({providedIn: 'root'})
export class RolApiService {
    private http = inject(HttpClient)
    private apiUrl = environment.apiUrl

    insertRol(rol: RolRequest): Observable<RoleApiResponse> {
        return this.http.post<RoleApiResponse>(`${this.apiUrl}api/roles`, rol)
    }

    updateRol(rol: RolRequest, id: number) :Observable<RoleApiResponse> {
        return this.http.put<RoleApiResponse>(`${this.apiUrl}api/roles/${id}`, rol)
    }

    enableRol(id: number, state: number) {
        return this.http.put(`${this.apiUrl}api/roles/${id}/${state}`, null)
    }

    disableRol(id: number, state: number) {
        return this.http.put(`${this.apiUrl}api/roles/${id}/${state}`, null)
    }
}