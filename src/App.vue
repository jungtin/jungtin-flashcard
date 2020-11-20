<template>
  <div class="container">
    <div class="row mt-5">
      <div class="col">
          <!-- <CheckValidImageCmp/> -->
          <!-- <UploadImageCmp/> -->
          <UploadImageURLCmp/>
          <!-- <PreviewImageCmp/> -->
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable vue/no-unused-components */
import PreviewImageCmp from "@/components/PreviewImageCmp.vue";
import CheckValidImageCmp from "@/components/CheckValidImageCmp.vue";
import UploadImageCmp from "@/components/UploadImageCmp.vue";
import UploadImageURLCmp from "@/components/UploadImageURLCmp.vue";

export default {
  components: {
    PreviewImageCmp,
    UploadImageCmp,
    UploadImageURLCmp,
    CheckValidImageCmp
  },
};
</script>

<style>
</style>