<template>
    <div class="view-SupportWrapper">
        <div class="fixed-top">
            <b-navbar type="dark" variant="dark">
                <b-navbar-nav>
                    <b-nav-item @click="$router.push('/')">КИПФИН</b-nav-item>

                    <!-- Navbar dropdowns -->
                    <b-nav-item-dropdown text="Информационная система">
                        <b-dropdown-item @click="$router.push('/support/restore')">Восстановление пароля</b-dropdown-item>
                        <b-dropdown-item @click="$router.push('/support/error')">Сообщение об ошибке</b-dropdown-item>
                    </b-nav-item-dropdown>

<!--                    <b-nav-item-dropdown text="API">-->
<!--                        <b-dropdown-item href="#">Обзор</b-dropdown-item>-->
<!--                    </b-nav-item-dropdown>-->

                </b-navbar-nav>
            </b-navbar>
        </div>
        <b-breadcrumb>
            <b-breadcrumb-item href="/">
                <b-icon icon="house-fill" scale="1.25"/>
                КИПФИН
            </b-breadcrumb-item>
            <b-breadcrumb-item href="/support">
                Поддержка пользователя
            </b-breadcrumb-item>
            <b-breadcrumb-item href="#" active>{{title}}</b-breadcrumb-item>
        </b-breadcrumb>
        <b-card :title="title">
            <slot></slot>
        </b-card>
        <footer-view />
        <text-small class="pt-3">
            [
            <router-link to="/">Вернуться на КИПФИН</router-link>
            ]
        </text-small>
    </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
import TextSmall from "@/modules/Interface/Components/text/TextSmall.vue";
import FooterView from "@/modules/Interface/Components/Footer.vue";

@Component({
    components: {FooterView, TextSmall}
})
export default class SupportWrapper extends Vue {
    @Prop({required: true}) title!: string;
}
</script>

<style>
.breadcrumb {
    background-color: transparent !important;
}
</style>