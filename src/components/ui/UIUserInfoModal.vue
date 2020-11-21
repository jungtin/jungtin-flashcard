<template>
    <div class="modal fade" id="user-info-modal" tabindex="-1">
    <div class="modal-dialog">
        <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title">User Info Form</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
            <table class="table">
            <tr>
                <td>Display Name</td>
                <td><input type="text" v-model="displayName"></td>
            </tr>
            <tr>
                <td>Photo URL</td>
                <td><input type="text" v-model="photoURL"></td>
            </tr>
        </table>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" @click.prevent="submit    ">Save changes</button>
        </div>
        </div>
    </div>
    </div>
</template>

<script>
import { auth } from "@/firebase/init"
import $ from "jquery"

export default {
    props: ["user"],
    data() {
        return {
            displayName: this.user.displayName,
            photoURL: this.user.photoURL,
        }
    },
    created() {
        const vm = this;
        $(document).ready(function() {
            $("#user-info-modal").modal("show");

            $("#user-info-modal").on("hidden.bs.modal", (e) => {
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
                const res = await auth.currentUser.updateProfile({
                    displayName: this.displayName,
                    photoURL: this.photoURL
                });

                // Reset Form
                this.displayName = null;
                this.photoURL = null;
                $('#user-info-modal').modal('hide');
                alert("Đã update thành công");
            } catch(err) {
                console.log(err);
            }
        }
    }
}
</script>

<style>

</style>