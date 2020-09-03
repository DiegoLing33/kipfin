import {Dict} from "@/app/types";

export default class KIPD {

    /**
     * The file types dictionary
     */
    public static fileTypes: Dict<string> = {
        "passport": "Паспорт",
        "student-photo": "Фотография",
        "attestat": "Аттестат",
        "ach": "Достижение",
        "mothercapital": "Материнский капитал",
        "notify": "Уведомление",
        "agree": "Заявление",
        "payment": "Договор",
        "disagree": "Заявление об отказе",
        "check": "Чек об оплате",
        "other": "Другое",
    };

    public static specializations: Dict<string> = {
        "0": "-",
        "1": "09.02.07 Информационные системы и программирование",
        "2": "09.02.03 Программирование в компьютерных системах",
        "3": "10.02.05 Обеспечение информационной безопасности автоматизированных систем",
    };

    public static specializationsClear: Dict<string> = {
        "1": "09.02.07 Информационные системы и программирование",
        "2": "09.02.03 Программирование в компьютерных системах",
        "3": "10.02.05 Обеспечение информационной безопасности автоматизированных систем",
    };

    public static specializationsNoCode: Dict<string> = {
        "0": "-",
        "1": "Информационные системы и программирование",
        "2": "Программирование в компьютерных системах",
        "3": "Обеспечение информационной безопасности автоматизированных систем",
    };

    public static short: Dict<string> = {
        "0": "-",
        "1": "ИСиП",
        "2": "ПКС",
        "3": "ОИБАС",
    };

    public static bases: Dict<string> = {
        "0": "-",
        "1": "Бюджет",
        "2": "Договор",
        "3": "Бюджет / Договор",
    };

    public static basesClear: Dict<string> = {
        "1": "Бюджет",
        "2": "Договор",
        "3": "Бюджет / Договор",
    };

    public static fileStatus: { text: Dict<string>; variant: Dict<string> } = {
        text: {
            "0": "Файл удален",
            "1": "В обработке",
            "2": "Файл принят",
            "3": "Файл не принят",
        },
        variant: {
            "0": "danger",
            "1": "info",
            "2": "success",
            "3": "danger",
        },
    };

    public static infoStatus: { text: Dict<string>; variant: Dict<string> } = {
        text: {
            "0": "Не отправлено",
            "1": "В обработке",
            "2": "Принято",
            "3": "Не принято",
            "1000": "Администрация",
        },
        variant: {
            "0": "danger",
            "1": "info",
            "2": "success",
            "3": "danger",
            "1000": "success",
        },
    };

    public static studentStatus: { text: Dict<string>; variant: Dict<string> } = {
        text: {
            "0": "Анкета не отправлена",
            "1": "В обработке",
            "120": "В обработке ~",
            "11": "Выгрузка данных в базы Финансового университета",
            "50": "Данные выгружены в базы Финансового университета",
            "60": "Заявление загружено в личный кабинет",
            "14": "Ожидание оплаты",
            "80": "Участвует в конкурсе",
            "100": "Зачислен",
            "101": "Зачислен (бюджет)",
            "200": "Найдена ошибка",
            "333": "Анкета аннулирована",
            "300": "Отчислен",
        },
        variant: {
            "0": "danger",
            "200": "danger",
            "1": "info",
            "11": "info",
            "120": "info",
            "12": "info",
            "50": "info",
            "60": "warning",
            "14": "info",
            "2": "warning",
            "13": "warning",
            "3": "success",
            "80": "success",
            "100": "success",
            "101": "success",
            "333": "danger",
            "300": "danger",
        },
    };

    public static studentGroups = {
      '1': "1ОИБАС-820",
      '2': "1ОИБАС-920",
      '3': "1ОИБАС-1020",
      '4': "1ОИБАС-1120",
      '5': "1ОИБАС-1220",
      '6': "1ОИБАС-1320",
      '7': "1ПКС-120",
      '8': "1ПКС-220",
      '9': "1ПКС-320",
      '10': "1ПКС-420",
      '11': "1ИСИП-520",
      '12': "1ИСИП-620",
      '13': "1ИСИП-720",
    };

    public static parentName: Dict<string> = {
        "0": "Мать",
        "1": "Отец",
        "2": "Бабушка",
        "3": "Дедушка",
        "4": "Другое",
    }

}
