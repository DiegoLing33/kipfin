<template>
    <b-tabs content-class="mt-3" justified>
        <profile-tab :active="activeTab === 'board'" title="Объявления">
            <template #icon>
                <b-icon-bell/>
            </template>
            <b-alert
                    :show="true"
                    :variant="$app.studentStatus.variant[user.raw.studentStatus]"
            >
                <h4>{{$app.studentStatus.text[user.raw.studentStatus]}}</h4>
                <p>Состояние Вашей анкеты</p>
            </b-alert>
            <user-comments-by-admission :user="user"/>
            <profile-board-tab/>
        </profile-tab>
        <profile-tab :active="activeTab === 'information'" :lazy="true" title="Информация">
            <template #icon>
                <b-icon-card-text/>
            </template>
            <profile-information-section
                    :editable="user.flags.isCanEdit() || $store.getters.hasAccess(7)"
                    :editable-private="$store.getters.hasAccess(7)"

                    :user-id="user.userId"
                    :user-group="user.group.groupTitle"
                    :lastname="user.lastname"
                    :name="user.name"
                    :surname="user.surname"
                    :birthday="user.raw.birthday"
                    :mail="user.raw.mail"
                    :phone="user.raw.phone"
                    :student-group="user.raw.studentGroup"
                    :student-identifier="user.raw.studentIdentifier"

                    :callback="onSave"/>
        </profile-tab>
        <profile-tab :active="activeTab === 'degree'" :lazy="true" title="Образование">
            <template #icon>
                <b-icon-book/>
            </template>
            <profile-education-section
                    :editable="user.flags.isCanEdit() || $store.getters.hasAccess(7)"
                    :editable-private="$store.getters.hasAccess(7)"

                    :school-address="user.raw.school.schoolAddress"
                    :school-date="user.raw.school.schoolDate"
                    :school-degree-code="user.raw.school.schoolDegreeCode"
                    :school-name="user.raw.school.schoolName"
                    :school-value="user.raw.school.schoolValue"

                    :callback="onSave"
            />
        </profile-tab>
        <profile-tab :active="activeTab === 'specialization'" :lazy="true" title="Специальность">
            <template #icon>
                <b-icon-diagram3/>
            </template>
            <profile-specialization-tab
                    :specialization-id="user.raw.facultyId"
                    :base-id="user.raw.studyBase"

                    :editable="user.flags.isCanEdit() || $store.getters.hasAccess(7)"
                    :editable-private="$store.getters.hasAccess(7)"
                    :callback="onSave"
            />
        </profile-tab>
        <profile-tab v-if="$store.getters.hasAccess(7)" :lazy="true" title="Управление">
            <template #icon>
                <b-icon-gear/>
            </template>
            <user-admin-settings :user="user"/>
        </profile-tab>
    </b-tabs>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import ProfileTab from "@/components/tabs/ProfileTabs/ProfileTab.vue";
    import ProfileBoardTab from "@/components/profile/ProfileTabs/ProfileBoardTab.vue";
    import ProfileInformationSection from "@/components/profile/ProfileInformationSection.vue";
    import ProfileEducationSection from "@/components/profile/ProfileEducationSection.vue";
    import ProfileSpecializationTab from "@/components/profile/ProfileTabs/ProfileSpecializationTab.vue";
    import UserAdminSettings from "@/components/admin/UserAdminSettings.vue";
    import KFUser from "@/app/client/KFUser";
    import UserCommentsByAdmission from "@/components/profile/UserCommentsByAdmission.vue";

    type ProfileTabName = 'specialization' | 'board' | 'information' | 'degree';

    /**
     *  The ProfileSectionTabs component.
     *  @author diego
     *  @created 30.08.2020 16:15
     */
    @Component({
        components: {
            UserCommentsByAdmission,
            UserAdminSettings,
            ProfileSpecializationTab,
            ProfileEducationSection, ProfileInformationSection, ProfileBoardTab, ProfileTab}
    })
    export default class ProfileSectionTabs extends Vue {
        @Prop({required: true}) user!: KFUser;
        @Prop({default: 'information'}) activeTab!: ProfileTabName;
        @Prop() onSave!: never;
    }
</script>

<style scoped>

</style>