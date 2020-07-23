<template>
    <div class="view-VKFeedPhoto" v-if="post !== null">
        <img style="width: 100%" :src="photoUrl" />
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";

    /**
     *  The VKFeedPhoto component.
     *  @author diego
     *  @created 23.07.2020 23:32
     */
    @Component
    export default class VKFeedPhoto extends Vue {
        @Prop({default: null}) post!: any;

        get photoUrl() {
            if (this.post !== null) {
                const att = this.post.attachments;
                if (att.length > 0 && att[0].type === "photo") {
                    const sizes = [...this.post.attachments[0].photo.sizes];
                    const last = sizes.pop();
                    return last.url;
                }
            }
            return "";
        }
    }
</script>

<style scoped>

</style>