<template>
    <div v-if="$store.getters.accountIsAuthenticated" class="logged-in-scope">
        <slot></slot>
    </div>
    <div v-else>
        <slot name="notLoggedIn"></slot>
    </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";

@Component
export default class LoggedInScope extends Vue {

}
</script>

<style scoped>

</style>