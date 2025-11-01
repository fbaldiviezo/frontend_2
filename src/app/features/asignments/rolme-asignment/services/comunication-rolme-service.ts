import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../../../environments/environment.development';
import { MenuApiResponse, RoleApiResponse } from '../../../../core/models/aplication-response';
import { Observable, Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class ComunicationRolmeService {
    private http = inject(HttpClient)
    private apiUrl = environment.apiUrl
    menus = signal<MenuApiResponse[] | null>(null)
    roles = signal<RoleApiResponse[] | null>(null)
    selectedMenu = signal<MenuApiResponse | null>(null)
    selectedRole = signal<RoleApiResponse | null>(null)
    public menusListRefresh$ = new Subject<void>()

    notifyMenusListRefresh() {
        this.menusListRefresh$.next()
    }

    fetchMenus(): Observable<MenuApiResponse[]> {
        return this.http.get<MenuApiResponse[]>(`${this.apiUrl}api/menus`)
    }

    fetchRoles(): Observable<RoleApiResponse[]> {
        return this.http.get<RoleApiResponse[]>(`${this.apiUrl}api/roles`)
    }

    fetchFilteredMenus(state: number, codr: number): Observable<MenuApiResponse[]> {
        return this.http.get<MenuApiResponse[]>(`${this.apiUrl}api/menus/filter/${state}/${codr}`)
    }

    fetchMenusByRole(codr: number): Observable<MenuApiResponse[]> {
        return this.http.get<MenuApiResponse[]>(`${this.apiUrl}api/menus/filter/role/${codr}`)
    }
}