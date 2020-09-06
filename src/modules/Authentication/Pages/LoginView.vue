<template>
    <div class="login-page login-module">
        <div class="login-header text-center p-3">
            <h1 class="font-weight-bold">КИП<span class="text-primary">ФИН</span></h1>
            <div class="text-uppercase">Личный кабинет абитуриента</div>
        </div>
        <div class="form">
            <b-overlay style="margin: -45px; padding: 45px" :show="$store.getters['app/isLoading']">
                <LoginForm @showCreate="isLoginForm = false" v-if="isLoginForm" ></LoginForm>
<!--                <RegistrationForm @showLogin="isLoginForm = true" v-else ></RegistrationForm>-->
            </b-overlay>
        </div>
        <footer-view class="login-footer"/>
    </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import FooterView from "@/modules/Interface/Components/Footer.vue";
import LoginForm from "@/modules/Authentication/Components/LoginForm.vue";
import RegistrationForm from "@/modules/Authentication/Components/RegistrationForm.vue";

@Component({
    components: {RegistrationForm, LoginForm, FooterView}
})
export default class LoginPage extends Vue {
    protected isLoginForm = !window.location.href.includes("#create");
}
</script>

<style lang="scss">

    .login-module {
        .login-footer, .login-footer div {
            text-align: center !important;
        }

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
    }
</style>