<template>
    <user-content
            title="Документы"
            description="Хранилище документов"
    >
        <user-documents-view :source="files"/>
        <file-uploader-view/>
    </user-content>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import StoreLoader from "@/client/StoreLoader";
    import SelectField from "@/components/fields/SelectField.vue";
    import FormFileInput from "@/components/form/FormFileInput.vue";
    import FileUploaderView from "@/components/forms/FileUploaderView.vue";
    import FileView from "@/components/files/FileView.vue";
    import UserDocumentsView from "@/components/UserDocumentsView.vue";
    import {APIFileResult} from "@/api/APIFiles";
    import PSPUtils from "@/utils/PSPUtils";
    import {Dict} from "@/app/types";
    import UserContent from "@/components/theme/UserContent.vue";
    @Component({
        components: {UserContent, UserDocumentsView, FileView, FileUploaderView, FormFileInput, SelectField}
    })
    export default class ProfileDocuments extends Vue {
        private files: Dict<APIFileResult[]> = {};

        mounted() {
            StoreLoader.wait(this.$store, () => {
                this.files = PSPUtils.groupItems(this.$store.state.currentUser.getFiles());
            });
        }
    }
</script>

<style scoped>

</style>