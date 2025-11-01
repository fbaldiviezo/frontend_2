import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment.development';
import { UsurolRequest } from '../../../../core/models/aplication-requests';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class UsurolService {
    private http = inject(HttpClient)
    private apiUrl = environment.apiUrl

    insertUsurol(usurol: UsurolRequest): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}api/asign/usurol`, usurol)
    }

    deleteUsurol(usurol: UsurolRequest): Observable<any> {
        return this.http.delete<any>(`${this.apiUrl}api/asign/usurol/${usurol.login}/${usurol.codr}`)
    }
}