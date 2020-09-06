<template>
    <user-content
        title="Последняя активность"
        description="Здесь можно просмотреть последнюю активность приемной комиссии"
    >
        <admission-actions-user-view v-if="$store.getters.isLoggedIn" :all="true" />
    </user-content>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import AdmissionActionsUserView from "@/modules/Admin/Components/admintools/AdmissionActionsUserView.vue";
    import UserContent from "@/modules/Interface/Components/UserContent.vue";
    @Component({
        components: {UserContent, AdmissionActionsUserView}
    })
    export default class AdminLastActions extends Vue {

    }
</script>

<style scoped>
</style>