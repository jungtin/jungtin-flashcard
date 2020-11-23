<template>
<div class="col-6 col-lg-4">
    <div class="jumbotron">
        <button class="btn-del-course btn btn-sm btn-danger" @click="handleDeleteCourse(course)">x</button>
        
        <h1 class="display-4">{{ course.name }}</h1>
        <hr class="my-4">
        <p>{{ course.description }}</p>
        <router-link :to="{name: 'course-detail', params: {courseId: course.id}}" v-slot="{ href }" custom>
            <a class="btn btn-success mr-3" :href="href">Let's go</a>
        </router-link>
        <button class="btn btn-warning" @click="openModal({
              course,
              state: MODAL_STATE.UPDATE
            })">
            Update
        </button>
    </div>
</div>
</template>

<script>
import * as courseService from "@/composables/course/course-service"

export default {
    props: {
        course: {
            type: Object,
            required: true
        }
    },
    setup(props) {
        const MODAL_STATE = courseService.MODAL_STATE;
        const openModal = courseService.openModal;
        const handleDeleteCourse = courseService.handleDeleteCourse;

        return {
            /* Course */
            handleDeleteCourse,

            /* Modal */
            MODAL_STATE,
            openModal,
        }
    },
}
</script>

<style scoped>
    .btn-del-course {
        position: absolute;
        top: 7px;
        right: 7px;
    }

    .jumbotron { 
        position: relative!important;
    }
</style>
