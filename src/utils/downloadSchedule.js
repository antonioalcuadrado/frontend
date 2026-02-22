import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

const downloadSchedule = async(pdfRef) => {
    const canvas = await html2canvas(pdfRef, {
        scale: 2,
        useCORS: true,
        backgroundColor: null,
    });

    const imgData = canvas.toDataURL('image/png');

    const pdf = new jsPDF('p', 'mm', 'a4'); // standard A4

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pageWidth;
    const pdfHeight = (imgProps.height * pageWidth) / imgProps.width; // scale height to keep ratio

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('schedule.pdf');
}

export default downloadSchedule
