<template>
    <div id="app">
        <navigation-bar v-if="!isNavigationBarShouldBeHidden"
                        id="navigation-bar"></navigation-bar>
        <wrapper-container :menu="menu">
            <router-view/>
        </wrapper-container>
    </div>
</template>

<script lang="ts">

import {Component, Vue, Watch} from "vue-property-decorator";
import NavigationBar from "@/modules/Interface/Components/navigation/NavigationBar.vue";
import WrapperContainer from "@/modules/Interface/Components/WrapperContainer.vue";
import LiModal from "@/modules/ling/components/LiModal.vue";
import {mapState} from "vuex";
import {
    ACCOUNT_TOKEN_STORAGE,
    COMMIT_AUTH_REQUEST_SUCCESS,
    DISPATCH_USER_REQUEST
} from "@/modules/Authentication/Store/authentication";

/**
 * Main application class
 */
@Component({
    components: {LiModal, WrapperContainer, NavigationBar},
    computed: mapState(["errorMessage"]),
})
export default class App extends Vue {
    private errorMessage!: string;

    get isNavigationBarShouldBeHidden() {
        if (this.$route.path.endsWith("/login")) return true;
        if (this.$route.path.includes("/support")) return true;
        return false;
    }

    created() {
        // Simple and clean
        const token = localStorage.getItem(ACCOUNT_TOKEN_STORAGE);
        this.$store.commit(COMMIT_AUTH_REQUEST_SUCCESS, token);
    }

    async mounted() {
        if (this.$store.getters.accountIsAuthenticated &&
            this.$store.getters.user.isZero()) {
            try {
                await this.$store.dispatch(DISPATCH_USER_REQUEST);
            } catch (e) {
                this.$toast.error(e);
            }
        }
        // Set-up UI
        this.$ui.setup(this);
    }

    /**
     * Error message handler
     *
     * Handles when this.commit("error", reason);
     */
    @Watch("errorMessage")
    onErrorMessageChanged() {
        this.$toast.error(this.errorMessage, {duration: 10000});
    }

    get menu() {
        let menuItems: Array<unknown> = [
            {title: "Новости", icon: "newspaper", url: "/feed"},
            {title: "Столовая (Опрос)", a: true, icon: "patch-question", url: "/food"},
            {nav: "Кабинет"},
            {title: "Мой кабинет", icon: 'person-fill', url: "/user"},
            {title: "Мои документы", icon: 'files', url: "/documents"},
            {title: "Паспортные данные", icon: "card-heading", url: "/user/passport"},
        ];
        if (this.$store.getters.isAdmin)
            menuItems = [...menuItems, ...[
                {title: "Чаты", icon: "chat", url: "/chat"},
                {nav: "Прием"},
                {title: "Приемная комиссия", icon: "house", url: "/admission"},
                {title: "Группы студентов", icon: "people", url: "/admin/groups"},
                // {title: "Движение студентов", icon: "journal-arrow-up", url: "/admin/student/motions"},
                {title: "Столовая (Результаты)", a: true, icon: "patch-question", url: "/admin/food/results"},

                {nav: 'Секция'},
                {title: "Пользователи", icon: "search", url: "/admin/users"},
                {title: "Роли пользователей", icon: "check2-circle\n", url: "/admin/roles"},
            ]];
        else
            menuItems = [...menuItems, ...[
                {nav: "Анкета"},
                {title: "Законные представители", icon: "people-fill", url: "/user/parents"},
                {title: "Чат с приемной комиссией", icon: "chat", url: "/user/chat"},
            ]];
        return menuItems;
    }

}
</script>

<style lang="scss">
body {
    background-color: #e7e7e7 !important;
}

#app {
    font-family: system-ui, -apple-system, BlinkMacSystemFont, '.SFNSText-Regular', sans-serif;
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
