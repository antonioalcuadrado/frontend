<script>
    import { horarioStore } from '$lib/store/horario_store'
    import { goto } from '$app/navigation'
    import { Schedule } from '$lib/features/schedule'
    import { RightArrow, Download } from '$lib/icons'
    import html2canvas from 'html2canvas'
    import jsPDF from 'jspdf'
    import './sass/page.sass'

    let pdfRef;

    const downloadPDF = async() => {
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
            Descargar horario<Download size=1 color="#fff" />
        </button>
    </section>

    <div class="custom-schedule-pdf" bind:this={pdfRef}>
        <Schedule classes={schedule} />
    </div>
</div>

