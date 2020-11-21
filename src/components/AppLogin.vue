<template>
    <h1>Login Form</h1>
    <form @submit.prevent="submit">
        <div class="form-group">
            <label>Email</label>
            <input type="text" class="form-control" v-model="email">
        </div>
        <div class="form-group">
            <label>Password</label>
            <input type="password" class="form-control" v-model="password">
        </div>
        <button type="submit" class="btn btn-primary">Login</button>
    </form>
</template>

<script>
import { auth } from "@/firebase/init"

export default {
    data() {
        return {
            email: null,
            password: null
        }
    },
    methods: {
        async submit() {
            try {
                const res = await auth.signInWithEmailAndPassword(this.email, this.password);
                this.resetForm();
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
        }
    }
}
</script>

<style>

</style>