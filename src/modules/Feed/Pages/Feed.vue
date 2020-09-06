<template>
    <div>
        <b-card v-if="isLoading">
            <content-placeholders>
                <content-placeholders-img/>
                <content-placeholders-heading/>
                <content-placeholders-text/>
            </content-placeholders>
        </b-card>
        <feed-item :item="item" v-for="item of list" :key="item.id">
            <attachment-images v-if="item.images.length > 0" :images="item.images"/>
            <attachment-video v-else-if="item.videos.length > 0" :video="item.videos[0]"/>
        </feed-item>
        <b-button @click="more" block variant="primary" v-if="count-items.length > 0">
            Загрузить еще ({{count - items.length}})
        </b-button>
    </div>
</template>

<script lang="ts">
    import {Component, Mixins} from "vue-property-decorator";
    import StoreLoadedComponent from "@/core/Components/mixins/StoreLoadedComponent.vue";
    import {VKAPI} from "@/core/app/feed/VKAPI";
    import VKFeedPhoto from "@/core/app/feed/components/VKFeedPhoto.vue";
    import UserContent from "@/modules/Interface/Components/UserContent.vue";
    import ScrollBottomComponent from "@/modules/ling/components/mixin/ScrollBottomComponent.vue";
    import FeedItem from "@/modules/Feed/Components/FeedItem.vue";
    import {FeedItemEntity} from "@/modules/Feed/Entities/FeedItemEntity";
    import AttachmentImages from "@/modules/Feed/Components/AttachmentImages.vue";
    import AttachmentVideo from "@/modules/Feed/Components/AttachmentVideo.vue";
    import {VKRawDataService} from "@/modules/Feed/Services/VKRawDataService";

    /**
     *  The Feed component.
     *  @author diego
     *  @created 23.07.2020 23:06
     */
    @Component({
        components: {AttachmentVideo, AttachmentImages, FeedItem, UserContent, VKFeedPhoto}
    })
    export default class Feed extends Mixins(StoreLoadedComponent, ScrollBottomComponent) {
        protected items = Array<unknown>();
        protected lastPageNumber = 0;
        protected count = 0;
        private isLoading = true;

        /**
         * Store has been loaded
         */
        protected async storeLoaded() {
            await this.update();
        }

        get list(): FeedItemEntity[] {
            return VKRawDataService.toEntities(this.items);
        }


        public async update() {
            const wall = await VKAPI.getPublicWall(this.lastPageNumber);
            this.count = wall.response.count;
            if (this.lastPageNumber === 0) this.items = wall.response.items;
            else this.items.push(...wall.response.items);
            this.isLoading = false;
        }

        public more() {
            this.lastPageNumber++;
            this.update();
        }

    }
</script>

<style>
    .carousel-caption {
        position: absolute;
        right: 15%;
        bottom: 20px;
        left: 15%;
        z-index: 10;
        padding-top: 20px;
        padding-bottom: 20px;
        color: #fff;
        text-align: center;
        background-color: rgba(37, 101, 105, 0.78) !important;
        text-shadow: none;
    }
</style>