<template>
<div class="text-white mt-3">
    <div class="d-flex justify-content-between align-items-center">
        <h2>Practice</h2>
        <div class="custom-control custom-switch">
            <input type="checkbox" 
              class="custom-control-input" 
              @change="isAnswerInOriginal = !isAnswerInOriginal" 
              :checked="isAnswerInOriginal" id="switch">
            <label class="custom-control-label" for="switch">Answer in Original</label>
        </div>
    </div>

    <div id="flashcard" :class="{ notify: isAnswerCorrect != null }">
        <h1 class="h1" v-if="isAnswerCorrect === null">{{ previewQuestion.question }}</h1>
        <template v-else>
            <h1 :class="{'notify-title-correct': isAnswerCorrect, 'notify-title-incorrect': !isAnswerCorrect}">
                {{ isAnswerCorrect ? 'Good Job ! You\'ve answered it right' : 'Oops! Wrong answer !' }}
            </h1>
            <h5 class="lead">Answer : <b>{{ previewQuestion.answer }}</b></h5>
            <hr>
            <small class="text-muted">*Hit enter to continue</small>
        </template>
    </div>
    <small class="form-text text-white">Question will be done (*remove) after {{ maxStack }} times correct</small>
    <div class="form-group mt-3">
        <input class="form-control" type="text" @keydown.enter.exact="submitAnswer" @keydown.esc.exact="skipQuestion" v-model="inputAnswer" placeholder="Answer here..." />
        <small class="form-text text-white">Use Esc key to Skip the Question
        </small>
    </div>
    <table class="table table-dark" v-if="questionListFiltered.length != 0">
        <tr>
            <th>Question</th>
            <th>Correct Times</th>
        </tr>
        <tr v-for="question in questionListFiltered" :key="question.id">
            <td v-if="!isAnswerInOriginal">{{ question.original }}</td>
            <td v-else>{{ question.learning }}</td>
            <td>{{ question.answeredNumber }}</td>
        </tr>
    </table>
</div>
</template>

<script>
import {
    computed,
    reactive,
    ref,
    watch
} from 'vue';
import * as questionService from "@/composables/question/question-service"
import {
    useToast,
    QUESTION_PRACTICE
} from "@/composables/toast"

export default {
    setup() {
        const {
          addToast
        } = useToast();

        /* State */
        const {
            questions
        } = questionService.useQuestionState();
        const inputAnswer = ref(null);
        const currentQuestion = ref(null);
        const isAnswerInOriginal = ref(false);
        const isAnswerCorrect = ref(null);
        const maxStack = ref(5);
        const questionList = ref(questions.value.map(question => {
            return {
                ...question,
                answeredNumber: 0
            }
        }));
        const questionListFiltered = computed(() => {
            return questionList.value.filter(question => question.answeredNumber < maxStack.value);
        })

        /* Computed */
        const previewQuestion = computed(() => {
          return {
            question: isAnswerInOriginal.value ? currentQuestion.value.learning : currentQuestion.value.original,
            answer: isAnswerInOriginal.value ? currentQuestion.value.original : currentQuestion.value.learning
          }
        })

        watch(isAnswerInOriginal, function() {
          skipQuestion(); /* tránh cheating */
        });

        const getRandomInt = (min, max) => {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        const skipQuestion = function () {
            isAnswerCorrect.value = null;

            if (currentQuestion.value === null) {
                let randIndex = getRandomInt(0, questionListFiltered.value.length - 1)
                currentQuestion.value = questionListFiltered.value[randIndex];
            } else {
                let randIndex;
                do {
                    randIndex = getRandomInt(0, questionListFiltered.value.length - 1)
                } while (currentQuestion.value.id === questionListFiltered.value[randIndex].id)
                currentQuestion.value = questionListFiltered.value[randIndex];
            }
            inputAnswer.value = null; // reset form
        }

        const submitAnswer = function () {
            if (isAnswerCorrect.value != null) {
                /* Chưa Skip */
                skipQuestion();
                return;
            }

            if (inputAnswer.value === previewQuestion.value.answer) {
                currentQuestion.value.answeredNumber++;
                isAnswerCorrect.value = true;
            } else {
                isAnswerCorrect.value = false;
            }
        }
        
        skipQuestion(); // onCreate

        return {
            inputAnswer,
            maxStack,
            currentQuestion,
            questionListFiltered,
            isAnswerCorrect,
            isAnswerInOriginal,
            previewQuestion,

            submitAnswer,
            skipQuestion
        }
    },
};
</script>

<style scoped>
#flashcard {
    border-radius: 10px;
    height: 350px;
    width: 100%;
    background: white;
    color: black;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 45px;
}

.notify {
    flex-direction: column;
    /* align-items: baseline!important; */
}

.notify-title-correct {
    color: rgba(38, 166, 154, 1.0);
}

.notify-title-incorrect {
    color: #dc3545;
}
</style>
