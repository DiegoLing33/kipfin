<template>
    <b-card style="border-radius: 0" title="Статус абитуриента">
        Установлено: <span :class="`text-${$app.studentStatus.variant[user.raw.studentStatus]}`">
        {{$app.studentStatus.text[user.raw.studentStatus]}}
    </span>
        <template v-slot:footer>
            <b-button
                    size="sm"
                    v-for="i of buttons"
                    :key="(`btn-${i}`)"
                    :disabled="user.raw.studentStatus === i.toString()"
                    @click="callback(i)"
                    class="mr-1 mb-1" :variant="$app.studentStatus.variant[i]">
                {{$app.studentStatus.text[i]}}
            </b-button>
            <hr />
            <div class="text-muted small">
                Используйте кнопки для быстрой установки статуса. Если в данной панели нужного статуса нет,
                используйте поле ниже.
            </div>
            <hr />
            <fi-select :callback="callback" :map="$app.studentStatus.text"
                       :default-value="user.raw.studentStatus"/>
        </template>
    </b-card>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import KFUser from "@/app/client/KFUser";
    import FiSelect from "@/ling/components/ficomponents/FiSelect.vue";
    @Component({
        components: {FiSelect}
    })
    export default class UserStatusToolbox extends Vue {
        @Prop({required: true}) user!: KFUser;
        @Prop() callback!: (status: string) => Promise<boolean>;

        private buttons = [1, 120,  200, 11, 60, 14, 333, 100, 80];
    }
</script>

<style scoped>

</style>