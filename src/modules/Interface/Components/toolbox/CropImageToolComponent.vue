<template>
    <div>
        <vue-cropper
                style="height: 400px"
                :modal="true"
                :viewMode="1"
                :guides="true"
                :movable="true"
                :resizable="resizable"
                :aspectRatio="aspect"
                :cropBoxResizable="resizable"
                ref="cropper"
                :src="image"
                dragMode="move"
        />
        <b-button v-if="!noButton" @click="onResultClick" block variant="primary" class="mt-3">Сохранить</b-button>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import LiModal from "@/modules/ling/components/LiModal.vue";
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
        @Prop({default: false}) resizable!: boolean;
        @Prop({default: false}) noButton!: boolean;

        getCropper() {
            return this.$refs['cropper'];
        }

        public onResultClick() {
            (this.$refs['cropper'] as any)
                .getCroppedCanvas().toBlob((blob: Blob) => {
                this.$emit("ready", blob);
            }, 'image/jpeg', 1.0);
        }
    }
</script>

<style scoped>

</style>