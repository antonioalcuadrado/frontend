<script>
    import { horarioStore } from '../../store'
    import { Schedule } from '$lib/features/schedule'
    import html2canvas from 'html2canvas'
    import jsPDF from 'jspdf'

    let pdfRef;

    const downloadPDF = async() => {
        const canvas = await html2canvas(pdfRef, {
            scale: 2,        // better quality
            useCORS: true
        });

        const imgData = canvas.toDataURL('image/png');

        const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'px',
            format: [canvas.width, canvas.height]
        });

        pdf.addImage(imgData, 'PNG', 0, 0);
        pdf.save('schedule.pdf');
    }    

    let { data } = $props()
    
    const schedule = $derived($horarioStore[data.id])
</script>

<div>
    <div class="custom-schedule-pdf" bind:this={pdfRef}>
        <Schedule classes={schedule} />
    </div>

    <button on:click={downloadPDF} style="position: relative; z-index: 10; margin-top: 50px;">
        Descargar horario
    </button>
</div>

<style>
    .custom-schedule-pdf {
        position: relative;
        padding: 5% 10% 5% 2%;
    }
</style>
