<template>
    <div class="view-StoreLoadedComponent"></div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import StoreLoader from "@/client/StoreLoader";

    @Component
    export default class StoreLoadedComponent extends Vue {
        mounted() {
            StoreLoader.wait(this.$store, () => {
                this.storeLoaded();
            });
        }

        protected storeLoaded(){
            // Nothing is done
        }
    }
</script>

<style scoped>

</style>