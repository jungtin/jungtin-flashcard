import {
    computed,
    reactive,
    ref,
} from "vue";
import $ from "jquery"

import { useToast, COURSE } from "@/composables/toast"
import * as courseRepository from "@/composables/course/course-repository"
import { coursesRef, getSyncFirestore } from "@/scripts/firebase-config"

const { addToast } = useToast();


export const MODAL_STATE = {
    CREATE: 'create',
    UPDATE: 'update'
}

/* STATE */
const modalStatus = ref([MODAL_STATE.CREATE]);
const courses = ref([]);
const currentCourse = ref(null);

export const useCourseState = function() {
    return {
        currentCourse: computed(() => currentCourse.value),
        courses: computed(() => courses.value),
        modalStatus: computed(() => modalStatus.value)
    }
}

export const modalData = reactive({
    id: null,
    name: null,
    description: null,
});



/* Computed */
export const modalAttrs = computed(function () {
    const title = {
        [MODAL_STATE.CREATE]: "Create",
        [MODAL_STATE.UPDATE]: "Update",
    }

    const classes = {
        [MODAL_STATE.CREATE]: "btn-success",
        [MODAL_STATE.UPDATE]: "btn-warning",
    }

    const clickEvent = {
        [MODAL_STATE.CREATE]: handleCreateCourse,
        [MODAL_STATE.UPDATE]: handleUpdateCourse,
    }

    return {
        title: title[modalStatus.value],
        classes: classes[modalStatus.value],
        clickEvent: clickEvent[modalStatus.value],
    }
})

/* Method */
export const openModal = ({
    course,
    state
}) => {
    if (state === MODAL_STATE.CREATE) {
        modalData.id = null;
        modalData.name = null;
        modalData.description = null;
    } else if (state === MODAL_STATE.UPDATE) {
        modalData.id = course.id;
        modalData.name = course.name;
        modalData.description = course.description;
    }

    modalStatus.value = state;
    $('#modal-course').modal('show')
}


export const handleCreateCourse = function() {
    courseRepository.createCourse({...modalData}).then(res => {
        addToast(COURSE.CREATE.SUCCESS); // notify
    }).catch(err => {
        console.error(err);
        addToast(COURSE.CREATE.FAIL); // notify
    })

    $("#modal-course").modal('hide')
}

export const handleUpdateCourse = function() {
    courseRepository.updateCourse({...modalData}).then(res => {
        addToast(COURSE.UPDATE.SUCCESS); // notify
    }).catch(err => {
        console.error(err);
        addToast(COURSE.UPDATE.FAIL); // notify
    })
    
    $("#modal-course").modal('hide')
}

export const handleDeleteCourse = function(course) {
    if(!confirm(`Are you really want to remove [${course.name}] course ?`))
            return;

    courseRepository.deleteCourse(course).then(res => {
        addToast(COURSE.DELETE.SUCCESS); //notify
    }).catch(err => {
        console.error(err);
        addToast(COURSE.DELETE.FAIL); // notify
    })
}



export const fetchDetailCourse = async (id) => {
    try {
        
        const snap = await courseRepository.getCourse(id);
        const course = {
            id: snap.id,
            ...snap.data()
        }

        currentCourse.value = course;
        return course;
    } catch(err) {
        console.log(err);
    }
}

export const fetchCourses = () => {
    getSyncFirestore(coursesRef, courses.value);
}