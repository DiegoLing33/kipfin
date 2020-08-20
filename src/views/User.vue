<template>
    <user-content :sticky="!isItMe" v-if="user.userId.toString() !== '-1'">
        <template v-slot:header>
            <div>
                <user-avatar-box
                        :sub-text="user.group.groupId < 3 ? $app.specializationNoCode[user.raw.facultyId]: ''"
                        :large="true" :image-first="true" :user="user"></user-avatar-box>
                <div class="mt-3">
                    <b-button v-if="isItMe" class="control mr-2" @click="$router.push('/user/settings')">
                        <b-icon-gear-fill/>
                        Настройки
                    </b-button>
                    <b-button v-if="isItMe" class="control mr-2" @click="$router.push('/user/chat')">
                        <b-icon-chat/>
                        Сообщения
                    </b-button>
                </div>
                <div>
                    <TaggedComponent
                            v-if="$store.getters.isAdmin"
                            :editable="$store.getters.isAdmin"
                            @add="(...args) => addUserTag(user.userId, ...args)"
                            @remove="(...args) => removeUserTag(user.userId, ...args)"
                            :tags="user.tags"/>
                </div>
            </div>
        </template>
        <b-alert
                :show="true"
                v-if="(user.raw.studentStatus === '0' || user.raw.studentStatus === '200') && user.group.groupId === '1'"
        >
            <h4>Отправьте анкету на обработку!</h4>
            <p>
                Если Вы еще <b>не отправляли анкету</b> на обработку <b>или в
                Вашей анкете найдена ошибка, и Вы ее исправили</b>, Вам необходимо нажать на зеленую кнопку
            </p>
            <b-button
                    class="mb-3"
                    @click="sendTest" variant="success" block>Отправить анкету на обработку
            </b-button>
        </b-alert>
        <b-tabs content-class="mt-3" justified>
            <profile-tab :active="!shouldInformationTabBeFirst" title="Объявления">
                <template #icon>
                    <b-icon-bell/>
                </template>
                <b-alert
                        :show="true"
                        :variant="$app.studentStatus.variant[user.raw.studentStatus]"
                >
                    <h4>{{$app.studentStatus.text[user.raw.studentStatus]}}</h4>
                    <p>Состояние Вашей анкеты</p>
                </b-alert>
                <user-comments-by-admission :user="user"/>
                <profile-board-tab/>
            </profile-tab>
            <profile-tab :active="shouldInformationTabBeFirst" :lazy="true" title="Информация">
                <template #icon>
                    <b-icon-card-text/>
                </template>
                <profile-information-section :user="user" :callback="onSave"/>
                <b-card title="Дополнительно" class="mb-3">
                    <fast-input-switch
                            :callback="(function(v){return this.onSave('motherCapital', v ? 1: 0)}.bind(this))"
                            :pre="user.raw.motherCapital === '1'">
                        Материнский капитал
                    </fast-input-switch>
                </b-card>
            </profile-tab>
            <profile-tab :lazy="true" title="Образование">
                <template #icon>
                    <b-icon-book/>
                </template>
                <profile-education-section :user="user" :callback="onSave"/>

            </profile-tab>
            <profile-tab :active="shouldSpecializationTabBeFirst" :lazy="true" title="Специальность">
                <template #icon>
                    <b-icon-diagram3/>
                </template>
                <student-specialization-component
                        :disabled="!user.flags.isCanFacultyEdit()"
                        :specialization-id="user.specializationId"
                        :base-id="user.baseId"

                        @changeSpecialization="(value) => studentSetSpecialization(user, value) && $router.push('#sp' + new Date().getTime())"
                        @changeBase="(value) => studentSetBase(user, value)"/>
            </profile-tab>
            <profile-tab v-if="$store.getters.hasAccess(7)" :lazy="true" title="Управление">
                <template #icon>
                    <b-icon-gear/>
                </template>
                <user-admin-settings :user="user"/>
            </profile-tab>
        </b-tabs>


        <div v-if="$store.getters.isAdmin">
            <collapse-card @visible="onFilesVisibleChanged" title="Файлы" class="mb-3">
                <documents-grid-view
                        :busy="busyFilesLoading"
                        @updated="update" :documents="documents"/>
            </collapse-card>
            <collapse-card title="Законные представители" class="mb-3">
                <user-parents :parents="parents"></user-parents>
            </collapse-card>
            <collapse-card @visible="onPassportVisibleChanged" title="Паспортные данные" class="mb-3">
                <passport-view v-for="item of psp" :key="item['PSP_ID']" :psp="item"/>
            </collapse-card>
        </div>
        <admin-helper
                :on-rule-set="onRuleSet"
                :on-send-set="onSendSet"
                :set-student-status="setStudentStatus"
                ref="adminHelper" :user="user" v-if="$store.getters.isAdmin"/>
    </user-content>
</template>

<script lang="ts">
    import {Component, Mixins, Watch} from "vue-property-decorator";
    import API from "@/app/api/API";
    import KFUser from "@/app/client/KFUser";
    import FastInputSwitch from "@/components/fastinput/FastInputSwitch.vue";
    import ProfileProgressView from "@/components/profile/ProfileProgressView.vue";
    import UserCommentsByAdmission from "@/components/profile/UserCommentsByAdmission.vue";
    import UserParents from "@/views/Profile/UserParents.vue";
    import PassportView from "@/components/profile/PassportView.vue";
    import AdmissionActionsUserView from "@/components/admintools/AdmissionActionsUserView.vue";
    import FileUploaderAdminView from "@/components/forms/FileUploaderAdminView.vue";
    import UserStatusToolbox from "@/components/admintools/UserStatusToolbox.vue";
    import UserAvatarBox from "@/components/userbox/UserAvatarBox.vue";
    import FiSelect from "@/ling/components/ficomponents/FiSelect.vue";
    import ProfileInformationSection from "@/components/profile/ProfileInformationSection.vue";
    import ProfileEducationSection from "@/components/profile/ProfileEducationSection.vue";
    import UserContent from "@/components/theme/UserContent.vue";
    import AdminHelper from "@/components/admintools/AdminHelper.vue";
    import LiModal from "@/ling/components/LiModal.vue";
    import OneSUser from "@/components/admintools/ones/OneSUser.vue";
    import DocumentsGridView from "@/components/documents/DocumentsGridView.vue";
    import KFDocument from "@/app/client/KFDocument";
    import UserAdminSettings from "@/components/admin/UserAdminSettings.vue";
    import StoreLoadedComponent from "@/components/mixins/StoreLoadedComponent.vue";
    import CollapseCard from "@/components/theme/CollapseCard.vue";
    import TaggedComponent from "@/ling/tagged/TaggedComponent.vue";
    import UserControllerMixin from "@/components/mixins/controllers/UserControllerMixin.vue";
    import UIControllerMixin from "@/components/mixins/controllers/UIControllerMixin.vue";
    import ProfileTab from "@/components/tabs/ProfileTabs/ProfileTab.vue";
    import ProfileBoardTab from "@/components/profile/ProfileTabs/ProfileBoardTab.vue";
    import StudentControllerMixin from "@/components/mixins/controllers/StudentControllerMixin.vue";
    import StudentSpecializationComponent from "@/components/student/StudentSpecializationComponent.vue";

    @Component({
        components: {
            StudentSpecializationComponent,
            ProfileBoardTab,
            ProfileTab,
            TaggedComponent,
            CollapseCard,
            UserAdminSettings,
            DocumentsGridView,
            OneSUser,
            LiModal,
            AdminHelper,
            UserContent,
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
    export default class UserView extends Mixins(StoreLoadedComponent, UserControllerMixin,
        UIControllerMixin, StudentControllerMixin) {

        private documents: KFDocument[] = [];
        private user: KFUser = KFUser.createZeroUser();
        private parents: unknown[] = [];
        private psp: unknown[] = [];

        private busyFilesLoading = false;

        protected storeLoaded() {
            this.update();
        }

        get shouldSpecializationTabBeFirst() {
            return window.location.href.includes("#sp");
        }

        get shouldInformationTabBeFirst() {
            if (window.location.href.includes("#board")) return false;
            if (window.location.href.includes("#sp")) return false;

            if (this.user.raw.school.schoolName === "") return true;
            if (this.user.raw.facultyId === "") return true;
            if (this.user.raw.facultyId === "0") return true;
            // Admin
            if (this.$store.getters.isAdmin) return true;
            return false;
        }

        private async update() {
            if (this.$route.params.id) {
                this.user = new KFUser(await API.users.get(this.$route.params.id));
                this.user.onDataChanged = (name, value) => {
                    this.$set(this.user, name, value);
                };
            } else {
                this.user = this.$store.getters.user;
                this.user.onDataChanged = (name, value) => {
                    this.$store.getters.user[name] = value;
                };
            }

            if (this.$store.getters.isAdmin) {
                // await this.user.updateFiles();
                await API.request("mission.addAction", {forUserId: this.user.userId, actionName: 'open'});
                this.parents = (await API.request("parents.getByUserId", {userId: this.user.userId})).list;
            }
        }

        /**
         * Handles when files visibility changed
         * @param state
         */
        private async onFilesVisibleChanged(state: boolean) {
            if (state) await this.$transaction(async () => {
                this.busyFilesLoading = true;
                this.documents = await this.user.loadAllUserFiles();
            });
            this.busyFilesLoading = false;
        }

        /**
         * Handles when passport visibility changed
         * @param state
         */
        private async onPassportVisibleChanged(state: boolean) {
            if (state) await this.$transaction(async () => {
                this.psp = (await API.request("psp.user", {userId: this.user.userId})).list;
            });
        }

        private async onSave(field: string, value: unknown): Promise<boolean> {
            const results = await this.withToast(this.setUserField(this.user.userId, field, value), "Изменения сохранены!");
            if (results) await this.update();
            return Promise.resolve(results);
        }


        @Watch("$route")
        onRoute() {
            window.location.reload();
        }

        protected get isItMe() {
            return this.user.userId === this.$store.getters.user.userId;
        }

        private onRuleSet(rule: string) {
            return (value: string) => {
                value = value ? '1' : '0';
                return new Promise(resolve => {
                    API.mission.setFieldAdmin(rule, value, this.user.userId)
                        .then(async () => {
                            resolve(true);
                            await this.update();
                            this.$toast.success("Разрешение [" + rule + "] изменено!");
                            // window.location.reload();
                        }).catch(reason => {
                        this.$ui.error(reason);
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
                    this.$ui.error(reason);
                    resolve(false);
                });
            });
        }

        async sendTest() {
            try {
                await API.request("mission.sendTest");
                if(window.location.href.includes("#"))
                    window.location.href = "#board" + new Date().getTime();
                else window.location.reload();
            } catch (e) {
                this.$toast.error(e, {duration: 10000});
            }
        }


        setStudentStatus(status: string) {
            return new Promise(resolve => {
                API.mission.setFieldAdmin("studentStatus", status, this.user.userId)
                    .then(() => {
                        this.$store.dispatch("login", this.$account.authorization.getToken());
                        this.$toast.open("Пользователь переведен в новый статус: " + this.$app.studentStatus.text[status], {type: "success"});
                        this.user.raw.studentStatus = status;
                        resolve(true);
                    }).catch(reason => {
                    this.$toast.error(reason, {duration: 10000});
                    resolve(false);
                })
            });
        }
    }
</script>

<style scoped>
</style>