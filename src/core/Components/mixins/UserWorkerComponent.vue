<template>
    <div class="view-UserWorkerComponent"></div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import API from "@/core/app/api/API";
    import KFUser from "@/modules/Users/Common/KFUser";

    @Component
    export default class UserWorkerComponent extends Vue {
        protected user: KFUser = KFUser.createZeroUser();

        protected getUserId(): string | number | null {
            return this.$store.getters.user.userId;
        }

        protected get isItMe(){
            return this.user.userId === this.$store.getters.user.userId;
        }

        /**
         * Updates the information
         */
        protected async update() {
            if (this.getUserId() === null) {
                this.user = this.$store.getters.user;
            } else {
                this.user = new KFUser(await API.users.get(this.getUserId() as any));
            }
        }

        /**
         * Saves information callback
         * @param field
         * @param value
         */
        protected userSaveCallback(field: string, value: string) {
            return new Promise(resolve => {
                API.mission.setField(field, value, this.user.userId, this.$store.getters.isAdmin)
                    .then(async () => {
                        resolve(true);
                        await this.update();
                        this.$bvToast.toast("Изменения сохранены!", {title: "Успех"});
                    })
                    .catch(reason => {
                        this.$bvToast.toast(reason, {title: "Ошибка"});
                        resolve(false);
                    });
            });
        }
    }
</script>

<style scoped>

</style>