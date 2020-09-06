import {NameList} from "@/core/Common/Common";

export type ObserverDelegateFunc = (...args: any[]) => void;

/**
 * Observer delegate
 */
export default class ObserverDelegate {

    /**
     * The observers
     */
    private observers: NameList<ObserverDelegateFunc[]> = {};

    /**
     * Adds observers
     * @param name  - the name
     * @param func  - the function
     */
    public on(name: string, func: ObserverDelegateFunc){
        if(this.observers[name] !== undefined) this.observers[name] = [];
        this.observers[name].push(func);
    }

    /**
     * Fires the event
     * @param name  - the name
     * @param args  - the args
     */
    public fire(name: string, ...args: any[]){
        if(this.observers[name]) this.observers[name].forEach(value => value(...args));
    }

}