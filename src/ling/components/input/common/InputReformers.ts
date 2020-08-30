export const InputReformers = {
    /**
     * Phone reformer
     * @param value
     */
    phone: (value: string) => {
        let mv = value.replace(/[ ()+-]/g, '').replace(/\s/g, '');
        if ((mv.startsWith('89') || mv.startsWith('79')) && mv.length === 11) {
            mv = mv.substr(1);
            return `+7 (${mv.substr(0, 3)}) ${mv.substr(3, 3)}` +
                `-${mv.substr(6, 2)}-${mv.substr(8, 2)}`;
        }
        return value;
    },
    /**
     * Removes all spaces
     * @param value
     */
    removeAllSpaces: (value: string) => {
        return value.replace(/\s/g, '');
    },
    /**
     * Removes white spaces
     * @param value
     */
    removeWhiteSpaces: (value: string) => {
        return value.replace(/\s{2,}/g, ' ');
    },
    /**
     * Trim reformer
     * @param value
     */
    trim: (value: string) => {
        return value.replace(/^\s+|\s+$/g, '');
    },
    capitalize: (value: string) => value.substr(0, 1).toUpperCase() + value.substr(1),
    uppercase: (value: string) => value.toUpperCase(),
    lowercase: (value: string) => value.toLowerCase(),
    stack: (...f: any[]) => {
        return (value: string) => {
            let mv = value;
            f.forEach(a => mv = a(mv));
            return mv;
        };
    }
};