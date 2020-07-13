<template>
    <div id="app">
        <navigation-bar id="navigation-bar"></navigation-bar>
        <wrapper-container :menu="menu">
            <router-view/>
        </wrapper-container>
        <li-modal name="apiError" close-button title="Что-то пошло не так...!">
            <div class="text-center p-3 text-danger">
                {{$store.state.apiErrorText}}
            </div>
        </li-modal>
    </div>
</template>

<script lang="ts">

    import {Component, Vue} from "vue-property-decorator";
    import NavigationBar from "@/components/navigation/NavigationBar.vue";
    import WrapperContainer from "@/components/theme/WrapperContainer.vue";
    import LiModal from "@/ling/components/LiModal.vue";

    @Component({
        components: {LiModal, WrapperContainer, NavigationBar}
    })
    export default class App extends Vue {

        async mounted() {
            this.$transaction(this, async () => {
                await this.$store.dispatch("updateCurrentUserToken", this.$cookies);
                if(this.$store.getters.isUserCanBeLoggedIn){
                    await this.$store.dispatch("updateCurrentUser");
                    await this.$store.dispatch("updateCurrentUserFiles"); // 4what?
                }
            });
        }

        get menu(){
            const menuItems = [
                {title: "Мой кабинет", icon: 'person-fill', url: "/user"},
                {title: "Мои документы", icon: 'files', url: "/user/documents"},
                {title: "Паспортные данные", icon: "card-heading", url: "/user/passport"},
            ];
            if(this.$store.getters.isAdmin)
                return [...menuItems, ...[
                    {nav: "Прием"},
                    {title: "Панель управления", icon: "house", url: "/admin"},
                    {title: "Анкеты на поступление", icon: "list", url: "/admin/list"},
                    {title: "Feed файлов", icon: "upload", url: "/admin/feed"},
                    {title: "Чат с приемной комиссией", icon: "chat", url: "/admin/chats"},
                    {title: "Активность", icon: "clock-history", url: "/admin/fire"},
                    {nav: "Пользователи"},
                    {title: "Пользователи", icon: "search", url: "/admin/users"},
                    {title: "Роли пользователей", icon: "check2-circle\n", url: "/admin/roles"},
                ]];
            else
                return [...menuItems, ...[
                    {nav: "Анкета"},
                    {title: "Законные представители", icon: "people-fill", url: "/user/parents"},
                    {title: "Чат с приемной комиссией", icon: "chat", url: "/user/chat"},
                ]]
        }

    }
</script>

<style lang="scss">
    body {
        background-color: #e7e7e7 !important;
    }

    #app {
        font-family: PT-Sans, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
    }

    .bg {
        background: url("https://abitur.bsu.edu.ru/upload/iblock/e19/1111IMG_6047.jpg") no-repeat;
        background-size: cover;
        opacity: 0.2;
        position: fixed;
        z-index: -1;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }
</style>
