<template>
        <b-table-simple no-border-collapse>
            <b-tbody>
                <b-tr>
                    <b-td style="width: 40%; max-width: 40%;" class="align-middle">
                        <b class="d-block">Специальность</b>
                        <text-small-muted>
                            Выберите специальность на которой Вы будете учиться
                        </text-small-muted>
                    </b-td>
                    <b-td class="align-middle">
                        <select-box
                                @change="onSpecializationChange"
                                :disabled="disabled"
                                label-title="-- Выберите специальность --"
                                :default-value="specializationId"
                                :options="$app.specializationsClear"/>
                    </b-td>
                </b-tr>
                <b-tr>
                    <b-td style="width: 40%; max-width: 40%;" class="align-middle">
                        <b class="d-block">Основа обучения</b>
                        <text-small-muted>
                            Выберите основу обучения
                        </text-small-muted>
                    </b-td>
                    <b-td class="align-middle">
                        <select-box
                                ref="baseBox"
                                @change="onBaseChange"
                                :disabled="disabled"
                                label-title="-- Выберите основу обучения --"
                                :default-value="baseId"
                                :options="$app.basesClear"/>
                    </b-td>
                </b-tr>
            </b-tbody>
        </b-table-simple>
</template>

<script lang="ts">
    import {Component, Prop, Vue, Watch} from "vue-property-decorator";
    import TextSmallMuted from "@/components/text/TextSmallMuted.vue";
    import SelectBox from "@/ling/components/SelectBox/SelectBox.vue";
    import {SelectBoxValidOption} from "@/ling/components/SelectBox/SelectBoxCommon";

    /**
     *  The StudentSpecializationComponent component.
     *  @author diego
     *  @created 21.08.2020 00:30
     */
    @Component({
        components: {SelectBox, TextSmallMuted}
    })
    export default class StudentSpecializationComponent extends Vue {
        @Prop({default: true}) disabled!: boolean;
        @Prop({required: false, default: ""}) specializationId!: string;
        @Prop({required: false, default: ""}) baseId!: string;

        protected onSpecializationChange(v: SelectBoxValidOption){
            this.$emit('changeSpecialization', v.value || null);
        }

        protected onBaseChange(v: SelectBoxValidOption){
            this.$emit('changeBase', v.value || null);
        }
    }
</script>

<style scoped>
    td{
        border: none !important;
    }
</style>