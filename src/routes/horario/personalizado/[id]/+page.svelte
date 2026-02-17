<script>
    import { horarioStore } from '../../store'
    import { goto } from '$app/navigation'
    import { Schedule } from '$lib/features/schedule'
    import { RightArrow } from '$lib/icons'
    import html2canvas from 'html2canvas'
    import jsPDF from 'jspdf'
    import './sass/page.sass'

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
    
    const goback = () => {
        goto('/horario/personalizado')
    }
</script>

<div>
    <section class="download">
        <button on:click={() => goback()} class="goback-button">
            <RightArrow color="#fff"/>
        </button>
        <button on:click={downloadPDF} class="download-button">
            Descargar horario
        </button>
    </section>

    <div class="custom-schedule-pdf" bind:this={pdfRef}>
        <Schedule classes={schedule} />
    </div>
</div>

