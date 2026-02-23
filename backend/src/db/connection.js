import {config} from '../config/config'

export function conntectDB(){
    const {user, password, host, port, name} = config.db
        return `postgresql://${encodeURIComponent(user)}:${encodeURIComponent(password)}@${host}:${port}/${name}` 
        
}