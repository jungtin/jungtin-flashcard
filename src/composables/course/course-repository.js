import { coursesRef } from "@/scripts/firebase-config"


/* Method */
export const createCourse = (course) =>  {
    delete course.id;
    return coursesRef.add(course);
}

export const updateCourse = (course) =>  {
    const ref = coursesRef.doc(course.id);
    
    delete course.id;
    return ref.update(course);
}

export const deleteCourse = (course) => {
    return coursesRef.doc(course.id).delete();
}

export const getCourse = courseId => {
    return coursesRef.doc(courseId).get();
}