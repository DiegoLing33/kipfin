<template>
    <user-content
            :no-body="true"
            min-access="10"
    >
        <template v-slot:header>
            <collapse-card title="Фильтры">
                <li-flag title="Показать заполненные анкеты"
                         v-model="showInProgress"
                />
                <li-flag title="Показать только анкеты с уведомлением"
                         v-model="hasNotifyOnly"
                />
                <li-flag title="Показать анкеты, которые проверены и идут на выгрузку в 1С"
                         v-model="showInUploading"
                />
                <li-flag title="Показать анкеты, которые уже зачислены"
                         v-model="showInDone"
                />
                <li-flag title="Показать анкеты, которые в ожидании оплаты"
                         v-model="showAwaitPay"
                />
                <li-flag title="Показать анкеты, которые уже выгружены в 1С и ждут заявления"
                         v-model="showUploaded"
                />
                <li-flag title="Показать анкеты, в которые загружены заявления"
                         v-model="showAggree"
                />
                <li-flag title="Показать пустые анкеты"
                         v-model="showEmpty"
                />
                <li-flag title="Показать анкеты иностранных граждан"
                         v-model="showAnotherCounty"
                />
                <li-flag title="Показать анкеты с ошибками"
                         v-model="showErrors"
                />
                <li-flag title="Показать абитуриентов, которые уже в рейтинге"
                         v-model="showInRating"
                />

            </collapse-card>
            <collapse-card
                    class="mt-3"
                    title="Специальность"
                    item-name="фильтр"
            >
                <li-flag v-for="(spec, key) in $app.specializationsClear" :key="'spec_' + key"
                         :title="spec"
                         v-model="displaySpecializations[key]"
                         @input="find"
                />
                <li-flag title="Специальность не выбрана"
                         v-model="displaySpecializations['-']"
                         @input="find"
                />
                <hr class="my-3"/>
                <li-flag v-for="(base, key) in $app.basesClear" :key="'base_' + key"
                         :title="base"
                         v-model="displayBases[key]"
                         @input="find"
                />

                <li-flag title="Основа обучения не выбрана"
                         v-model="displayBases['-']"
                         @input="find"
                />
                <hr class="my-3"/>
                <li-flag
                        title="Сортировать по аттестату"
                        v-model="sortAttestat"
                />
                <li-flag
                        title="Сортировать по специальности"
                        v-model="sortSpec"
                />
            </collapse-card>
            <collapse-card
                    title="Поиск по меткам"
            >
                <b-input v-model="searchTags" placeholder="Введите часть или целое содержание метки..."/>
                <div class="mt-1">
                    <router-link to="/admin/news">Что такое метки пользователей?</router-link>
                </div>
            </collapse-card>
            <b-card title="Критерии отображения" class="mt-3">
                <div>Поиск по имени:</div>
                <b-row>
                    <b-col md="9">
                        <b-input @input="find" v-model="findName"
                                 placeholder="Введите часть имени абитуриента"
                                 class="mb-3"></b-input>
                        <b-button class="mb-3 mr-1" size="sm" @click="showAll">Отобразить всех</b-button>
                        <b-button class="mb-3 mr-1" size="sm" @click="showModer">Я проверяю</b-button>
                        <b-button class="mb-3 mr-1" size="sm" @click="showModerEN">Я проверяю инстр.</b-button>
                        <b-button class="mb-3 mr-1" size="sm" @click="showOneS">Я переношу</b-button>
                        <b-button class="mb-3 mr-1" size="sm" @click="showAdmin">Я директор</b-button>
                        <b-button class="mb-3 mr-1" size="sm" @click="showPay">Я проверяю оплату</b-button>
                    </b-col>
                    <b-col md="3">
                        <b-input
                                v-b-tooltip.hover
                                title="После ввода идентификатора нажмите Enter для быстрого перехода"
                                @input="find" v-model="findId" placeholder="Поиск по ID"
                                @keydown="onKeyDownId"
                                class="mb-3">
                        </b-input>
                        <b-button
                                :disabled="findId === ''"
                                variant="info" block class="mb-3" size="sm" @click="$router.push('/user/' + findId)">
                            Перейти
                        </b-button>
                    </b-col>
                </b-row>
            </b-card>
            <div class="mt-3 text-secondary">
                Найдено результатов: {{ result.length }}
            </div>
        </template>
        <load-more-component :items="result" body-class="found-results">
            <template v-slot:item="item">
                <div :key="item.value.user_id" class="found-item" @click="(e) => userClick(e, item.value)">
                    <div class="f-cell text-center font-weight-bold">
                        {{ item.value.num }}
                    </div>
                    <div class="f-cell">
                        <user-avatar-box :user="item.value"/>
                    </div>
                    <div class="f-cell">
                        {{ item.value.school.schoolValue }}
                    </div>
                    <div class="f-cell">
                        {{ $app.short[item.value.facultyId] }}
                        <div class="text-muted">{{ $app.bases[item.value.studyBase] }}</div>
                    </div>
                    <div class="f-cell">
                        <b-badge class="m-1" :variant="$app.studentStatus.variant[item.value.studentStatus]">
                            {{ $app.studentStatus.text[item.value.studentStatus] }}
                        </b-badge>
                        <TaggedComponent :tags="item.value.tags"/>
                    </div>
                </div>
            </template>
        </load-more-component>
        <div v-if="isLoading" style="padding: 15px">
            <content-placeholders>
                <content-placeholders-heading :img="true"/>
                <content-placeholders-heading :img="true"/>
                <content-placeholders-heading :img="true"/>
                <content-placeholders-heading :img="true"/>
            </content-placeholders>
        </div>

        <div v-if="result.length === 0 && !isLoading" class="p-3 text-center text-muted">
            <b-icon-sun font-scale="3"/>
            <div class="mt-1">Ничего не найдено по выставленным критериям</div>
        </div>
    </user-content>
</template>

<script lang="ts">
    import {Component, Vue, Watch} from "vue-property-decorator";
    import {APIUserResults} from "@/app/api/APIUsers";
    import API from "@/app/api/API";
    import TextField from "@/components/forms/fields/TextField.vue";
    import StoreLoader from "@/app/client/StoreLoader";
    import SelectField from "@/components/forms/fields/SelectField.vue";
    import RadioField from "@/components/forms/fields/RadioField.vue";
    import UserContent from "@/components/theme/UserContent.vue";
    import UserAvatarBox from "@/components/userbox/UserAvatarBox.vue";
    import CollapseCard from "@/components/theme/CollapseCard.vue";
    import Server from "@/app/api/Server";
    import TaggedComponent from "@/ling/tagged/TaggedComponent.vue";
    import LoadMoreComponent from "@/components/toolbox/LoadMoreComponent.vue";
    import LiFlag from "@/ling/components/LiFlag.vue";
    import {nameList} from "@/ling/types/Common";

    @Component({
        components: {
            LiFlag,
            LoadMoreComponent,
            TaggedComponent, CollapseCard, UserAvatarBox, UserContent, RadioField, SelectField, TextField
        }
    })
    export default class AdminList extends Vue {
        private items = Array<APIUserResults>();
        private result = Array<APIUserResults>();
        private isLoading = true;

        private showInProgress = true;
        private showEmpty = false;
        private showInRating = false;
        private showLoading = false;
        private showErrors = false;
        private showInUploading = false;
        private showUploaded = false;
        private showAggree = false;
        private showAwaitPay = false;
        private showInDone = false;
        private hasNotifyOnly = false;
        private showOnlyReserve = false;

        private findName = "";
        private findId = "";
        private searchTags = "";

        private sortAttestat = true;
        private sortSpec = false;
        private showAnotherCounty = false;

        private displaySpecializations = nameList<boolean>();
        private displayBases = nameList<boolean>();


        private userClick(e: MouseEvent, user: { user_id: string }) {
            if (e.metaKey || e.ctrlKey) {
                window.open('/user/' + user.user_id, '_blank');
            } else {
                this.$router.push('/user/' + user.user_id);
            }
        }

        created() {
            // Reset specializations filter
            this.displaySpecializations = {'-': true};
            Object.keys(this.$app.specializationsClear)
                .forEach(key => this.displaySpecializations[key] = true);

            // Reset bases filter
            this.displayBases = {'-': true};
            Object.keys(this.$app.basesClear)
                .forEach(key => this.displayBases[key] = true);
        }

        mounted() {
            StoreLoader.wait(this.$store, () => {
                this.update();
            });
        }

        async update() {
            const users = await API.users.list();
            const notify = (await Server.request("files.listByType", {
                type: 'notify'
            })).list;
            const checks = (await Server.request("files.listByType", {
                type: 'check'
            })).list;
            this.items = users.list.filter(user => parseInt(user.group.group_id) === 1)
                .map(value => {
                    (value.group as any)['groupTitle'] = value.group.title;
                    (value as any)['userId'] = value.user_id;
                    value.school.schoolValue = String(value.school.schoolValue).replace(',', '.');
                    value.school.schoolValue = parseFloat(value.school.schoolValue || "0") as any;

                    value.tags = (value.tags || '').split(',').filter((v: string) => v !== '');

                    for (const file of notify) {
                        if (file.user_id === value.user_id && file.file_status === '2') {
                            value.hasNotification = true;
                            value.tags = [...value.tags, "@Есть уведомление"];
                            break;
                        }
                    }

                    for (const file of checks) {
                        if (file.user_id === value.user_id) {
                            value.hasCheck = true;
                            value.tags = [...value.tags, "@Есть чек"];
                            break;
                        }
                    }
                    return value;
                });
            this.find();
            this.isLoading = false;
        }

        private onKeyDownId(e: KeyboardEvent) {
            if (e.key === "Enter") {
                if (this.findId.trim() !== "") {
                    this.$router.push("/user/" + this.findId);
                } else {
                    this.findId = "";
                    this.$ui.error("Нельзя перейти к пустому идентификатору!");
                }
            }
        }

        private showPay() {
            this.setAllFlags(false);
            this.showAwaitPay = true;
        }

        @Watch("ignoreSpecialization")
        @Watch("ignoreBase")
        @Watch("showInProgress")
        @Watch("showEmpty")
        @Watch("showInRating")
        @Watch("hideDone")
        @Watch("hideTest")
        @Watch("showLoading")
        @Watch("showErrors")
        @Watch("showInUploading")
        @Watch("showUploaded")
        @Watch("showAggree")
        @Watch("showAwaitPay")
        @Watch("sortAttestat")
        @Watch("sortSpec")
        @Watch("showAnotherCounty")
        @Watch("showInDone")
        @Watch("hasNotifyOnly")
        @Watch("searchTags")
        private find() {
            this.result = this.items.filter(value => {
                let flag = true;
                if (value.studentStatus === '333') flag = flag && false;
                if (this.hasNotifyOnly && !value.hasNotification) flag = flag && false;
                if (this.showOnlyReserve && !value.reserved) flag = flag && false;

                if (!this.showAnotherCounty && value.studentStatus === "120") flag = flag && false;
                if (!this.showAggree && value.studentStatus === "60") flag = flag && false;
                if (!this.showUploaded && value.studentStatus === "50") flag = flag && false;
                if (!this.showInUploading && value.studentStatus === "11") flag = flag && false;
                if (!this.showAwaitPay && value.studentStatus === "14") flag = flag && false;
                if (!this.showInDone && value.studentStatus === "100") flag = flag && false;

                if (!this.showInProgress && value.studentStatus === "1") flag = flag && false;
                if (!this.showErrors && value.studentStatus === "200") flag = flag && false;
                if (!this.showEmpty && value.studentStatus === "0") flag = flag && false;
                if (!this.showInRating && value.studentStatus === "80") flag = flag && false;

                if (!this.displaySpecializations[value.facultyId]) {
                    if (this.displaySpecializations[value.facultyId] === undefined && this.displaySpecializations['-'])
                        flag = flag && true;
                    else flag = flag && false;
                }
                if (!this.displayBases[value.studyBase]) {
                    if (this.displayBases[value.studyBase] === undefined && this.displayBases['-'])
                        flag = flag && true;
                    else flag = flag && false;
                }

                const raw = [value.lastname, value.name, value.surname].join(" ").toLocaleLowerCase();
                flag = flag && raw.includes(this.findName.toLocaleLowerCase());
                return flag;
            });


            if (this.searchTags) {
                this.result = this.items.filter(v => {
                    const raw = v.tags.join(', ').toLocaleLowerCase();
                    return raw.includes(this.searchTags.toLocaleLowerCase());
                });
            }

            if (this.findId !== "")
                this.result = this.items.filter(v => v.user_id === this.findId);

            this.result = this.result.sort((a, b) => {
                let res = 0;
                if (this.sortSpec)
                    res = res || parseInt(b.facultyId || '0') - parseInt(a.facultyId || '0');
                if (this.sortAttestat)
                    res = res || parseFloat(b.school.schoolValue || '0') - parseFloat(a.school.schoolValue || '0');
                return res;
            });

            let i = 1;
            this.result = this.result.map(r => {
                r.num = i++;
                return r;
            });
        }

        private setAllFlags(value: boolean): void {
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
            this.setAllFlags(true);
            this.hasNotifyOnly = false;
            this.showOnlyReserve = false;
        }

        private showModer() {
            this.setAllFlags(false);
            this.showInProgress = true;
        }

        private showModerEN() {
            this.setAllFlags(false);
            this.showAnotherCounty = true;
        }

        private showOneS() {
            this.setAllFlags(false);
            this.showInUploading = true;
        }

        private showAdmin() {
            this.setAllFlags(false);
            this.showAggree = true;
            this.showUploaded = true;
            this.showInRating = true;
            this.showAwaitPay = true;
            this.showInDone = true;
        }
    }
</script>

<style scoped>
</style>
