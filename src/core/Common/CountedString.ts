export default class CountedString {

    public static get(value: number, one: string, three: string, more: string){
        const j = value % 10;
        const k = value % 100;
        if (j == 1 && k != 11) return one;
        if (j == 2 && k != 12) return three;
        if (j == 3 && k != 13) return three;
        if (j == 4 && k != 14) return three;
        return more;

    }

}