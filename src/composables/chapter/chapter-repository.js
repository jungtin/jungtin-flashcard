import { chaptersRef } from "@/scripts/firebase-config"

export const createChapter = (chapter, courseId) =>  {
    delete chapter.id; // phòng hờ
    return chaptersRef(courseId).add(chapter);
}

export const updateChapter = (chapter, courseId) =>  {
    const ref = chaptersRef(courseId).doc(chapter.id);
    
    delete chapter.id;
    return ref.update(chapter);
}

export const deleteChapter = (chapterId, courseId) => {
    return chaptersRef(courseId).doc(chapterId).delete();
}

export const getChapter = (courseId, chaperId) => {
    return chaptersRef(courseId).doc(chaperId).get();
}