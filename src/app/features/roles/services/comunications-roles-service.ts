import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { RoleApiResponse } from '../../../core/models/aplication-response';
import { Observable, Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class ComunicationRolesService {
    private http = inject(HttpClient)
    private apiUrl = environment.apiUrl
    roles = signal<RoleApiResponse[] | null>(null)
    selectedRole = signal<RoleApiResponse | null>(null)
    public rolesListRefresh$ = new Subject<void>()

    notifyRolesListRefresh() {
        this.rolesListRefresh$.next();
    }

    fetchRoles(): Observable<RoleApiResponse[]> {
        return this.http.get<RoleApiResponse[]>(`${this.apiUrl}api/roles`)
    }

    fetchFilteredRole(state: number): Observable<RoleApiResponse[]> {
        return this.http.get<RoleApiResponse[]>(`${this.apiUrl}api/roles/filter/${state}`)
    }

    sendRol(): RoleApiResponse | null {
        return this.selectedRole()
    }
}