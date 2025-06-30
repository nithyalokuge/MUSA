// Script for dynamically change settings 

document.addEventListener("DOMContentLoaded", function () {
    const body = document.body;

    const defaultSettings = {
        contrast: "default",
        textSize: "regular",
        textStyle: "default"
    };

    const settings = JSON.parse(localStorage.getItem("userSettings")) || defaultSettings;

    function applySettings() {
        body.classList.remove("dark-mode", "large-text", "dyslexia-font");

        if (settings.contrast === "dark") {
            body.classList.add("dark-mode");
        }

        if (settings.textSize === "large") {
            body.classList.add("large-text");
        }

        if (settings.textStyle === "dyslexia") {
            body.classList.add("dyslexia-font");
        }

        // Update checked radios
        document.querySelector(`input[name="contrast"][value="${settings.contrast}"]`).checked = true;
        document.querySelector(`input[name="text-size"][value="${settings.textSize}"]`).checked = true;
        document.querySelector(`input[name="text-style"][value="${settings.textStyle}"]`).checked = true;
    }

    function saveSettings() {
        localStorage.setItem("userSettings", JSON.stringify(settings));
    }

    document.querySelectorAll('input[type="radio"]').forEach(input => {
        input.addEventListener("change", () => {
            if (input.name === "contrast") {
                settings.contrast = input.value;
            } else if (input.name === "text-size") {
                settings.textSize = input.value;
            } else if (input.name === "text-style") {
                settings.textStyle = input.value;
            }

            applySettings();
            saveSettings();
        });
    });

    applySettings();
});