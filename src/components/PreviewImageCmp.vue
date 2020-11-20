<template>
  <h1>Preview Image Cmp</h1>
  <table class="table table-hover">
    <tr>
      <td>File</td>
      <td><input type="file" @change="previewChange" multiple /></td>
    </tr>
  </table>
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
export default {
    data() {
        return {
            previewImages: [],
        }
    },
    methods: {
        previewChange(event) {
            const vm = this;
            const files = event.target.files;

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
    },
};
</script>

<style>
</style>