import { Persona, Rol } from "./user-data";

export interface AuthResponse {
    persona: Persona
    token: string
    roles: Rol[]
}