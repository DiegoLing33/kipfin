<template>
    <support-wrapper title="Восстановление пароля">
        <div v-if="!done">
            <b-alert :show="true">
                <h4>Внимание!</h4>
                <p>
                    По соображениям безопасности, на данный момент, информайионная система КИПФИН не имеет возможности
                    восстанавливать пароль автоматически.
                </p>
                <p>
                    Укажите Ваши реальные ФИО и настоящую почту на которую мы вышлем информацию о сбросе пароля.
                    В текстовом поле постарайтесь максимально подробно указать на то, что аккаунт принадлежит именно Вам.
                    Используйте реквизиты любых документов и будьте готовы к тому, что мы свяжемся с Вами для подтверждения запроса.
                </p>
            </b-alert>
            <b-input v-model="mail" placeholder="Введите Ваш email"/>
            <b-input v-model="name" class="mt-3" placeholder="Как мы можем к Вам обращаться?"/>
            <b-textarea placeholder="Приложите к запросу сопроводительное письмо..." rows="6" v-model="text" class="mt-3"/>
            <b-button variant="primary"
                      class="mt-3"
                      @click="send"
                      :disabled="mail.length < 6 || name.length < 2|| text.length < 5"
            >Отправить запрос на восстановление
            </b-button>
        </div>
        <div v-else>
            <icon-header-text icon="check" title="Готово!">
                Ваше сообщение успешно отправлено.<br/>
                Мы рассмотрим его как можно быстрее и свяжемся с Вами!

            </icon-header-text>
        </div>
    </support-wrapper>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import SupportWrapper from "@/modules/Support/Components/SupportWrapper.vue";
import BoxHint from "@/modules/Interface/Components/BoxHint.vue";
import IconHeaderText from "@/core/Components/IconHeaderText.vue";
import API from "@/core/app/api/API";

@Component({
    components: {BoxHint, IconHeaderText, SupportWrapper}
})
export default class SupportAppRestoreView extends Vue {
    private done = false;

    private mail = "";
    private name = "";
    private text = "";

    reset(){
        this.text = "";
    }

    send() {
        const {name, mail, text} = this;

        API.supportSendMessage(name, mail, "@restore", text).then(() => {
            this.done = true;
            this.reset();
        }).catch(reason => this.$toast.error(reason, {duration: 10000}));
    }
}
</script>

<style scoped>

</style>