<template>
    <user-content
            title="Лента файлов"
            description="Информация о загрузке файлов абитуриентами"
    >
        <content-placeholders v-if="isLoading">
            <content-placeholders-text :lines="3" />
        </content-placeholders>

        <documents-grid-view
                :hidden-default="true"
                :documents="source"
                :go-user-by-click="true"
        />
    </user-content>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import API from "@/app/api/API";
    import StoreLoader from "@/app/client/StoreLoader";
    import UserContent from "@/components/theme/UserContent.vue";
    import DocumentsGridView from "@/components/documents/DocumentsGridView.vue";
    import KFDocument from "@/app/client/KFDocument";

    @Component({
        components: {DocumentsGridView, UserContent}
    })
    export default class AdminFilesFeed extends Vue {
        private source: KFDocument[] = [];
        private isLoading = true;

        mounted() {
            StoreLoader.wait(this.$store, () => {
                this.update();
            });
        }

        update() {
            this.$transaction(async () => {
                const list3 = (await API.request("files.listByType", {
                    type: 'check'
                })).list;
                const list = (await API.request("files.listByType", {
                    type: 'agree'
                })).list;
                const list2 = (await API.request("files.listByType", {
                    type: 'notify'
                })).list;
                this.isLoading = false;
                this.source = KFDocument.fromList([...list, ...list2, ...list3]);
            });
        }
    }
</script>

<style scoped>

</style>