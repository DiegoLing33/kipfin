import {Dict} from "@/app/types";
import API from "@/api/API";

export default class User {
    static async update(token?: string): Promise<any> {
        if (token) {
            API.TOKEN = token;
            const me = await API.users.me();
            return Promise.resolve([me, token]);
        }
        return Promise.reject("No token denied")
    }

    static specializations: Dict<string> = {
      "0": "-",
      "1": "09.02.07 Информационные системы и программирование",
      "2": "09.02.03 Программирование в компьютерных системах",
      "3": "10.02.05 Обеспечение информационной безопасности автоматизированных систем",
    };
    static base: Dict<string> = {
      "0": "-",
      "1": "Бюджет",
      "2": "Договор",
      "3": "Бюджет/Договор",
    };
}
