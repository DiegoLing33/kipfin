<template>
    <div>
        <wrapper-container :menu="menu" :overlay="overlay" :title="title" :description="description">
            <slot></slot>
        </wrapper-container>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import WrapperContainer from "@/components/profile/WrapperContainer.vue";

    @Component({
        components: {WrapperContainer}
    })
    export default class ProfileMenu extends Vue {

        @Prop({default: false, required: false}) overlay!: boolean;
        @Prop({default: "", required: false}) title!: string;
        @Prop({default: "", required: false}) description!: string;

        private menu = [
            {nav: "Анкета"},
            {title: "Личный кабинет", icon: 'person-fill', url: "/user"},
            {title: "Законные представители", icon: "people-fill", url: "/user/parents"},
            {nav: "Документы"},
            {title: "Документы", icon: "files", url: "/user/documents"},
            {title: "Паспортные данные", icon: "card-heading", url: "/user/passport"},
            {nav: "Обратная связь"},
            {title: "Чат с приемной комиссией", icon: "chat", url: "/user/chat"},
        ];

    }
</script>

<style scoped>
    .card {
        border-color: #c3c3c3;
    }

    .nav-title {
        padding: 15px;
        display: block;
        width: 100%;
        text-align: center;
    }

    .header {
        background-color: rgba(40, 76, 115, 0.16);
        padding: 15px;
    }
</style>
