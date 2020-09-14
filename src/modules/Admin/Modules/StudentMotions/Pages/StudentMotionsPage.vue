<template>
    <content-body :should-has-access="17">
        <user-content title="Движение студентов"
            description="В данном разделе отмечаются движения студентов между группами и их статусов"
        >
            <img
                style="display: block; margin: 0 auto; max-height: 200px;"
                src="../Images/Arrow.jpg" alt="Documents cloud icon"/>

            <b-row>
                <b-col>
                    <b-button
                        @click="$router.push('/admission/feed/files')"
                        class="mb-2" block variant="info">
                        <b-icon-people/>
                        Изменить группу
                    </b-button>
                    <box-hint class="w-100">
                        Перемещает студента в другую группу
                    </box-hint>
                </b-col>
                <b-col>
                    <b-button
                        @click="$router.push('/admission/feed/files')"
                        class="mb-2" block variant="info">
                        <b-icon-person-lines-fill/>
                        Изменить статус
                    </b-button>
                    <box-hint class="w-100">
                        Очислить, зачислить или внести другие изменения в статус
                    </box-hint>
                </b-col>
            </b-row>
            <h4 class="mt-3">Движения студентов</h4>
        </user-content>
    </content-body>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import ContentBody from "@/modules/Security/Components/ContentBody.vue";
import UserContent from "@/modules/Interface/Components/UserContent.vue";
import BoxHint from "@/modules/Interface/Components/BoxHint.vue";
@Component({
    components: {BoxHint, UserContent, ContentBody}
})
export default class StudentMotionsPage extends Vue {

}
</script>

<style scoped>

</style>