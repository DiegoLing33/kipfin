<template>
    <div class="view-ScrollBottomComponent"></div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";

    /**
     *  The ScrollBottomComponent component.
     *  @author diego
     *  @created 24.07.2020 00:30
     */
    @Component
    export default class ScrollBottomComponent extends Vue {
        protected lastTryScroll = 0;

        protected onScrolledBottom() {
            /* Nothing is done */
        }

        protected onScrollHandler({target: {scrollTop, clientHeight, scrollHeight}}: any) {
            console.log(scrollTop);
            if (scrollTop + clientHeight >= scrollHeight && new Date().getTime() - this.lastTryScroll > 2000) {
                this.lastTryScroll = new Date().getTime();
                this.onScrolledBottom();
            }
        }
    }
</script>

<style scoped>

</style>