/**
 * Named list String:T
 */
export type NameList<T> = {
    [key: string]: T;
}

/**
 * Indexed list number:T
 */
export type IndexList<T> = {
    [index: number]: T;
}

/**
 * Type or null
 */
export type Nullable<T> = T | null;

/**
 * Nullable utils
 */
export const Nullable = {
    /**
     * Returns the value if not null
     * @param value
     * @param def
     */
    guard<T>(value: Nullable<T>, def: T): T {
        return value === null ? def : value;
    },
    /**
     * Returns true, if value is null
     * @param value
     */
    is(value: Nullable<unknown>): value is null {
        return value === null;
    }
}

/**
 * Async callback
 */
export interface AsyncCallback<T, K = boolean> {
    (value: T): Promise<K>;
}

/**
 * Async callback utils
 */
export const AsyncCallback = {

    /**
     * Creates the async callback with false
     */
    delayedBool(delay = 1500, result = false): AsyncCallback<any> {
        return (a: any) => new Promise<boolean>(resolve => setTimeout(()=>{
            resolve(result);
        }, delay));
    }
};