<template>
  <div class="toast"
  :id="id"
  :data-delay="delayTime"
  :data-autohide="autohide"
  role="alert" aria-live="assertive" aria-atomic="true">
    <div class="toast-header text-white" :class="getStatusClass">
      <strong class="mr-auto text-uppercase">{{ heading }}</strong>
      <small class="text-white">just now</small>
      <button type="button" 
      class="ml-2 mb-1 close" 
      data-dismiss="toast" 
      aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="toast-body text-dark">{{ content }}</div>
  </div>
</template>

<script>
import $ from "jquery";
import { computed, onMounted } from 'vue';
import { useToast } from "@/composables/toast"

export default {
    props: {
      toast: {
        type: Object,
        required: true
      },
    },
    setup(props) {
      const delayTime = 3000;
      const autohide = true;
      
      const { removeToast } = useToast();

      onMounted(() => {
        $(document).ready(function() {
          $("#" + props.toast.id).toast('show');
        });

        setTimeout(function() {
          removeToast(props.toast)
        }, delayTime + 300);
      })

      const getStatusClass = computed(() => {
        return {
          "bg-danger": !props.toast.success,
          "bg-success": props.toast.success
        };
      });

      return {
        id: props.toast.id,
        heading: props.toast.heading,
        content: props.toast.content,
        success: props.toast.success,
        
        // destructure prop sẽ disable reactivity
        delayTime,
        autohide,
        
        /* Computed */
        getStatusClass
      }
    }
};
</script>

<style>
</style>