<template>
    <user-content
        title="Последняя активность"
        description="Здесь можно просмотреть последнюю активность приемной комиссии"
    >
        <admission-actions-user-view v-if="$store.state.ready" :all="true" />
    </user-content>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import AdmissionActionsUserView from "@/components/admintools/AdmissionActionsUserView.vue";
    import UserContent from "@/components/theme/UserContent.vue";
    @Component({
        components: {UserContent, AdmissionActionsUserView}
    })
    export default class AdminLastActions extends Vue {

    }
</script>

<style scoped>
</style>