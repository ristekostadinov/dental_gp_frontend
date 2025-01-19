import {Role} from './Role'

export interface UserListItem{
    id: number,
    username: string,
    roles: Array<Role>
}