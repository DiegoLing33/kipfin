<template v-if="$store.state.ready">
    <b-overlay :show="overlay">
        <b-card no-body
                v-if="checkAccess === true"
                style="border-radius: 0"
                :header="('Вы: ' + $store.state.currentUser.getFullName() + ' (' + $store.state.currentUser.group.groupTitle + ' #' + $store.state.currentUser.userId) + ')'">
            <div class="header">
                <b-card-header>
                    <h2 v-if="title !== ''">{{title}}</h2>
                    <p v-if="description !== ''">
                        <b-icon-info-circle/>
                        {{description}}
                    </p>
                    <slot name="header"></slot>
                </b-card-header>
            </div>
            <div v-if="noBody">
                <slot></slot>
            </div>
            <b-card-body v-else>
                <slot></slot>
            </b-card-body>

            <template v-slot:footer>
                Если в момент заполнения личного кабинета у Вас возникли проблемы,
                звоните по телефону горячей линии: {{$store.state.numbers}} или воспользуйтесь
                <router-link to="/profile/chat">чатом с приемной комиссией</router-link>
                <small class="text-muted d-block">
                    Последнее обновление: {{$store.state.lastUserUpdate}}
                </small>
            </template>
        </b-card>
        <b-card style="border-radius: 0" v-else-if="checkAccess === false">
            <b-card-title class="text-danger">
                Доступ запрещен
            </b-card-title>
            Вы не можете просматривать данную директиву портала!
        </b-card>
        <b-card style="border-radius: 0" v-else>
            <b-card-title class="text-secondary">
                Загрузка
            </b-card-title>
            Пожалуйста, подождите...
        </b-card>
    </b-overlay>
</template>

<script lang="ts">
    import {Component, Mixins, Prop} from "vue-property-decorator";
    import StoreLoadedComponent from "@/components/mixins/StoreLoadedComponent.vue";
    import {nullable} from "@/ling/types/Common";

    /**
     *  The UserContainer component.
     *  @author diego
     *  @created 07.07.2020 23:21
     */
    @Component
    export default class UserContent extends Mixins(StoreLoadedComponent) {
        @Prop({default: "", required: false}) minAccess!: string;
        @Prop({default: false, required: false}) overlay!: boolean;
        @Prop({default: "", required: false}) title!: string;
        @Prop({default: "", required: false}) description!: string;
        @Prop({default: false, required: false}) noBody!: boolean;

        private checkAccess = nullable<boolean>();

        protected storeLoaded() {
            if (this.minAccess === "") this.checkAccess = true;
            else this.checkAccess = this.$store.state.currentUser.group.hasAccess(this.minAccess);
        }
    }
</script>

<style scoped>

</style>