// وحدات القياس
const units = {
    "متر مربع (m²)": 1.0,
    "اللبنة الصنعاني": 44.44,
    "اللبنة الذماري": 114.49,
    "اللبنة العمراني": 64.0,
    "اللبنة المحويتي": 64.0,
    "القصبة التعزي (العشاري)": 20.25,
    "القصبة التعزي (الهدوي/الاثناعشري)": 29.16,
    "القصبة الإبي": 56.0
};

// تهيئة التطبيق عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    initializeUnits();
    setupEventListeners();
    
    // جعل الأقسام قابلة للطي
    document.querySelectorAll('.card-header').forEach(header => {
        header.addEventListener('click', () => {
            header.parentElement.classList.toggle('collapsed');
        });
    });
});

// تهيئة الوحدات في القوائم المنسدلة
function initializeUnits() {
    const fromUnitSelect = document.getElementById('fromUnit');
    const toUnitSelect = document.getElementById('toUnit');
    const unitsList = document.getElementById('unitsList');
    
    for (const unit in units) {
        const option1 = document.createElement('option');
        option1.value = unit;
        option1.textContent = unit;
        fromUnitSelect.appendChild(option1);
        
        const option2 = document.createElement('option');
        option2.value = unit;
        option2.textContent = unit;
        toUnitSelect.appendChild(option2);
    }
    
    // تعيين القيم الافتراضية
    fromUnitSelect.value = "متر مربع (m²)";
    toUnitSelect.value = "اللبنة الصنعاني";
    
    // ملء قائمة الوحدات
    let unitsHTML = '';
    for (const unit in units) {
        unitsHTML += `
            <div style="padding: 10px; border-bottom: 1px solid var(--glass-border);">
                <div style="font-weight: bold;">${unit}</div>
                <div style="color: var(--muted); font-size: 14px;">${units[unit]} متر مربع</div>
            </div>
        `;
    }
    unitsList.innerHTML = unitsHTML;
}

// إعداد مستمعي الأحداث
function setupEventListeners() {
    const themeToggle = document.getElementById('themeToggle');
    const convertBtn = document.getElementById('convertBtn');
    const swapBtn = document.getElementById('swapBtn');
    const shapeButtons = document.querySelectorAll('.shape-btn');
    const calculateAreaBtn = document.getElementById('calculateArea');
    
    // تبديل الوضع النهاري/الليلي
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        if (document.body.classList.contains('light-mode')) {
            themeToggle.querySelector('span').textContent = 'وضع نهاري';
        } else {
            themeToggle.querySelector('span').textContent = 'وضع ليلي';
        }
    });
    
    // تحويل الوحدات
    convertBtn.addEventListener('click', convertUnits);
    
    // تبديل الوحدات
    swapBtn.addEventListener('click', swapUnits);
    
    // إدارة الأشكال الهندسية
    shapeButtons.forEach(button => {
        button.addEventListener('click', () => {
            shapeButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            updateShapeInputs(button.dataset.shape);
        });
    });
    
    // حساب مساحة الشكل
    calculateAreaBtn.addEventListener('click', calculateArea);
}

// تحويل الوحدات
function convertUnits() {
    const value = parseFloat(document.getElementById('value').value);
    const fromUnit = document.getElementById('fromUnit').value;
    const toUnit = document.getElementById('toUnit').value;
    const conversionResult = document.getElementById('conversionResult');
    
    if (isNaN(value)) {
        conversionResult.innerHTML = '<div style="color: #ef4444;">يرجى إدخال قيمة صحيحة</div>';
        return;
    }
    
    const result = (value * units[fromUnit]) / units[toUnit];
    conversionResult.innerHTML = `
        <div style="text-align: center;">
            <div style="font-size: 24px; font-weight: bold; color: var(--accent1);">${result.toFixed(4)}</div>
            <div style="color: var(--muted);">${toUnit}</div>
            <div style="margin-top: 10px; font-size: 14px;">${value} ${fromUnit} = ${result.toFixed(4)} ${toUnit}</div>
        </div>
    `;
}

// تبديل الوحدات
function swapUnits() {
    const fromUnitSelect = document.getElementById('fromUnit');
    const toUnitSelect = document.getElementById('toUnit');
    const temp = fromUnitSelect.value;
    fromUnitSelect.value = toUnitSelect.value;
    toUnitSelect.value = temp;
}

// تحديث حقول الإدخال حسب الشكل المحدد
function updateShapeInputs(shape) {
    const shapeInputs = document.getElementById('shapeInputs');
    let inputsHTML = '';
    
    switch(shape) {
        case 'square':
            inputsHTML = `
                <div class="form-group">
                    <label for="side">طول الضلع</label>
                    <input type="number" id="side" placeholder="أدخل طول الضلع">
                </div>
            `;
            break;
        case 'rectangle':
            inputsHTML = `
                <div class="form-group">
                    <label for="length">الطول</label>
                    <input type="number" id="length" placeholder="أدخل الطول">
                </div>
                <div class="form-group">
                    <label for="width">العرض</label>
                    <input type="number" id="width" placeholder="أدخل العرض">
                </div>
            `;
            break;
        case 'triangle':
            inputsHTML = `
                <div class="form-group">
                    <label for="base">القاعدة</label>
                    <input type="number" id="base" placeholder="أدخل طول القاعدة">
                </div>
                <div class="form-group">
                    <label for="height">الارتفاع</label>
                    <input type="number" id="height" placeholder="أدخل الارتفاع">
                </div>
            `;
            break;
        case 'circle':
            inputsHTML = `
                <div class="form-group">
                    <label for="radius">نصف القطر</label>
                    <input type="number" id="radius" placeholder="أدخل نصف القطر">
                </div>
            `;
            break;
        case 'trapezoid':
            inputsHTML = `
                <div class="form-group">
                    <label for="base1">القاعدة الكبرى</label>
                    <input type="number" id="base1" placeholder="أدخل القاعدة الكبرى">
                </div>
                <div class="form-group">
                    <label for="base2">القاعدة الصغرى</label>
                    <input type="number" id="base2" placeholder="أدخل القاعدة الصغرى">
                </div>
                <div class="form-group">
                    <label for="trapHeight">الارتفاع</label>
                    <input type="number" id="trapHeight" placeholder="أدخل الارتفاع">
                </div>
            `;
            break;
    }
    
    shapeInputs.innerHTML = inputsHTML;
}

// حساب مساحة الشكل
function calculateArea() {
    const activeShape = document.querySelector('.shape-btn.active').dataset.shape;
    const areaResult = document.getElementById('areaResult');
    let area = 0;
    let formula = '';
    
    switch(activeShape) {
        case 'square':
            const side = parseFloat(document.getElementById('side').value);
            if (isNaN(side)) {
                areaResult.innerHTML = '<div style="color: #ef4444;">يرجى إدخال قيمة صحيحة</div>';
                return;
            }
            area = side * side;
            formula = `مربع = الضلع × الضلع = ${side} × ${side}`;
            break;
        case 'rectangle':
            const length = parseFloat(document.getElementById('length').value);
            const width = parseFloat(document.getElementById('width').value);
            if (isNaN(length) || isNaN(width)) {
                areaResult.innerHTML = '<div style="color: #ef4444;">يرجى إدخال قيم صحيحة</div>';
                return;
            }
            area = length * width;
            formula = `مستطيل = الطول × العرض = ${length} × ${width}`;
            break;
        case 'triangle':
            const base = parseFloat(document.getElementById('base').value);
            const height = parseFloat(document.getElementById('height').value);
            if (isNaN(base) || isNaN(height)) {
                areaResult.innerHTML = '<div style="color: #ef4444;">يرجى إدخال قيم صحيحة</div>';
                return;
            }
            area = 0.5 * base * height;
            formula = `مثلث = ½ × القاعدة × الارتفاع = ½ × ${base} × ${height}`;
            break;
        case 'circle':
            const radius = parseFloat(document.getElementById('radius').value);
            if (isNaN(radius)) {
                areaResult.innerHTML = '<div style="color: #ef4444;">يرجى إدخال قيمة صحيحة</div>';
                return;
            }
            area = Math.PI * radius * radius;
            formula = `دائرة = π × نصف القطر² = 3.14 × ${radius}²`;
            break;
        case 'trapezoid':
            const base1 = parseFloat(document.getElementById('base1').value);
            const base2 = parseFloat(document.getElementById('base2').value);
            const trapHeight = parseFloat(document.getElementById('trapHeight').value);
            if (isNaN(base1) || isNaN(base2) || isNaN(trapHeight)) {
                areaResult.innerHTML = '<div style="color: #ef4444;">يرجى إدخال قيم صحيحة</div>';
                return;
            }
            area = 0.5 * (base1 + base2) * trapHeight;
            formula = `شبه منحرف = ½ × (القاعدة الكبرى + القاعدة الصغرى) × الارتفاع = ½ × (${base1} + ${base2}) × ${trapHeight}`;
            break;
    }
    
    areaResult.innerHTML = `
        <div style="text-align: center;">
            <div style="font-size: 24px; font-weight: bold; color: var(--accent1);">${area.toFixed(4)} متر مربع</div>
            <div style="color: var(--muted); margin-top: 10px;">${formula}</div>
        </div>
    `;
}