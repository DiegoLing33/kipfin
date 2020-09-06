<template>
    <content-body :should-has-access="7">
        <user-content class="view-AdmissionHome" title="Приемная комиссия">
            <img
                    class="d-block"
                    height="300px"
                    style="margin: 0 auto"
                    src="../Images/home.jpg"
                    alt="Admission home image">
            <b-row>
                <b-col class="mb-2">
                    <b-button
                            @click="$router.push('/admission/list')"
                            class="mb-2" block variant="info">
                        <b-icon-list/>
                        Анкеты на поступление
                    </b-button>
                    <box-hint class="w-100">
                        Просмотреть анкеты, отправленные абитуриентами
                    </box-hint>
                </b-col>
                <b-col class="mb-2">
                    <b-button
                            @click="$router.push('/admission/feed/files')"
                            class="mb-2" block variant="info">
                        <b-icon-upload/>
                        Feed Файлов
                    </b-button>
                    <box-hint class="w-100">
                        Просмотреть файлы, которые отправляли абитуриенты
                    </box-hint>
                </b-col>
            </b-row>
        </user-content>
    </content-body>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import UserContent from "@/modules/Interface/Components/UserContent.vue";
    import TextSmallMuted from "@/modules/Interface/Components/text/TextSmallMuted.vue";
    import BoxHint from "@/modules/Interface/Components/BoxHint.vue";
    import ContentBody from "@/modules/Security/Components/ContentBody.vue";

    /**
     *  The AdmissionHome component.
     *  @author diego
     *  @created 06.09.2020 19:35
     */
    @Component({
        components: {ContentBody, BoxHint, TextSmallMuted, UserContent}
    })
    export default class AdmissionHome extends Vue {

    }
</script>

<style scoped>

</style>