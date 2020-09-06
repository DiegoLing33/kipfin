export interface FeedItemEntity {
    id: number;
    title: string;
    text: string;
    authorName: string;
    authorLink?: string;

    likes: number;
    comments: number;
    views: number;

    date: Date;
    link?: string;
}