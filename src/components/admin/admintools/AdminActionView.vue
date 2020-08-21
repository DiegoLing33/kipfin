<template>
    <div class="view-AdminActionView">
        <b-card class="mb-3" >
            <div>{{$app.userUtils.getFullName(action.sender)}}</div>
            <small class="d-block" v-if="action.actionName === '1c'">
                {{sg(action.sender.gender, 'Перенес', 'Перенесла')}}
                абитуриента
                <router-link :to="'/user/' + action.forUserId">{{action.forUserId}}</router-link>
                в 1С
            </small>
            <small class="d-block" v-if="action.actionName === 'work'">
                {{sg(action.sender.gender, 'Обработал', 'Обработала')}}
                абитуриента
                <router-link :to="'/user/' + action.forUserId">{{action.forUserId}}</router-link>
            </small>
            <small class="d-block" v-if="action.actionName === 'fieldSet'">
                {{st(action)}}
                абитуриента
                <router-link :to="'/user/' + action.forUserId">{{action.forUserId}}</router-link>
            </small>
            <small class="text-muted">{{action.actionTime}}</small>
        </b-card>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";

    @Component
    export default class AdminActionView extends Vue {
        @Prop() action!: any;

        private st(action: any){
            return this.sg(action.sender.gender, 'Изменил', 'Изменила') + " статус абитуриента на [" +
            this.$app.studentStatus.text[action.actionArgs.replace('studentStatus -> ', '').trim()] + ']'
        }

        private sg(gender: string, a: string, b: string) {
            return gender === '1' ? a : b;
        }
    }
</script>

<style scoped>

</style>