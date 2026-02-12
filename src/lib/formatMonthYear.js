export const formatMonthYear = (dateStr) => {
     /**
     * arg: "2026-01", "2026-02" format month string
     * return: "Jan 2026", "Feb 2026", format month string
     */

    if (!dateStr) return

    const [year, mm] = dateStr.split("-")
    const month = monthDigitToString(mm)
    return month + " " + year
    
}

function monthDigitToString(mm) {
    /**
     * arg: "01", "02" format month string
     * return: "Jan", "Feb", format month string
     */

    const m = Number(mm)
    switch (m) {
        case 1: return "Jan"
        case 2: return "Feb"
        case 3: return "Mar"
        case 4: return "Apr"
        case 5: return "May"
        case 6: return "Jun"
        case 7: return "Jul"
        case 8: return "Aug"
        case 9: return "Sep"
        case 10: return "Oct"
        case 11: return "Nov"
        case 12: return "Dec"
        default: throw new Error("Error: monthDigitToString(mm: Out of bound)")
    }
}