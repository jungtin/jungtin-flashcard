<template>
    <div class="modal fade" id="user-info-change-email-modal" tabindex="-1">
    <div class="modal-dialog">
        <div class="modal-content">
        <div class="modal-body">
            <table class="table">
            <tr>
                <td>Email</td>
                <td><input type="text" v-model="email"></td>
            </tr>
            <tr>
                <td colspan="2">Cần phải đăng nhập lại trước khi update</td>
            </tr>
            <tr>
                <td>Password</td>
                <td><input type="password" v-model="password"></td>
            </tr>
        </table>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" @click.prevent="submit">Save changes</button>
        </div>
        </div>
    </div>
    </div>
</template>

<script>
import { auth } from "@/firebase/init"
import firebase from "firebase/app"
import $ from "jquery"

export default {
    props: ["emailProp"],
    data() {
        return {
            email: this.emailProp,
            password: null,
        }
    },
    created() {
        const vm = this;
        $(document).ready(function() {
            $("#user-info-change-email-modal").modal("show");

            $("#user-info-change-email-modal").on("hidden.bs.modal", (e) => {
                vm.$emit("close-modal"); 
                /* 
                    Thằng này là để cmp reset ^~ lần bật/tắt modal
                */
            });
        });
    },
    methods: {
        async submit() {
            try {
                var user = auth.currentUser;
                /* firebase.auth.EmailAuthProvider là static nên phải import firebase vào */
                var credential = firebase.auth.EmailAuthProvider.credential(
                    user.email,
                    this.password
                );

                await user.reauthenticateWithCredential(credential);
                console.log("đã re-auth");
                
                await auth.currentUser.updateEmail(this.email);
                // Reset Form
                $('#user-info-change-email-modal').modal('hide');
                alert("Đã update email thành công");
            } catch(err) {
                console.log(err);
            }
        }
    }
}
</script>

<style>

</style>