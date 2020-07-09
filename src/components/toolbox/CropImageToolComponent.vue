<template>
    <div>
        <vue-cropper
                style="height: 500px"
                :modal="true"
                :viewMode="1"
                :guides="true"
                :movable="true"
                :resizable="true"
                :aspectRatio="aspect"
                :cropBoxResizable="false"
                ref="cropper"
                :src="image"
                dragMode="move"
        />
        <b-button @click="onResultClick" block variant="primary" class="mt-3">Сохранить</b-button>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import LiModal from "@/ling/components/LiModal.vue";
    import VueCropper from "vue-cropperjs";
    import 'cropperjs/dist/cropper.css';

    /**
     *  The CropImageModal component.
     *  @author diego
     *  @created 09.07.2020 21:45
     */
    @Component({
        components: {LiModal, VueCropper}
    })
    export default class CropImageToolComponent extends Vue {
        @Prop({required: true}) image!: string;
        @Prop({required: false, default: 1}) aspect!: number;

        private onResultClick() {
            (this.$refs['cropper'] as any)
                .getCroppedCanvas().toBlob((blob: Blob) => {
                this.$emit("ready", blob);
            }, 'image/jpeg', 1.0);
        }
    }
</script>

<style scoped>

</style>