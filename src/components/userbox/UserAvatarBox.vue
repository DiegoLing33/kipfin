<template>
    <div :class="('user-avatar-box ' + (light ? 'light-box ' : '')  + (large ? 'large-size' : ''))">
        <template v-if="imageFirst">
            <div class="avatar-cell cell">
                <user-avatar-image
                        :user="user"
                        :size="large ? '70px' : '40px'"
                        border-radius="50%"
                ></user-avatar-image>
            </div>
        </template>
        <div class="name-cell cell">
            <div class="main-name">{{$app.userUtils.getFullName(user)}}</div>
            <div :class="('text-muted small ' + (!imageFirst ? 'text-right' : ''))">
                {{user.group.groupTitle}} #{{user.userId}}
            </div>
        </div>
        <template v-if="!imageFirst">
            <div class="avatar-cell cell">
                <user-avatar-image
                        :user="user"
                        size="40px"
                        border-radius="50%"
                ></user-avatar-image>
            </div>
        </template>
    </div>
</template>

<script lang="ts">
    import {Component, Mixins, Prop} from "vue-property-decorator";
    import UserAvatarImage from "@/components/userbox/UserAvatarImage.js";
    import UserPropComponent from "@/components/mixins/UserPropComponent";
    
    @Component({
        components: {UserAvatarImage}
    })
    export default class UserAvatarBox extends Mixins(UserPropComponent) {
        @Prop({default: true}) imageFirst!: boolean;
        @Prop({default: false}) light!: boolean;
        @Prop({default: false}) large!: boolean;
        @Prop({default: true}) adaptive!: boolean;

        mounted() {
            // Adaptive screen
            if (this.adaptive && window.document.body.offsetWidth < 750) this.imageFirst = true;
        }
    }
</script>