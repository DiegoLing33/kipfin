export class ArrayIO {



}

export class ObjectIO{
    public static toValueTextArray(o: any): Array<{value: unknown; text: string}>{
        return Object.keys(o).map(key => {return {value: key, text: o[key]}});
    }
}