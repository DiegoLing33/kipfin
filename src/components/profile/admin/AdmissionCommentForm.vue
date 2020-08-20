<template>
    <div v-if="$store.getters.isAdmin">
        <b-overlay :show="adminBusy">
            <b-textarea v-model="inputText"
                        rows="4"
                        class="mt-3"
                        placeholder="Введите комментарий для абитуриента"></b-textarea>
            <small class="text-muted my-2 d-block">
                Автор комментария [Как Вас будет видеть пользователь] - <b>{{$store.getters.user.group.groupTitle}}
                # {{$store.getters.user.userId}}</b>
                <br/>
                Вы: {{$store.getters.user.getFullName()}}
            </small>
            <b-button :disabled="inputText === ''" @click="send" class="mt-1" variant="primary">Отправить
                комментарий
            </b-button>
        </b-overlay>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import KFUser from "@/app/client/KFUser";
    import API from "@/app/api/API";

    /**
     *  The AdmissionCommentForm component.
     *  @author diego
     *  @created 21.08.2020 02:07
     */
    @Component
    export default class AdmissionCommentForm extends Vue {
        @Prop() user!: KFUser;
        private inputText = "";
        private adminBusy = false;

        private async send() {
            this.adminBusy = true;
            await this.$transaction(async () => {
                await API.request("mission.addComment", {
                    forUserId: this.user.userId,
                    commentText: this.inputText
                });
                this.$emit("update");
                this.$bvToast.toast("Комментарий отправлен", {title: "Успех!"})
            });
            this.inputText = '';
            this.adminBusy = false;
        }
    }
</script>

<style scoped>

</style>