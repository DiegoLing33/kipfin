<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import {CreateElement, RenderContext} from "vue";
    import {VNodeData} from "vue/types/vnode";
    import {mergeData} from "vue-functional-data-merge";

    @Component
    export default class HeaderLined extends Vue {
        @Prop({required: false, default: ''}) title!: string;
        @Prop({required: false, default: ''}) description!: string;

        /**
         * Renders the view
         * @param h
         * @param context
         */
        render(h: CreateElement, context: RenderContext) {
            const $slots = context.slots();
            const rootNode: VNodeData = {
                staticClass: "view-HeaderLined"
            }
            const $titleNode: VNodeData = {
                staticClass: "title",
            };
            const $descriptionNode: VNodeData = {
                staticClass: "description text-muted",
            };
            return h("div", mergeData(context.data, rootNode), [
                h("div", $titleNode, [this.title, $slots["default"] || null]),
                h("div", $descriptionNode, [this.description, $slots["description"] || null]),
            ]);
        }
    }
</script>
