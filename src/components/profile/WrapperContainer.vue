<template>
    <b-container v-if="$store.state.ready">
        <b-overlay :show="overlay">
            <b-card no-body
                    :header="($store.state.currentUser.getFullName() + ' (' + $store.state.currentUser.group.groupTitle + ' #' + $store.state.currentUser.userId) + ')'">
                <div class="header">
                    <h2>{{title}}</h2>
                    <p>
                        <b-icon-info-circle/>
                        {{description}}
                    </p>
                </div>
                <b-row>
                    <b-col md="9">
                        <b-card-body>
                            <slot></slot>
                        </b-card-body>
                    </b-col>
                    <b-col md="3" style="border-left: 1px dashed #cacaca; padding-left: 0">
                        <b-list-group flush>
                            <div v-for="(item, i) of menu" :key="i">
                                <b-list-group-item @click="$router.push(item.url)" button>
                                    <template v-if="item.nav">
                                        <div class="nav-title">{{item.nav}}</div>
                                    </template>
                                    <template v-else>
                                        <b-icon :icon="item.icon"/>
                                        {{item.title}}
                                    </template>
                                </b-list-group-item>
                            </div>
                        </b-list-group>
                    </b-col>
                </b-row>

                <template v-slot:footer>
                    Если в момент заполнения личного кабинета у Вас возникли проблемы,
                    звоните по телефону горячей линии: {{$store.state.numbers}} или воспользуйтесь <router-link to="/profile/chat">чатом с приемной комиссией</router-link>
                    <small class="text-muted d-block">
                        Последнее обновление: {{$store.state.lastUserUpdate}}
                    </small>
                </template>
            </b-card>
        </b-overlay>

    </b-container>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";

    @Component({
    })
    export default class WrapperContainer extends Vue {

        @Prop({default: false, required: false}) overlay!: boolean;
        @Prop({default: "", required: false}) title!: string;
        @Prop({default: "", required: false}) description!: string;
        @Prop({default: [], required: false}) menu!: [];


        private lastUpdate: Date = new Date();

        mounted() {
            // setInterval(() => {
            //     this.$store.commit("setCurrentUser", false);
            //     this.lastUpdate = new Date();
            // }, 1000 * 120);
        }

    }
</script>

<style scoped>
    .card {
        border-color: #c3c3c3;
    }

    .nav-title {
        padding: 5px;
        display: block;
        width: 100%;
        text-align: center;
        text-transform: uppercase;
        font-weight: bold;
    }

    .header {
        background-color: rgba(40, 76, 115, 0.16);
        padding: 15px;
    }
</style>
