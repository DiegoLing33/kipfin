<template>
    <user-content
            title="Лента файлов"
            description="Информация о загрузке файлов абитуриентами"
    >
        <user-documents-view
                :go-user-by-click="true"
                :show-tips="false" :source="source"></user-documents-view>
    </user-content>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import API from "@/api/API";
    import StoreLoader from "@/client/StoreLoader";
    import UserDocumentsView from "@/components/UserDocumentsView.vue";
    import PSPUtils from "@/utils/PSPUtils";
    import {Dict} from "@/app/types";
    import UserContent from "@/components/theme/UserContent.vue";

    @Component({
        components: {UserContent, UserDocumentsView}
    })
    export default class AdminFilesFeed extends Vue {
        private source: Dict<any> = {};

        mounted() {
            StoreLoader.wait(this.$store, () => {
                this.update();
            });
        }

        update() {
            this.$transaction(this, async () => {
                const list = (await API.request("files.listByType", {
                    type: 'agree'
                })).list;
                const list2 = (await API.request("files.listByType", {
                    type: 'notify'
                })).list;
                this.source = PSPUtils.groupItems([...list, ...list2]);
            });
        }
    }
</script>

<style scoped>

</style>