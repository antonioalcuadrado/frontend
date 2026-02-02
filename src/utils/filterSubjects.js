const filterSubjectsBySemester = (subjects, semester) => {
    return subjects.filter(subject => subject.cuatrimester === parseInt(semester))
}

export default filterSubjectsBySemester
