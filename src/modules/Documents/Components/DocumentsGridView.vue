<template>
    <b-overlay :show="busy">
        <div v-for="(item,name) of groups" :key="name" class="mb-1">
            <b-button block @click.prevent="" v-b-toggle :href="(`#cat-${name}`)" variant="info" class="text-left">
                Файлы: {{getCategoryName(name)}}
                <template v-if="messages[name]"><small><i>({{messages[name]}})</i></small></template>
            </b-button>
            <b-collapse
                    :id="(`cat-${name}`)"
                    v-model="visibility[name]" class="mt-1">
                <div class="box-container">
                    <document-view
                            v-for="file of item"
                            :key="file.fileId"
                            :document="file"
                            @selected="onFileClick"
                    />
                </div>
            </b-collapse>
        </div>
        <div v-if="documents.length === 0" class="p-3 text-center text-muted">
            Файлы еще не были загружены
        </div>
        <document-modal-view @updated="update" ref="modal"/>
    </b-overlay>
</template>

<script lang="ts">
    import {Component, Prop, Vue, Watch} from "vue-property-decorator";
    import KFDocument from "@/modules/Documents/Common/KFDocument";
    import DocumentView from "@/modules/Documents/Components/DocumentView.vue";
    import PSPUtils from "@/modules/Users/Utils/PSPUtils";
    import {NameList} from "@/core/Common/Common";
    import CountedString from "@/core/Common/CountedString";
    import LiModal from "@/modules/ling/components/LiModal.vue";
    import FiSelect from "@/modules/ling/components/ficomponents/FiSelect.vue";
    import FileUploaderView from "@/modules/Documents/Components/FileUploaderView.vue";
    import DocumentModalView from "@/modules/Documents/Components/DocumentModalView.vue";

    /**
     *  The DocumentsGridView component.
     *  @author diego
     *  @created 06.07.2020 19:43
     */
    @Component({
        components: {DocumentModalView, FileUploaderView, FiSelect, LiModal, DocumentView}
    })
    export default class DocumentsGridView extends Vue {
        @Prop({required: true}) documents!: KFDocument[];
        @Prop({default: false}) goUserByClick!: boolean;
        @Prop({default: false}) busy!: boolean;
        @Prop({default: false}) hiddenDefault!: boolean;

        private visibility: NameList<boolean> = {};
        private groups: NameList<KFDocument[]> = {};
        private messages: NameList<string> = {};

        @Watch("documents")
        update() {
            const groups = PSPUtils.group(this.documents.filter(v => v.fileStatus > 0));
            this.visibility = {};
            this.messages = {};
            for (const key of Object.keys(groups)) {
                this.visibility[key] = !this.hiddenDefault;
                const docs = groups[key];
                let processed = 0;
                let error = 0;
                for (const doc of docs) {
                    // @fixme - Achievement hardcode
                    if (doc.storageName === 'ach') continue;
                    if (doc.fileStatus === 1) processed++;
                    if (doc.fileStatus === 3) error++;
                }
                if (error > 0) this.messages[key] = `${error} ${CountedString.get(error, 'файл', 'файла', 'файлов')} с ошибкой`
                if (processed > 0) this.messages[key] = `${processed} ${CountedString.get(processed, 'файл', 'файла', 'файлов')} в обработке`
            }
            this.groups = groups;
        }

        getCategoryName(name: string) {
            return KFDocument.getStorageTranslatedName(name);
        }

        private onFileClick(file: KFDocument) {
            if (this.goUserByClick)
                this.$router.push('/user/' + file.author.userId);
            else
                (this.$refs['modal'] as any).show(file);
        }
    }
</script>
<style>
    .box-container {
        user-select: none;
        display: flex;
        align-items: flex-start;
        flex-wrap: wrap;
    }
</style>