import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { MenuApiResponse } from '../../../core/models/aplication-response';
import { Observable, Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class ComnunicationMenusService {
    private http = inject(HttpClient)
    private apiUrl = environment.apiUrl
    menus = signal<MenuApiResponse[] | null>(null)
    selectedMenu = signal<MenuApiResponse | null>(null)
    public menusListRefresh$ = new Subject<void>()

    notifyMenusListRefresh() {
        this.menusListRefresh$.next()
    }

    fetchMenus(): Observable<MenuApiResponse[]> {
        return this.http.get<MenuApiResponse[]>(`${this.apiUrl}api/menus`)
    }

    fetchFilteredMenus(state: number): Observable<MenuApiResponse[]> {
        return this.http.get<MenuApiResponse[]>(`${this.apiUrl}api/menus/filter/${state}`)
    }

    sendMenu(): MenuApiResponse | null {
        return this.selectedMenu()
    }
}