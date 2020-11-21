<template>
    <h1>Register Form</h1>
    <form @submit.prevent="submit">
        <div class="form-group">
            <label>Email</label>
            <input type="text" class="form-control" v-model="email">
        </div>
        <div class="form-group">
            <label>Password</label>
            <input type="password" class="form-control" v-model="password">
        </div>
        <div class="form-group">
            <label>Re-Password</label>
            <input type="password" class="form-control" v-model="rePassword">
        </div>
        <button type="submit" class="btn btn-primary">Register</button>
    </form>
</template>

<script>
import { auth } from "@/firebase/init"
export default {
    data() {
        return {
            email: null,
            password: null,
            rePassword: null,
        }
    },
    methods: {
        async submit() {
            if(this.password !== this.rePassword) {
                alert("Password & re-password must matched !");
                return;
            }

            try {
                const res = await auth.createUserWithEmailAndPassword(this.email, this.password);
                /* 
                    res sẽ trả về thông tin về user
                    - displayName
                    - email
                    - emailVerified
                    - photoURL
                    - isAnonymous
                    - uid
                    - creationTime, lastSignInTime
                    - isUserNew (vì after Register => đăng nhập nên 1 số account cần tính năng này)

                    Sau khi đã register thành công nó đăng nhập vào luôn
                */
                res.user.sendEmailVerification().then(() => {
                    this.resetForm();
                    alert(`Đã gửi email xác thực về : ${res.user.email}`);
                }).catch(function(error) {
                    console.log(error);
                });
            } catch(err) {
                console.log("====================");
                console.log("Đã có lỗi xảy ra");
                console.error(`Code : ${err.code}`);
                console.error(`Message : ${err.message}`);
                console.log("====================");
                alert(err.message);
            }
        },
        resetForm() {
            this.email = null;
            this.password = null;
            this.rePassword = null;
        }
    }
}
</script>

<style>

</style>