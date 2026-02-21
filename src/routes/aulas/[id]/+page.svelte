<script>
    import './sass/page.sass'
    import { Schedule } from '$lib/features/schedule';
    import { fetchHallLectures } from '../../../hooks/halls';
    import { RightArrow } from '$lib/icons'
    import { goto } from '$app/navigation'

    let { data } = $props();
    
    const handleGoBack = () => {
        goto('/aulas')
    }
</script>

<div class="hall-schedule">
    <section class="hall-schedule-nav">
        <button on:click={handleGoBack}>
            <RightArrow color="#fff" className="exit-arrow" />
        </button>
        <p>{data.hall.code}</p>
    </section>
    <section class="hall-schedule-viewer">
        {#if !data?.hall_lectures}
            <p>Loading...</p>
        {:else}
            <Schedule classes={data.hall_lectures} />
        {/if}
    </section>
</div>
