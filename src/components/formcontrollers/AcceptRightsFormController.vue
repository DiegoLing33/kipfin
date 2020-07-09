<template>
    <b-card :style="({opacity: disabled ? 0.4 : 1})">
        <b-form-checkbox
                id="checkbox-1"
                name="checkbox-1"
                v-model="acceptedRules"
                :disabled="disabled"
                value="accepted"
                unchecked-value="not_accepted"
        >
            Нажимая на кнопку, вы даете <a href="/private.pdf" target="_blank">согласие на обработку своих персональных данных</a>
        </b-form-checkbox>
        <template v-slot:footer>
            <b-button @click="($emit('click'))" :disabled="acceptedRules==='not_accepted' || disabled" variant="success" block>
                {{buttonTitle}}
            </b-button>
        </template>
    </b-card>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";

    @Component
    export default class AcceptRightsFormController extends Vue {
        @Prop({default: "Отправить"}) readonly buttonTitle!: string;
        @Prop({default: true}) readonly disabled!: boolean;


        private acceptedRules = "not_accepted"
    }
</script>

<style scoped>
</style>
