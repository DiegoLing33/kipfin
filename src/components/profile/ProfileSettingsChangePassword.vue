<template>
        <fields-controller @send="((e) => $emit('send', e))" :fields="fields"></fields-controller>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import {TextFieldProps} from "@/components/fields/TextFieldI";
    import FieldsController from "@/components/fields/FieldsController.vue";
    import {FieldTester} from "@/components/fields/Field";

    @Component({
        components: {FieldsController}
    })
    export default class ProfileSettingsChangePassword extends Vue {
        private fields: TextFieldProps[] = [
            {
                name: 'oldPassword',
                placeholder: 'Введите старый пароль',
                inputType: 'password',
            },
            {
                name: 'newPassword',
                placeholder: 'Введите новый пароль',
                inputType: 'password',
                tester: FieldTester.length(6, 32),
            }
        ];
    }
</script>

<style scoped>

</style>