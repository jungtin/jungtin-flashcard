<template>
  <h1>Check Image Validity</h1>
  <table class="table table-hover">
    <tr>
      <td>File</td>
      <td><input type="file" @change="previewChange" accept="image/*" multiple /></td>
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

                if (/\.(jpe?g|png|gif)$/i.test( file.name ))
                    console.log("valid");
                else
                    console.log("in-valid");
            }
        },
    },
};
</script>

<style>
</style>