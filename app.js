document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const sollInput = document.getElementById('soll');
    const istInput = document.getElementById('ist');
    const sourceInputs = document.querySelectorAll('.source-input');
    const resultDisplays = document.querySelectorAll('.result-display');

    // State
    const state = {
        soll: 0,
        ist: 0
    };

    function calculate() {
        // Prevent division by zero
        if (state.soll <= 0 || state.ist <= 0) {
            resultDisplays.forEach(display => {
                display.textContent = '-';
                display.style.opacity = '0.5';
            });
            return;
        }

        const factor = state.ist / state.soll;

        sourceInputs.forEach((input, index) => {
            const originalStitches = parseInt(input.value, 10);
            const display = resultDisplays[index];

            if (!isNaN(originalStitches) && originalStitches > 0) {
                // Calculate and round to nearest 0.5 or integer? 
                // Usually stitches are integers, but let's do 1 decimal place if it's exact, or just round to integer for Cast On.
                // Standard knitting practice: round to nearest whole number usually.
                const newStitches = originalStitches * factor;
                const rounded = Math.round(newStitches);

                display.textContent = rounded;
                display.style.opacity = '1';
                // Highlight adjustment
                if (rounded !== originalStitches) {
                    display.style.color = 'var(--color-primary-dark)';
                } else {
                    display.style.color = 'var(--color-text)';
                }
            } else {
                display.textContent = '-';
                display.style.opacity = '0.5';
            }
        });
    }

    function updateState(e) {
        const value = parseInt(e.target.value, 10);
        state[e.target.id] = isNaN(value) ? 0 : value;
        calculate();
    }

    // Event Listeners
    sollInput.addEventListener('input', updateState);
    istInput.addEventListener('input', updateState);

    sourceInputs.forEach(input => {
        input.addEventListener('input', calculate);
    });

    // Initial Load - Check if browser cached values
    if (sollInput.value) state.soll = parseInt(sollInput.value, 10);
    if (istInput.value) state.ist = parseInt(istInput.value, 10);
    calculate();
});
