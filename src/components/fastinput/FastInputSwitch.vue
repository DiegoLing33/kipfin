<template>
    <b-checkbox
            :disabled="disabled"
            v-model="model" @change="onChange" value="yes" unchecked-value="no" switch>
        <slot></slot>
    </b-checkbox>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";

    /**
     * @todo Get rid of it
     */
    @Component
    export default class FastInputSwitch extends Vue {
        @Prop({required: true}) pre!: boolean;
        @Prop({default: () => true}) callback!: (value: unknown) => Promise<boolean>;

        private model = this.pre ? 'yes' : 'no';
        private last = this.pre ? 'yes' : 'no';
        private disabled = false;

        private onChange(v: string) {
            if (this.disabled) return;
            this.disabled = true;
            this.callback(v=== 'yes').then(value => {
                if (value) this.last = this.model;
                else this.model = this.last;
            })
                .catch(() => this.model = this.last)
                .finally(() => this.disabled = false);
        }
    }
</script>

<style scoped>

</style>