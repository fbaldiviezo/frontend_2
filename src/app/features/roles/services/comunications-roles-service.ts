import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Roles } from '../models/role-response';
import { Observable, Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class ComunicationRolesService {
    private http = inject(HttpClient)
    private apiUrl = environment.apiUrl
    roles = signal<Roles[] | null>(null)
    selectedRole = signal<Roles | null>(null)
    public rolesListRefresh$ = new Subject<void>()

    notifyRolesListRefresh() {
        this.rolesListRefresh$.next();
    }

    fetchRoles(): Observable<Roles[]> {
        return this.http.get<Roles[]>(`${this.apiUrl}api/roles`)
    }

    fetchFilteredRole(state: number): Observable<Roles[]> {
        return this.http.get<Roles[]>(`${this.apiUrl}api/roles/filter/${state}`)
    }

    sendRol(): Roles | null {
        return this.selectedRole()
    }
}