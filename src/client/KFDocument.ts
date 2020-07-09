import {APIFileResult} from "@/api/APIFiles";
import API, {NumericString} from "@/api/API";
import {APIUserShort} from "@/api/APIUsers";
import {NameList} from "@/ling/types/Common";
import FileIO from "@/ling/utils/FileIO";

/**
 * The KF document
 */
export default class KFDocument {

    /**
     * The source URL
     */
    public static readonly sourceURL = 'http://kipfin.ru/new/index.php?class=files&method=file&fileId=';

    /**
     * Creates zero file
     */
    public static zero() {
        return new KFDocument({
            file_id: '-1',
            file_ext: "*",
            file_type: 'undefined',
            file_status: '-1',
            file_name: 'unnamed',
            user_id: '-1',
            created: '',
            author: {
                groupId: '0',
                groupTitle: 'Ungrouped',
                userId: '-1',
                name: 'Name',
                lastname: "LastName",
                surname: ""
            }
        })
    }

    /**
     * Shared document types
     */
    public static readonly documentStores: NameList<string> = {
        "passport": "Паспорт",
        "student-photo": "Фотография",
        "attestat": "Аттестат",
        "ach": "Достижение",
        "mothercapital": "Материнский капитал",
        "notify": "Уведомление",
        "agree": "Заявление",
        "check": "Чек об оплате",
        "other": "Другое",
    };

    /**
     * Encrypted types
     */
    public static readonly documentsEncrypted = ["passport"];

    /**
     * Returns the translated name of the storage
     * @param original
     */
    public static getStorageTranslatedName(original: string) {
        return KFDocument.documentStores[original] === undefined ?
            original : KFDocument.documentStores[original];
    }

    /**
     * Converts the documents list to KFDocuments list
     * @param files - the source files array
     */
    public static fromList(files: (APIFileResult & { author: APIUserShort })[]): KFDocument[] {
        return files.map(value => new KFDocument(value));
    }

    public readonly fileId: NumericString;
    public fileName: string;
    public fileStatus: number;
    public storageName: string;
    public fileExtension: string;
    public fileCreated: string;
    public fileUserId: NumericString;
    public author: APIUserShort;

    /**
     * The constructor
     * @param {*} raw
     */
    constructor(raw: APIFileResult & { author: APIUserShort }) {
        this.fileId = raw['file_id'];
        this.fileName = raw['file_name'];
        this.fileStatus = parseInt(raw['file_status'], 10);
        this.storageName = raw['file_type'];
        this.fileExtension = raw['file_ext'];
        this.fileCreated = raw.created;
        this.author = raw['author'];
        this.fileUserId = raw['user_id'];
    }

    /**
     * Returns the filename
     * @param translated
     */
    getFileName(translated = false) {
        const storageName = translated ?
            KFDocument.getStorageTranslatedName(this.storageName)
            : this.storageName;
        const extension = this.fileName.split('.').pop();
        const name = this.fileName.split('.')[0].substr(0, 4);
        return `${storageName}-${name}.${extension}`;
    }

    /**
     * Returns the full file url
     */
    getFileURL() {
        let startPath = KFDocument.sourceURL + this.fileId;
        if (KFDocument.documentsEncrypted.includes(this.storageName))
            startPath += '&encrypted=true';
        if (this.fileExtension.includes('pdf') || this.fileExtension.includes('docx'))
            startPath += '&__pd';

        return startPath + "&token=" + API.TOKEN;
    }

    /**
     * Sets the file status
     * @param newStatus
     */
    async setStatus(newStatus: NumericString | number) {
        const result = await API.files.setStatus(this.fileId, newStatus);
        if(result.ok) this.fileStatus = parseInt(newStatus.toString());
        return result;
    }

    /**
     * Calls the file downloading
     */
    downloadFile() {
        FileIO.requestDownloadingFile(this.getFileName(), this.getFileURL());
    }
}