<template>
    <b-form @submit="onSubmit">
        <b-card header="Вход в аккаунт" style="max-width: 95%; width: 600px; margin: 0 auto">
            <b-form-group
                    id="login-input-group"
                    label-for="login-input"
                    description="Введите email, который Вы указывали при регистрации"
            >
                <b-form-input
                        id="login-input"
                        v-model="form.login"
                        type="text"
                        required
                        placeholder="Введите Ваш email"
                ></b-form-input>
            </b-form-group>

            <b-form-group
                    id="password-input-group"
                    label-for="password-input"
                    description="После регистрации Вы получили пароль, введите его"
            >
                <b-form-input
                        id="password-input"
                        v-model="form.password"
                        type="password"
                        required
                        placeholder="Введите Ваш пароль"
                ></b-form-input>
            </b-form-group>
            <b-form-group id="input-group-4">
                <b-form-checkbox-group v-model="form.remember" id="checkboxes-4">
                    <b-form-checkbox value="1">Запомнить меня</b-form-checkbox>
                </b-form-checkbox-group>
            </b-form-group>
            <template v-slot:footer>
                <b-button type="submit" block variant="primary">Войти</b-button>
                <div class="mt-2 mb-1 text-muted text-center">- или -</div>
                <div class="text-center">
                    <router-link to="/create">Создайте личный кабинет</router-link>
                </div>
            </template>
        </b-card>
    </b-form>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import API from "@/api/API";

    @Component
    export default class LoginProfile extends Vue {

        /**
         * The form object
         */
        private form = {
            login: "",
            password: "",
            remember: ["1"],
        }

        /**
         * On form submits
         * @param e
         */
        private async onSubmit(e: any) {
            e.preventDefault();
            try {
                const response = await API.users.login(this.form.login, this.form.password);
                this.$store.commit("setCurrentUser", response.token);
                const saveTime = (this.form.remember.includes("1") ? 90 : 1) * 24 * 60 * 60 * 1000;
                this.$cookies.set("token", response.token, {expires: saveTime + new Date().getTime()});
                if (this.$store.state.currentUser.group.hasAccess('7')) await this.$router.push('/admin');
                else await this.$router.push('/user');

            } catch (e) {
                this.$bvToast.toast(e, {title: "Ошибка"})
            }
        }

    }
</script>

<style scoped lang="scss">
    .login-form {
        width: 540px;
        max-width: 95%;
        margin: 0 auto;
        text-align: left;
    }
</style>
