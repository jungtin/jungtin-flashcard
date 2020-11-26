import ViewCourse from '@/components/course/ViewCourse.vue';
import ViewCourseDetail from '@/components/course/ViewCourseDetail.vue';
import CmpQuestionAddBulk from '@/components/question/CmpQuestionAddBulk.vue';
import CmpQuestionListing from '@/components/question/CmpQuestionListing.vue';
import CmpQuestionModification from '@/components/question/CmpQuestionModification.vue';
import CmpQuestionPractice from '@/components/question/CmpQuestionPractice.vue';
import ViewQuestion from '@/components/question/ViewQuestion.vue';
import ViewHome from '@/components/ViewHome.vue';
import { error } from 'jquery';
import nProgress from 'nprogress';
import {
    createRouter,
    createWebHistory
} from "vue-router";
import * as chapterService from "../composables/chapter/chapter-service";
import * as courseService from "../composables/course/course-service";
import * as questionService from "../composables/question/question-service";
import {
    coursesRef,
    questionsRef
} from "./firebase-config";



const routes = [{
        name: "home",
        path: '/',
        // component: ViewHome,
        redirect: {
            name: "courses"
        }
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
            chapterService.fetchChapters(coursesRef.doc(courseId).collection("chapters"));

            try {
                await courseService.fetchDetailCourse(courseId);
                next();
            } catch (err) {
                console.log(err);
            }
        },
        children: [{
                name: "chapter-detail",
                path: 'chapters/:chapterId',
                component: ViewQuestion,
                redirect: {
                    name: "question-listing"
                },
                beforeEnter: async (to, from, next) => {
                    const chapterId = to.params.chapterId;
                    const courseId = to.params.courseId;
                    
                    const ref = questionsRef(courseId, chapterId);
                    questionService.fetchQuestions(ref);
                    
                    try {
                        await chapterService.fetchDetailChapter(chapterId);
                        next();
                    } catch(err) {
                        console.error(err);
                    }
                },
                children: [{
                        name: "question-listing",
                        path: 'listing',
                        component: CmpQuestionListing,
                    },
                    {
                        name: "question-modification",
                        path: 'modification',
                        component: CmpQuestionModification,
                    },
                    {
                        name: "question-add-bulk",
                        path: 'add-bulk',
                        component: CmpQuestionAddBulk,
                    },
                    {
                        name: "question-practice",
                        path: 'practice',
                        component: CmpQuestionPractice,
                        beforeEnter: async (to, from, next) => {
                            const chapterId = to.params.chapterId;
                            const courseId = to.params.courseId;
                            try {
                                await questionService.fetchQuestionsOnce(courseId, chapterId);
                                next();
                            } catch(err) {
                                console.error(err);
                            }
                        },
                    }
                ]
            },

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