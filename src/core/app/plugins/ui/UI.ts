import Vue from "vue";

export default class UI {
    /**
     * Shared event bus
     */
    public static eventBus = new Vue();

    /**
     * Emits the error
     * @param text
     */
    public static error(text: string){
        UI.eventBus.$emit("ui::error", text);
    }

    public static setup(context: Vue){
        UI.eventBus.$on("ui::error", (e: string) => {
            context.$store.commit("error", e);
        });
    }

    /**
     * Runs the async transaction
     * @param handler
     */
    public static async transaction(handler: () => void){
        try {
            return await handler();
        }catch (e) {
            UI.error(e);
        }
    }
}