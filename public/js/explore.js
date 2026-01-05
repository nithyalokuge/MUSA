// Script for searching for artifacts

document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const applyBtn = document.getElementById('applyFilters');
    const clearBtn = document.getElementById('clearFilters');
    const resultsContainer = document.getElementById('artifactResults');

    const getSelectedCheckboxValues = (selector) => {
        return [...document.querySelectorAll(selector)]
        .filter(cb => cb.checked)
        .map(cb => cb.value);
    };

    const fetchAndRender = async () => {
        const q = searchInput.value.trim();
        const category = getSelectedCheckboxValues('[id^=cat]');
        const type = getSelectedCheckboxValues('[id^=type]');
        const floor = getSelectedCheckboxValues('[id^=floor]');

        const params = new URLSearchParams();
        if (q) params.append('q', q);  
        if (category.length) params.append('category', category.join(','));
        if (type.length) params.append('type', type.join(','));
        if (floor.length) params.append('floor', floor.join(','));

        const res = await fetch(`/hunt/artifacts/search?${params.toString()}`);
        const json = await res.json();
        // console.log(json.data);
        renderResults(json.data || [], q);
    };

    const renderResults = (artifacts) => {
        resultsContainer.innerHTML = '';

        if (!artifacts.length) {
            resultsContainer.innerHTML = `<p class="text-center">No items found.</p>`;
            if (qrBtn) qrBtn.style.display = 'none';
            return;
        }

        artifacts.forEach(artifact => {
            const col = document.createElement('div');
            col.className = 'col-6 col-md-4 col-lg-3';
            col.innerHTML = `
                <a href="/hunt/artifacts/${artifact.id}" class="artifact-link">
                    <img src="${artifact.image_url}" alt="${artifact.title}" class="artifact-img">
                    <div class="artifact-title">${artifact.title}</div>
                    <div class="artifact-author">${artifact.author}</div>
                </a>
            `;
            resultsContainer.appendChild(col);
        });
    };

    searchInput.addEventListener('input', fetchAndRender);

    applyBtn.addEventListener('click', () => {fetchAndRender();});

    clearBtn.addEventListener('click', () => {
        document.querySelectorAll('input[type=checkbox]').forEach(cb => cb.checked = false);
        searchInput.value = '';
        fetchAndRender();
    });

    fetchAndRender();
});
