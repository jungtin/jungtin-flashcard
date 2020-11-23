import { questionsRef } from "@/scripts/firebase-config"

export const createQuestion = (question, courseId, chapterId) =>  {
    delete question.id; // phòng hờ
    return questionsRef(courseId, chapterId).add(question);
}

export const updateQuestion = (question, courseId, chapterId) =>  {
    const ref = questionsRef(courseId, chapterId).doc(question.id);
    
    delete question.id;
    return ref.update(question);
}

export const deleteQuestion = (questionId, courseId, chapterId) => {
    return questionsRef(courseId, chapterId).doc(questionId).delete();
}