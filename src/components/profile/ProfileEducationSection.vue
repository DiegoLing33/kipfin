<template>
    <school-table :callback="callback" :user="user"/>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import KFUser from "@/client/KFUser";
    import SchoolTable from "@/components/profile/editabletables/SchoolTable.vue";

    @Component({
        components: {SchoolTable}
    })
    export default class ProfileEducationSection extends Vue {
        @Prop({required: true}) user!: KFUser;
        @Prop({default: () => true}) callback!: (name: string, value: unknown) => Promise<boolean>;

        // ProfileEducation
    }
</script>

<style scoped>

</style>