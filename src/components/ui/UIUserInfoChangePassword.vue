<template>
    <div class="modal fade" id="user-info-change-password-modal" tabindex="-1">
    <div class="modal-dialog">
        <div class="modal-content">
        <div class="modal-body">
            <table class="table">
            <tr>
                <td>New Password</td>
                <td><input type="password" v-model="newPassword"></td>
            </tr>
            <tr>
                <td>Confirm Password</td>
                <td><input type="password" v-model="confirmPassword"></td>
            </tr>
            <tr>
                <td colspan="2">Cần phải đăng nhập lại trước khi update</td>
            </tr>
            <tr>
                <td>Old Password</td>
                <td><input type="password" v-model="oldPassword"></td>
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
    data() {
        return {
            newPassword: null,
            confirmPassword: null,
            oldPassword: null,
        }
    },
    created() {
        const vm = this;
        $(document).ready(function() {
            $("#user-info-change-password-modal").modal("show");

            $("#user-info-change-password-modal").on("hidden.bs.modal", (e) => {
                vm.$emit("close-modal"); 
                /* 
                    Thằng này là để cmp reset ^~ lần bật/tắt modal
                */
            });
        });
    },
    methods: {
        async submit() {
            if(this.newPassword !== this.confirmPassword) {
                alert("New Password & Confirm Password must match !");
                return;
            }

            try {
                var user = auth.currentUser;
                /* firebase.auth.EmailAuthProvider là static nên phải import firebase vào */
                var credential = firebase.auth.EmailAuthProvider.credential(
                    user.email,
                    this.oldPassword
                );

                await user.reauthenticateWithCredential(credential);
                console.log("đã re-auth");
                
                await auth.currentUser.updatePassword(this.newPassword);
                // Reset Form
                $('#user-info-change-password-modal').modal('hide');
                alert("Đã update password thành công");
            } catch(err) {
                console.log(err);
            }
        }
    }
}
</script>

<style>

</style>