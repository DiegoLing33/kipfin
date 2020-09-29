<template>
    <content-body :should-has-access="7">
        <user-content title="Столовая (Результаты)">
            <template #header>
                <b-card>
                    <div>Голосов: <b>{{ countAll }}</b> (из них <b>{{ offeredAll }}</b> оформили договор)</div>
                    <div>Средняя оценка "было вкусно": <b>{{ tastyAll }}</b></div>
                    <div>Средняя оценка "съедаю до конца": <b>{{ fullAll }}</b></div>
                    <template #footer>
                        <b-checkbox v-model="onlyChecked">Учитывать только тех, кто отметил, что <b>заключил договор</b></b-checkbox>
                    </template>
                </b-card>
            </template>
            <b-table bordered striped :items="items" :fields="fields" class="text-center">
                <template slot="cell(arc)">
                    <b-icon-shield-lock/>
                </template>
                <template #cell(offered)="{item}">
                    {{ item.offered === 0 ? 'Нет' : 'Да' }}
                </template>
                <template #cell(tasty)="{item}">
                    {{ item.tasty }} / 5
                </template>
                <template #cell(full)="{item}">
                    {{ item.full }} / 5
                </template>
                <template #cell(comment)="{item}">
                    <div style="width: 200px; max-width: 200px">{{ item.comment }}</div>
                </template>
            </b-table>
        </user-content>
    </content-body>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import ContentBody from "@/modules/Security/Components/ContentBody.vue";
import UserContent from "@/modules/Interface/Components/UserContent.vue";
import API from "@/core/app/api/API";

interface VoteResult {
    offered: number;
    full: number;
    tasty: number;
    comment: string;
    time: string;
}

@Component({
    components: {UserContent, ContentBody}
})
export default class FoodAdminIndex extends Vue {
    private source = Array<VoteResult>();
    private fields = [
        {
            key: 'arc',
            label: 'Голос'
        },
        {
            key: 'offered',
            label: 'Оформлен договор'
        },
        {
            key: 'tasty',
            label: 'Было вкусно'
        },
        {
            key: 'full',
            label: 'Съедает до конца'
        },
        {
            key: 'comment',
            label: 'Комментарий'
        },
        {
            key: 'time',
            label: 'Дата'
        }
    ];

    private onlyChecked = false;

    private get countAll() {
        return this.items.length;
    }

    private get offeredAll() {
        return this.items.filter(value => value.offered).length;
    }

    private get tastyAll() {
        return Math.round(this.items
                .filter(value => value.tasty)
                .map(value => value.tasty)
                .reduce((previousValue, currentValue) => previousValue + currentValue, 0) /
            this.countAll * 100) / 100;
    }

    private get fullAll() {
        return Math.round(this.items
                .filter(value => value.full)
                .map(value => value.full)
                .reduce((previousValue, currentValue) => previousValue + currentValue, 0) /
            this.countAll * 100) / 100;
    }

    mounted() {
        this.update();
    }

    private get items(){
        return this.onlyChecked ? this.source.filter(value => value.offered) : this.source;
    }

    async update() {
        const results = await API.request<{ list: VoteResult[] }>("food.list");
        this.source = results.list;
    }
}
</script>

<style scoped>

</style>