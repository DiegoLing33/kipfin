<template>
    <user-table :callback="callback" :user="user"/>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import KFUser from "@/app/client/KFUser";
    import UserTable from "@/components/profile/editabletables/UserTable.vue";
    @Component({
        components: {UserTable}
    })
    export default class ProfileInformationSection extends Vue {
        @Prop({required: true}) user!: KFUser;
        @Prop({default: () => true}) callback!: (name: string, value: unknown) => Promise<boolean>;
    }
</script>

<style scoped>

</style>