export const filterSubjectsBySemester = (subjects, semester) => {
    return subjects.filter(subject => subject.cuatrimester === parseInt(semester))
} 
