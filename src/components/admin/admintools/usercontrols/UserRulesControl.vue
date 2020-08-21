<template>
    <b-card style="border-radius: 0">
        <fast-input-switch :callback="callback('canEdit')" :pre="user.flags.isCanEdit()">
            Разрешить изменять данные об имени
        </fast-input-switch>
        <fast-input-switch :callback="callback('canChangeSchool')"
                           :pre="user.flags.isCanSchoolEdit()">
            Разрешить изменять данные о школе
        </fast-input-switch>
        <fast-input-switch :callback="callback('canChangeFaculty')"
                           :pre="user.flags.isCanFacultyEdit()">
            Разрешить изменять выбранную специальность
        </fast-input-switch>
    </b-card>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import FastInputSwitch from "@/components/forms/fastinput/FastInputSwitch.vue";
    import KFUser from "@/app/client/KFUser";

    @Component({
        components: {FastInputSwitch}
    })
    export default class UserRulesControl extends Vue {
        @Prop({default: () => true}) callback!: (v: string) =>
            (value: unknown) => Promise<boolean>;
        @Prop({required: true}) user!: KFUser;
    }
</script>

<style scoped>

</style>