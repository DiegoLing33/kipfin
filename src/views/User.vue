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
        <profile-section-tabs
            :user="user"
            :on-save="onSave"
            :active-tab="activeTabName"
        />
        <div v-if="$store.getters.isAdmin">
            <collapse-card @visible="onFilesVisibleChanged" title="Файлы" class="mb-3">
                <documents-grid-view
                        :busy="busyFilesLoading"
                        @updated="update" :documents="documents"/>
            </collapse-card>
            <collapse-card @visible="onParentsVisibleChanged" title="Законные представители" class="mb-3">
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
    import API from "@/core/app/api/API";
    import KFUser from "@/modules/Users/Common/KFUser";
    import ProfileProgressView from "@/modules/Profile/Components/ProfileProgressView.vue";
    import UserCommentsByAdmission from "@/modules/Profile/Components/UserCommentsByAdmission.vue";
    import UserParents from "@/modules/Profile/Pages/UserParents.vue";
    import PassportView from "@/modules/Profile/Components/PassportView.vue";
    import AdmissionActionsUserView from "@/modules/Admin/Components/admintools/AdmissionActionsUserView.vue";
    import FileUploaderAdminView from "@/modules/Documents/Components/FileUploaderAdminView.vue";
    import UserStatusToolbox from "@/modules/Admin/Components/admintools/UserStatusToolbox.vue";
    import UserAvatarBox from "@/modules/Users/Components/UserBox/UserAvatarBox.vue";
    import FiSelect from "@/modules/ling/components/ficomponents/FiSelect.vue";
    import ProfileInformationSection from "@/modules/Profile/Components/ProfileInformationSection.vue";
    import ProfileEducationSection from "@/modules/Profile/Components/ProfileEducationSection.vue";
    import UserContent from "@/modules/Interface/Components/UserContent.vue";
    import AdminHelper from "@/modules/Admin/Components/admintools/AdminHelper.vue";
    import LiModal from "@/modules/ling/components/LiModal.vue";
    import OneSUser from "@/modules/Admin/Components/admintools/ones/OneSUser.vue";
    import DocumentsGridView from "@/modules/Documents/Components/DocumentsGridView.vue";
    import KFDocument from "@/modules/Documents/Common/KFDocument";
    import UserAdminSettings from "@/modules/Admin/Components/UserAdminSettings.vue";
    import StoreLoadedComponent from "@/core/Components/mixins/StoreLoadedComponent.vue";
    import CollapseCard from "@/modules/Interface/Components/CollapseCard.vue";
    import TaggedComponent from "@/modules/Interface/Modules/Tagged/Components/TaggedComponent.vue";
    import UserControllerMixin from "@/core/Components/mixins/controllers/UserControllerMixin.vue";
    import UIControllerMixin from "@/core/Components/mixins/controllers/UIControllerMixin.vue";
    import ProfileTab from "@/modules/Profile/Components/ProfileTabs/ProfileTab.vue";
    import ProfileBoardTab from "@/modules/Profile/Components/ProfileTabs/ProfileBoardTab.vue";
    import StudentControllerMixin from "@/core/Components/mixins/controllers/StudentControllerMixin.vue";
    import ProfileSectionTabs from "@/modules/Profile/Components/sections/ProfileSectionTabs.vue";

    @Component({
        components: {
            ProfileSectionTabs,
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

        get activeTabName() {
            if (window.location.href.includes("#sp")) return "specialization";
            if (window.location.href.includes("#board")) return "board";
            if (this.user.userId === this.$store.getters.user.userId) return "board";
            return "information";
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

            if(this.user.raw.studentGroupId){
                const groups = await API.users.studentGroupsList();
                groups.list.forEach(value => {
                    if(value.studentGroupId.toString() === this.user.raw.studentGroupId.toString()){
                        this.$set(this.user, "studentTeacherName", value.studentGroupTeacherName);
                    }
                });
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

        /**
         * Handles when parents visibility changed
         * @param state
         */
        private async onParentsVisibleChanged(state: boolean) {
            if (state) await this.$transaction(async () => {
                this.parents = (await API.request("parents.getByUserId", {userId: this.user.userId})).list;
            });
        }


        private async onSave(field: string, value: unknown, next: (res: boolean, message: string) => void) {
            try {
                if(field === 'facultyId' || field === 'studyBase'){
                    if(field === 'facultyId'){
                        await API.request("mission.setSpecialization",
                            {specialization: value, userId: this.user.userId});
                        this.user.set('facultyId' as never, value);
                        try {
                            await API.request("mission.setBase", {base: '0', userId: this.user.userId});
                            this.user.set('studyBase' as never, '0');
                        }catch (e) {
                            // Nothing is done
                        }
                    }
                    if(field === 'studyBase'){
                        await API.request("mission.setBase", {base: value, userId: this.user.userId});
                        this.user.set('studyBase' as never, value);
                    }
                }else {
                    await this.setUserField(this.user.userId, field, value);
                    this.user.set(field as never, value);
                }
                next(true, 'Изменения сохранены!');
            } catch (e) {
                next(false, e);
            }
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