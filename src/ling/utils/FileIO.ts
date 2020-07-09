/**
 * File IO utilities
 */
export default class FileIO {

    /**
     * Requests downloading
     * @param name
     * @param url
     */
    public static requestDownloadingFile(name: string, url: string){
        const a = document.createElement("a");
        document.body.appendChild(a);
        a.href = url;
        a.download = name;
        a.click();
        window.URL.revokeObjectURL(url);
    }

}