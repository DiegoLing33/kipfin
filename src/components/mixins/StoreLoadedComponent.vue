<template>
    <div class="view-StoreLoadedComponent"></div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import StoreLoader from "@/app/client/StoreLoader";

    @Component
    export default class StoreLoadedComponent extends Vue {
        private isStoreLoadedProperty = false;

        mounted() {
            StoreLoader.wait(this.$store, () => {
                this.isStoreLoadedProperty = true;
                this.storeLoaded();
            });
        }

        protected storeLoaded(){
            // Nothing is done
        }

        get isStoreLoaded(){
            return this.isStoreLoadedProperty;
        }
    }
</script>

<style scoped>

</style>