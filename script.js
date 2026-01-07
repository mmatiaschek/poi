const defaultColors = {
    base: '#FAFAF7',
    text: '#1F2933',
    accent: '#0F766E',
    panel: '#F1EFE8',
    gold: '#C6A75E',
    secondary: '#6B7280'
};

const colorPickerToggle = document.getElementById('colorPickerToggle');
const colorPickerPanel = document.getElementById('colorPickerPanel');
const resetButton = document.getElementById('resetColors');

const colorInputs = {
    base: document.getElementById('colorBase'),
    text: document.getElementById('colorText'),
    accent: document.getElementById('colorAccent'),
    panel: document.getElementById('colorPanel'),
    gold: document.getElementById('colorGold'),
    secondary: document.getElementById('colorSecondary')
};

colorPickerToggle.addEventListener('click', () => {
    colorPickerPanel.classList.toggle('active');
});

document.addEventListener('click', (e) => {
    if (!document.getElementById('colorPicker').contains(e.target)) {
        colorPickerPanel.classList.remove('active');
    }
});

function updateColors() {
    const root = document.documentElement;
    
    root.style.setProperty('--color-base', colorInputs.base.value);
    root.style.setProperty('--color-text', colorInputs.text.value);
    root.style.setProperty('--color-accent', colorInputs.accent.value);
    root.style.setProperty('--color-panel', colorInputs.panel.value);
    root.style.setProperty('--color-gold', colorInputs.gold.value);
    root.style.setProperty('--color-secondary', colorInputs.secondary.value);
    
    const accentRgb = hexToRgb(colorInputs.accent.value);
    if (accentRgb) {
        root.style.setProperty('--color-accent-light', `rgba(${accentRgb.r}, ${accentRgb.g}, ${accentRgb.b}, 0.1)`);
    }
    
    const accentHover = adjustBrightness(colorInputs.accent.value, -10);
    root.style.setProperty('--color-accent-hover', accentHover);
    
    saveColors();
}

function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function adjustBrightness(hex, percent) {
    const rgb = hexToRgb(hex);
    if (!rgb) return hex;
    
    const adjust = (value) => {
        const adjusted = Math.round(value + (value * percent / 100));
        return Math.max(0, Math.min(255, adjusted));
    };
    
    const r = adjust(rgb.r).toString(16).padStart(2, '0');
    const g = adjust(rgb.g).toString(16).padStart(2, '0');
    const b = adjust(rgb.b).toString(16).padStart(2, '0');
    
    return `#${r}${g}${b}`;
}

function saveColors() {
    const colors = {
        base: colorInputs.base.value,
        text: colorInputs.text.value,
        accent: colorInputs.accent.value,
        panel: colorInputs.panel.value,
        gold: colorInputs.gold.value,
        secondary: colorInputs.secondary.value
    };
    localStorage.setItem('poi-colors', JSON.stringify(colors));
}

function loadColors() {
    const saved = localStorage.getItem('poi-colors');
    if (saved) {
        const colors = JSON.parse(saved);
        colorInputs.base.value = colors.base;
        colorInputs.text.value = colors.text;
        colorInputs.accent.value = colors.accent;
        colorInputs.panel.value = colors.panel;
        colorInputs.gold.value = colors.gold;
        colorInputs.secondary.value = colors.secondary;
        updateColors();
    }
}

function resetColors() {
    colorInputs.base.value = defaultColors.base;
    colorInputs.text.value = defaultColors.text;
    colorInputs.accent.value = defaultColors.accent;
    colorInputs.panel.value = defaultColors.panel;
    colorInputs.gold.value = defaultColors.gold;
    colorInputs.secondary.value = defaultColors.secondary;
    updateColors();
}

Object.values(colorInputs).forEach(input => {
    input.addEventListener('input', updateColors);
});

resetButton.addEventListener('click', resetColors);

loadColors();
