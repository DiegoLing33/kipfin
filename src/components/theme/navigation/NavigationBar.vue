<template>
    <b-navbar class="navigation-bg" fixed="top" toggleable="lg" type="dark" variant="primary">
        <b-navbar-brand href="#">
            <img class="nav-logo" src="/kf.png" alt="KIPFIN Image">
        </b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
                <navbar-link v-if="!$store.getters.isLoggedIn" to="/">Главная</navbar-link>
                <navbar-link v-else to="/user">Профиль</navbar-link>

                <a class="nav-link" href="http://lists4priemka.fa.ru/listabits.aspx?fl=12&tl=спо&le=СПО">Рейтинг
                    абитуриентов
                </a>
                <a class="nav-link" href="http://lists4priemka.fa.ru/enrollment.aspx?fl=12&tl=спо&le=СПО">
                  Предзачисление (Бюджет)
                </a>
            </b-navbar-nav>

            <b-navbar-nav class="ml-auto">
                <template v-if="!$store.getters.isLoggedIn">
                    <navbar-link to="/login">Войти в кабинет</navbar-link>
                </template>
                <template v-else>
                    <div class="nav-user" @click="$router.push('/user')">
                        <user-avatar-box :light="true" :image-first="false"
                                         :user="$store.getters.user"></user-avatar-box>
                    </div>
                </template>
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import NavbarLink from "@/components/theme/navigation/NavbarLink.vue";
    import UserAvatarBox from "@/components/userbox/UserAvatarBox.vue";

    @Component({
        components: {UserAvatarBox, NavbarLink}
    })
    export default class NavigationBar extends Vue {

    }
</script>

<style scoped>
    .nav-logo {
        height: 50px;
    }

    .nav-user {
        opacity: 0.74;
        transition: all 0.6s;
        cursor: pointer;
        user-select: none;
        -moz-user-select: none;
        -webkit-user-select: none;
    }

    .nav-user:hover {
        opacity: 1;
    }

    .nav-user:active {
        opacity: 0.4;
    }

    .navigation-bg {
        background: rgb(37, 101, 105);
        background: linear-gradient(45deg, rgba(37, 101, 105, 1) 0%, rgba(37, 101, 105, 1) 50%, rgba(28, 77, 80, 1) 50%);
        animation: move_line 2s ease-out forwards;
        -webkit-animation: move_line 2s ease-out forwards;
        -moz-animation: move_line 2s ease-out forwards;
        background-size: 400% 400%;
    }

    @-moz-keyframes move_line {
        0% {
            background-position: 0% 50%;
        }
        80% {
            background-position: 51% 50%;
        }
        100% {
            background-position: 50% 50%;
        }
    }

    @-webkit-keyframes move_line {
        0% {
            background-position: 0% 50%;
        }
        80% {
            background-position: 51% 50%;
        }
        100% {
            background-position: 50% 50%;
        }
    }

    @keyframes move_line {
        0% {
            background-position: 0% 50%;
        }
        80% {
            background-position: 51% 50%;
        }
        100% {
            background-position: 50% 50%;
        }
    }
</style>
