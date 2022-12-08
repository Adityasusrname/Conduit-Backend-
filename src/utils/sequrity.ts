import { User } from "../entities/User";

export function sanitizePassword(user:User){
    delete user.password
    
}