export default class DateIO {

    public static toStdDate(date: Date | number) {
        const time = date instanceof Date ? date : new Date(date * 1000);
        return time.getDate().toString().padStart(2, "0") + "." +
            (time.getMonth() + 1).toString().padStart(2, "0") + "." +
            (time.getFullYear()).toString();
    }

    public static toStdTime(date: Date | number) {
        const time = date instanceof Date ? date : new Date(date * 1000);
        return time.getHours().toString().padStart(2, "0") + ":" +
            (time.getMinutes() + 1).toString().padStart(2, "0");
    }

    public static toStdDateTime(date: Date | number) {
        return DateIO.toStdDate(date) + " " + DateIO.toStdTime(date);
    }
}