import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../../../environments/environment.development';
import { RoleApiResponse, UserApiResponse } from '../../../../core/models/aplication-response';
import { Observable, Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class ComunicationUsurolService {
    private http = inject(HttpClient)
    private apiUrl = environment.apiUrl
    users = signal<UserApiResponse[] | null>(null)
    roles = signal<RoleApiResponse[] | null>(null)
    selectedUser = signal<UserApiResponse | null>(null)
    selectedRole = signal<RoleApiResponse | null>(null)
    public rolesListRefresh$ = new Subject<void>()

    notifyRolesListRefresh() {
        this.rolesListRefresh$.next()
    }

    fetchUsers(): Observable<UserApiResponse[]> {
        return this.http.get<UserApiResponse[]>(`${this.apiUrl}api/personals/info`)
    }

    fetchRoles(): Observable<RoleApiResponse[]> {
        return this.http.get<RoleApiResponse[]>(`${this.apiUrl}api/roles`)
    }

    fetchFilteredRoles(state: number, login: string): Observable<RoleApiResponse[]> {
        return this.http.get<RoleApiResponse[]>(`${this.apiUrl}api/roles/filter/${state}/${login}`)
    }

    fetchRolesByUser(login: string): Observable<RoleApiResponse[]> {
        return this.http.get<RoleApiResponse[]>(`${this.apiUrl}api/roles/filter/user/${login}`)
    }
}