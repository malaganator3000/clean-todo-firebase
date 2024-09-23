export interface Pagination<T>{
    list:T[],
    hasNextPage:boolean,
    hasPreviousPage:boolean
}