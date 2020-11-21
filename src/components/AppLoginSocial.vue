<template>
    <h1>Login Providers</h1>
    <table>
        <tr>
            <td><button class="btn btn-danger" @click="login('google.com')">Google</button></td>
            <td><button class="btn btn-primary" @click="login('facebook')">Facebook</button></td>
        </tr>
    </table>
</template>

<script>
import { auth } from "@/firebase/init"
import firebase from "firebase/app"

export default {
    methods: {
        getProviderForProviderId(prodValue) {
            var provider;
            switch(prodValue) {
                case "google.com":
                    provider = new firebase.auth.GoogleAuthProvider();
                    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
                    break;
                case "facebook":
                    provider = new firebase.auth.FacebookAuthProvider();
                    provider.addScope("email");
                    provider.addScope("user_birthday");
                    provider.addScope("user_link");
                    provider.addScope("user_friends");
                    provider.addScope("user_gender");
                    provider.addScope("user_hometown");
                    break;
            }

            return provider;
        },
        async login(prodValue) {
            const vm = this;
            const provider = this.getProviderForProviderId(prodValue);
            /* 
                Luư ý : 
                Nếu như đăng nhập = Facebook mà email cũng register với Google(trùng email)
                Mà mình setting : One account per email address setting in the Firebase console

                Thì sẽ bị lỗi

            */

            try {
                const res = await auth.signInWithPopup(provider);
                console.log(res);
                /* 
                    Res gồm : 
                    - family_name
                    - given_name
                    - scopes
                    - id
                    - picture
                    - name
                */
            } catch(error) {
                console.log("conflict multi provider");
                console.log(error);

                if (error.code === 'auth/account-exists-with-different-credential') 
                    this.handlerConflictProvider(error);
            }
        }, /* End Login */


        async handlerConflictProvider(error) {
            var pendingCred = error.credential;

            var email = error.email;
            const methods = await auth.fetchSignInMethodsForEmail(email)
            console.log(methods);

            alert("Email này đã được dùng trước kia ! Xin hãy đăng nhập lại với Email này và chúng tôi sẽ liên kết 2 tài khoản với nhau !");
            
            if (methods[0] === 'password') {
                /* Trường hợp 1 : User đã register với phương thức email & password */
                var password = prompt("Enter password của email" + email);
                auth.signInWithEmailAndPassword(email, password).then(res => {
                    res.user.linkWithCredential(pendingCred);
                    
                    console.log("Đã Link thành công");
                    return;
                })
            }

            /* Trường hợp 2 : User đã register với Provider khác như Google v.v */
            var provider = this.getProviderForProviderId(methods[0]);
            const result = await auth.signInWithPopup(provider)

            result.user.linkWithCredential(pendingCred).then(function(usercred) {
                console.log("Đã Link thành công");
                console.log(usercred);
            });

            /* 
                Sau lần này thì Conflict sẽ không bị nữa vì ta đã link New Provider
                vào account rồi
            */
        }
    }
}
</script>

<style>

</style>