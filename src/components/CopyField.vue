<template>
    <div class="view-CopyField">
        <b-row>
            <b-col md="12"><b>{{label}}</b></b-col>
            <b-col md="12">
                <b-input-group>
                    <b-input trim readonly ref="inp" :value="value"/>
                    <b-input-group-append>
                        <b-button @click="copy">Копировать</b-button>
                    </b-input-group-append>
                </b-input-group>
                <small class="d-block my-2 text-muted">{{value}}</small>
            </b-col>
        </b-row>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";

    @Component
    export default class CopyField extends Vue {
        @Prop() value!: string;
        @Prop({default: ""}) label!: string;

        copy() {
            (this.$refs['inp'] as any).select();
            try {
                document.execCommand('copy');
                (window.getSelection() as any).removeAllRanges()
                this.$bvToast.toast("Скопировано: " + this.value, {title: "Good deal"});
            } catch (e) {
                this.$bvToast.toast(e, {title: "Ну вот..."});
            }
        }
    }
</script>

<style scoped>
</style>