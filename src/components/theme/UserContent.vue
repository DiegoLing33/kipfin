<template>
    <b-overlay :show="overlay">
        <b-card no-body
                style="border-radius: 0"
                :header="('Вы: ' + $store.getters.user.getFullName() + ' (' + $store.getters.user.group.groupTitle + ' #' + $store.getters.user.userId) + ')'">

            <div v-if="sticky" class="header sticky-top" style="top: 76px; background-color: rgb(252,252,252)">
                <b-card-header>
                    <h2 v-if="title !== ''">{{title}}</h2>
                    <p v-if="description !== ''">
                        <b-icon-info-circle/>
                        {{description}}
                    </p>
                    <slot name="header"></slot>
                    <slot name="sticky"></slot>
                </b-card-header>
            </div>
            <div v-else class="header">
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
        @Prop({default: false, required: false}) overlay!: boolean;
        @Prop({default: "", required: false}) title!: string;
        @Prop({default: "", required: false}) description!: string;
        @Prop({default: false, required: false}) noBody!: boolean;
        @Prop({default: false, required: false}) sticky!: boolean;

    }
</script>

<style scoped>

</style>