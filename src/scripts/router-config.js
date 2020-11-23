import {
    createRouter,
    createWebHistory
} from "vue-router"
import nProgress from 'nprogress'

import ViewCourse from '@/components/course/ViewCourse.vue';
import ViewCourseDetail from '@/components/course/ViewCourseDetail.vue';
import CmpQuestionModification from '@/components/question/CmpQuestionModification.vue';
import CmpQuestionListing from '@/components/question/CmpQuestionListing.vue';
import ViewHome from '@/components/ViewHome.vue';

import * as courseService from "../composables/course/course-service"
import * as chapterService from "../composables/chapter/chapter-service"
import * as questionService from "../composables/question/question-service"
import {
    coursesRef,
    questionsRef
} from "./firebase-config";

const routes = [{
        name: "home",
        path: '/',
        component: ViewHome,
    },
    {
        name: "courses",
        path: '/courses',
        component: ViewCourse,
        beforeEnter: (to, from, next) => {
            courseService.fetchCourses();
            next();
        },
        // alias: ["/"]
    },
    {
        name: "course-detail",
        path: '/courses/:courseId',
        component: ViewCourseDetail,
        beforeEnter: async (to, from, next) => {
            const courseId = to.params.courseId;

            try {
                const course = await courseService.fetchDetailCourse(courseId);

                chapterService.fetchChapters(coursesRef.doc(course.id).collection("chapters"));
                next();

            } catch (err) {
                console.log(err);
            }

        },
        children: [
            {
                name: "chapter-detail",
                path: 'chapters/:chapterId',
                component: CmpQuestionModification,
                beforeEnter: async (to, from, next) => {
                    const chapterId = to.params.chapterId;
                    chapterService.fetchDetailChapter(chapterId);

                    const {
                        currentCourse
                    } = courseService.useCourseState();
                    const courseId = currentCourse.value.id;

                    const ref = questionsRef(courseId, chapterId);
                    questionService.fetchQuestions(ref);

                    next();
                },
            },
            {
                name: "question-listing",
                path: 'chapters/:chapterId/listing',
                component: CmpQuestionListing,
                beforeEnter: async (to, from, next) => {
                    const chapterId = to.params.chapterId;
                    chapterService.fetchDetailChapter(chapterId);

                    const {
                        currentCourse
                    } = courseService.useCourseState();
                    const courseId = currentCourse.value.id;

                    const ref = questionsRef(courseId, chapterId);
                    questionService.fetchQuestions(ref);

                    next();
                },
            }
            
        ]
        // alias: ["/"]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to, from, next) => {
    nProgress.start();
    next();
})

router.afterEach((to, from, next) => {
    nProgress.done();
})

export default router
