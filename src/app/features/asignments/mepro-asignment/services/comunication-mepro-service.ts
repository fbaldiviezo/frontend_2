import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../../../environments/environment.development';
import { MenuApiResponse, ProcesoApiResponse } from '../../../../core/models/aplication-response';
import { Observable, Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class ComunicationMeproService {
    private http = inject(HttpClient)
    private apiUrl = environment.apiUrl
    menus = signal<MenuApiResponse[] | null>(null)
    process = signal<ProcesoApiResponse[] | null>(null)
    selectedMenu = signal<MenuApiResponse | null>(null)
    selectedProcess = signal<ProcesoApiResponse[] | null>(null)
    public processListRefresh$ = new Subject<void>()

    notifyProcessListRefresh() {
        this.processListRefresh$.next()
    }

    fetchMenus(): Observable<MenuApiResponse[]> {
        return this.http.get<MenuApiResponse[]>(`${this.apiUrl}api/menus`)
    }

    fetchProcess(): Observable<ProcesoApiResponse[]> {
        return this.http.get<ProcesoApiResponse[]>(`${this.apiUrl}api/process`)
    }

    fetchFilteredProcess(state: number, codm: number): Observable<ProcesoApiResponse[]> {
        return this.http.get<ProcesoApiResponse[]>(`${this.apiUrl}api/process/filter/${state}/${codm}`)
    }

    fetchProcessByMenu(codm: number): Observable<ProcesoApiResponse[]> {
        return this.http.get<ProcesoApiResponse[]>(`${this.apiUrl}api/process/filter/menu/${codm}`)
    }
}