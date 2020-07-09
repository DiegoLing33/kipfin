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
        <li-modal :busy="loading" title="Аватар" ref="modal">
            <crop-image-tool-component
                    :image="image"
                    :aspect="1"
                    @ready="fileAccessed"
            />
        </li-modal>
    </user-content>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import HeaderLined from "@/components/heading/HeaderLined.vue";
    import API from "@/api/API";
    import KFUser from "@/client/KFUser";
    import StoreLoader from "@/client/StoreLoader";
    import ProfileSettingsChangePassword from "@/components/profile/ProfileSettingsChangePassword.vue";
    import {NameList, Nullable} from "@/ling/types/Common";
    import UserAvatarImage from "@/components/userbox/UserAvatarImage.vue";
    import FiFileUploader from "@/ling/components/ficomponents/FiFileUploader.vue";
    import UserContent from "@/components/theme/UserContent.vue";
    import LiModal from "@/ling/components/LiModal.vue";
    import CropImageToolComponent from "@/components/toolbox/CropImageToolComponent.vue";

    @Component({
        components: {
            CropImageToolComponent,
            LiModal,
            UserContent,
            FiFileUploader,
            UserAvatarImage,
            ProfileSettingsChangePassword, HeaderLined
        }
    })
    export default class ProfileSettings extends Vue {
        private user: KFUser = KFUser.createZeroUser();
        private image = "";
        private file: Nullable<string> = null;
        private loading = false;


        mounted() {
            StoreLoader.wait(this.$store, () => {
                this.user = this.$store.state.currentUser;
            });
        }

        async logout() {
            await API.users.logout();
            this.$cookies.remove("token");
            window.location.href = '/';
        }

        private onFileSelected(files: Blob) {
            this.image = URL.createObjectURL(files);
            (this.$refs['modal'] as any).show();
        }

        private async fileAccessed(blob: Blob) {
            this.loading = true;
            await this.$transaction(this, async () => {
                await API.request('profile.uploadAvatar', {}, {file: [blob]});
                this.$bvToast.toast('Новый аватар вставлен в рамку!', {title: "Успех"});
                this.$store.commit("setCurrentUser", false);
                this.$app.modalClose(this, "modal");
                this.loading = false;
            });
            this.loading = false;
            this.file = null;
        }


        async passwordChangeHandler(values: NameList<string>) {
            this.$transaction(this, async () => {
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