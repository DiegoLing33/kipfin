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
                <fi-file-uploader placeholder="Выберите файл" accept="image/*" :callback="sendAvatar" />
            </template>
        </b-card>

        <header-lined class="mt-3" title="Пароль" description="Измените Ваш пароль, если это необходимо"/>
        <profile-settings-change-password @send="passwordChangeHandler" class="mt-3"/>
        <hr />
        <b-button variant="danger" @click="logout" block>Выход из аккаунта</b-button>
    </user-content>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import ProfileMenu from "@/components/profile/ProfileMenu.vue";
    import HeaderLined from "@/components/heading/HeaderLined.vue";
    import API from "@/api/API";
    import KFUser from "@/client/KFUser";
    import StoreLoader from "@/client/StoreLoader";
    import ProfileSettingsChangePassword from "@/components/profile/ProfileSettingsChangePassword.vue";
    import {NameList} from "@/ling/types/Common";
    import UserAvatarImage from "@/components/userbox/UserAvatarImage.vue";
    import FiFileUploader from "@/ling/components/ficomponents/FiFileUploader.vue";
    import UserContent from "@/components/theme/UserContent.vue";

    @Component({
        components: {
            UserContent,
            FiFileUploader,
            UserAvatarImage,
            ProfileSettingsChangePassword, HeaderLined, ProfileMenu}
    })
    export default class ProfileSettings extends Vue {
        private user: KFUser = KFUser.createZeroUser();


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

        async sendAvatar(file: Blob[]) {
            return new Promise<boolean>(resolve => {
                this.$transaction(this, async () => {
                    await API.request('profile.uploadAvatar', {}, {file: file});
                    this.$bvToast.toast('Новый аватар вставлен в рамку!', {title: "Успех"});
                    this.$store.commit("setCurrentUser", false);
                    resolve(true);
                });
            });

        }

        async passwordChangeHandler(values: NameList<string>){
            this.$transaction(this, async ()=>{
               await API.request('profile.changePassword', values);
               this.$bvToast.toast('Пароль успешно изменен!', {title: "Успех"});
               setTimeout(()=>{
                   window.location.reload();
               }, 1500);
            });
        }
    }
</script>

<style scoped>

</style>