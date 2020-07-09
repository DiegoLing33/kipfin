<template>
    <div class="view-UserCommentsByAdmission">
        <div v-if="(comment === null || comment.userId === '-1')">
            В ходе обработки Вашей анкеты, у нас могут возникнуть вопросы или комментарии. Мы будем оставлять их здесь.
            - <span class="text-info">@приемнаяКомиссияКипфин</span>
        </div>
        <div v-else>
            <b-alert variant="danger" :show="true">
                <div style="border-bottom: 1px dashed lightgray; width: 100%; padding-bottom: 10px">
                    {{comment.commentText}}
                </div>
                <small class="d-block mt-2 text-muted">{{comment.commentTime}} (Сообщил: {{comment.sender.groupTitle}}
                    #{{comment.userId}})</small>
            </b-alert>
        </div>
        <div v-if="$store.getters.isAdmin">
            <b-overlay :show="adminBusy">
                <b-textarea v-model="inputText"
                            rows="4"
                            class="mt-3"
                            placeholder="Введите комментарий для абитуриента"></b-textarea>
                <small class="text-muted my-2 d-block">
                    Автор комментария [Как Вас будет видеть пользователь] - <b>{{$store.state.currentUser.group.groupTitle}}
                    # {{$store.state.currentUser.userId}}</b>
                    <br/>
                    Вы: {{$store.state.currentUser.getFullName()}}
                </small>
                <b-button :disabled="inputText === ''" @click="send" class="mt-1" variant="primary">Отправить
                    комментарий
                </b-button>
            </b-overlay>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import API from "@/api/API";
    import KFUser from "@/client/KFUser";

    @Component
    export default class UserCommentsByAdmission extends Vue {
        @Prop() user!: KFUser;
        private inputText = "";
        private adminBusy = false;
        private comment: unknown | null = null;

        private mounted() {
            this.update();
        }

        private update() {
            this.$transaction(this, async () => {
                this.comment = await API.request("mission.getLastComment", {userId: this.user.userId});
            });
        }

        private async send() {
            this.adminBusy = true;
            await this.$transaction(this, async () => {
                await API.request("mission.addComment", {
                    forUserId: this.user.userId,
                    commentText: this.inputText
                });
                this.update();
                this.$bvToast.toast("Комментарий отправлен", {title: "Успех!"})
            });
            this.inputText = '';
            this.adminBusy = false;
        }
    }
</script>

<style scoped>
</style>