export interface MenuRequest {
    nombre: string
    estado: number
}

export interface RolRequest {
    nombre: string
    estado: number
}

export interface RegisterDataRequest {
    login: string
    estado: number
    password: string
    codp: number
}

export interface ChangePasswordRequest {
    login: string
    newPassword: string
}

export interface RegisterPersonalRequest {
    persona: PersonalData
    cedula: string
}

export interface PersonalData {
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

export interface PersonalData2 {
    oldCedula: string
    newCedula: string
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

export interface MeproRequest {
    codm: number
    codp: number
}

export interface RolmeRequest {
    codr: number
    codm: number
}

export interface UsurolRequest {
    login: string
    codr: number
}