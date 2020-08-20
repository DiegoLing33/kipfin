/**
 * Named list String:T
 */
export type NameList<T = any> = {
    [key: string]: T;
}

/**
 * Creates the empty name list
 */
export function nameList<T>(v: NameList<T> = {}): NameList<T> {
    return {...v};
}

/**
 * Indexed list number:T
 */
export type IndexList<T> = {
    [index: number]: T;
}


/**
 * Creates the empty index list
 */
export function indexList<T>(): IndexList<T> {
    return {};
}

/**
 * Type or null
 */
export type Nullable<T> = T | null;

/**
 * Optional type
 */
export type Optional<T> = T | undefined;

/**
 * Creates Nullable object
 */
export function nullable<T>(): Nullable<T> {
    return null;
}

export function optional<T>(source: Optional<T> = undefined): Optional<T> {
    return source;
}

export const Optional = {
    /**
     * Returns true, if value not optional
     * @param value
     */
    real<T>(value: Optional<T>): value is T {
        return value !== undefined;
    },
    /**
     * Returns value if not optional or safe value
     *
     * @param value
     * @param opt
     */
    safe<T>(value: Optional<T>, opt: T): T {
        return Optional.real(value) ? value : opt;
    }
}

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
 * Numeric string or number
 */
export type Numeric = string | number;

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
        return (a: any) => new Promise<boolean>(resolve => setTimeout(() => {
            resolve(result);
        }, delay));
    }
};