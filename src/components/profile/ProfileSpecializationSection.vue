<template>
    <specialization-table :callback="callback" :user="user" />
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import SpecializationTable from "@/components/profile/editabletables/SpecializationTable.vue";
    import KFUser from "@/app/client/KFUser";
    @Component({
        components: {SpecializationTable}
    })
    export default class ProfileSpecializationSection extends Vue {
        @Prop({required: true}) user!: KFUser;
        @Prop({default: () => true}) callback!: (name: string, value: unknown) => Promise<boolean>;
    }
</script>

<style scoped>

</style>