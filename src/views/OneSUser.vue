<template>
    <b-overlay :show="busy">
        <div class="text-uppercase">
            <b-button class="mb-3" block @click="getFilesZip">Скачать все файлы</b-button>
            <h4 class="my-4 text-center">Основные данные</h4>
            <copy-field label="Фамилия:" class="mb-1" :value="user.lastname"></copy-field>
            <copy-field label="Имя:" class="mb-1" :value="user.name"></copy-field>
            <copy-field label="Отчество:" class="mb-1" :value="user.surname"></copy-field>
            <copy-field label="Дата рождения:" class="mb-1" :value="bd(user.raw.birthday)"></copy-field>
            <hr/>
            <copy-field label="Фамилия ЛАТ:" class="mb-1" :value="rusToLat(user.lastname)"></copy-field>
            <copy-field label="Имя ЛАТ:" class="mb-1" :value="rusToLat(user.name)"></copy-field>
            <div v-if="psp.length > 0">
                <h4 class="my-4 text-center">Паспорт</h4>
                <copy-field label="Гражданство:" class="mb-1" :value="lpsp()['PSP_G'].split('|').pop()"></copy-field>
                <hr/>
                <copy-field label="Серия:" class="mb-1" :value="lpsp()['PSP_A'].substr(0, 4)"></copy-field>
                <copy-field label="Номер:" class="mb-1" :value="lpsp()['PSP_A'].substr(4)"></copy-field>
                <copy-field label="Выдан:" class="mb-1" :value="lpsp()['PSP_B']"></copy-field>
                <copy-field label="Подразделение:" class="mb-1"
                            :value="(lpsp()['PSP_C'].substr(0, 3)+'-'+lpsp()['PSP_C'].substr(3))"></copy-field>
                <copy-field label="Дата выдачи:" class="mb-1" :value="bd(lpsp()['PSP_E'])"></copy-field>
                <copy-field label="Место рождения:" class="mb-1" :value="lpsp()['PSP_D']"></copy-field>

                <h4 class="my-4 text-center">Вторая вкладка 1-с</h4>
                <copy-field label="Сотовый КОД:" class="mb-1" value="+7"></copy-field>
                <copy-field label="Сотовый ОПЕР:" class="mb-1"
                            :value="user.phone.replace('+', '').substr(1, 3)"></copy-field>
                <copy-field label="Сотовый НОМЕР:" class="mb-1"
                            :value="plp(user.phone.replace('+', '').substr(4))"></copy-field>
                <hr/>
                <copy-field label="Почта:" class="mb-1" :value="user.mail"></copy-field>
                <copy-field label="Регистрация:" class="mb-1" :value="lpsp()['PSP_F']"></copy-field>
                <copy-field label="Место проживания:" class="mb-1" :value="lpsp()['PSP_ADDR']"></copy-field>

                <h4 class="my-4 text-center">Третья вкладка 1-с</h4>
                <copy-field label="Название школы:" class="mb-1" :value="user.raw.school.schoolName"></copy-field>
                <copy-field label="Адрес школы:" class="mb-1" :value="user.raw.school.schoolAddress"></copy-field>
                <copy-field label="Номер аттестата:" class="mb-1"
                            :value="user.raw.school.schoolDegreeCode"></copy-field>
                <copy-field label="Дата выдачи:" class="mb-1" :value="bd(user.raw.school.schoolDate)"></copy-field>
                <copy-field label="Средний балл:" class="mb-1" :value="user.raw.school.schoolValue"></copy-field>

                <h4 class="my-4 text-center">Пятая вкладка 1-с</h4>
                <copy-field label="Специальность:" class="mb-1"
                            :value="$app.specialization[user.raw.facultyId]"></copy-field>
                <copy-field label="Основа обучения:" class="mb-1" :value="$app.bases[user.raw.studyBase]"></copy-field>

                <h4 class="my-4 text-center">Девятая вкладка 1-с</h4>
                <h5>Законные представители</h5>
                <div v-for="parent of parents" :key="parent.parent_id">
                    <copy-field label="Тип:" class="mb-1" :value="$app.parentName[parent.type]"></copy-field>
                    <copy-field label="Фамилия:" class="mb-1" :value="parent.name.split(' ')[1]"></copy-field>
                    <copy-field label="Имя:" class="mb-1" :value="parent.name.split(' ')[0]"></copy-field>
                    <copy-field label="Отчество:" class="mb-1"
                                :value="parent.name.split(' ').slice(2).join(' ')"></copy-field>
                    <copy-field label="ТЕЛ КОД:" class="mb-1" :value="phpts(parent.phone)[0]"></copy-field>
                    <copy-field label="ТЕЛ ОПЕР:" class="mb-1" :value="phpts(parent.phone)[1]"></copy-field>
                    <copy-field label="ТЕЛ НОМР:" class="mb-1" :value="phpts(parent.phone)[2]"></copy-field>
                    <copy-field label="Почта:" class="mb-1" :value="parent.mail"></copy-field>
                    <copy-field label="Место работы:" class="mb-1" :value="parent.work"></copy-field>
                    <b-button class=" mt-3" block @click="downloadAgreeAndNotify">Скачать заявление и уведомление</b-button>
                </div>
            </div>
        </div>
    </b-overlay>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import KFUser from "@/client/KFUser";
    import API from "@/api/API";
    import StoreLoader from "@/client/StoreLoader";
    import CopyField from "@/components/CopyField.vue";
    import {Dict} from "@/app/types";
    import {APIFileResult} from "@/api/APIFiles";
    import Zipper from "@/ling/utils/Zipper";
    import FileIO from "@/ling/utils/FileIO";
    import UserDocumentsView from "@/components/UserDocumentsView.vue";
    import FileUploaderAdminView from "@/components/forms/FileUploaderAdminView.vue";
    import PSPUtils from "@/utils/PSPUtils";
    import UserStatusToolbox from "@/components/admintools/UserStatusToolbox.vue";
    import FiSelect from "@/ling/components/ficomponents/FiSelect.vue";
    import UserContent from "@/components/theme/UserContent.vue";

    @Component({
        components: {
            UserContent,
            FiSelect,
            UserStatusToolbox, FileUploaderAdminView, UserDocumentsView, CopyField
        }
    })
    export default class OneSUser extends Vue {
        @Prop({required: true}) user!: KFUser;
        private userFiles: APIFileResult[] = [];
        private userFilesS: any = [];
        private parents: unknown[] = [];
        private psp: unknown[] = [];
        private busy = false;


        async mounted() {
            StoreLoader.wait(this.$store, async () => {
                await this.user.updateFiles();
                this.psp = (await API.request("psp.user", {userId: this.user.userId})).list
                    .filter((p: any) => String(p['PSP_TYPE']).toUpperCase() !== 'PAYER');
                this.userFiles = this.user.getFiles();
                this.parents = (await API.request("parents.getByUserId", {userId: this.user.userId})).list;
                await this.update();
            });
        }

        phpts(p: string) {
            p = p.replace('+', '');
            const code = p.substr(0, 1);
            const phone = p.substr(1, 3);
            const res = `${this.plp(p.substr(4))}`;
            return [code, phone, res];
        }

        plp(s: string) {
            return `${s.substr(0, 3)}-${s.substr(3, 2)}-${s.substr(5)}`;
        }

        bd(s: string) {
            const pts = (s || "").split('-');
            return `${pts[2]}.${pts[1]}.${pts[0]}`;
        }


        setStudentStatus(status: string) {
            return new Promise(resolve => {
                API.mission.setFieldAdmin("studentStatus", status, this.user.userId)
                    .then(() => {
                        resolve(true);
                        window.location.reload();
                    }).catch(reason => {
                    this.$bvToast.toast(reason, {title: "Ошибка"});
                    resolve(false);
                })
            });
        }

        lpsp() {
            if (this.psp.length === 0) return {};
            const a = this.psp[this.psp.length - 1] as any;
            a['PSP_A'] = a['PSP_A'].replace(/ /g, '');
            a['PSP_C'] = a['PSP_C'].replace(/-/g, '');
            return a;
        }

        rusToLat(str: string) {
            const ruData: Dict<string> = {
                'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd',
                'е': 'e', 'ё': 'e', 'ж': 'j', 'з': 'z', 'и': 'i',
                'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o',
                'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u',
                'ф': 'f', 'х': 'h', 'ц': 'c', 'ч': 'ch', 'ш': 'sh',
                'щ': 'shch', 'ы': 'y', 'э': 'e', 'ю': 'u', 'я': 'ya'
            }
            const nStr: Array<unknown> = [];
            str = str.replace(/[ъь]+/g, '').replace(/й/g, 'i');

            for (let i = 0; i < str.length; ++i) {
                nStr.push(
                    ruData[str[i]]
                    || ruData[str[i].toLowerCase()] == undefined && str[i]
                    || ruData[str[i].toLowerCase()].replace(/^(.)/, function (match: string) {
                        return match.toUpperCase()
                    })
                );
            }

            return nStr.join('');
        }

        async update() {
            this.userFilesS = PSPUtils.groupItems(this.user.getFiles());
        }

        async downloadAgreeAndNotify() {
            this.busy = true;
            this.$bvToast.toast("Упаковка файлов...");
            const zip = Zipper.createZip('');
            for (const file of this.userFiles) {

                if ((file.file_type === "agree" || file.file_type === "notify")
                    && file.file_status !== '1000') {

                    const imagePath = file['file_id'];
                    const imageUrl = 'http://kipfin.ru/new/index.php?class=files&method=file&fileId=' + imagePath + "&token=" + API.TOKEN;
                    const name = file.file_type + '-' + file.file_name.substr(0, 4) + '.'
                        + file.file_name.split('.').pop();

                    this.$bvToast.toast("Упаковка " + name);
                    zip.add(name, imageUrl);
                }
            }
            if (zip.getFileNames().length === 0) {
                this.$bvToast.toast('Файлы не найдены...', {title: "Ой-ой"});
                this.busy = false;
                return;
            }
            const content = await zip.pack();
            FileIO.requestDownloadingFile(
                this.user.getFullName() + ' (Заявление).zip',
                window.URL.createObjectURL(content)
            );
            this.$bvToast.toast("Готово");
            this.busy = false;
        }

        async getFilesZip() {

            this.busy = true;
            this.$bvToast.toast("Упаковка файлов...");
            const zip = Zipper.createZip('');

            for (const file of this.userFiles) {

                if (file.file_type === "ach") continue;
                if (file.file_status === "3") continue;

                const imagePath = file['file_id'] +
                    (file.file_type === 'passport' ? '&encrypted=true' : '') +
                    (file.file_ext.includes('pdf') ||
                    file.file_ext.includes('docx') ? '&__pd' : '');
                const imageUrl = 'http://kipfin.ru/new/index.php?class=files&method=file&fileId=' + imagePath + "&token=" + API.TOKEN;

                const name = file.file_type + '-' + file.file_name.substr(0, 4) + '.' + file.file_name.split('.').pop();
                this.$bvToast.toast("Упаковка " + name);
                zip.add(name, imageUrl);
                if (file.file_ext.includes('pdf')) {
                    this.$bvToast.toast("Конвертация PDF " + name);
                    const neUrl = 'http://kipfin.ru/new/index.php?class=files&method=cnv&refile=' + encodeURIComponent(imageUrl);
                    zip.add(name + '.jpg', neUrl);
                }
            }

            const content = await zip.pack();
            FileIO.requestDownloadingFile(
                this.user.getFullName() + '.zip',
                window.URL.createObjectURL(content)
            );
            this.$bvToast.toast("Готово");
            this.busy = false;
        }
    }


</script>

<style scoped>
</style>