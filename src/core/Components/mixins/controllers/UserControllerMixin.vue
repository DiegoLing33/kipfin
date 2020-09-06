<template>
    <div class="view-UserControllerMixin"></div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import {Numeric} from "@/core/Common/Common";
import API from "@/core/app/api/API";
import "@/core/app/plugins/ui/UIPlugin";

/**
 * User controller mixin
 */
@Component
export default class UserControllerMixin extends Vue {

    /**
     * Adds the new user tag
     * @param userId
     * @param tag
     * @param tags
     */
    addUserTag(userId: Numeric, tag: string, tags: string[]) {
        API.request("mission.setTags", {userId, tags: tags.join(',')}).then(result => {
            if (result.ok) this.$toast.open("Метка " + tag + " успешно добавлена!", {type: "success"});
        });
    }

    /**
     * Removes the user tag
     * @param userId
     * @param tag
     * @param tags
     */
    removeUserTag(userId: Numeric, tag: string, tags: string[]) {
        API.request("mission.setTags", {userId, tags: tags.join(',')}).then(result => {
            if (result.ok) this.$toast.open("Метка " + tag + " успешно удалена!", {type: "success"});
        });
    }

    /**
     * Sets the user field value
     * @param userId
     * @param field
     * @param value
     */
    setUserField(userId: string | undefined, field: string, value: unknown): Promise<boolean> {
        return new Promise(resolve => {
            API.mission.setField(field, value, userId, this.$store.getters.isAdmin)
                .then(() => resolve(true)).catch(() => resolve(false));
        });
    }
}
</script>

<style scoped>

</style>