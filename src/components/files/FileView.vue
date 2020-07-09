<template>

    <div class="file-view p-2 text-center">
        <div @click="onClick">
            <b-icon-box-arrow-down variant="success" font-scale="4"
                                   v-if="file.file_status === '1000'"></b-icon-box-arrow-down>
            <b-icon-card-image class="m-3" font-scale="4" v-else/>
            <div>
                <div style="font-size: 12px">{{$app.fileTypes[cat] || cat}}-{{file.file_name.substr(0,
                    4)}}.{{file.file_name.split('.').pop()}}
                </div>
                <div><small class="text-muted">{{$app.userUtils.getFullName(file.author)}}</small></div>
                <small class="text-muted">{{file.created}}</small>
            </div>
            <b-badge v-if="file.file_type !== 'ach'" :variant="$app.infoStatus.variant[file.file_status]">
                {{$app.infoStatus.text[file.file_status]}}
            </b-badge>
            <b-badge v-if="file.file_type === 'ach'" variant="secondary">
                Загружено
            </b-badge>
        </div>
        <b-button @click="download" variant="link" size="sm">
            Скачать
            <b-icon-download/>
        </b-button>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import {APIFileResult} from "@/api/APIFiles";
    import API from "@/api/API";

    @Component
    export default class FileView extends Vue {
        @Prop() file!: APIFileResult;
        @Prop() cat!: string;

        private imagePath = this.file['file_id'] +
            (this.file.file_type === 'passport' ? '&encrypted=true' : '') +
            (this.file.file_ext.includes('pdf') ||
            this.file.file_ext.includes('docx') ? '&__pd' : '');
        private imageUrl = 'http://kipfin.ru/new/index.php?class=files&method=file&fileId=' + this.imagePath + "&token=" + API.TOKEN;

        private onClick() {
            this.$emit('file', this.file);
        }

        private printIt(){
            const mywindow = window.open(this.imageUrl, 'PRINT', ) as Window;
            mywindow.print();
            // mywindow.close();
        }

        private download(){
            fetch(this.imageUrl)
                .then(resp => resp.blob())
                .then(blob => {
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.style.display = 'none';
                    a.href = url;
                    // the filename you want
                    a.download = this.file.file_type+'-'+this.file.file_name.substr(0, 4) + '.' + this.file.file_name.split('.').pop();
                    document.body.appendChild(a);
                    a.click();
                    window.URL.revokeObjectURL(url);
                })
                .catch(() => alert('Что-то не так... Файл не найден'));
        }
    }
</script>

<style scoped>
    .file-view {
        cursor: pointer;
        transition: all 0.6s;
        font-size: 14px;
    }

    .file-view:hover {
        opacity: 0.6
    }
</style>