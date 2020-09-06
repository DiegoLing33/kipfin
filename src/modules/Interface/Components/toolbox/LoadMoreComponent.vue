<template>
    <div class="load-more-component">
        <div :class="('load-more-component-body ' + bodyClass)">
            <slot v-for="i in loadedCount" name="item" v-bind:value="items[i-1]">
                {{items[i-1]}}
            </slot>
        </div>
        <b-button @click="loadMoreClick" v-if="!isEverythingLoaded" squared variant="primary" block>
            Загрузить еще ({{establishmentCount}})
        </b-button>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";

    /**
     *  The LoadmoreComponent component.
     *  @author diego
     *  @created 21.08.2020 23:21
     */
    @Component
    export default class LoadMoreComponent extends Vue {
        @Prop({required: true}) items!: unknown[];
        @Prop({required: false, default: 25}) countItems!: number;
        @Prop({required: false, default: ""}) bodyClass!: string;

        // React props
        protected page = 1;

        /**
         * Returns the count of loaded now
         */
        get loadedCount() {
            const value = this.page * this.countItems;
            return value > this.items.length ? this.items.length : value;
        }

        /**
         * Returns loaded count
         */
        get establishmentCount() {
            const delta = this.items.length - this.loadedCount;
            return delta < 0 ? 0 : delta;
        }

        /**
         * Returns true, if everything now on screen
         */
        get isEverythingLoaded() {
            return this.establishmentCount === 0;
        }

        protected loadMoreClick() {
            if (!this.isEverythingLoaded) {
                this.page++;
            }
        }
    }
</script>

<style scoped>

</style>