<template>
    <div class="small">
        <slot />
    </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";

@Component
export default class TextSmall extends Vue {

}
</script>

<style scoped>

</style>