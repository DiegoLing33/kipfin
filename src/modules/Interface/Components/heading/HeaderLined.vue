<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import {CreateElement} from "vue";
    import {VNodeData} from "vue/types/vnode";

    @Component
    export default class HeaderLined extends Vue {
        @Prop({required: false, default: ''}) title!: string;
        @Prop({required: false, default: ''}) description!: string;

        /**
         * Renders the view
         * @param h
         */
        render(h: CreateElement) {
            const rootNode: VNodeData = {
                staticClass: "view-HeaderLined"
            }
            const $titleNode: VNodeData = {
                staticClass: "title",
            };
            const $descriptionNode: VNodeData = {
                staticClass: "description text-muted",
            };
            return h("div", rootNode, [
                h("div", $titleNode, [this.title, this.$slots['default'] || null]),
                h("div", $descriptionNode, [this.description, this.$slots["description"] || null]),
            ]);
        }
    }
</script>
