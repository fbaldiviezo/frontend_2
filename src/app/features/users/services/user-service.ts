import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { PersonalData2, RegisterPersonalRequest } from '../../../core/models/aplication-requests';
import { Observable } from 'rxjs';
import { Persona } from '../../../core/models/user-data';
import { RegisterDataRequest } from '../../../core/models/aplication-requests';
import { ChangePasswordRequest } from '../../../core/models/aplication-requests';
import { AuthResponse } from '../../../core/models/aplication-response';

@Injectable({providedIn: 'root'})
export class UserApiService {
    private http = inject(HttpClient)
    private apiUrl = environment.apiUrl

    registerUser(register: RegisterPersonalRequest): Observable<Persona> {
        return this.http.post<Persona>(`${this.apiUrl}api/personals`, register)
    }

    registerAccessData(data: RegisterDataRequest) {
        return this.http.post(`${this.apiUrl}auth/register`, data)
    }

    modifPassAccessData(request: ChangePasswordRequest): Observable<AuthResponse> {
        return this.http.put<AuthResponse>(`${this.apiUrl}auth/change-password`, request)
    }

    enableUser(id: number, state: number) {
        return this.http.put(`${this.apiUrl}api/personals/${id}/${state}`, null)
    }

    disableUser(id: number, state: number) {
        return this.http.put(`${this.apiUrl}api/personals/${id}/${state}`, null)
    }

    updatePersonal(person: PersonalData2, id: number): Observable<Persona> {
        console.log(person);
        
        return this.http.put<Persona>(`${this.apiUrl}api/personals/${id}`, person)
    }
}