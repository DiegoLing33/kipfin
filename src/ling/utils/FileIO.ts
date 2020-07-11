/**
 * File IO utilities
 */
export default class FileIO {

    /**
     * Requests downloading
     * @param name
     * @param url
     */
    public static requestDownloadingFile(name: string, url: string) {
        const a = document.createElement("a");
        document.body.appendChild(a);
        a.href = url;
        a.download = name;
        a.click();
        window.URL.revokeObjectURL(url);
    }

    /**
     * Requests the printing action
     * @param url
     * @param autoHide
     */
    public static requestPrinting(url: string, autoHide = true) {
        const win = window.open(url, 'PRINT') as Window;
        win.print();
        if (autoHide)
            setTimeout(() => {
                win.close();
            }, 5000);
    }

}