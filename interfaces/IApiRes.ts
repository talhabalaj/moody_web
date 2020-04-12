export interface IApiRes<T> {
    status: number,
    message: string,
    data?: T
} 