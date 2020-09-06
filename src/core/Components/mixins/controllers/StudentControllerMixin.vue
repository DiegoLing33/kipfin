<template>
    <div class="view-StudentControllerMixin"></div>
</template>

<script lang="ts">
    import {Component, Mixins} from "vue-property-decorator";
    import UIControllerMixin from "@/core/Components/mixins/controllers/UIControllerMixin.vue";
    import {nameList, Numeric} from "@/core/Common/Common";
    import API from "@/core/app/api/API";
    import KFUser from "@/modules/Users/Common/KFUser";

    /**
     *  The StudentControllerMixin component.
     *  @author diego
     *  @created 21.08.2020 00:53
     */
    @Component
    export default class StudentControllerMixin extends Mixins(UIControllerMixin) {

        public async studentSetSpecialization(user: KFUser, specializationId: Numeric) {
            try {
                const args = nameList({specialization: specializationId});
                if (this.$store.getters.isAdmin) args["userId"] = user.userId;

                // User update
                user.set("specializationId", specializationId);
                user.set("baseId", "0");

                await API.request("mission.setSpecialization", args);
                this.$toast.success("Специальность установлена: " +
                    this.$app.specializationNoCode[specializationId]);

                return Promise.resolve(true);
            } catch (e) {
                this.$toast.error(e, {duration: 10000});
                // return Promise.reject(e);
                return Promise.resolve(false);
            }
        }

        public async studentSetBase(user: KFUser, baseId: Numeric) {
            try {
                const args = nameList({base: baseId});
                if (this.$store.getters.isAdmin) args["userId"] = user.userId;

                await API.request("mission.setBase", args);
                this.$toast.success("Основа обучения: " + this.$app.bases[baseId]);

                // User update
                user.set("baseId", baseId);
                return Promise.resolve(true);
            } catch (e) {
                this.$toast.error(e, {duration: 10000});
                return Promise.resolve(false);
            }
        }

    }
</script>

<style scoped>

</style>