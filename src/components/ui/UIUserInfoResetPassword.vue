<template>
    <div class="modal fade" id="user-info-reset-password-modal" tabindex="-1">
    <div class="modal-dialog">
        <div class="modal-content">
        <div class="modal-body">
            <table class="table">
            <tr>
                <td>Email</td>
                <td><input type="text" v-model="email"></td>
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
            email: null,
        }
    },
    created() {
        const vm = this;
        $(document).ready(function() {
            $("#user-info-reset-password-modal").modal("show");

            $("#user-info-reset-password-modal").on("hidden.bs.modal", (e) => {
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
                await auth.sendPasswordResetEmail(this.email);

                // Reset Form
                $('#user-info-reset-password-modal').modal('hide');
                alert("Đã gửi email reset password");
            } catch(err) {
                console.log(err);
            }
        }
    }
}
</script>

<style>

</style>