<template>
    <b-carousel
            :interval="4000"
            controls
            indicators
            background="#313131"
            img-height="500"
    >
        <b-carousel-slide
                v-for="(attach, i) of images" :key="i">
            <image-fit slot="img" :image="attach.url" />
        </b-carousel-slide>
    </b-carousel>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import {AttachmentImageEntity} from "@/modules/Feed/Entities/AttachmentEntity";
    import ImageFit from "@/modules/Interface/Components/ImageFit.vue";

    /**
     *  The AttachmentImages component.
     *  @author diego
     *  @created 06.09.2020 18:45
     */
    @Component({
        components: {ImageFit}
    })
    export default class AttachmentImages extends Vue {
        @Prop({default: []}) images!: AttachmentImageEntity[];
    }
</script>

<style scoped>

</style>