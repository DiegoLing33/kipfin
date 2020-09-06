<template>
    <support-wrapper title="Сообщение об ошибке">
        <div v-if="!done">
            <b-input v-model="mail" placeholder="Введите Ваш email"/>
            <b-input v-model="name" class="mt-3" placeholder="Как мы можем к Вам обращаться?"/>
            <select-box class="mt-3" v-model="errorType" :options="errorTypes"
                        label-title="-- Выберите категорию обращения --"/>
            <b-textarea placeholder="Подробно опишите Ваше сообщение здесь..." rows="6" v-model="text" class="mt-3"/>
            <b-button variant="primary"
                      class="mt-3"
                      @click="send"
                      :disabled="errorType === '' || mail.length < 6 || name.length < 2|| text.length < 5"
            >Отправить сообщение
            </b-button>
        </div>
        <div v-else>
            <icon-header-text icon="check" title="Готово!">
                Ваше сообщение успешно отправлено.<br/>
                Мы рассмотрим его и свяжемся с Вами при необходимости.
                <div class="mt-4">
                    <box-hint>
                        <a href="#" @click="done = false">Отправить еще одно сообщение</a>
                    </box-hint>
                </div>
            </icon-header-text>
        </div>
    </support-wrapper>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import SupportWrapper from "@/modules/Support/Components/SupportWrapper.vue";
import SelectBox from "@/modules/ling/components/SelectBox/SelectBox.vue";
import {DISPATCH_USER_REQUEST} from "@/modules/Authentication/Store/authentication";
import IconHeaderText from "@/core/Components/IconHeaderText.vue";
import BoxHint from "@/modules/Interface/Components/BoxHint.vue";
import API from '@/core/app/api/API';
import {SelectBoxValidOption} from "@/modules/ling/components/SelectBox/SelectBoxCommon";

@Component({
    components: {BoxHint, IconHeaderText, SelectBox, SupportWrapper}
})
export default class SupportAppErrorView extends Vue {
    private errorTypes = {
        template: "Ошибка внешнего вида приложения",
        work: "Ошибка в работе приложения",
        logical: "Ошибка в логике функционала",
        grammar: "Ошибка в правописании",
        idea: "Я хочу предложить фнукционал",
        other: "Другое"
    };
    private done = false;

    private mail = "";
    private name = "";
    private errorType: SelectBoxValidOption|null = null;
    private text = "";

    mounted() {
        this.$store.dispatch(DISPATCH_USER_REQUEST).then(() => {
            this.name = this.$store.getters.user.getFullName();
            this.mail = this.$store.getters.user.raw.mail;
        }).catch();
    }

    reset() {
        this.errorType = null;
        this.text = "";
    }

    send() {
        const {name, mail, text, errorType} = this;

        API.supportSendMessage(name, mail, errorType?.value || "-", text).then(() => {
            this.done = true;
            this.reset();
        }).catch(reason => this.$toast.error(reason, {duration: 10000}));
    }
}
</script>

<style scoped>

</style>