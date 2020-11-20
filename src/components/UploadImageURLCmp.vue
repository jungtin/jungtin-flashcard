<template>
  <h1>Upload Image Cmp</h1>
    <div class="progress" v-if="uploadPercentage">
        <div class="progress-bar" role="progressbar" :style="{width: `${uploadPercentage}%`}">{{ uploadPercentage }}%</div>
    </div>

    <form @submit.prevent="submit">
        <table class="table">
            <tr>
                <td>File</td>
                <td><input type="text" v-model.lazy="url"></td>
            </tr>
            <tr>
                <td><button type="submit">Submit</button></td>
            </tr>
        </table>
    </form>
  <hr>
  <h1>Preview Images</h1>
  <table class="table table-hover">
    <tr>
        <td>Name</td>
        <td>Image</td>
    </tr>
    <tr v-for="(image, i) in previewImages" :key="i">
        <td>{{ image.name }}</td>
        <td><img class="rounded w-75" :src="image.source"></td>
    </tr>
  </table>
</template>

<script>
import { db, storage } from "@/firebase/init"
import axios from "axios"

export default {
    data() {
        return {
            url: "",
            file: null,
            previewImages: [],
            uploadPercentage: null,
        }
    },
    watch: {
        url: function(val) {
            if(val == null)
                return;
                
            axios({
                url: `https://cors-anywhere.herokuapp.com/${this.url}`,
                method: 'GET',
                responseType: 'blob',
            }).then((response) => {
                const generatedFilename = "";

                this.file = new File([response.data], generatedFilename);
                this.previewImage(this.file);
            });
        }
    },
    methods: {
        submit() {
            this.putImage(this.file).then(res => {
                res.ref.getDownloadURL().then((url)=>{
                        console.log(`================================`);
                        console.log(`Uploaded Image`);
                        console.info(url);
                        console.log(`================================`);
                    });

                this.clearPreview();
            }).catch(err => {
                console.log(err);
            });
        },
        putImage(file) {
            const storageRef = storage.ref(`jungtin-images/${file.name}`).put(file);

            storageRef.on(`state_changed`, snapshot => {
                this.uploadPercentage = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            }, error => {
                console.log(error.message);
            }, () => { 
                // When finished
                this.uploadPercentage = 100;
            });

            return storageRef;
        },
        previewImage(file) {
            const vm = this;
            this.previewImages = [];

            const fileReader = new FileReader;
            fileReader.addEventListener("load", function() {
                vm.previewImages.push({
                    name: file.name,
                    source: fileReader.result
                })
            });
            
            fileReader.readAsDataURL(file);
        },
        clearPreview() {
            this.previewImages = [];
            this.uploadPercentage = null;
            this.url = null;
        }
    },
};
</script>

<style>
</style>