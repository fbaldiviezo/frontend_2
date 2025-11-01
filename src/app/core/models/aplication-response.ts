import { Persona, Rol, Usuario } from "./user-data";

export interface AuthResponse {
    persona: Persona
    token: string
    roles: Rol[]
}

export interface MenuApiResponse {
    codm: number
    nombre: string
    estado: number
    relacion: boolean
}

export interface RoleApiResponse {
    codr: number
    nombre: string
    estado: number
    relacion: boolean
}

export interface ProcesoApiResponse {
    codp: number
    nombre: string
    enlace: string
    ayuda: string
    estado: number
    relacion: boolean
}

export interface PersonaApiResponse {
    codp: number
    nombre: string
    ap: string
    am: string
    estado: number
    fnac: Date
    ecivil: string
    genero: string
    direc: string
    telf: string
    tipo: string
    foto: string
}

export interface UserApiResponse {
    codp: number
    nombre: string
    login: string
    estado: number
}