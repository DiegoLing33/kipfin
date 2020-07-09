<template>
    <div v-if="$store.state.ready">
        <admin-menu
                v-if="$store.getters.isAdmin"
                :title="title"
                :description="description"
                :overlay="overlay"
        >
            <slot></slot>
        </admin-menu>
        <profile-menu
                v-else
                :title="title"
                :description="description"
                :overlay="overlay"
        >
            <slot></slot>
        </profile-menu>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import ProfileMenu from "@/components/profile/ProfileMenu.vue";
    import AdminMenu from "@/components/AdminMenu.vue";

    @Component({
        components: {AdminMenu, ProfileMenu}
    })
    export default class UserContainer extends Vue {
        @Prop({default: false, required: false}) overlay!: boolean;
        @Prop({default: "", required: false}) title!: string;
        @Prop({default: "", required: false}) description!: string;
    }
</script>

<style scoped>
</style>