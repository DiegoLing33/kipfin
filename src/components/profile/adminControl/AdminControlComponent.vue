<template>
    <div class="view-AdminControlComponent">
        <b-button
                style="border-radius: 0"
                block>
            <b-icon-arrow-up-circle/>
            УПРАВЛЕНИЕ
        </b-button>
        <b-card style="border-radius: 0; max-height: 500px; overflow-y: auto">
            <b-container :fluid="true">
                <b-row>
                    <b-col>
                        <h4>Обзор</h4>
                        <div>{{user.getFullName()}}</div>
                        <div class="text-muted">{{$app.specializationNoCode[user.raw.facultyId]}}</div>
                        <div class="text-muted">{{$app.bases[user.raw.studyBase]}}</div>
                        <div class="mt-2">Состояние:</div>
                        <span :class="`text-${$app.studentStatus.variant[user.raw.studentStatus]}`">
                            {{$app.studentStatus.text[user.raw.studentStatus]}}
                        </span>
                        <div class="mt-2">Аттестат:</div>
                        <div class="font-weight-bold">{{user.raw.school.schoolValue}}</div>
                    </b-col>
                    <b-col>
                        <h4>Настройка состояния</h4>
                        <user-status-toolbox :callback="setStudentStatus" :user="user"/>
                    </b-col>
                    <b-col>
                        <b-button variant="primary" block>
                            <b-icon-info-square class="float-left"/>
                            Обзор
                        </b-button>
                        <b-button variant="primary" block v-b-toggle:calc>
                            <b-icon-app-indicator class="float-left"/>
                            Калькулятор среднего балла
                        </b-button>
                        <b-button  variant="primary" block v-b-toggle:oneS>
                            <b-icon-arrow-down-up class="float-left"/>
                            1С Трансфер
                        </b-button>
                    </b-col>
                </b-row>
            </b-container>
        </b-card>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import KFUser from "@/app/client/KFUser";
    import UserStatusToolbox from "@/components/admin/admintools/UserStatusToolbox.vue";

    /**
     *  The AdminControlComponent component.
     *  @author diego
     *  @created 30.08.2020 16:33
     */
    @Component({
        components: {UserStatusToolbox}
    })
    export default class AdminControlComponent extends Vue {
        @Prop() user!: KFUser;
        @Prop({required: true}) setStudentStatus!: unknown;
    }
</script>

<style lang="scss" scoped>
    .view-AdminControlComponent {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 10000;
    }
</style>