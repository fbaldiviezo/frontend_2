import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Menus } from '../models/menu-response';
import { Observable, Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class ComnunicationMenusService {
    private http = inject(HttpClient)
    private apiUrl = environment.apiUrl
    menus = signal<Menus[] | null>(null)
    selectedMenu = signal<Menus | null>(null)
    public menusListRefresh$ = new Subject<void>()

    notifyMenusListRefresh() {
        this.menusListRefresh$.next()
    }

    fetchMenus(): Observable<Menus[]> {
        return this.http.get<Menus[]>(`${this.apiUrl}api/menus`)
    }

    fetchFilteredMenus(state: number): Observable<Menus[]> {
        return this.http.get<Menus[]>(`${this.apiUrl}api/menus/filter/${state}`)
    }

    sendMenu(): Menus | null {
        return this.selectedMenu()
    }
}