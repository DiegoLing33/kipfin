<template>
    <b-navbar class="navigation-bg" fixed="top" toggleable="lg" type="dark" variant="primary">
        <b-navbar-brand href="#">
            <img class="nav-logo" src="/kf.png" alt="KIPFIN Image">
        </b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
                <navbar-link v-if="!$store.state.ready"  to="/">Главная</navbar-link>
                <navbar-link v-else  to="/user">Профиль</navbar-link>

                <a class="nav-link" href="http://lists4priemka.fa.ru/listabits.aspx?fl=12&tl=спо&le=СПО">Рейтинг
                    абитуриентов
                </a>
            </b-navbar-nav>

            <b-navbar-nav class="ml-auto">
                <template v-if="!$store.state.ready">
                    <navbar-link to="/login">Войти в кабинет</navbar-link>
                </template>
                <template v-else>
                    <div class="nav-user" @click="$router.push('/user')">
                        <user-avatar-box :light="true" :image-first="false"
                                         :user="$store.state.currentUser"></user-avatar-box>
                    </div>
                </template>
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import NavbarLink from "@/components/navigation/NavbarLink.vue";
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
    .navigation-bg{
        background: rgb(37,101,105);
        background: linear-gradient(45deg, rgba(37,101,105,1) 0%, rgba(37,101,105,1) 50%, rgba(28,77,80,1) 50%);
    }
</style>
