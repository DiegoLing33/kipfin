import JSZip from "jszip";
import {NameList} from "@/ling/types/Common";
import Observable from "@/ling/interfaces/Observable";
import ObserverDelegate from "@/ling/delegates/ObserverDelegate";

/**
 * Creates the promise from URL
 * @param url
 * @private
 */
export function __zipperUrlToPromise(url: string): Promise<string> {
    return new Promise((resolve) => {
        const oReq = new XMLHttpRequest();
        oReq.open("GET", url, true);
        oReq.responseType = "arraybuffer";

        oReq.onload = () => {
            const uInt8Array = new Uint8Array(oReq.response);
            let i = uInt8Array.length;
            const binaryString = new Array(i);
            while (i--) binaryString[i] = String.fromCharCode(uInt8Array[i]);
            const data = binaryString.join('');
            resolve(window.btoa(data));
        };

        oReq.send();
    });
}

/**
 * The Zipper object
 */
export class ZipperObject implements Observable{

    /**
     * Sources
     */
    private readonly baseHashes: NameList<string> = {};

    /**
     * The name
     */
    private readonly name: string;

    /**
     * The observer delegate
     */
    private readonly observer: ObserverDelegate = new ObserverDelegate();

    /**
     * Constructor
     * @param name
     */
    constructor(name: string) {
        this.name = name;
        this.baseHashes = {};
    }

    /**
     * Returns the name
     */
    public getName(){
        return this.name;
    }

    /**
     * Returns the file names
     */
    public getFileNames(){
        return Object.keys(this.baseHashes);
    }

    /**
     * Adds the file to zip
     * @param name
     * @param base64
     */
    public add(name: string, base64: string): ZipperObject{
        this.baseHashes[name] = base64;
        return this;
    }

    /**
     * Returns the observer
     */
    public getObserver(): ObserverDelegate {
        return this.observer;
    }

    /**
     * Packs the zip and create output blob
     */
    public async pack(): Promise<Blob>{
        const zip = new JSZip();
        for(const fileName of this.getFileNames()){
            const blob = await __zipperUrlToPromise(this.baseHashes[fileName]);
            this.observer.fire('packed', fileName);
            zip.file(fileName, blob, {base64: true});
        }
        return await zip.generateAsync({type: "blob"});
    }

}

/**
 * Zip tool
 */
export default class Zipper {

    /**
     * Creates ZipperObject
     * @param name
     */
    public static createZip(name: string){
        return new ZipperObject(name);
    }

}
