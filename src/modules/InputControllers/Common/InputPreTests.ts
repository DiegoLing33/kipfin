export const InputPreTests = {


    shouldNotRegExp: (reg: RegExp, err: string) => {
        return (v: string) => reg.exec(v) !== null ? err : true;
    },
    shouldNotNumbers(v: string) {
        return InputPreTests.shouldNotRegExp(/([0-9]+)/,
            'В данном поле не могут быть использованы цифры!')(v);
    },
    shouldNotAlphabetic(v: string) {
        return InputPreTests.shouldNotRegExp(/([A-Za-zА-Яа-я]+)/,
            'В данном поле не могут быть использованы буквы!')(v);
    },
    shouldBeMail(v: string) {
        if(v.includes("@") && v.length > 4 && v.includes('.')){
            return true;
        }
        return "Введите корректный email!";
    },

};