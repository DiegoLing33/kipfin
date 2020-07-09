<template>
    <div v-if="visibility" :class="(`ui-modal-bg`)" @click="onClickBackground">
        <div class="ui-modal-frame">
            <transition name="bounce">
                <div :class="(`ui-modal ${size}`)" v-if="showModal">
                    <button @click="close" class="ui-reset" type="button">
                        <b-icon-x/>
                    </button>
                    <b-overlay :show="busy">
                        <div class="ui-title">
                            {{title}}
                            <slot name="title"></slot>
                        </div>
                        <div class="modal-body my-4 w-100">
                            <slot></slot>
                        </div>
                        <b-button v-if="closeButton" @click="close">Понятно</b-button>
                        <slot name="footer"></slot>
                    </b-overlay>
                </div>
            </transition>
        </div>
    </div>
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
        @Prop({required: false, default: ''}) title!: string;
        @Prop({default: "md"}) size!: string;
        @Prop({default: false}) closeButton!: boolean;
        @Prop({default: false}) busy!: boolean;

        private visibility = false;
        private showModal = false;

        public show() {
            this.visibility = true;
            setTimeout(() => {
                this.showModal = true;
                (window as any).document.body.className = "modal-open";
            }, 100);
        }

        private onClickBackground(e: Event) {
            if (e.target && (e.target as any).className && (e.target as any).className.includes) {
                if ((e.target as any).className.includes('ui-modal-bg'))
                    this.close();
            }
        }

        public close() {
            this.visibility = false;
            this.showModal = false;
            (window as any).document.body.className = "";
        }
    }
</script>

<style scoped>
    .bounce-enter-active {
        animation: bounce-in .5s;
    }

    .bounce-leave-active {
        animation: bounce-in .5s reverse;
    }

    @keyframes bounce-in {
        0% {
            transform: translateY(-200px)
        }
        50% {
            transform: translateY(20px)
        }
        100% {
            transform: translateY(0)
        }
    }
</style>