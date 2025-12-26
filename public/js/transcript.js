// Script for the transcript button (Read More, See Less)

document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('toggleTranscriptBtn');
    const shortP = document.getElementById('transcript-short');
    const fullP = document.getElementById('transcript-full');

    btn.addEventListener('click', () => {
        const isShowingFull = !fullP.classList.contains('d-none');

        fullP.classList.toggle('d-none');
        shortP.classList.toggle('d-none');

        if (isShowingFull) {
            btn.innerHTML = 'Read More';
        } else {
            btn.innerHTML = 'See Less';
        }
    });
});