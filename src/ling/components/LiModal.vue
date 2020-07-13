<template>
    <b-modal
            ok-only
            :class="(text ? 'modal-text' : '')"
            :size="size" scrollable no-enforce-focus :id="(`m_${name}`)">
        <template v-slot:modal-header>
            <div class="custom-modal-title">{{title}}</div>
            <div class="custom-modal-close" @click="close">&times;</div>
        </template>
        <slot></slot>
        <template v-slot:modal-footer>
            <b-button v-if="closeButton" @click="close">Понятно</b-button>
            <slot name="footer"></slot>
        </template>
    </b-modal>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";

    /**
     *  The LiModal component.
     *  @author diego
     *  @created 06.07.2020 23:17
     */
    @Component
    export default class LiModal extends Vue {
        @Prop({required: true}) name!: string;
        @Prop({required: false, default: ''}) title!: string;
        @Prop({default: "md"}) size!: string;
        @Prop({default: false}) closeButton!: boolean;
        @Prop({default: false}) busy!: boolean;
        @Prop({default: true}) text!: boolean;

        /**
         * Shows the modal
         */
        public show() {
            this.$bvModal.show('m_' + this.name);
        }

        /**
         * Hides the modal
         */
        public close() {
            this.$bvModal.hide('m_' + this.name);
        }
    }
</script>

<style scoped>

</style>