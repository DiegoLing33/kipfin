<template>
    <div>
        <b-card :border-variant="done ? 'success' : 'default'">
            <div>
                {{title}}
            </div>
            <b-form-group>
                <b-form-tags v-model="value" class="mt-3" no-outer-focus
                             style="background-color: transparent;border: none;padding: 0;">
                    <template v-slot="{ tags, disabled, addTag, removeTag }">
                        <ul v-if="tags.length > 0" class="list-inline d-inline-block mb-2">
                            <li v-for="tag in tags" :key="tag" class="list-inline-item">
                                <b-form-tag
                                        @remove="removeTag(tag)"
                                        :title="tag"
                                        :disabled="disabled"
                                        variant="info"
                                >{{ tag }}
                                </b-form-tag>
                            </li>
                        </ul>

                        <b-dropdown :disabled="disabled" size="sm" variant="primary" block menu-class="w-100">
                            <template v-slot:button-content>
                                Выбрать
                            </template>
                            <b-dropdown-form @submit.stop.prevent="() => {}">
                                <b-form-group
                                        :label-for="('tag-search-input'+name)"
                                        label-cols-md="auto"
                                        class="mb-0"
                                        label-size="sm"
                                        :disabled="disabled"
                                >
                                    <b-form-input
                                            :autofocus="true"
                                            v-model="search"
                                            id="('tag-search-input'+name)"
                                            type="search"
                                            size="sm"
                                            placeholder="Начните писать..."
                                    ></b-form-input>
                                </b-form-group>
                            </b-dropdown-form>
                            <hr/>
                            <div style="max-height: 200px; overflow-y: scroll">
                                <b-dropdown-item-button
                                        v-for="option in availableOptions()"
                                        :key="option.title"
                                        @click="onOptionClick({ option, addTag })"
                                >
                                    {{ option.title }}
                                </b-dropdown-item-button>
                            </div>

                        </b-dropdown>
                    </template>
                    <b-dropdown-text v-if="availableOptions().length === 0">
                        Не выбран ни один участник гильдии
                    </b-dropdown-text>
                </b-form-tags>
            </b-form-group>
        </b-card>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue, Watch} from "vue-property-decorator";
    import {OptionValue} from "@/core/app/types";

    @Component
    export default class FormSelectionInput extends Vue {
        @Prop({default: []}) readonly options!: Array<OptionValue>;
        @Prop({default: ""}) readonly title!: string;
        @Prop({default: ""}) readonly name!: string;
        @Prop({default: false}) readonly disabled!: boolean;
        @Prop({default: false}) readonly done!: boolean;

        private search = '';
        private value: string[] = [];

        @Watch("value")
        private valueChanged() {
            this.$emit("selected", this.value.map(v => {
                return (this.options.find(o => o.title === v));
            }));
        }


        criteria(): string {
            return this.search.trim().toLowerCase();
        }

        availableOptions() {
            const criteria = this.criteria()
            const options = this.options.filter(opt => this.value.indexOf(opt.title!) === -1)
                .sort((a: OptionValue, b: OptionValue) => {
                    return a.title!.localeCompare(b.title!);
                })
            if (criteria) {
                return options.filter(opt => opt.title!.toLowerCase().indexOf(criteria) > -1);
            }
            return options
        }

        onOptionClick(value: any) {
            value.addTag(value.option.title)
            this.search = ''
        }
    }
</script>

<style scoped>
</style>