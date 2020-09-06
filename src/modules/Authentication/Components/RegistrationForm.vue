<template>
    <div class="login-form">
        <div class="text-left" v-if="currentPage === 0">
            <b-alert :show="true">
                Введите актуальные Email и номер телефона
            </b-alert>
            <input name="mail" v-model="mail" type="text" placeholder="Введите Ваш email"/>
            <input name="phone" v-model="phone" type="text" placeholder="Введите Ваш номер телефона"/>
            <button @click="nextPage" class="bg-primary navigation-bg navigation-bg-out">Далее</button>
        </div>
        <div class="text-left"  v-if="currentPage === 1">
            <b-alert :show="true">
                Введите Ваши ФИО и дату рождения
            </b-alert>
            <input name="name" v-model="name" type="text" placeholder="Введите Вашу Фамилию"/>
            <input name="lastname" v-model="lastname" type="text" placeholder="Введите Ваше Имя"/>
            <input name="surname" v-model="surname" type="text" placeholder="Введите Ваше Отчество"/>
            <button  @click="nextPage" class="bg-primary navigation-bg navigation-bg-out">Далее</button>
            <small>Если у Вас отсутствует Отчество, оставьте поле пустым</small>
        </div>
        <div  v-if="currentPage === 2">
            <b-alert class="text-left"  :show="true">
                Придумайте пароль не короче 6 символов
            </b-alert>
            <input name="password" v-model="password" type="password" placeholder="Введите пароль"/>
            <button class="bg-primary navigation-bg navigation-bg-out">Войти</button>
        </div>
        <div class="message">
            <a href="#create" @click="$emit('showLogin')">Войти в личный кабинет</a>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import TextValidation from "@/modules/InputControllers/Common/TextValidation";

    /**
     *  The RegistrationForm component.
     *  @author diego
     *  @created 03.09.2020 20:20
     */
    @Component
    export default class RegistrationForm extends Vue {
        protected currentPage = 0;

        protected mail = "";
        protected phone = "";

        protected name = "";
        protected lastname = "";
        protected surname = "";

        protected password = "";

        protected nextPage(){
            if(this.currentPage === 0){
                const emailValidation = TextValidation.validateEmail(this.mail);
                const phoneValidation = TextValidation.validatePhone(this.phone);
                if(!emailValidation){
                    this.$toast.error("Введите корректный email адрес!");
                    return;
                }
                if(!phoneValidation){
                    this.$toast.error("Введите корректный номер телефона!");
                    return;
                }
                this.currentPage = 1;
            }else if(this.currentPage === 1){
                this.currentPage = 2;
            }
        }
    }
</script>

<style scoped>

</style>