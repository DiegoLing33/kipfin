<template>
    <div>
        <form-elements-controller
                title="Место проживания"
                :items="items"
                @changed="handleDone"
        >
            <b-form-checkbox
                    id="from-reg"
                    v-model="likeAPassport"
                    @change="handleLikeAPassportChange"
                    name="checkbox-reg"
                    value="yes"
                    unchecked-value="no"
            >
                Совпадает с местом регистрации
            </b-form-checkbox>
        </form-elements-controller>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import FormElementsController from "@/components/FormElementsController.vue";
    import {FormElement, FormElementTye} from "@/app/FormElements";
    import FormTester from "@/app/FormTester";
    import {BvComponent} from "bootstrap-vue";

    @Component({
        components: {FormElementsController}
    })
    export default class LivingPlaceFormController extends Vue {
        @Prop({required: true}) passport!: any;

        private likeAPassport = "no";
        private inputRefElement: BvComponent | null = null;

        private items: FormElement[] = [
            {
                ref: this.inputRef,
                name: "address",
                type: FormElementTye.TEXT,
                placeholder: "Введите полный адрес проживания",
                tester: FormTester.testLength(5),
                description: "Введите полный адрес по которому Вы проживете в настоящее время, например: Россия, г. Москва, ул. Лубянка, д. 12, кв. 0",
            },
        ];

        handleLikeAPassportChange(e: string){
            if(e === "yes"){
                this.inputRefElement?.setContent(this.passport.passportRegistration);
            }
        }

        handleDone(result: { done: boolean; values: any }){
            this.$emit("changed", result);
        }

        inputRef(a: BvComponent){
            this.inputRefElement = a;
        }
    }
</script>

<style scoped>
</style>