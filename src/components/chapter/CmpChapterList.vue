<template>
<div class="col-12 col-md-4 py-4" id="chapter-list">
    <div>
        <p><b>Course Name</b> : {{ currentCourse.name }}</p>
        <p><b>Course Description</b> : {{ currentCourse.description }}</p>
    </div>
    <hr>
    <h1 class="h3">Chapter List</h1>

    <form @submit.prevent="submit" class="my-3">
        <input
            type="text"
            id="chapter-name"
            :class="['form-control', {'is-invalid': v.name.$error }]"
            placeholder="Enter new chapter . . ."
            v-model="v.name.$model"
        />

        <template v-for="(err, i) in v.name.$errors" :key="i">
        <div class="invalid-feedback">*{{ err.$message }}</div>
        </template>
    </form>
    <UIChapterItem v-for="chapter in chapters" :chapter="chapter" :key="chapter.id"/>
</div>
<ModalChapter/>
</template>

<script>
import ModalChapter from '@/components/chapter/ModalChapter.vue';
import UIChapterItem from '@/components/chapter/UIChapterItem.vue';

import { ref, toRefs } from 'vue';
import { useVuelidate } from '@vuelidate/core'
import * as courseService from "@/composables/course/course-service"
import * as courseRepository from "@/composables/course/course-repository"
import * as chapterService from "@/composables/chapter/chapter-service"

import {
    required
} from "@vuelidate/validators"



export default {
    components: {
        ModalChapter,
        UIChapterItem,
    },
    setup() {
        /* Course Detail */
        const { currentCourse } = courseService.useCourseState();

        /* Chapter */
        const {
            name
        } = toRefs(chapterService.formData);

        const {
            chapters
        } = chapterService.useChapterState();

        const handleAddChapter = chapterService.handleAddChapter;
        const handleUpdateChapter = chapterService.handleUpdateChapter;
        
        /* Vuelidate */
        const rules = {
            name: { required },
        }

        const v = useVuelidate(rules, { name }); // Lý do sử dụng Composition cho vuelidate là vì conflict
        const submit = () => {
            v.value.$touch();
            if (!v.value.$error) {
                handleAddChapter();
                v.value.$reset();
            }
        }
        
        return {
            /* Vuelidate */
            v,
            submit,
            
            /* State */
            currentCourse,

            name,
            chapters,

            /* Methods */
            handleAddChapter,
            handleUpdateChapter,
        }
    },
}
</script>

<style scoped>
#chapter-list {
    background: rgb(211,213,213);
}

#chapter-input {
    border: 2px solid green;
    box-sizing: border-box;
}
</style>
