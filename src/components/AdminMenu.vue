<template>
    <wrapper-container :menu="menu" :overlay="overlay" :title="title" :description="description">
        <slot></slot>
    </wrapper-container>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import WrapperContainer from "@/components/profile/WrapperContainer.vue";
    @Component({
        components: {WrapperContainer}
    })
    export default class AdminMenu extends Vue {
        @Prop({default: false, required: false}) overlay!: boolean;
        @Prop({default: "", required: false}) title!: string;
        @Prop({default: "", required: false}) description!: string;

        private menu = [
            {nav: "Прием"},
            {title: "Панель управления", icon: "house", url: "/admin"},
            {title: "Анкеты на поступление", icon: "list", url: "/admin/list"},
            {title: "Feed файлов", icon: "upload", url: "/admin/feed"},
            {title: "Чат с приемной комиссией", icon: "chat", url: "/admin/chats"},
            {title: "Активность", icon: "clock-history", url: "/admin/fire"},
        ];
    }
</script>

<style scoped>
</style>
