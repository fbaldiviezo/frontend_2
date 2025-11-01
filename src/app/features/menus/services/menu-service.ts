import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { MenuApiResponse } from '../../../core/models/aplication-response';
import { MenuRequest } from '../../../core/models/aplication-requests';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class MenuApiService {
    private http = inject(HttpClient)
    private apiUrl = environment.apiUrl

    insertMenu(menu: MenuRequest): Observable<MenuApiResponse> {
        return this.http.post<MenuApiResponse>(`${this.apiUrl}api/menus`, menu)
    }

    updateMenu(id: number, menu: MenuRequest): Observable<MenuApiResponse> {
        return this.http.put<MenuApiResponse>(`${this.apiUrl}api/menus/${id}`, menu)
    }

    enableMenu(id: number, state: number) {
        return this.http.put(`${this.apiUrl}api/menus/${id}/${state}`, null)
    }

    disableMenu(id: number, state: number) {
        return this.http.put(`${this.apiUrl}api/menus/${id}/${state}`, null)
    }
}