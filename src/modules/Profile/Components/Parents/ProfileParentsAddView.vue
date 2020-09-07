<template>
    <div class="view-ProfileParentsAddView">
        <h3 class="mt-4 mb-3">Добавить законного представителя</h3>
        <div>
            <row-with-editable-field title="Роль" hint="Укажите, кем для Вас является законный представитель"
                                     :show-hint="true">
                <select-box label-title="Необходимо выбрать" v-model="type" :options="$app.parentName"/>
            </row-with-editable-field>
            <row-with-editable-field title="ФИО представителя" hint="Введите полные ФИО законного представителя"
                                     :show-hint="true">
                <b-input v-model="name" class="mb-1" placeholder="Имя, Фамилия и Отчество законного представителя..."/>
            </row-with-editable-field>
            <row-with-editable-field title="Номер телефона" hint="Введите контактный номер телефона представителя"
                                     :show-hint="true">
                <b-input v-model="phone" class="mb-1" placeholder="Номер телефона..."/>
            </row-with-editable-field>
            <row-with-editable-field title="E-mail" hint="Введите адрес электронной почты представителя"
                                     :show-hint="true">
                <b-input v-model="mail" class="mb-1" placeholder="E-mail..."/>
            </row-with-editable-field>
            <row-with-editable-field title="Место работы" hint="Введите место работы законного представителя. Данное поле является необязательным"
                                     :show-hint="true">
                <b-input v-model="work" class="mb-1" placeholder="Место работы (необязательно)"/>
            </row-with-editable-field>
        </div>
        <b-button :disabled="busy" block variant="success" @click="onClick">
            <b-icon-plus /> Добавить законного представителя
        </b-button>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import RowWithEditableField from "@/modules/Profile/Components/ProfileTabs/common/RowWithEditableField.vue";
    import SelectBox from "@/modules/ling/components/SelectBox/SelectBox.vue";
    import TextValidation from "@/modules/InputControllers/Common/TextValidation";
    import API from "@/core/app/api/API";
    import {nullable} from "@/core/Common/Common";

    /**
     *  The ProfileParentsAddView component.
     *  @author diego
     *  @created 07.09.2020 03:20
     */
    @Component({
        components: {SelectBox, RowWithEditableField}
    })
    export default class ProfileParentsAddView extends Vue {
        protected type = nullable<{value: string}>();
        protected name = '';
        protected phone = '';
        protected mail = '';
        protected work = '';
        private busy = false;

        protected async onClick(){
            if(this.type === null)
                return this.$toast.error('Выберите, кем для Вас является законный представитель!');
            if(this.name.split(" ").length < 2 || this.name.length < 4)
                return this.$toast.error('Введите корректное имя!');
            if(!TextValidation.validatePhone(this.phone))
                return this.$toast.error('Введите корректный номер телефона!');
            if(!TextValidation.validateEmail(this.mail))
                return this.$toast.error('Введите корректный e-mail!');

            try {
                this.busy = true;
                await API.request("parents.add", {
                    name: this.name,
                    phone: this.phone,
                    mail: this.mail,
                    work: this.work,
                    type: this.type.value || '0',
                });
                this.reset();
                this.$toast.success('Законный представитель добавлен!');
                this.$emit('update');
            }catch (e) {
                this.$toast.error(e);
            }finally {
                this.busy = false;
            }
        }

        public reset() {
            this.type = null;
            this.name = '';
            this.phone = '';
            this.mail = '';
            this.work = '';
            this.busy = false;
        }
    }
</script>

<style scoped>

</style>