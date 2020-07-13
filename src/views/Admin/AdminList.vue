<template>
    <user-content
            min-access="10"
            title="Абитуриенты"
            description="Список абитуриентов, которые подали документы"
    >
        <b-button variant="outline-primary" v-b-toggle:filters block>Показать/скрыть фильтры отображения</b-button>
        <b-collapse class="my-3" id="filters">
            <b-card>
                <b-form-checkbox
                        v-model="showInProgress"
                        value="yes"
                        unchecked-value="no"
                        switch
                >
                    Показать заполненные анкеты
                </b-form-checkbox>
                <b-form-checkbox
                        v-model="hasNotifyOnly"
                        value="yes"
                        unchecked-value="no"
                        switch
                >
                    Показать только анкеты с уведомлением
                </b-form-checkbox>
                <b-form-checkbox
                        v-model="showInUploading"
                        value="yes"
                        unchecked-value="no"
                        switch
                >
                    Показать анкеты, которые проверены и идут на выгрузку в 1С
                </b-form-checkbox>
                <b-form-checkbox
                        v-model="showInDone"
                        value="yes"
                        unchecked-value="no"
                        switch
                >
                    Показать анкеты, которые уже зачислены
                </b-form-checkbox>
                <b-form-checkbox
                        v-model="showAwaitPay"
                        value="yes"
                        unchecked-value="no"
                        switch
                >
                    Показать анкеты, которые в ожидании оплаты
                </b-form-checkbox>
                <b-form-checkbox
                        v-model="showUploaded"
                        value="yes"
                        unchecked-value="no"
                        switch
                >
                    Показать анкеты, которые уже выгружены в 1С и ждут заявления
                </b-form-checkbox>
                <b-form-checkbox
                        v-model="showAggree"
                        value="yes"
                        unchecked-value="no"
                        switch
                >
                    Показать анкеты, в которые загружены заявления
                </b-form-checkbox>
                <b-form-checkbox
                        v-model="showEmpty"
                        value="yes"
                        unchecked-value="no"
                        switch
                >
                    Показать пустые анкеты
                </b-form-checkbox>
                <b-form-checkbox
                        v-model="showAnotherCounty"
                        value="yes"
                        unchecked-value="no"
                        switch
                >
                    Показать анкеты иностранных граждан
                </b-form-checkbox>
                <b-form-checkbox
                        v-model="showErrors"
                        value="yes"
                        unchecked-value="no"
                        switch
                >
                    Показать анкеты с ошибками
                </b-form-checkbox>
                <b-form-checkbox
                        v-model="showInRating"
                        value="yes"
                        unchecked-value="no"
                        switch
                >
                    Показать абитуриентов, которые уже в рейтинге
                </b-form-checkbox>
                <b-form-checkbox
                        v-model="showOnlyReserve"
                        value="yes"
                        unchecked-value="no"
                        switch
                >
                    Показать абитуриентов ТОЛЬКО с резервом
                </b-form-checkbox>
            </b-card>
        </b-collapse>
        <b-card title="Специальность" class="mt-3">
            <b-select v-model="selectedSpec" :options="({...$app.specialization, '0': 'Отображать все специальности'})"></b-select>
            <b-select class="mt-2" v-model="selectedBase" :options="({...$app.bases, '0': 'Отображать все основы'})"></b-select>
            <hr class="my-3"/>
            <b-form-checkbox
                    v-model="sortAttestat"
                    value="yes"
                    unchecked-value="no"
                    switch
            >
                Сортировать по аттестату
            </b-form-checkbox>
            <b-form-checkbox
                    v-model="sortSpec"
                    value="yes"
                    unchecked-value="no"
                    switch
            >
                Сортировать по специальности
            </b-form-checkbox>
        </b-card>

        <b-card title="Критерии отображения" class="mt-3">
            <div>Поиск по имени:</div>
            <b-input @input="find" v-model="findName" placeholder="Введите часть имени абитуриента"
                     class="mb-3"></b-input>
            <b-button class="mb-3 mr-1" size="sm" @click="showAll">Отобразить всех</b-button>
            <b-button class="mb-3 mr-1" size="sm" @click="showModer">Я проверяю</b-button>
            <b-button class="mb-3 mr-1" size="sm" @click="showModerEN">Я проверяю инстр.</b-button>
            <b-button class="mb-3 mr-1" size="sm" @click="showOneS">Я переношу</b-button>
            <b-button class="mb-3 mr-1" size="sm" @click="showAdmin">Я директор</b-button>
        </b-card>
        <div class="my-3 text-secondary">
            Найдено результатов: {{result.length}}
        </div>
        <b-table
                :fields="tableFields"
                :items="result" bordered show-empty empty-text="По Вашему запросу ничего не найдено">
            <template v-slot:cell(studyBase)="row">
                {{$app.bases[row.item.studyBase]}}
            </template>
            <template v-slot:cell(num)="row">
                {{row.item.num}}
            </template>
            <template v-slot:cell(name)="row">
                <router-link :to="('/user/' + row.item.user_id)">
                    {{row.item.lastname}} {{row.item.name}} {{row.item.surname}}
                </router-link>
                <br/>
                <b-badge style="white-space: inherit; line-height: inherit; text-align: left"
                         :variant="$app.studentStatus.variant[row.item.studentStatus]">
                    {{$app.studentStatus.text[row.item.studentStatus]}}
                </b-badge>
                <br v-if="row.item.hasNotification" />
                <b-badge v-if="row.item.hasNotification" variant="success">
                    Есть уведомление
                </b-badge>
                <br v-if="row.item['worked'] !== '0'" />
                <b-badge v-if="row.item['worked'] !== '0'" variant="success">
                    Есть черновик
                </b-badge>
            </template>
            <template v-slot:cell(facultyId)="row">
                {{$app.short[row.item.facultyId]}}
            </template>
            <template v-slot:cell(notified)="row">
                {{$app.yesNo[row.item.notified]}}
            </template>
            <template v-slot:cell(reserved)="row">
                {{$app.yesNo[row.item.reserved]}}
            </template>
        </b-table>
        <b-button class="my-3" variant="primary" @click="update">Обновить таблицу</b-button>
    </user-content>
</template>

<script lang="ts">
    import {Component, Vue, Watch} from "vue-property-decorator";
    import {APIUserResults} from "@/api/APIUsers";
    import API from "@/api/API";
    import TextField from "@/components/fields/TextField.vue";
    import StoreLoader from "@/client/StoreLoader";
    import SelectField from "@/components/fields/SelectField.vue";
    import RadioField from "@/components/fields/RadioField.vue";
    import {APIFileResult} from "@/api/APIFiles";
    import UserContent from "@/components/theme/UserContent.vue";

    @Component({
        components: {UserContent, RadioField, SelectField, TextField}
    })
    export default class AdminList extends Vue {
        private items = Array<APIUserResults>();
        private result = Array<APIUserResults>();

        private tableFields = [
            {label: "#", key: "num"},
            {label: "ID", key: "user_id", sortable: true},
            {label: "Имя", key: "name"},
            {label: "Аттестат", key: "school.schoolValue"},
            {label: "Создано", key: "created"},
            {label: "Спецаильность", key: "facultyId"},
            {label: "Основа", key: "studyBase"},
            {label: "Резерв", key: "reserved"},
        ];

        private showInProgress = "yes";
        private showEmpty = "no";
        private showInRating = "no";
        private showLoading = "no";
        private showErrors = "no";
        private showInUploading = "no";
        private showUploaded = "no";
        private showAggree = "no";
        private showAwaitPay = "no";
        private showInDone = "no";
        private hasNotifyOnly = "no";
        private showOnlyReserve = "no";

        private findName = "";

        private sortAttestat = "no";
        private sortSpec = "no";
        private showAnotherCounty = "no";

        private selectedSpec = "0";
        private selectedBase = "0";

        mounted() {
            StoreLoader.wait(this.$store, () => {
                this.update();
            });
        }

        async update() {
            const users = await API.users.list();
            const notify = (await API.request("files.listByType", {
                type: 'notify'
            })).list;
            this.items = users.list.filter(user => parseInt(user.group.group_id) === 1)
                .map(value => {
                    value.school.schoolValue = String(value.school.schoolValue).replace(',', '.');
                    value.school.schoolValue = parseFloat(value.school.schoolValue || "0") as any;
                    if (notify.filter((v: APIFileResult) => v.user_id === value.user_id).length > 0)
                        value.hasNotification = true;
                    return value;
                });
            this.find();
        }

        @Watch("showInProgress")
        @Watch("showEmpty")
        @Watch("showInRating")
        @Watch("hideDone")
        @Watch("hideTest")
        @Watch("hideNoNotify")
        @Watch("showLoading")
        @Watch("showErrors")
        @Watch("showInUploading")
        @Watch("showUploaded")
        @Watch("showAggree")
        @Watch("showAwaitPay")
        @Watch("sortAttestat")
        @Watch("sortSpec")
        @Watch("selectedSpec")
        @Watch("selectedBase")
        @Watch("showAnotherCounty")
        @Watch("showInDone")
        @Watch("hasNotifyOnly")
        @Watch("showOnlyReserve")
        private find() {
            let items = this.items;

            items = items.filter(value => value.studentStatus !== '333');
            if (this.hasNotifyOnly === "yes") items = items.filter(v => v.hasNotification);
            if (this.showOnlyReserve === "yes") items = items.filter(v => v['reserved'] === '1');

            if (this.showAnotherCounty === "no") items = items.filter(v => v.studentStatus !== "120");
            if (this.showAggree === "no") items = items.filter(v => v.studentStatus !== "60");
            if (this.showUploaded === "no") items = items.filter(v => v.studentStatus !== "50");
            if (this.showInUploading === "no") items = items.filter(v => v.studentStatus !== "11");
            if (this.showAwaitPay === "no") items = items.filter(v => v.studentStatus !== "14");
            if (this.showInDone === "no") items = items.filter(v => v.studentStatus !== "100");

            if (this.showInProgress === "no") items = items.filter(v => v.studentStatus !== "1");
            if (this.showErrors === "no") items = items.filter(v => v.studentStatus !== "200");
            if (this.showEmpty === "no") items = items.filter(v => v.studentStatus !== "0");
            if (this.showInRating === "no") items = items.filter(v => v.studentStatus !== "80");

            this.result = items.filter(v => {
                const raw = [v.lastname, v.name, v.surname].join(" ").toLocaleLowerCase();
                return raw.includes(this.findName.toLocaleLowerCase());
            });

            if (!(this.selectedSpec === '' || this.selectedSpec === '0'))
                this.result = this.result.filter(value => value.facultyId === this.selectedSpec);

            if (!(this.selectedBase === '' || this.selectedBase === '0'))
                this.result = this.result.filter(value => value.studyBase === this.selectedBase);

            this.result = this.result.sort((a, b) => {
                let res = 0;
                if (this.sortSpec === 'yes')
                    res = res || parseInt(b.facultyId || '0') - parseInt(a.facultyId || '0');
                if (this.sortAttestat === 'yes')
                    res = res || parseFloat(b.school.schoolValue || '0') - parseFloat(a.school.schoolValue || '0');
                return res;
            });

            let i = 1;
            this.result = this.result.map(r => {
                r.num = i++;
                return r;
            });
        }

        private setAllFlags(value: string): void {
            this.showInProgress = value;
            this.showEmpty = value;
            this.showInRating = value;
            this.showLoading = value;
            this.showErrors = value;
            this.showUploaded = value;
            this.showInUploading = value;
            this.showAggree = value;
            this.showAwaitPay = value;
            this.showInDone = value;
            this.hasNotifyOnly = value;
            this.showOnlyReserve = value;
            this.showAnotherCounty = value;
        }

        private showAll() {
            this.setAllFlags('yes');
            this.hasNotifyOnly = "no";
            this.showOnlyReserve = "no";
        }

        private showModer() {
            this.setAllFlags('no');
            this.showInProgress = "yes";
        }

        private showModerEN() {
            this.setAllFlags('no');
            this.showAnotherCounty = "yes";
        }

        private showOneS() {
            this.setAllFlags('no');
            this.showInUploading = "yes";
        }

        private showAdmin() {
            this.setAllFlags('no');
            this.showAggree = "yes";
            this.showUploaded = "yes";
            this.showInRating = "yes";
            this.showAwaitPay = "yes";
            this.showInDone = "yes";
        }
    }
</script>

<style scoped>
</style>
