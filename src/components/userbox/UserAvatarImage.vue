<template>
    <div class="view-UserAvatarImage" :style="avatarBackgroundOption"></div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import KFUser from "@/client/KFUser";

    @Component
    export default class UserAvatarImage extends Vue {
        @Prop({default: '40px'}) size!: string;
        @Prop({default: '0'}) borderRadius!: string;
        @Prop({required: true}) user!: KFUser;

        get avatarBackgroundOption() {
            return {
                width: this.size,
                borderRadius: this.borderRadius,
                height: this.size,
                backgroundImage: `url(${this.avatarUrl})`,
                backgroundSize: 'cover', backgroundRepeat: 'no-repeat no-repeat'
            };
        }

        get avatarUrl() {
            if (this.user.avatar && this.user.avatar.length > 7)
                return 'http://kipfin.ru/new/files/avatar/' + this.user.avatar;
            return '/img/no-image.png';
        }

    }
</script>

<style scoped>

</style>