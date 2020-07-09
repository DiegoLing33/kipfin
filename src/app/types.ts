export interface OptionValue {
    value: any;
    text: string;
    title?: string;
}


export interface Dict<T> {
    [key: string]: T;
}

export interface IntDict<T> {
    [key: number]: T;
}

export function filterEquals<T>(field: keyof T, value: any) {
    return (object: T) => object[field] === value;
}
export function filterNotEquals<T>(field: keyof T, value: any) {
    return (object: T) => object[field] !== value;
}

export function sqlDate(date: string) {
    return new Date(Date.parse(date.replace(/-/g, '/')));
}
