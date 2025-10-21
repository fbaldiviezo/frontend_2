import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Menus } from '../models/menu-response';
import { MenuRequest } from '../models/menu-request';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class MenuApiService {
    private http = inject(HttpClient)
    private apiUrl = environment.apiUrl

    insertMenu(menu: MenuRequest): Observable<Menus> {
        return this.http.post<Menus>(`${this.apiUrl}api/menus`, menu)
    }

    updateMenu(id: number, menu: MenuRequest): Observable<Menus> {
        return this.http.put<Menus>(`${this.apiUrl}api/menus/${id}`, menu)
    }

    enableMenu(id: number, state: number) {
        return this.http.put(`${this.apiUrl}api/menus/${id}/${state}`, null)
    }

    disableMenu(id: number, state: number) {
        return this.http.put(`${this.apiUrl}api/menus/${id}/${state}`, null)
    }
}