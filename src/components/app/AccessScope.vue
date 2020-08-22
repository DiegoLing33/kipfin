<template v-if="$store.getters.accountIsAuthenticated && $store.getters.user.group.hasAccess(access)">
    <div class="access-scope">
        <slot></slot>
    </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
import {Numeric} from "@/ling/types/Common";

@Component
export default class AccessScope extends Vue {
    @Prop({required: true}) access!: Numeric;
}
</script>

<style scoped>

</style>