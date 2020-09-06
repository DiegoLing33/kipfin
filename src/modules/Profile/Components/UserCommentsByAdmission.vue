<template>
    <div class="view-UserCommentsByAdmission">
        <div v-if="(comment === null || comment.userId === '-1')">
            <b-alert variant="secondary" :show="true">
                В ходе обработки Вашей анкеты, у нас могут возникнуть вопросы или комментарии. Мы будем оставлять их
                прямо здесь (где сейчас находится это сообщение).
                - <span class="text-info">@приемнаяКомиссияКипфин</span>
            </b-alert>
        </div>
        <div v-else>
            <b-alert variant="danger" :show="true">
                <b>Последнее сообщение для Вас {{comment.commentTime}}:</b>
                <div style="border-bottom: 1px dashed lightgray; width: 100%; padding-bottom: 10px">
                    {{comment.commentText}}
                </div>
                <small class="d-block mt-2 text-muted">(Сообщил: {{comment.sender.groupTitle}}
                    #{{comment.userId}})</small>
            </b-alert>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import API from "@/core/app/api/API";
    import KFUser from "@/modules/Users/Common/KFUser";

    @Component
    export default class UserCommentsByAdmission extends Vue {
        @Prop() user!: KFUser;
        private comment: unknown | null = null;

        private mounted() {
            this.update();
        }

        private update() {
            this.$transaction(async () => {
                this.comment = await API.request("mission.getLastComment", {userId: this.user.userId});
            });
        }
    }
</script>

<style scoped>
</style>