<template>
    <div class="view-AdminHelper">
        <transition name="bounce">
            <b-card border-variant="primary"
                    v-show="visible" class="mb-2 win" no-body
                    style="position: relative; width: 400px; border-radius: 0">
                <div class="helper-scroll">
                    <b-button variant="success" squared block v-b-toggle:stat>
                        <b-icon-person-lines-fill class="float-left"/>
                        Статус абитуриента
                    </b-button>
                    <b-collapse accordion="help-accordion" id="stat">
                        <user-status-toolbox :callback="setStudentStatus" :user="user"/>
                    </b-collapse>
                    <b-button squared
                              variant="primary" block v-b-toggle:overview>
                        <b-icon-info-square class="float-left"/>
                        Обзор
                    </b-button>
                    <b-collapse visible accordion="help-accordion" id="overview">
                        <div class="p-3">
                            <div class="text-center">{{user.getFullName()}}</div>
                            <div class="text-center text-muted">{{$app.specializationNoCode[user.raw.facultyId]}}</div>
                            <div class="text-center text-muted">({{$app.bases[user.raw.studyBase]}})</div>
                            <hr/>
                            <div>Состояние:</div>
                            <div class="font-weight-bold">{{$app.studentStatus.text[user.raw.studentStatus]}}</div>
                            <div class="mt-3">Аттестат:</div>
                            <div class="font-weight-bold">{{user.raw.school.schoolValue}}</div>
                        </div>
                    </b-collapse>
                    <b-button squared
                              variant="primary" block v-b-toggle:calc>
                        <b-icon-app-indicator class="float-left"/>
                        Калькулятор среднего балла
                    </b-button>
                    <b-collapse accordion="help-accordion" id="calc">
                        <school-value-calculator/>
                    </b-collapse>
                    <b-button  variant="primary" squared block v-b-toggle:oneS>
                        <b-icon-arrow-down-up class="float-left"/>
                        1С Трансфер
                    </b-button>
                    <b-collapse @show="oneSShouldLoadData = true" accordion="help-accordion" id="oneS">
                        <b-card style="border-radius: 0">
                            <one-s-user v-if="oneSShouldLoadData" style="text-align: left !important;" :user="user"/>
                        </b-card>
                    </b-collapse>
                    <b-button variant="primary" squared block v-b-toggle:proc>
                        <b-icon-tools class="float-left"/>
                        Обработка
                    </b-button>
                    <b-collapse accordion="help-accordion" id="proc">
                        <b-card style="border-radius: 0">
                            <b-button v-if="user.raw['worked'] === '0'" variant="success" block @click="onSendSet">
                                Черновик сделан!
                            </b-button>
                            <b-button v-else variant="outline-success" block>Черновик уже сделал: #
                                {{user.raw['worked']}}
                            </b-button>
                        </b-card>
                    </b-collapse>
                    <b-button variant="primary" squared block v-b-toggle:allows>
                        <b-icon-shield-fill class="float-left"/>
                        Разрешения
                    </b-button>
                    <b-collapse accordion="help-accordion" id="allows">
                        <user-rules-control :callback="onRuleSet" :user="user"/>
                    </b-collapse>
                    <b-button variant="info" squared @click="sendOriginal" style="width: 100%">
                        <b-icon-house-door class="float-left"/>
                        Отдал оригинал (Очно)
                    </b-button>
                    <b-button variant="info" squared @click="printCard" block>
                        <b-icon-card-image class="float-left"/>
                        Карточка абитуриента
                    </b-button>

                    <file-uploader-admin-view :user="user"/>

                    <slot></slot>
                </div>
            </b-card>
        </transition>
        <b-button class="go" @click="toggle" variant="primary" pill>
            УПРАВЛЕНИЕ АБИТУРИЕНТОМ
            <b-icon-x-diamond-fill/>
        </b-button>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import KFUser from "@/modules/Users/Common/KFUser";
    import OneSUser from "@/modules/Admin/Components/admintools/ones/OneSUser.vue";
    import UserStatusToolbox from "@/modules/Admin/Components/admintools/UserStatusToolbox.vue";
    import FastInputSwitch from "@/core/Components/forms/fastinput/FastInputSwitch.vue";
    import FileUploaderAdminView from "@/modules/Documents/Components/FileUploaderAdminView.vue";
    import FileIO from "@/core/Utils/FileIO";
    import SchoolValueCalculator from "@/modules/Admin/Components/admintools/adminhelper/SchoolValueCalculator.vue";
    import UserRulesControl from "@/modules/Admin/Components/admintools/usercontrols/UserRulesControl.vue";
    import API from "@/core/app/api/API";

    @Component({
        components: {
            UserRulesControl,
            SchoolValueCalculator, FileUploaderAdminView, FastInputSwitch, UserStatusToolbox, OneSUser
        }
    })
    export default class AdminHelper extends Vue {

        @Prop({default: false}) show!: boolean;
        @Prop({required: true}) user!: KFUser;
        @Prop({required: true}) onRuleSet!: unknown;
        @Prop({required: true}) onSendSet!: unknown;
        @Prop({required: true}) setStudentStatus!: unknown;

        private visible = this.show;
        private oneSShouldLoadData = false;

        private printCard() {
            FileIO.requestPrinting(
                'http://kipfin.ru/new/index.php?class=res&method=title&userId=' + this.user.userId
            );
        }

        private toggle() {
            this.visible = !this.visible;
        }


        private hide() {
            this.visible = false;
        }

        private sendOriginal() {
            this.$transaction(async () => {
                await API.request("mission.notify", {userId: this.user.userId});
                window.location.reload();

            });
        }
    }
</script>

<style lang="scss">

    .helper-scroll {
        max-height: 580px;
        overflow-y: scroll;
        max-width: 100%;
        overflow-x: hidden;

        &::-webkit-scrollbar {
            width: 3px; /* width of the entire scrollbar */
        }

        &::-webkit-scrollbar-track {
            background: rgba(86, 73, 49, 0.32); /* color of the tracking area */
        }

        &::-webkit-scrollbar-thumb {
            background-color: #7a7a7a; /* color of the scroll thumb */
            border-radius: 20px; /* roundness of the scroll thumb */
            border: 1px solid rgba(255, 255, 255, 0.09); /* creates padding around scroll thumb */
        }
    }

    .bounce-enter-active {
        animation: bounce-in .5s;
    }

    .bounce-leave-active {
        animation: bounce-in .5s reverse;
    }

    @keyframes bounce-in {
        0% {
            transform: translateX(200px)
        }
        50% {
            transform: translateX(-20px)
        }
        100% {
            transform: translateX(0)
        }
    }
</style>
<style scoped lang="scss">
    .view-AdminHelper {
        position: fixed;
        bottom: 10px;
        right: 10px;
        z-index: 99999999;
    }


    .view-AdminHelper .go {
        float: right;
    }
</style>