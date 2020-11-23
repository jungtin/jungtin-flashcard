<template>
  <div class="container">
    <div class="row">
      <div class="col-12 my-3 border-bottom d-flex justify-content-between py-3">
        <h1>Courses</h1>
        <button 
          class="btn btn-success btn-sm"
          @click="openModal({ state: MODAL_STATE.CREATE })">Create new Course</button>
      </div>
      <UICourseItem v-for="course in courses" 
        :course="course" 
        :key="course.id"/>
    </div>
  </div>
  <ModalCourse/>
</template>

<script>
import ModalCourse from '@/components/course/ModalCourse.vue';
import UICourseItem from '@/components/course/UICourseItem.vue';

import { computed, reactive, ref, toRef, toRefs } from 'vue';
import $ from "jquery"
import axios from "axios"

// import { MODAL_STATE, useCourse, useCourseModal } from "@/composables/course"
import * as courseService from "@/composables/course/course-service"


export default {
  components: {
    ModalCourse,
    UICourseItem,
  },
  setup() {
    
    const {
      courses,
    } = courseService.useCourseState();

    const MODAL_STATE = courseService.MODAL_STATE;

    const openModal = courseService.openModal;
    
    return {
      /* Course */
      courses,

      /* Modal */
      MODAL_STATE,
      openModal
    }
  },
}
</script>

<style>

</style>