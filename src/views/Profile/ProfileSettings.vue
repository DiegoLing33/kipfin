<template>
    <user-content
            v-if="user"
            title="Настройки профиля"
            description="Здесь Вы можете изменить основные данные Вашего профиля"
    >
        <header-lined title="Аватар" description="Загрузите новый аватар для Вашего профиля"/>
        <b-card class="mt-3">
            <user-avatar-image
                    class="mb-3"
                    :user="user"
                    size="300px"
                    border-radius="0"
            ></user-avatar-image>
            <template v-slot:footer>
                <b-form-file
                        placeholder="Выберите файл"
                        accept="image/*"
                        @input="onFileSelected"
                        browse-text="Выбрать файл"
                        v-model="file"
                />
            </template>
        </b-card>

        <header-lined class="mt-3" title="Пароль" description="Измените Ваш пароль, если это необходимо"/>
        <profile-settings-change-password @send="passwordChangeHandler" class="mt-3"/>
        <hr/>
        <b-button variant="danger" @click="logout" block>Выход из аккаунта</b-button>
        <li-modal name="avatarCrop" :busy="loading" title="Аватар" ref="modal">
            <crop-image-tool-component
                    :image="image"
                    :aspect="1"
                    @ready="fileAccessed"
                    ref="croptool"
                    :no-button="true"
            />
            <template v-slot:footer>
                <b-button @click="saveClick"
                          block variant="primary" class="mt-3">Сохранить
                </b-button>
            </template>
        </li-modal>
    </user-content>
</template>

<script lang="ts">
    import {Component} from "vue-property-decorator";
    import HeaderLined from "@/components/theme/heading/HeaderLined.vue";
    import API from "@/app/api/API";
    import KFUser from "@/app/client/KFUser";
    import StoreLoader from "@/app/client/StoreLoader";
    import ProfileSettingsChangePassword from "@/components/profile/ProfileSettingsChangePassword.vue";
    import {NameList, Nullable} from "@/ling/types/Common";
    import FiFileUploader from "@/ling/components/ficomponents/FiFileUploader.vue";
    import UserContent from "@/components/theme/UserContent.vue";
    import LiModal from "@/ling/components/LiModal.vue";
    import CropImageToolComponent from "@/components/toolbox/CropImageToolComponent.vue";
    import UserAvatarImage from "@/components/userbox/UserAvatarImage";
    import StoreLoadedComponent from "@/components/mixins/StoreLoadedComponent.vue";
    import {DISPATCH_LOGOUT_REQUEST} from "@/app/store/authentication";

    @Component({
        components: {
            UserAvatarImage,
            CropImageToolComponent,
            LiModal,
            UserContent,
            FiFileUploader,
            ProfileSettingsChangePassword, HeaderLined
        }
    })
    export default class ProfileSettings extends StoreLoadedComponent {
        private user: KFUser = KFUser.createZeroUser();
        private image = "";
        private file: Nullable<unknown> = null;
        private loading = false;

        protected storeLoaded() {
            this.user = this.$store.getters.user;
        }

        logout() {
            this.$store.dispatch(DISPATCH_LOGOUT_REQUEST).then();
            window.location.reload();
        }

        private saveClick(){
            (this.$refs['croptool'] as any).onResultClick();
        }

        private onFileSelected(files: Blob) {
            this.image = URL.createObjectURL(files);
            (this.$refs['modal'] as any).show();
        }

        private async fileAccessed(blob: Blob) {
            this.loading = true;
            await this.$transaction(async () => {
                await API.request('profile.uploadAvatar', {}, {file: [blob]});
                this.$bvToast.toast('Новый аватар вставлен в рамку!', {title: "Успех"});
                await this.$store.dispatch("login", this.$account.authorization.getToken());
                this.$app.modalClose(this, "modal");
                this.loading = false;
            });
            this.loading = false;
            window.location.reload();
        }


        async passwordChangeHandler(values: NameList<string>) {
            await this.$transaction(async () => {
                await API.request('profile.changePassword', values);
                this.$bvToast.toast('Пароль успешно изменен!', {title: "Успех"});
                setTimeout(() => {
                    window.location.reload();
                }, 1500);
            });
        }
    }
</script>

<style scoped>

</style>