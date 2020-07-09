<template>
    <div class="view-AdminHelper">
        <transition name="bounce">
            <b-card border-variant="primary
" v-show="visible" class="mb-2 win" no-body style="position: relative; width: 400px; border-radius: 0">
                <div class="helper-scroll">
                    <b-button squared
                              variant="primary" block v-b-toggle:calc>
                        <b-icon-app-indicator />
                        Калькулятор среднего балла
                    </b-button>
                    <b-collapse accordion="help-accordion" id="calc">
                        <b-card-body>
                            <b-input style="z-index: 999999999" v-model="inputed" @input="onInputValue"
                                     placeholder="Вводите оценки без пробелов..."/>
                        </b-card-body>
                        <b-table-simple class="mt-3" striped bordered>
                            <b-tbody>
                                <b-tr>
                                    <b-td style="width: 40%">Средний балл:</b-td>
                                    <b-td>
                                        <b>{{(Math.round(middleValue * 100) / 100)}}</b>
                                        <div><small class="text-muted">({{middleValue}})</small></div>
                                    </b-td>
                                </b-tr>
                                <b-tr>
                                    <b-td>Оценок 5:</b-td>
                                    <b-td><b>{{counts[5]}}</b></b-td>
                                </b-tr>
                                <b-tr>
                                    <b-td>Оценок 4:</b-td>
                                    <b-td><b>{{counts[4]}}</b></b-td>
                                </b-tr>
                                <b-tr>
                                    <b-td>Оценок 3:</b-td>
                                    <b-td><b>{{counts[3]}}</b></b-td>
                                </b-tr>
                                <b-tr>
                                    <b-td>Оценок 2:</b-td>
                                    <b-td><b>{{counts[2]}}</b></b-td>
                                </b-tr>
                                <b-tr>
                                    <b-td>Всего оценок:</b-td>
                                    <b-td><b>{{count}}</b></b-td>
                                </b-tr>
                            </b-tbody>
                        </b-table-simple>
                    </b-collapse>
                    <b-button variant="primary" squared block v-b-toggle:oneS>
                        <b-icon-arrow-down-up />
                        1С Трансфер</b-button>
                    <b-collapse accordion="help-accordion" id="oneS">
                        <b-card style="border-radius: 0">
                            <one-s-user style="text-align: left !important;" :user="user"/>
                        </b-card>
                    </b-collapse>
                    <b-button variant="primary" squared block v-b-toggle:proc>
                        <b-icon-tools />
                        Обработка</b-button>
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
                        <b-icon-shield-fill />
                        Разрешения</b-button>
                    <b-collapse accordion="help-accordion" id="allows">
                        <b-card style="border-radius: 0">
                            <fast-input-switch :callback="onRuleSet('canEdit')" :pre="user.flags.isCanEdit()">
                                Разрешить изменять данные об имени
                            </fast-input-switch>
                            <fast-input-switch :callback="onRuleSet('canChangeSchool')"
                                               :pre="user.flags.isCanSchoolEdit()">
                                Разрешить изменять данные о школе
                            </fast-input-switch>
                            <fast-input-switch :callback="onRuleSet('canChangeFaculty')"
                                               :pre="user.flags.isCanFacultyEdit()">
                                Разрешить изменять выбранную специальность
                            </fast-input-switch>
                        </b-card>
                    </b-collapse>

                    <b-button variant="info" squared @click="printCard" block>
                        <b-icon-card-image />
                        Карточка абитуриента
                    </b-button>
                    <file-uploader-admin-view :user="user"/>
                    <b-button variant="success" squared block v-b-toggle:stat>Статус абитуриента</b-button>
                    <b-collapse accordion="help-accordion" id="stat">
                        <user-status-toolbox :callback="setStudentStatus" :user="user"/>
                    </b-collapse>
                    <slot></slot>
                </div>
            </b-card>
        </transition>
        <b-button
                :draggable="true"
                @drag="onMouseMoved"
                :style="({right: offset.right + 'px', bottom: offset.bottom + 'px'})"
                class="go" @click="toggle" variant="primary" pill>
            УПРАВЛЕНИЕ АБИТУРИЕНТОМ
            <b-icon-x-diamond-fill/>
        </b-button>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import {IntDict} from "@/app/types";
    import KFUser from "@/client/KFUser";
    import OneSUser from "@/views/OneSUser.vue";
    import UserStatusToolbox from "@/components/admintools/UserStatusToolbox.vue";
    import FastInputSwitch from "@/components/fastinput/FastInputSwitch.vue";
    import FileUploaderAdminView from "@/components/forms/FileUploaderAdminView.vue";

    @Component({
        components: {FileUploaderAdminView, FastInputSwitch, UserStatusToolbox, OneSUser}
    })
    export default class AdminHelper extends Vue {

        @Prop({default: false}) show!: boolean;
        @Prop({required: true}) user!: KFUser;
        @Prop({required: true}) onRuleSet!: unknown;
        @Prop({required: true}) onSendSet!: unknown;
        @Prop({required: true}) setStudentStatus!: unknown;

        private inputed = "";
        private visible = this.show;
        private middleValue = 0;
        private count = 0;
        private counts: IntDict<number> = {0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0};

        private offset = {
            right: 0,
            bottom: 0,
        }

        private printCard() {
            const url = 'http://kipfin.ru/new/index.php?class=res&method=title&userId=' + this.user.userId;
            const mywindow = window.open(url, 'PRINT',) as Window;
            mywindow.print();
        }


        private toggle() {
            this.visible = !this.visible;
            this.inputed = "";
        }

        onMouseMoved(e: any) {
            this.offset = {right: e.pageX, bottom: e.pageY};
        }

        private hide() {
            this.visible = false;
            this.inputed = "";
        }

        private onInputValue(text: string) {
            this.counts = {0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0};
            this.middleValue = 0;
            for (let i = 0; i < text.length; i++) {
                const mark = parseInt(text[i]);
                this.middleValue += mark;
                this.counts[mark]++;
            }
            this.count = text.length;
            this.middleValue /= text.length;
        }
    }
</script>

<style lang="scss">

    .helper-scroll {
        max-height: 550px;
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