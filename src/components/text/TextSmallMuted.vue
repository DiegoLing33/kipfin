<template>
    <div class="small text-muted">
        <slot />
    </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";

@Component
export default class TextSmallMuted extends Vue {

}
</script>

<style scoped>

</style>