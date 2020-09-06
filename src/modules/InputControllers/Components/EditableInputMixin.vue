<script lang="ts">
    import {Component, Prop, Vue, Watch} from "vue-property-decorator";
    import {Nullable, Optional} from "@/core/Common/Common";
    import {EditableInputHandler} from "@/modules/InputControllers/Common/EditableInput";

    type StateType = 'edit' | 'read';
    type V4VFunc = (v: never) => never;
    type V4VFuncR = (v: never) => boolean | string;
    type ReformerFunction = null | V4VFunc | V4VFunc[];

    /**
     *  The EditableInputMixin component.
     *  @author diego
     *  @created 30.08.2020 02:11
     */
    @Component
    export default class EditableInputMixin extends Vue {
        @Prop({default: null}) value!: Nullable<string>;
        @Prop({default: 'read'}) state!: StateType;
        @Prop({default: false}) canEdit!: boolean;
        @Prop({default: ''}) placeholder!: string;

        @Prop({default: null}) callback!: Nullable<EditableInputHandler>;
        @Prop({default: null}) reformer!: ReformerFunction;
        @Prop({default: null}) preTest!: Nullable<V4VFuncR | V4VFuncR[]>;
        @Prop({default: null}) postReformer!: ReformerFunction;

        protected currentState: StateType = this.state;
        protected currentValue = this.value;
        protected lastValue = this.value;
        protected disabled = false;

        // Error marking
        protected isHandling = false;
        protected isError = false;
        protected errorTimer: any = null;

        //
        // Getters
        //
        get displayableValue() {
            if (this.currentValue !== null)
                return this.applyReformer(this.currentValue as never, this.postReformer);
            return null;
        }

        get isEditState() {
            return this.currentState === 'edit';
        }

        get isEmpty() {
            return this.currentValue === '' || this.currentValue === null;
        }

        //
        // Props updates
        //
        @Watch("value")
        onValueChanged() {
            this.currentValue = this.value;
        }

        @Watch("state")
        onStateChanged() {
            this.currentState = this.state;
        }

        //
        // Methods
        //
        protected toggleState() {
            if (!this.canEdit) return;
            if (this.currentState === 'read')
                this.currentState = 'edit';
            else {
                this.currentValue = this.applyReformer(this.currentValue as never, this.reformer);
                if (!this.applyPreTest(this.currentValue)) {
                    return this.startErrorTimer();
                }

                if (this.currentValue === this.lastValue)
                    return this.reset();
                if (this.callback) {
                    this.disabled = true;
                    this.isHandling = true;
                    this.callback(this.currentValue,
                        (result: boolean, message: Optional<string>) => {
                            this.isHandling = false;
                            this.disabled = false;
                            if (result) {
                                // Success case
                                this.lastValue = this.currentValue;
                                this.currentState = 'read';
                                if (message) this.$toast.success(message);
                            } else {
                                // Error case
                                if (message) this.$toast.error(message);
                                this.startErrorTimer();
                            }
                        });
                } else {
                    this.currentState = 'read';
                }
            }
        }

        protected applyPreTest(value: never) {
            if (this.preTest) {
                const tests = this.preTest instanceof Array ? this.preTest : [this.preTest];
                for (const f of tests) {
                    const result = f(value);
                    if (typeof result === 'string') {
                        this.$toast.error(result);
                        return false;
                    }

                }
            }
            return true;
        }

        protected applyReformer(value: never, reformers: ReformerFunction) {
            let nv = value;
            // Reformer --->
            if (reformers) {
                const nr: V4VFunc[] = reformers instanceof Array ? reformers : [reformers];
                nr.forEach(r => nv = r(nv))
            }
            // <---- Reformer
            return nv;
        }

        protected startErrorTimer() {
            if (this.errorTimer) clearTimeout(this.errorTimer);
            this.isError = true;
            this.errorTimer = setTimeout(() => {
                this.isError = false;
            }, 2500);
        }

        public reset() {
            this.currentValue = this.lastValue;
            this.currentState = 'read';

            this.isHandling = false;
            this.disabled = false;
        }

    }
</script>

<style scoped>

</style>