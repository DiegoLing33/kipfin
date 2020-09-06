<template>
    <div :style="`position: relative; min-height: ${minHeight}px;`">
        <div
                :style="({
                                backgroundImage: `url('${image}')`,
                                width: '100%',
                                height: `${minHeight}px`,
                                backgroundSize: 'cover',
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'center center',
                                  /* Add the blur effect */
                                filter: 'blur(8px)',
                                '-webkit-filter': 'blur(8px)',
                                zIndex: 0,
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                opacity: 0.6
                            })">
        </div>
        <div
                :style="({
                                backgroundImage: `url('${image}')`,
                                width: '100%',
                                height: `${minHeight}px`,
                                backgroundSize: 'contain',
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'center center',
                                zIndex: 1,
                                position: 'absolute',
                                top: 0,
                                left: 0
                            })"/>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";

    /**
     *  The ImageFit component.
     *  @author diego
     *  @created 06.09.2020 19:20
     */
    @Component
    export default class ImageFit extends Vue {
        @Prop({required: true}) image!: string;
        @Prop({default: 500}) minHeight!: number;
    }
</script>

<style scoped>

</style>