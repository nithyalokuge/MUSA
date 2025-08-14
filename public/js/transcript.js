// Script for the transcript button (READ MORE, SEE LESS)

document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('toggleTranscriptBtn');
    const shortP = document.getElementById('transcript-short');
    const fullP = document.getElementById('transcript-full');

    btn.addEventListener('click', () => {
        const isShowingFull = !fullP.classList.contains('d-none');

        fullP.classList.toggle('d-none');
        shortP.classList.toggle('d-none');

        if (isShowingFull) {
            btn.innerHTML = 'READ MORE <i class="bi bi-chevron-double-down" aria-hidden="true"></i>';
        } else {
            btn.innerHTML = 'SEE LESS <i class="bi bi-chevron-double-up" aria-hidden="true"></i>';
        }
    });
});