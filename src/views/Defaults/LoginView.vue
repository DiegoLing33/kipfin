<template>
    <div class="login-page">
        <div class="login-header text-center p-3">
            <h1 class="font-weight-bold">КИП<span class="text-primary">ФИН</span></h1>
            <div class="text-uppercase">Личный кабинет абитуриента</div>
        </div>
        <div class="form">
            <b-overlay style="margin: -45px; padding: 45px" :show="isLoading">
                <form class="login-form" @submit.prevent="onSubmit">
                    <input name="login" v-model="login" type="text" placeholder="Введите Ваш email"/>
                    <input name="password" v-model="password" type="password" placeholder="Введите Ваш пароль"/>
                    <button type="submit" class="bg-primary navigation-bg navigation-bg-out">Войти</button>
                    <div class="message">
                        <router-link to="/create">Создать личный кабинет</router-link>
                    </div>
                    <div style="margin: 0" class="message text-muted">
                        <router-link to="/support/restore">Восстановить пароль</router-link>
                    </div>
                </form>
            </b-overlay>
        </div>
        <footer-view class="login-footer"/>
    </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import FooterView from "@/components/theme/Footer.vue";
import {ACCOUNT_TOKEN_STORAGE, DISPATCH_AUTH_REQUEST} from "@/app/store/authentication";

@Component({
    components: {FooterView}
})
export default class LoginView extends Vue {
    private login = "";
    private password = "";
    private isLoading = false;

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
        this.isLoading = true;
        this.$store.dispatch(DISPATCH_AUTH_REQUEST, {login, password}).then(() => {
            if (this.$store.getters.isAdmin) this.$router.push('/admin');
            else this.$router.push('/user');
        }).catch(reason => {
            this.$toast.error(reason);
            this.isLoading = false;
        });
    }
}
</script>

<style>
.login-footer, .login-footer div {
    text-align: center !important;
}
</style>
<style scoped>

.login-page {
    width: 460px;
    margin: 20px auto;
}

.login-header {
    text-align: center !important;
    user-select: none;
}

.form {
    user-select: none;
    position: relative;
    z-index: 1;
    background: #FFFFFF;
    max-width: 360px;
    margin: 0 auto 100px;
    padding: 45px;
    text-align: center;
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
}

.form input {
    font-family: "Roboto", sans-serif;
    outline: 0;
    background: #f2f2f2;
    width: 100%;
    border: 0;
    margin: 0 0 15px;
    padding: 15px;
    box-sizing: border-box;
    font-size: 14px;
}

.form button {
    font-family: "Roboto", sans-serif;
    text-transform: uppercase;
    outline: 0;
    width: 100%;
    border: 0;
    padding: 15px;
    color: #FFFFFF;
    font-size: 14px;
    -webkit-transition: all 0.3s ease;
    transition: all 0.3s ease;
    cursor: pointer;
    opacity: 1;
}


.form button:hover, .form button:active, .form button:focus {
    color: #bfbfbf;
    opacity: 0.9;
}

.form .message {
    margin: 15px 0 0;
    color: #b3b3b3;
    font-size: 12px;
}

.form .message a {
    text-decoration: none;
}
</style>