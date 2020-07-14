<template>
    <user-content
            v-if="user.raw.ok"
    >
        <template v-slot:header>
            <user-avatar-box :large="true" :image-first="true" :user="user"></user-avatar-box>
            <div class="mt-3">
                <b-button v-if="isItMe" class="control mr-2" @click="$router.push('/user/settings')">
                    <b-icon-gear-fill /> Настройки
                </b-button>
                <b-button v-if="isItMe" class="control mr-2" @click="$router.push('/user/chat')">
                    <b-icon-chat /> Сообщения
                </b-button>
            </div>
        </template>
        <b-tabs content-class="mt-3" justified>
            <b-tab title="Информация" active>
                <b-alert variant="warning" :show="true">
                    <h4>Внимание!</h4>
                    <p>
                        Если Вы выбираете основу обучения <b>договор</b> или <b>бюджет/договор</b>, мы гарантируем Вам место <b>только при подаче уведомления или оригинала аттестата</b> в Колледж информатики и программирования.
                        Уведомление может быть загружено в личный кабинет. Для подачи оригинала звоните в приемную комиссию.
                    </p>
                </b-alert>
                <profile-information-section :user="user" :callback="onSave" />
            </b-tab>
            <b-tab title="Образование">
                <profile-education-section :user="user"  :callback="onSave"/>
            </b-tab>
            <b-tab title="Специальность">
                <b-alert variant="warning" :show="true">
                    <h4>Внимание!</h4>
                    <p>
                        Если Вы выбираете основу обучения <b>договор</b> или <b>бюджет/договор</b>, мы гарантируем Вам место <b>только при подаче уведомления или оригинала аттестата</b> в Колледж информатики и программирования.
                        Уведомление может быть загружено в личный кабинет. Для подачи оригинала звоните в приемную комиссию.
                    </p>
                </b-alert>
                <profile-specialization-section :user="user"  :callback="onSpecializationChange" />
            </b-tab>
            <b-tab v-if="$store.state.currentUser.group.hasAccess('13')">
                <template v-slot:title>
                    <b-icon-gear /> Управление
                </template>
                <user-admin-settings :user="user" />
            </b-tab>
        </b-tabs>
        <admission-actions-user-view :user="user" v-if="$store.getters.isAdmin"/>
        <b-card class="mt-3 mb-3 ">
            <template v-slot:header>
                Состояние абитуриента: {{$app.studentStatus.text[user.raw.studentStatus]}}
            </template>
            <b-button
                    class="mb-3"
                    v-if="user.raw.studentStatus === '0' || user.raw.studentStatus === '200'"
                    @click="sendTest" variant="success" block>Отправить анкету на обработку
            </b-button>
            <user-comments-by-admission :user="user"/>
        </b-card>

        <b-card title="Дополнительно" class="mb-3">
            <fast-input-switch :callback="(function(v){return this.onSave('motherCapital', v ? 1: 0)}.bind(this))"
                               :pre="user.raw.motherCapital === '1'">
                Материнский капитал
            </fast-input-switch>
            <div class="text-muted small mt-1">
                <b>Когда я смогу отправить уведомление?</b> - сначала Ваша анкета будет находиться в обработке. После
                успешного прохождения
                данного этапа анкета перейдет в состояние "Выгрузка данных". Наши специалисты перенсут Ваши данные в
                Финансовый университет и загрузят в Ваш кабинет
                два файла - <b>заявление</b> и <b>уведомление</b>.
               </div>
        </b-card>

        <div v-if="$store.getters.isAdmin">
            <b-card title="Файлы" class="mb-3">
                <documents-grid-view @updated="update" :documents="documents"/>
            </b-card>
            <b-card title="Законные представители" class="mb-3">
                <user-parents :parents="parents"></user-parents>
            </b-card>
            <b-card title="Паспортные данные" class="mb-3">
                <passport-view v-for="item of psp" :key="item['PSP_ID']" :psp="item">
                </passport-view>
            </b-card>
        </div>
        <admin-helper
                :on-rule-set="onRuleSet"
                :on-send-set="onSendSet"
                :set-student-status="setStudentStatus"
                ref="adminHelper" :user="user" v-if="$store.getters.isAdmin" />
    </user-content>
</template>

<script lang="ts">
    import {Component, Vue, Watch} from "vue-property-decorator";
    import API from "@/api/API";
    import KFUser from "@/client/KFUser";
    import StoreLoader from "@/client/StoreLoader";
    import FastInputSwitch from "@/components/fastinput/FastInputSwitch.vue";
    import ProfileProgressView from "@/components/profile/ProfileProgressView.vue";
    import UserCommentsByAdmission from "@/components/profile/UserCommentsByAdmission.vue";
    import {Dict} from "@/app/types";
    import UserParents from "@/views/Profile/UserParents.vue";
    import PassportView from "@/components/profile/PassportView.vue";
    import AdmissionActionsUserView from "@/components/admintools/AdmissionActionsUserView.vue";
    import FileUploaderAdminView from "@/components/forms/FileUploaderAdminView.vue";
    import UserStatusToolbox from "@/components/admintools/UserStatusToolbox.vue";
    import UserAvatarBox from "@/components/userbox/UserAvatarBox.vue";
    import FiSelect from "@/ling/components/ficomponents/FiSelect.vue";
    import ProfileInformationSection from "@/components/profile/ProfileInformationSection.vue";
    import ProfileEducationSection from "@/components/profile/ProfileEducationSection.vue";
    import ProfileSpecializationSection from "@/components/profile/ProfileSpecializationSection.vue";
    import UserContent from "@/components/theme/UserContent.vue";
    import AdminHelper from "@/components/admintools/AdminHelper.vue";
    import LiModal from "@/ling/components/LiModal.vue";
    import OneSUser from "@/components/admintools/ones/OneSUser.vue";
    import DocumentsGridView from "@/components/documents/DocumentsGridView.vue";
    import KFDocument from "@/client/KFDocument";
    import UserAdminSettings from "@/components/admin/UserAdminSettings.vue";

    @Component({
        components: {
            UserAdminSettings,
            DocumentsGridView,
            OneSUser,
            LiModal,
            AdminHelper,
            UserContent,
            ProfileSpecializationSection,
            ProfileEducationSection,
            ProfileInformationSection,
            FiSelect,
            UserAvatarBox,
            UserStatusToolbox,
            FileUploaderAdminView,
            AdmissionActionsUserView,
            PassportView,
            UserParents,
            UserCommentsByAdmission,
            ProfileProgressView,
            FastInputSwitch,
        }
    })
    export default class UserView extends Vue {

        private documents: KFDocument[] = [];
        private user: KFUser = KFUser.createZeroUser();
        private parents: unknown[] = [];
        private psp: unknown[] = [];

        async mounted() {
            StoreLoader.wait(this.$store, () => {
                this.update();
            });
        }

        private showOneSModel(){
            (this.$refs['adminHelper'] as any).hide();
            (this.$refs['oneSModel'] as any).show();
        }

        private async update() {
            if (this.$route.params.id) {
                this.user = new KFUser(await API.users.get(this.$route.params.id));
            } else {
                await this.$store.dispatch("updateCurrentUser")
                this.user = this.$store.state.currentUser;
            }
            if (this.$store.getters.isAdmin) {
                await this.user.updateFiles();
                await API.request("mission.addAction", {forUserId: this.user.userId, actionName: 'open'});
                this.psp = (await API.request("psp.user", {userId: this.user.userId})).list;
                this.documents = await this.user.loadAllUserFiles();
                this.parents = (await API.request("parents.getByUserId", {userId: this.user.userId})).list;
            }
        }

        private onSave(field: string, value: unknown) {
            return new Promise(resolve => {
                API.mission.setField(field, value, this.user.userId, this.$store.getters.isAdmin)
                    .then(async () => {
                        resolve(true);
                        await this.update();
                        this.$bvToast.toast("Изменения сохранены!", {title: "Успех"});
                    })
                    .catch(reason => {
                        this.$api.error(this, reason);
                        resolve(false);
                    });
            });
        }

        private onSpecializationChange(field: string, value: string) {
            return new Promise(resolve => {
                const method = field === "facultyId" ? "mission.setSpecialization" : "mission.setBase";
                const args: Dict<unknown> = field === "facultyId" ? {specialization: value} : {base: value};
                if (this.$store.getters.isAdmin) args["userId"] = this.user.userId;
                API.request(method, args).then(async () => {
                    resolve(true);
                    this.$bvToast.toast("Изменения сохранены!", {title: "Успех"});
                    if (field === 'facultyId') window.location.reload();
                    else await this.update();
                }).catch(reason => {
                    this.$api.error(this, reason);
                    resolve(false);
                });
            });
        }


        @Watch("$route")
        onRoute(){
            window.location.reload();
        }

        protected get isItMe(){
            return this.user.userId === this.$store.state.currentUser.userId;
        }

        private onRuleSet(rule: string) {
            return (value: string) => {
                value = value ? '1' : '0';
                return new Promise(resolve => {
                    API.mission.setFieldAdmin(rule, value, this.user.userId)
                        .then(async () => {
                            resolve(true);
                            await this.update();
                            this.$bvToast.toast("Разрешение [" + rule + "] изменено!", {title: "Успех"});
                            window.location.reload();
                        }).catch(reason => {
                        this.$api.error(this, reason);
                        resolve(false);
                    });
                });
            };
        }

        private onSendSet() {
            return new Promise(resolve => {
                let val = this.$store.state.currentUser.userId;
                if (this.user.raw['worked'] !== '0') val = 0;

                API.mission.setFieldAdmin("worked", val, this.user.userId)
                    .then(async () => {
                        resolve(true);
                        await this.update();
                    }).catch(reason => {
                    this.$api.error(this, reason);
                    resolve(false);
                });
            });
        }

        sendTest() {
            this.$transaction(this, async () => {
                await API.request("mission.sendTest");
                window.location.reload();
            });
        }


        setStudentStatus(status: string) {
            return new Promise(resolve => {
                API.mission.setFieldAdmin("studentStatus", status, this.user.userId)
                    .then(() => {
                        resolve(true);
                        window.location.reload();
                    }).catch(reason => {
                    this.$api.error(this, reason);
                    resolve(false);
                })
            });
        }
    }
</script>

<style scoped>
</style>