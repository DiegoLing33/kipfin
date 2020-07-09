<template>
    <b-table-simple no-border-collapse>
        <caption class="text-center">
            {{title}}
        </caption>
        <b-tbody>
            <b-tr v-for="(item, key) of fields" :key="key+'_field'">
                <b-td style="width: 40%;" class="align-middle">
                    <b class="d-block">{{item[0].replace('|', '')}}</b>
                    <small v-if="item[3] !== undefined" class="text-muted">{{item[3]}}</small>
                </b-td>
                <b-td class="align-middle">
                    <template v-if="item[0].startsWith('|')">
                        <fi-select
                                :disabled="item[2]"
                                :default-value="source[key]"
                                :map="item[4]"
                                :callback="(value => callback(key, value))"
                        />
                    </template>
                    <template v-else-if="item[4] instanceof Date">
                        <fi-date-picker
                                :disabled="item[2]"
                                :default-value="source[key]"
                                :callback="(value => callback(key, value))"
                        />
                    </template>
                    <template v-else>
                        <fi-text
                            :disabled="item[2]"
                            :default-value="source[key]"
                            :formatter="item[1] || ((e) => e)"
                            :callback="(value => callback(key, value))"
                        />
                    </template>
                </b-td>
            </b-tr>
        </b-tbody>
    </b-table-simple>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import {Dict} from "@/app/types";
    import FiText from "@/ling/components/ficomponents/FiText.vue";
    import FiSelect from "@/ling/components/ficomponents/FiSelect.vue";
    import FiDatePicker from "@/ling/components/ficomponents/FiDatePicker.vue";

    @Component({
        components: {FiDatePicker, FiSelect, FiText}
    })
    export default class InfoTableView extends Vue {

        @Prop({required: false, default: ''}) title!: string;
        @Prop({required: true}) source!: any;
        @Prop({required: true}) fields!: Dict<[string, ((e: string) => string)?]>;
        @Prop({default: () => true}) callback!: (name: string, value: unknown) => Promise<boolean>;

    }
</script>

<style scoped>
    td{
        border: none !important;
    }
</style>