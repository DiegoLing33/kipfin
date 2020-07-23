<template>
    <div>
        <b-card class="mb-2" style="border-radius: 0" no-body v-for="item of items" :key="item.id">
            <div v-if="item.attachments && item.attachments[0] && item.attachments[0].type === 'photo'">
                <v-k-feed-photo :post="item"/>
            </div>
            <div v-if="item.attachments && item.attachments[0] && item.attachments[0].type === 'video'">
                <img :src="item.attachments[0].video.image[8].url"/>
            </div>
            <b-card-body>
                <b-card-title>
                    {{title(item.text)}}
                    <div class="small text-muted pt-2" style="font-size: 16px">
                        {{toStdDateTime(item.date)}}
                    </div>
                </b-card-title>
                <div v-html="driveText(item.text)"></div>
            </b-card-body>
            <template v-slot:footer>
                <b-row class="text-center">
                    <b-col>
                        <b-icon-heart class="mr-1"/>
                        {{item.likes.count}}
                    </b-col>
                    <b-col>
                        <b-icon-chat-square class="mr-1"/>
                        {{item.comments.count}}
                    </b-col>
                    <b-col>
                        <a :href="(`https://vk.com/wall-157025793_${item.id}`)" target="_blank">
                            <b-icon-app class="mr-1"/>
                            VK
                        </a>
                    </b-col>
                </b-row>
            </template>
        </b-card>

        <b-button @click="more" block variant="primary" v-if="count-items.length > 0">
            Загрузить еще ({{count - items.length}})
        </b-button>
    </div>
</template>

<script lang="ts">
    import {Component, Mixins} from "vue-property-decorator";
    import StoreLoadedComponent from "@/components/mixins/StoreLoadedComponent.vue";
    import {VKAPI} from "@/app/feed/VKAPI";
    import VKFeedPhoto from "@/app/feed/components/VKFeedPhoto.vue";
    import UserContent from "@/components/theme/UserContent.vue";
    import DateIO from "@/ling/utils/DateIO";
    import ScrollBottomComponent from "@/ling/components/mixin/ScrollBottomComponent.vue";

    /**
     *  The Feed component.
     *  @author diego
     *  @created 23.07.2020 23:06
     */
    @Component({
        components: {UserContent, VKFeedPhoto}
    })
    export default class Feed extends Mixins(StoreLoadedComponent, ScrollBottomComponent) {
        protected items = Array<unknown>();
        protected toStdDateTime = DateIO.toStdDateTime;
        protected lastPageNumber = 0;
        protected count = 0;

        /**
         * Store has been loaded
         */
        protected async storeLoaded() {
            await this.update();
        }

        public async update() {
            const wall = await VKAPI.getPublicWall(this.lastPageNumber);
            this.count = wall.response.count;
            if (this.lastPageNumber === 0) this.items = wall.response.items;
            else this.items.push(...wall.response.items);
        }

        public more() {
            this.lastPageNumber++;
            this.update();
        }

        public driveText(text: string) {
            return text.split("\n").slice(1).join("\n")
                .replace(/([^\n]+)/g, '<p>$1</p>');
        }

        public title(text: string) {
            return text.split("\n")[0];
        }

    }
</script>

<style scoped>

</style>