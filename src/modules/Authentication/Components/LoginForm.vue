<template>
    <div class="login-form">
        <input name="login" v-model="login" type="text" placeholder="Введите Ваш email"/>
        <input name="password" v-model="password" type="password" placeholder="Введите Ваш пароль"/>
        <button @click="onSubmit" class="bg-primary navigation-bg navigation-bg-out">Войти</button>
        <div class="message">
            <router-link to="/create">Создать личный кабинет</router-link>
        </div>
        <div style="margin: 0" class="message text-muted">
            <router-link to="/support/restore">Восстановить пароль</router-link>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import {ACCOUNT_TOKEN_STORAGE, DISPATCH_AUTH_REQUEST} from "@/modules/Authentication/Store/authentication";

    /**
     *  The LoginForm component.
     *  @author diego
     *  @created 03.09.2020 20:20
     */
    @Component
    export default class LoginForm extends Vue {
        private login = "";
        private password = "";

        mounted(){
            localStorage.removeItem(ACCOUNT_TOKEN_STORAGE);
        }

        private onSubmit() {
            const {login, password} = this;
            if (login.length < 6 || !login.includes("@")) {
                this.$toast.error("Введите корректный email адрес");
                return;
            }
            if (password.length < 6) {
                this.$toast.error("Введите корректный пароль");
                return;
            }
            this.$store.dispatch("app/startLoading");
            this.$store.dispatch(DISPATCH_AUTH_REQUEST, {login, password}).then(() => {
                if (this.$store.getters.isAdmin) this.$router.push('/admin');
                else this.$router.push('/user');
            }).catch(reason => {
                this.$toast.error(reason);
                this.$store.dispatch("app/stopLoading");
            });
        }
    }
</script>

<style scoped>

</style>