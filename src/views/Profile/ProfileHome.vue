<template>
    <user-content v-if="user.userId !== '-1'">
        <template v-slot:header>
            <user-avatar-box :large="true" :image-first="true" :user="user"></user-avatar-box>
            <div class="mt-3">
            <b-button v-if="isItMe" class="control mr-2" @click="$router.push('/profile/settings')">
                <b-icon-gear-fill /> Настройки
            </b-button>
            <b-button v-if="isItMe" class="control mr-2" @click="$router.push('/profile/chat')">
                <b-icon-chat /> Сообщения
            </b-button>
            <b-button v-if="!isItMe" class="control mr-2" @click="$router.push('/profile/chat')">
                <b-icon-chat-dots /> Написать сообщение
            </b-button>
            </div>
        </template>

        <div v-if="user.userId === $store.state.currentUser.userId || $store.getters.isAdmin">
            <b-tabs content-class="mt-3" justified>
                <b-tab title="Информация" active>
                    <profile-information-section :user="user" :callback="userSaveCallback" />
                </b-tab>
                <b-tab title="Образование">
                    <profile-education-section :user="user"  :callback="userSaveCallback"/>
                </b-tab>
                <b-tab title="Специальность">
                    <profile-specialization-section :user="user"  :callback="userSaveCallback" />
                </b-tab>
            </b-tabs>
        </div>
        <div v-else class="text-muted text-center p-4">
            Здесь пока что ничего нет...
        </div>
    </user-content>
</template>

<script lang="ts">
    import {Component, Watch} from "vue-property-decorator";
    import ProfileEducationSection from "@/components/profile/ProfileEducationSection.vue";
    import UserTable from "@/components/profile/editabletables/UserTable.vue";
    import UserAvatarBox from "@/components/userbox/UserAvatarBox.vue";
    import ProfileSpecializationSection from "@/components/profile/ProfileSpecializationSection.vue";
    import ProfileInformationSection from "@/components/profile/ProfileInformationSection.vue";
    import {mixins} from "vue-class-component";
    import UserWorkerComponent from "@/components/mixins/UserWorkerComponent.vue";
    import StoreLoader from "@/app/client/StoreLoader";
    import FiText from "@/ling/components/ficomponents/FiText.vue";
    import UserContent from "@/components/theme/UserContent.vue";

    @Component({
        components: {
            UserContent,
            FiText,
            ProfileInformationSection,
            ProfileSpecializationSection, UserAvatarBox, UserTable, ProfileEducationSection}
    })
    export default class ProfileHome extends mixins<UserWorkerComponent>(UserWorkerComponent) {
        getUserId(){
            const id = this.$route.params['id'];
            if(!id) return null;
            return id === this.$store.state.currentUser.userId ? null : id;
        }
        mounted(){
            StoreLoader.wait(this.$store, ()=>{
                this.update();
            });
        }

        @Watch("$route")
        onRoute(){
            window.location.reload();
        }
    }
</script>

<style scoped>

</style>