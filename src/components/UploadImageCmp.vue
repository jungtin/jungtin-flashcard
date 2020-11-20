<template>
  <h1>Upload Image Cmp</h1>
    <div class="progress" v-if="uploadPercentage">
        <div class="progress-bar" role="progressbar" :style="{width: `${uploadPercentage}%`}">{{ uploadPercentage }}%</div>
    </div>

    <form @submit.prevent="submit">
        <table class="table">
            <tr>
                <td>File</td>
                <td><input type="file" ref="fileInput" accept="image/*" @change="previewChange" multiple /></td>
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

export default {
    data() {
        return {
            files: [],
            previewImages: [],
            uploadPercentage: null,
            tempUploadPerc: 0
        }
    },
    methods: {
        submit() {
            const promises = [];
            for(let i = 0; i < this.files.length; i++) {
                const file = this.files[i];
                promises.push(this.putImage(file));
            }

            Promise.all(promises).then(responses => {
                responses.forEach(res => {
                    res.ref.getDownloadURL().then((url)=>{
                        console.log(`================================`);
                        console.log(`Uploaded Image`);
                        console.info(url);
                        console.log(`================================`);
                    });
                });
                this.uploadPercentage = 100;

                this.clearPreview();
            }).catch(err => {

            });
            
        },
        putImage(file) {
            const storageRef = storage.ref(`jungtin-images/${file.name}`).put(file);

            storageRef.on(`state_changed`, snapshot => {
                let curPercentage = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                this.uploadPercentage = Math.round((this.tempUploadPerc + curPercentage) / this.files.length);
                
            }, error => {
                console.log(error.message);
            }, () => { 
                // When finished
                this.tempUploadPerc += 100;
            });

            return storageRef;
        },
        previewChange(event) {
            const vm = this;
            const files = event.target.files;

            this.files = files;
            this.previewImages = [];
            for(let i = 0; i < files.length; i++) {
                const file = files[i];
                const fileReader = new FileReader;

                fileReader.addEventListener("load", function() {
                    vm.previewImages.push({
                        name: file.name,
                        source: fileReader.result
                    })
                });
                
                fileReader.readAsDataURL(file);
            }
        },
        clearPreview() {
            this.previewImages = [];
            this.uploadPercentage = null;
            this.tempUploadPerc = null;
            this.files = [];
            this.$refs.fileInput.value = null;
        }
    },
};
</script>

<style>
</style>