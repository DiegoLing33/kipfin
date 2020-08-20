<template>
    <b-table-simple no-border-collapse>
        <b-tbody>
            <b-tr>
                <b-td style="width: 40%;" class="align-middle">
                    <b class="d-block">Специальность</b>
                    <text-small-muted>
                        Выберите специальность на которой Вы будете учиться
                    </text-small-muted>
                </b-td>
                <b-td class="align-middle">
                    <select-box
                        @change="onSpecializationChanged"
                        :disabled="!user.flags.isCanFacultyEdit()"
                        label-title="-- Выберите специальность --"
                        :default-value="user.raw.facultyId"
                        :options="$app.specializationsClear"/>
                </b-td>
            </b-tr>
            <b-tr>
                <b-td style="width: 40%;" class="align-middle">
                    <b class="d-block">Основа обучения</b>
                    <text-small-muted>
                        Выберите основу обучения
                    </text-small-muted>
                </b-td>
                <b-td class="align-middle">
                    <select-box
                        ref="baseBox"
                        @change="onBaseChanged"
                        :disabled="!user.flags.isCanFacultyEdit()"
                        label-title="-- Выберите основу обучения --"
                        :default-value="user.raw.studyBase"
                        :options="$app.basesClear"/>
                </b-td>
            </b-tr>
        </b-tbody>
    </b-table-simple>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";
import KFUser from "@/app/client/KFUser";
import SelectBox, {SelectBoxValidOption} from "@/ling/components/SelectBox.vue";
import TextSmallMuted from "@/components/text/TextSmallMuted.vue";

@Component({
    components: {TextSmallMuted, SelectBox}
})
export default class ProfileSpecializationSection extends Vue {
    @Prop({required: true}) user!: KFUser;
    @Prop({default: () => true}) callback!: (name: string, value: unknown) => Promise<boolean>;
    private selectedBase: unknown = null;

    private async onSpecializationChanged(value: SelectBoxValidOption) {
        try {
            console.log(5);
            await this.callback("facultyId", value.value);
            this.$toast.success("Установлена специальность: " + value.text);

            (this.$refs["baseBox"] as SelectBox).clear();
            this.$emit("change", "facultyId", value.value);
        } catch (e) {
            this.$toast.error(e);
        }
    }

    private async onBaseChanged(value: SelectBoxValidOption) {
        try {
            await this.callback("studyBase", value.value);
            this.$toast.success("Установлена основа обучения: " + value.text);
            this.selectedBase = null;
            this.$emit("change", "studyBase", value.value);
        } catch (e) {
            this.$toast.error(e);
        }
    }
}
</script>

<style scoped>
td {
    border: none !important;
}
</style>