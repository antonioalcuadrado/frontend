
export const getSemester = () => {
    const hoy = new Date()
    const mes = hoy.getMonth() + 1
    
    if (mes >= 7 || mes <= 1) {
        return "1"
    } else if (mes >= 2 && mes <= 6) {
        return "2"
    }
}


