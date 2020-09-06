import {AttachmentImageEntity, AttachmentVideoEntity} from "@/modules/Feed/Entities/AttachmentEntity";

export const VKRawDataService = {
    toEntities(raw: any) {
        const getAttachments = (v: any[]) => {
            const images = Array<AttachmentImageEntity>();
            const videos = Array<AttachmentVideoEntity>();
            if (v) {
                v.forEach((item: any) => {
                    if (item.type === 'photo') {
                        images.push({
                            type: 'image',
                            url: item.photo.sizes[item.photo.sizes.length - 1].url
                        });
                    }
                    if (item.type === 'video') {
                        videos.push({
                            type: 'video',
                            url: item.video.image[item.video.image.length - 1].url,
                            link: `https://vk.com/video${item.video.owner_id}_${item.video.id}`,
                        });
                    }
                });
            }
            return {
                images,
                videos,
            }
        };
        return raw.map((value: any) => {
            return {
                id: value.id,
                title: value.text.split('.')[0].split('!')[0],
                text: value.text,
                likes: value.likes.count,
                views: value.views.count,
                comments: value.comments.count,
                date: new Date(value.date * 1000),
                link: `https://vk.com/wall-157025793_${value.id}`,
                authorName: 'ВКонтакте',
                ...getAttachments(value.attachments),
            }
        });
    }
}