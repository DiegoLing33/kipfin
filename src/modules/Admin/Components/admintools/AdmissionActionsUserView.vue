<template>
    <div>
        <b-overlay :show="busy">
            <div v-if="all && $store.state.currentUser.group.hasAccess('24')">
                <b-datepicker :value="reformIsos(new Date().toISOString())" v-model="selectedDate"></b-datepicker>
                <b-table
                        :fields="fields"
                        :items="items"
                        bordered
                        striped
                >
                </b-table>
            </div>
            <b-row v-if="all">
                <b-col class="my-3" md="12">
                    <b-card no-body header="Статусы" border-variant="primary">
                        <b-card-body style="overflow-y: auto; max-height: 300px">
                            <admin-action-view
                                    v-for="action of statusActions"
                                    :key="action.admissionActionId"
                                    :action="action"
                            />
                        </b-card-body>
                    </b-card>
                </b-col>
                <b-col class="my-3" md="12">
                    <b-card no-body header="Переносы в 1С" border-variant="primary">
                        <b-card-body style="overflow-y: auto; max-height: 300px">
                            <admin-action-view
                                    v-for="action of oneSActions"
                                    :key="action.admissionActionId"
                                    :action="action"
                            />
                        </b-card-body>
                    </b-card>
                </b-col>
            </b-row>
            <b-card no-body class="my-3" border-variant="primary" header-text-variant="info" header="Admin Logs">
                <b-checkbox class="m-3" v-model="showOpens" switch value="yes" unchecked-value="no">Отображать "открытие
                    анкет"
                </b-checkbox>
                <b-textarea readonly
                            :rows="this.all ? 50 : 6"
                            v-model="text"
                            :placeholder="('С пользователем ['+user.getFullName().trim()+'] еще никто не работал!')"
                ></b-textarea>
                <template v-slot:footer>
                    <small>Инструмент для ведения отчестности работы технических секретарей</small>
                </template>
            </b-card>
        </b-overlay>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue, Watch} from "vue-property-decorator";
    import KFUser from "@/modules/Users/Common/KFUser";
    import API from "@/core/app/api/API";
    import AdminActionView from "@/modules/Admin/Components/admintools/AdminActionView.vue";
    import {Dict} from "@/core/app/types";
    import UserUtils from "@/modules/Users/Utils/UserUtils";

    interface TableAction {
        name: string;
        done: number;
        error: number;
        ones: number;
    }

    @Component({
        components: {AdminActionView}
    })
    export default class AdmissionActionsUserView extends Vue {
        @Prop({default: KFUser.createZeroUser}) user!: KFUser;
        @Prop({default: false}) all!: boolean;
        private actions = [];
        private busy = false;
        private text = "";
        private selectedDate = this.reformIsos(new Date().toISOString());
        private showOpens = "no";
        private oneSActions: any[] = [];
        private moderActions: any[] = [];
        private statusActions: any[] = [];

        private items: TableAction[] = [];
        private fields = [
            {label: "Имя", key: "name"},
            {label: "Одобрено", key: "done"},
            {label: "Отправлено с ошибкой", key: "error"},
            {label: "Перенесено в 1С", key: "ones"},
        ]

        mounted() {
            this.update();
            if (this.all) setInterval(() => {
                this.update();
            }, 1000 * 60);
        }

        private reformIsos(isos: string){
            return isos.split('T')[0];
        }

        @Watch("showOpens")
        @Watch("selectedDate")
        async update() {
            this.busy = true;
            const oneSAcitons: any[] = [];
            const moderActions: any[] = [];
            const statusActions: any[] = [];
            if (!this.all) {
                this.actions = (await API.request("mission.getActionsFor", {forUserId: this.user.userId})).list.reverse();
            } else {
                this.actions = (await API.request("mission.getActions")).list;
            }
            this.text = "";
            let n = 0;
            const pre: Dict<TableAction> = {};
            this.actions.forEach((action: any) => {
                if(this.all && this.selectedDate &&
                    action.actionTime.split(' ')[0] !== this.selectedDate) {
                    this.busy = false;
                    return;
                }

                if (action.actionName === 'open' && this.showOpens === 'no') return;
                if (this.all) {
                    if (action.actionName === '1c') oneSAcitons.push(action);
                    if (action.actionName === 'work') moderActions.push(action);
                    if (action.actionName === 'fieldSet' && action.actionArgs.includes('studentStatus')) statusActions.push(action);


                    if (pre[UserUtils.getFullName(action.sender)] === undefined)
                        pre[UserUtils.getFullName(action.sender)] = {
                            done: 0,
                            error: 0,
                            ones: 0,
                            name: UserUtils.getFullName(action.sender),
                        };

                    if (action.actionName === 'fieldSet' && action.actionArgs.includes('studentStatus')) {
                        const newStatus = action.actionArgs.replace('studentStatus -> ', '').trim();
                        if (newStatus === '200') pre[UserUtils.getFullName(action.sender)].error++;
                        if (newStatus === '11') pre[UserUtils.getFullName(action.sender)].done++;
                        if (newStatus === '60') pre[UserUtils.getFullName(action.sender)].ones++;
                    }
                }
                this.items = Object.values(pre);
                let line = `[${action.actionTime}][АБИТУР_ID:${action.forUserId}]: ${action.sender.lastname} ${action.sender.name} ${this.actionToText(action.actionName, action.sender, action)}\n`;
                if (n === 0) line = '---> ' + line + '-'.padEnd(100, ' -') + '\n';
                this.text += line;
                n++;
            });
            this.oneSActions = oneSAcitons;
            this.moderActions = moderActions;
            this.statusActions = statusActions;
            this.busy = false;
        }

        private actionToText(action: string, sender: any, s: any) {
            if (action === 'open') return this.simpleGender(sender.gender, 'открыл', 'открыла') + " анкету абитуриента";
            if (action === 'work') return this.simpleGender(sender.gender, 'поверил', 'проверила') + " анкету абитуриента";
            if (action === 'call') return this.simpleGender(sender.gender, 'позвонил', 'позвонила') + ' абитуриенту ' + this.user.name;
            if (action === '1c') return this.simpleGender(sender.gender, 'перенес', "перенесла") + " данные в 1С";
            if (action === 'agree') return this.simpleGender(sender.gender, 'отпрвил', "отправила") + " " + this.user.name + " заявление";
            if (action === 'status') return this.simpleGender(sender.gender, 'изменил', "изменила") + " " + this.user.name + " статус абитуриента";
            if (action === 'fieldSet') {
                if (s.actionArgs.includes('studentStatus -> ')) {
                    return this.simpleGender(sender.gender, 'изменил', 'изменила') + " статус абитуриента на [" +
                        this.$app.studentStatus.text[s.actionArgs.replace('studentStatus -> ', '').trim()] + ']';
                }
                return s.actionArgs;
            }
            return action;
        }

        private async action(name: string) {
            await API.request("mission.addAction", {
                forUserId: this.user.userId,
                actionName: name,
            });
            await this.update();
        }

        private simpleGender(gender: string, a: string, b: string) {
            return gender === '1' ? a : b;
        }
    }
</script>

<style scoped>
</style>