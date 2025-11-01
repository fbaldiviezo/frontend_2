import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment.development';
import { Observable } from 'rxjs';
import { MeproRequest } from '../../../../core/models/aplication-requests';

@Injectable({providedIn: 'root'})
export class MeproService {
    private http = inject(HttpClient)
    private apiUrl = environment.apiUrl

    insertMepro(mepro: MeproRequest): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}api/asign/mepro`, mepro)
    }

    deleteMepro(mepro: MeproRequest): Observable<any> {
        return this.http.delete<any>(`${this.apiUrl}api/asign/mepro/${mepro.codm}/${mepro.codp}`)
    }
}