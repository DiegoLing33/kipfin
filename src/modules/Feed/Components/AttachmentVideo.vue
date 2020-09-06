<template>
    <div slot="img" style="position: relative; min-height: 500px; background-color: #313131">
        <image-fit :image="video.url" />
        <div style="z-index: 2; position: absolute; bottom: 0; left: 0; right: 0"
             class="p-3 bg-info text-center">
            <a style="color: white" :href="video.link || '#'">
                СМОТРЕТЬ ВИДЕО
                <b-icon-link/>
            </a>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import {AttachmentVideoEntity} from "@/modules/Feed/Entities/AttachmentEntity";
    import ImageFit from "@/modules/Interface/Components/ImageFit.vue";

    /**
     *  The AttachmentImages component.
     *  @author diego
     *  @created 06.09.2020 18:45
     */
    @Component({
        components: {ImageFit}
    })
    export default class AttachmentVideo extends Vue {
        @Prop({default: []}) video!: AttachmentVideoEntity;
    }
</script>

<style scoped>

</style>