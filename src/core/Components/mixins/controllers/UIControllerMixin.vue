<template>
    <div class="view-UIControllerMixin"></div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import "@/core/app/plugins/ui/UIPlugin";

@Component
export default class UIControllerMixin extends Vue {

    /**
     * Handle promise with toast
     *
     * @param promise
     * @param done
     */
    withToast(promise: Promise<boolean>, done = "Ок!"): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            promise.then(value => {
                this.$toast.success(done);
                resolve(value);
            }).catch(reason => {
                this.$toast.error(reason, {duration: 7000});
                reject(reason);
            });
        });
    }
}
</script>

<style scoped>

</style>