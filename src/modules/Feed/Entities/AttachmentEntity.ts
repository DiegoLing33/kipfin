export interface AttachmentEntity {
    type: string;
}

export interface AttachmentImageEntity extends AttachmentEntity{
    url: string;
}

export interface AttachmentVideoEntity extends AttachmentEntity{
    url: string;
    link?: string;
}