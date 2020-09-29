<template>
    <user-content
        description="Нам интересно, что Вы думаете по поводу работы нашей столовой. Предлагаем Вам пройти быстрый опрос!"
        title="Столовая (Опрос)">
        <template #header>
            <collapse-card title="Будьте честны и прямолинейны">
                Несмотря на то, что Вы проходите опрос авторизированным, <b>он является анонимным</b>. Из
                Ваших данных создается односторонний зашифрованный ключ, который записывается вместе с Вашим ответом, вместо Ваших данных.
                Это необходимо для того, чтобы ответы были <b>уникальными</b> и только от наших студентов!
            </collapse-card>
        </template>
        <row-with-editable-field
            title="Вы оформили договор на еду?"
            :show-hint=true
            hint='Первый вопрос - фактический. Если Вы еще не оформили договор, опишите в комментарии "Почему?"'
        >
            <b-checkbox v-model="offered" />
            <template v-if="offered">Да</template><template v-else>Нет</template>
        </row-with-editable-field>
        <row-with-editable-field
            title="Вкусно?"
            hint="Самый простой и очевидный вопрос, будьте честны"
            :show-hint=true
        >
            <b-form-rating v-model="tasty"></b-form-rating>
        </row-with-editable-field>
        <row-with-editable-field
            title="Вы полностью съедайте обед?"
            hint="Никогда - не ставьте звезд, всегда - поставьте максимум. В других случаях смотрите сами"
            :show-hint=true
        >
            <b-form-rating v-model="full"></b-form-rating>
        </row-with-editable-field>
        <row-with-editable-field
            title="Комментарий"
            hint="Вы можете передать нам Вашу мысль. Мы обязательно услышим ее"
            :show-hint=true
        >
<!--            <b-form-rating></b-form-rating>-->
            <b-textarea v-model="comment" placeholder="Напишите сюда Ваш комментарий..." />
        </row-with-editable-field>
        <b-button class="mt-3" variant="primary" block @click="onVoteClick">
            Отправить голос
        </b-button>
    </user-content>
</template>
<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import UserContent from "@/modules/Interface/Components/UserContent.vue";
import RowWithEditableField from "@/modules/Profile/Components/ProfileTabs/common/RowWithEditableField.vue";
import CollapseCard from "@/modules/Interface/Components/CollapseCard.vue";
import API from "@/core/app/api/API";
@Component({
    components: {CollapseCard, RowWithEditableField, UserContent}
})
export default class FoodIndex extends Vue{
    private offered = false;
    private tasty = 0;
    private full = 0;
    private comment = "";

    onVoteClick(){
        const {offered, tasty, full, comment} = this;
        if(!tasty || !full){
            this.$toast.error("Необходимо поставить хотя бы одну звезду!");
            return;
        }

        API.request("food.vote", {
            offered, tasty, full, comment
        }).then(() => {
            this.offered = false;
            this.tasty = 0;
            this.full = 0;
            this.comment = '';
            this.$toast.success("Ваш голос принят!");
        }).catch(e => this.$toast.error(e));
    }

}
</script>