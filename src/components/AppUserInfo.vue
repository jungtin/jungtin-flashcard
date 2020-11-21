<template>
    <template v-if="isPermit">
        <h1>User Info</h1>
        <div class="row">
            <div class="col-8">
                <button type="button" class="btn btn-success my-4" @click="isShowModal = true">
                    Edit UserInfo
                </button>
                <table class="table">
                    <tr>
                        <td>UID</td>
                        <td>{{ user.uid }}</td>
                    </tr>
                    <tr>
                        <td>Display Name</td>
                        <td>{{ user.displayName }}</td>
                    </tr>
                    <tr>
                        <td>Email</td>
                        <td>{{ user.email }}</td>
                    </tr>
                    <tr>
                        <td>Email Verified</td>
                        <td>{{ user.emailVerified }}</td>
                    </tr>
                    <tr>
                        <td>Photo URL</td>
                        <td>{{ user.photoURL }}</td>
                    </tr>
                    <tr>
                        <td>Phone Number</td>
                        <td>{{ user.phoneNumber }}</td>
                    </tr>
                    
                    <tr>
                        <td>Creation Time</td>
                        <td>{{ dateFormat(user.metadata.creationTime) }}</td>
                    </tr>
                    <tr>
                        <td>Last Sign In Time</td>
                        <td>{{ dateFormat(user.metadata.lastSignInTime) }}</td>
                    </tr>
                </table>
            </div>
            <div class="col-4">
                <table>
                    <tr>
                        <td><button class="btn btn-lg btn-outline-info" @click="isShowModalChangeEmail = true">Change Email</button></td>
                    </tr>
                    <tr>
                        <td><button class="btn btn-lg btn-outline-info" @click="isShowModalChangePassword = true">Change Password</button></td>
                    </tr>
                    <tr>
                        <td><button class="btn btn-lg btn-outline-info" @click="isShowModalResetPassword = true">Send Email Reset Password</button></td>
                    </tr>
                    
                    
                </table>
                <hr>
                <h1>Providers</h1>
                <table class="table">
                    <tr v-for="(provider, i) in user.providerData" :key="i">
                        <td>{{ provider.providerId }}</td>
                        <td><button class="btn btn-danger" @click="unlinkProvider(provider.providerId)">Unlink</button></td>
                    </tr>
                </table>
            </div>
        </div>
    </template>
    <h1 v-else>Cần phải Login để xem được nội dung này</h1>
    <UIUserInfoModal 
        :user="{
            displayName: user.displayName,
            photoURL: user.photoURL
        }"

        v-if="isShowModal"
        @closeModal="isShowModal = false"
    />

    <UIUserInfoChangeEmail 
        :emailProp="user.email"

        v-if="isShowModalChangeEmail"
        @closeModal="isShowModalChangeEmail = false"
    />

    <UIUserInfoChangePassword
        v-if="isShowModalChangePassword"
        @closeModal="isShowModalChangePassword = false"
    />

    <UIUserInfoResetPassword
        v-if="isShowModalResetPassword"
        @closeModal="isShowModalResetPassword = false"
    />

    
</template>

<script>
import { auth } from "@/firebase/init"
import moment from "moment"
import $ from "jquery"

import UIUserInfoModal from '@/components/ui/UIUserInfoModal.vue';
import UIUserInfoChangeEmail from './ui/UIUserInfoChangeEmail.vue';
import UIUserInfoChangePassword from './ui/UIUserInfoChangePassword.vue';
import UIUserInfoResetPassword from './ui/UIUserInfoResetPassword.vue';

export default {
    components: {
        UIUserInfoModal,
        UIUserInfoChangeEmail,
        UIUserInfoChangePassword,
        UIUserInfoResetPassword,
    },
    data() {
        return {
            isPermit: false,
            user: null,

            isShowModal: false,
            isShowModalChangeEmail: false,
            isShowModalChangePassword: false,
            isShowModalResetPassword: false,
        }
    },
    created() {
        const authUser = auth.currentUser; /* Ở đây mình không sử dụng thằng này
            Vì sau khi user info được update nó sẽ không update ở view
        */
        auth.onAuthStateChanged(user => {
            if (user) {
                // Đã logined
                this.isPermit = true;
                this.user = user;
            }
        });
    },
    methods: {
        dateFormat: (date) => {
            return moment(date).format('DD/MM/YYYY, h:mm:ss');
        },
        unlinkProvider(providerId) {
            auth.currentUser.unlink(providerId).then(function() {
                console.log("Đã Unlink " + providerId);
            }).catch(function(error) {
                console.error(error);
            });
        }
    }
}
</script>

<style>

</style>