// Kerakli o'zgaruvchilar
const editors = {
    html: document.getElementById('htmlEditor'),
    css: document.getElementById('cssEditor'),
    js: document.getElementById('jsEditor')
};

const output = document.getElementById('output');
const errorModal = document.getElementById('errorModal');
const errorMessage = document.getElementById('errorMessage');

// Doimiy o'zgarmaslar
const AUTOSAVE_DELAY = 1000; // 1 sekund
const DEFAULT_INDENT = '    '; // 4 ta bo'sh joy
const STORAGE_KEYS = {
    html: 'savedHtmlCode',
    css: 'savedCssCode',
    js: 'savedJsCode'
};

// Lorem generator uchun so'zlar
const LOREM_WORDS = [
    "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit",
    "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore",
    "magna", "aliqua", "enim", "ad", "minim", "veniam", "quis", "nostrud",
    "exercitation", "ullamco", "laboris", "nisi", "aliquip", "ex", "ea", "commodo"
];

// Shablonlar va teglar
const templates = {
    html: {

        'div': '<div class=""></div>',
    'span': '<span class=""></span>',
    'p': '<p class=""></p>',
    'h1': '<h1 class=""></h1>',
    'h2': '<h2 class=""></h2>',
    'h3': '<h3 class=""></h3>',
    'h4': '<h4 class=""></h4>',
    'h5': '<h5 class=""></h5>',
    'h6': '<h6 class=""></h6>',
    'button': '<button class=""></button>',
    'input': '<input type="text" class="" />',
    'a': '<a href="" class=""></a>',
    'img': '<img src="" alt="" class="" />',
    'ul': '<ul class=""></ul>',
    'li': '<li class=""></li>',
    'tr': '<tr></tr>',
    'td': '<td></td>',
    'section': '<section class=""></section>',
    'article': '<article class=""></article>',
    'aside': '<aside class=""></aside>',
    'header': '<header class=""></header>',
    'footer': '<footer class=""></footer>',
    'nav': '<nav class=""></nav>',
    'main': '<main class=""></main>',
    'form': '<form class=""></form>',
    'label': '<label for=""></label>',
    'textarea': '<textarea class=""></textarea>',
    'select': '<select class=""></select>',
    'option': '<option value=""></option>',
    'th': '<th></th>',
    'tbody': '<tbody></tbody>',
    'thead': '<thead></thead>',
    'tfoot': '<tfoot></tfoot>',
    'fieldset': '<fieldset></fieldset>',
    'legend': '<legend></legend>',
    'dl': '<dl></dl>',
    'dt': '<dt></dt>',
    'dd': '<dd></dd>',
    'figure': '<figure class=""></figure>',
    'figcaption': '<figcaption></figcaption>',
    'time': '<time datetime=""></time>',
    'mark': '<mark></mark>',
    'cite': '<cite></cite>',
    'blockquote': '<blockquote class=""></blockquote>',
    'code': '<code></code>',
    'pre': '<pre></pre>',
    'iframe': '<iframe src="" frameborder="0"></iframe>',

        'table': `<table class="custom-table" border="1">
    <thead>
        <tr>
            <th>№</th>
            <th>Ism</th>
            <th>Familiya</th>
            <th>Yosh</th>
            <th>Lavozim</th>
            <th>Maosh</th>
            <th>Amallar</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>1</td>
            <td>Adhambek</td>
            <td>Qo'ziboyev</td>
            <td>25</td>
            <td>Developer</td>
            <td>12,500, 000</td>
            <td>
                <button class="edit-btn">O'zgartirish</button>
                <button class="delete-btn">O'chirish</button>
            </td>
        </tr>
    </tbody>
    <tfoot>
        <tr>
            <td colspan="5">Jami:</td>
            <td colspan="2">2,500,000</td>
        </tr>
    </tfoot>
</table>`,

        'form': `<form class="registration-form">
    <h2 class="form-title">Ro'yxatdan o'tish</h2>
    
    <div class="form-group">
        <label for="firstName">Ism *</label>
        <input type="text" id="firstName" name="firstName" required 
               placeholder="Ismingizni kiriting" class="form-control">
    </div>

    <div class="form-group">
        <label for="lastName">Familiya *</label>
        <input type="text" id="lastName" name="lastName" required 
               placeholder="Familiyangizni kiriting" class="form-control">
    </div>

    <div class="form-group">
        <label for="email">Email *</label>
        <input type="email" id="email" name="email" required 
               placeholder="Email manzilingizni kiriting" class="form-control">
    </div>

    <div class="form-group">
        <label for="phone">Telefon *</label>
        <input type="tel" id="phone" name="phone" required 
               placeholder="+998 90 123 45 67" class="form-control"
               pattern="[+][0-9]{3} [0-9]{2} [0-9]{3} [0-9]{2} [0-9]{2}">
    </div>

    <div class="form-group">
        <label for="birthday">Tug'ilgan sana</label>
        <input type="date" id="birthday" name="birthday" class="form-control">
    </div>

    <div class="form-group">
        <label for="gender">Jinsi</label>
        <select id="gender" name="gender" class="form-control">
            <option value="">Tanlang</option>
            <option value="male">Erkak</option>
            <option value="female">Ayol</option>
        </select>
    </div>

    <div class="form-group">
        <label>Qiziqishlaringiz:</label>
        <div class="checkbox-group">
            <label class="checkbox-label">
                <input type="checkbox" name="interests" value="sport"> Sport
            </label>
            <label class="checkbox-label">
                <input type="checkbox" name="interests" value="music"> Musiqa
            </label>
            <label class="checkbox-label">
                <input type="checkbox" name="interests" value="reading"> Kitob o'qish
            </label>
        </div>
    </div>

    <div class="form-group">
        <label>Ma'lumotingiz:</label>
        <div class="radio-group">
            <label class="radio-label">
                <input type="radio" name="education" value="high"> Oliy
            </label>
            <label class="radio-label">
                <input type="radio" name="education" value="secondary"> O'rta
            </label>
        </div>
    </div>

    <div class="form-group">
        <label for="avatar">Rasm yuklash</label>
        <input type="file" id="avatar" name="avatar" 
               accept="image/*" class="form-control">
    </div>

    <div class="form-group">
        <label for="about">O'zingiz haqingizda</label>
        <textarea id="about" name="about" rows="4" 
                  placeholder="Qisqacha ma'lumot kiriting" class="form-control"></textarea>
    </div>

    <div class="form-group">
        <label for="password">Parol *</label>
        <input type="password" id="password" name="password" required 
               placeholder="Parolni kiriting" class="form-control">
    </div>

    <div class="form-group">
        <label for="confirmPassword">Parolni tasdiqlash *</label>
        <input type="password" id="confirmPassword" name="confirmPassword" required 
               placeholder="Parolni qayta kiriting" class="form-control">
    </div>

    <div class="form-group agreement-group">
        <label class="checkbox-label">
            <input type="checkbox" name="agreement" required>
            Foydalanish shartlariga roziman
        </label>
    </div>

    <div class="form-actions">
        <button type="submit" class="submit-btn">Ro'yxatdan o'tish</button>
        <button type="reset" class="reset-btn">Tozalash</button>
    </div>
</form>`,

        'ul': `<ul class="custom-list">
    <li class="list-item">
        <h3 class="item-title">Element 1</h3>
        <p class="item-description">Element haqida ma'lumot</p>
    </li>
    <li class="list-item">
        <h3 class="item-title">Element 2</h3>
        <p class="item-description">Element haqida ma'lumot</p>
    </li>
    <li class="list-item">
        <h3 class="item-title">Element 3</h3>
        <p class="item-description">Element haqida ma'lumot</p>
    </li>
</ul>`,

        'ol': `<ol class="ordered-list">
    <li class="list-item">Birinchi qadam
        <ol class="nested-list">
            <li>Kichik qadam 1.1</li>
            <li>Kichik qadam 1.2</li>
        </ol>
    </li>
    <li class="list-item">Ikkinchi qadam
        <ol class="nested-list">
            <li>Kichik qadam 2.1</li>
            <li>Kichik qadam 2.2</li>
        </ol>
    </li>
    <li class="list-item">Uchinchi qadam</li>
</ol>`,

        'dl': `<dl class="definition-list">
    <dt class="term">HTML</dt>
    <dd class="description">HyperText Markup Language - veb-sahifalar yaratish uchun standart belgilash tili.</dd>
    
    <dt class="term">CSS</dt>
    <dd class="description">Cascading Style Sheets - veb-sahifalarning ko'rinishini belgilash uchun ishlatiladigan uslublar tili.</dd>
    
    <dt class="term">JavaScript</dt>
    <dd class="description">Veb-sahifalarni dinamik va interaktiv qilish uchun ishlatiladigan dasturlash tili.</dd>
</dl>`,

        'menu': `<nav class="menu">
    <ul class="menu-list">
        <li class="menu-item">
            <a href="#" class="menu-link">Bosh sahifa</a>
            <ul class="submenu">
                <li><a href="#">Yangiliklar</a></li>
                <li><a href="#">So'nggi qo'shilganlar</a></li>
            </ul>
        </li>
        <li class="menu-item">
            <a href="#" class="menu-link">Mahsulotlar</a>
            <ul class="submenu">
                <li><a href="#">Yangi mahsulotlar</a></li>
                <li><a href="#">Ommabop mahsulotlar</a></li>
                <li><a href="#">Chegirmalar</a></li>
            </ul>
        </li>
        <li class="menu-item">
            <a href="#" class="menu-link">Bog'lanish</a>
        </li>
    </ul>
</nav>`,

        'contact': `<section class="contact-section">
    <div class="container">
        <h2>Bog'lanish</h2>
        <div class="contact-content">
            <div class="contact-info">
                <h3>Kontakt ma'lumotlar</h3>
                <ul class="contact-list">
                    <li><i class="icon-location"></i>Manzil: Toshkent sh, Example ko'chasi, 1-uy</li>
                    <li><i class="icon-phone"></i>Tel: +998 90 123 45 67</li>
                    <li><i class="icon-email"></i>Email: info@example.uz</li>
                </ul>
                <div class="social-links">
                    <a href="#" class="social-link">Facebook</a>
                    <a href="#" class="social-link">Instagram</a>
                    <a href="#" class="social-link">Telegram</a>
                </div>
            </div>
            <form class="contact-form">
                <div class="form-group">
                    <label for="name">Ism *</label>
                    <input type="text" id="name" required>
                </div>
                <div class="form-group">
                    <label for="contactEmail">Email *</label>
                    <input type="email" id="contactEmail" required>
                </div>
                <div class="form-group">
                    <label for="message">Xabar *</label>
                    <textarea id="message" rows="5" required></textarea>
                </div>
                <button type="submit">Yuborish</button>
            </form>
        </div>
    </div>
</section>`,

        'card': `<div class="card">
    <div class="card-image">
        <img src="placeholder.jpg" alt="Card image">
    </div>
    <div class="card-content">
        <h3 class="card-title">Sarlavha</h3>
        <p class="card-text">Bu yerda asosiy matn bo'ladi. Mahsulot yoki xizmat haqida qisqacha ma'lumot.</p>
        <div class="card-actions">
            <button class="btn primary">Batafsil</button>
            <button class="btn secondary">Saqlash</button>
        </div>
    </div>
</div>`,
        '!': `<!DOCTYPE html>
<html lang="uz">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    
</body>
</html>`,
        'header': `<header class="header">
    <nav class="nav">
        <ul class="nav-list">
            <li><a href="#" class="nav-link">Bosh sahifa</a></li>
            <li><a href="#" class="nav-link">Biz haqimizda</a></li>
            <li><a href="#" class="nav-link">Xizmatlar</a></li>
            <li><a href="#" class="nav-link">Aloqa</a></li>
        </ul>
    </nav>
</header>`,
        'main': `<main class="main">
    <section class="hero">
        <div class="container">
            <h1 class="hero-title">Asosiy sarlavha</h1>
            <p class="hero-text">Bu yerda asosiy matn bo'ladi</p>
        </div>
    </section>
    
    <section class="features">
        <div class="container">
            <h2 class="section-title">Xizmatlar</h2>
            <div class="features-grid">
                <div class="feature-card">
                    <h3>Xizmat 1</h3>
                    <p>Xizmat haqida ma'lumot</p>
                </div>
                <div class="feature-card">
                    <h3>Xizmat 2</h3>
                    <p>Xizmat haqida ma'lumot</p>
                </div>
                <div class="feature-card">
                    <h3>Xizmat 3</h3>
                    <p>Xizmat haqida ma'lumot</p>
                </div>
            </div>
        </div>
    </section>
</main>`,
        'footer': `<footer class="footer">
    <div class="container">
        <div class="footer-content">
            <div class="footer-info">
                <h3 class="footer-title">Kompaniya nomi</h3>
                <p>Manzil: Toshkent shahri, Example ko'chasi, 123-uy</p>
                <p>Tel: +998 90 123 45 67</p>
                <p>Email: info@example.uz</p>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; 2024 Barcha huquqlar himoyalangan</p>
        </div>
    </div>
</footer>`,
    },
};

// Dasturni ishga tushirish
class CodeEditor {
    constructor() {
        this.currentTab = 'html';
        this.setupEventListeners();
        this.loadSavedCode();
        this.setupEditorEnvironment();
        this.initializeAutoSave();
    }

    // Event tinglovchilarni o'rnatish
    setupEventListeners() {
        // Tab o'zgartirish
        document.querySelectorAll('.tab').forEach(tab => {
            tab.addEventListener('click', () => {
                const tabName = tab.dataset.tab;
                this.switchTab(tabName);
            });
        });

        // Kod yozish
        Object.values(editors).forEach(editor => {
            editor.addEventListener('input', this.debounce(() => {
                this.updateOutput();
                this.updateLineNumbers(editor);
            }, 300));

            editor.addEventListener('keydown', this.handleEditorKeydown.bind(this));
        });

        // Modal yopish
        document.querySelector('.close-modal')?.addEventListener('click', () => {
            errorModal.style.display = 'none';
        });

        // Kodni saqlash
        document.getElementById('saveCode')?.addEventListener('click', () => {
            this.saveCode();
        });

        // Kodni ishga tushirish
        document.getElementById('runCode')?.addEventListener('click', () => {
            this.updateOutput(true);
        });
    }

    // Tab almashtirish
    switchTab(tabName) {
        this.currentTab = tabName;
        
        // Tab va editor ko'rinishini yangilash
        document.querySelectorAll('.tab').forEach(tab => {
            tab.classList.toggle('active', tab.dataset.tab === tabName);
        });

        Object.entries(editors).forEach(([type, editor]) => {
            editor.parentElement.style.display = type === tabName ? 'flex' : 'none';
        });
    }

    // Editor muhitini sozlash
    setupEditorEnvironment() {
        Object.values(editors).forEach(editor => {
            this.setupLineNumbers(editor);
        });
    }

    // Qator raqamlarini sozlash
    setupLineNumbers(editor) {
        const wrapper = editor.parentElement;
        const lineNumbers = document.createElement('div');
        lineNumbers.className = 'line-numbers';
        wrapper.insertBefore(lineNumbers, editor);
        this.updateLineNumbers(editor);
    }

    // Qator raqamlarini yangilash
    updateLineNumbers(editor) {
        const lineNumbers = editor.previousSibling;
        const lines = editor.value.split('\n');
        lineNumbers.innerHTML = lines
            .map((_, i) => `<div class="line-number">${i + 1}</div>`)
            .join('');
    }

    // Klaviatura hodisalarini boshqarish
    handleEditorKeydown(event) {
        // Tab bosilganda
        if (event.key === 'Tab') {
            event.preventDefault();
            this.insertText(event.target, DEFAULT_INDENT);
        }
        
        // Enter bosilganda
        if (event.key === 'Enter') {
            const editor = event.target;
            const currentLine = this.getCurrentLine(editor);
            
            // Agar lorem buyrug'i bo'lsa
            if (currentLine.trim().startsWith('lorem')) {
                event.preventDefault();
                const wordCount = parseInt(currentLine.split('lorem')[1]) || 5;
                this.insertText(editor, this.generateLorem(wordCount), true);
                return;
            }

            // Shablonlarni tekshirish
            const template = this.getTemplate(currentLine.trim());
            if (template) {
                event.preventDefault();
                this.insertText(editor, template, true);
                return;
            }
        }
    }

    // Lorem matn generatori
    generateLorem(wordCount) {
        const words = [];
        words.push('Lorem');
        
        for (let i = 1; i < wordCount; i++) {
            const randomWord = LOREM_WORDS[Math.floor(Math.random() * LOREM_WORDS.length)];
            words.push(randomWord);
        }
        
        return words.join(' ') + '.';
    }

    // Joriy qatorni olish
    getCurrentLine(editor) {
        const start = editor.value.lastIndexOf('\n', editor.selectionStart - 1) + 1;
        const end = editor.value.indexOf('\n', editor.selectionStart);
        return editor.value.substring(start, end > -1 ? end : editor.value.length);
    }

    // Shablon olish
    getTemplate(text) {
        if (this.currentTab === 'html') {
            return templates.html[text] || null;
        }
        if (this.currentTab === 'css') {
            return templates.css[text] || null;
        }
        return null;
    }

    // Matn qo'shish
    insertText(editor, text, replaceLine = false) {
        const start = editor.selectionStart;
        const end = editor.selectionEnd;
        const lines = editor.value.split('\n');
        const currentLineIndex = editor.value.substr(0, start).split('\n').length - 1;
        
        if (replaceLine) {
            lines[currentLineIndex] = text;
            editor.value = lines.join('\n');
            const newPosition = editor.value.split('\n').slice(0, currentLineIndex + 1).join('\n').length;
            editor.selectionStart = editor.selectionEnd = newPosition;
        } else {
            editor.value = editor.value.substring(0, start) + text + editor.value.substring(end);
            editor.selectionStart = editor.selectionEnd = start + text.length;
        }
        
        this.updateLineNumbers(editor);
        this.updateOutput();
    }

    // Natijani yangilash
    updateOutput(forceRun = false) {
        try {
            const outputDocument = output.contentDocument;
            
            // HTML
            outputDocument.body.innerHTML = editors.html.value;
            
            // CSS
            let styleElement = outputDocument.head.querySelector('style');
            if (!styleElement) {
                styleElement = outputDocument.createElement('style');
                outputDocument.head.appendChild(styleElement);
            }
            styleElement.textContent = editors.css.value;
            
            // JavaScript
            if (forceRun) {
                const scriptElement = outputDocument.createElement('script');
                scriptElement.textContent = editors.js.value;
                outputDocument.body.appendChild(scriptElement);
            }
        } catch (error) {
            this.showError(error.message);
        }
    }

    // Toast xabarni ko'rsatish
    showToast(title, message, duration = 3000) {
        const toast = document.getElementById('toast');
        const toastTitle = toast.querySelector('.toast-title');
        const toastMessage = toast.querySelector('.toast-message');
        
        toastTitle.textContent = title;
        toastMessage.textContent = message;
        
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, duration);
        
        // Yopish tugmasini ishga tushirish
        const closeBtn = toast.querySelector('.toast-close');
        closeBtn.onclick = () => toast.classList.remove('show');
    }

    // Xatolikni ko'rsatish
    showError(message) {
        this.showToast('Xatolik', message);
    }

    // Kodni saqlash
    saveCode() {
        Object.entries(editors).forEach(([type, editor]) => {
            localStorage.setItem(STORAGE_KEYS[type], editor.value);
        });
        this.showError('Kod muvaffaqiyatli saqlandi!');
    }

    // Saqlangan kodni yuklash
    loadSavedCode() {
        Object.entries(editors).forEach(([type, editor]) => {
            const savedCode = localStorage.getItem(STORAGE_KEYS[type]);
            if (savedCode) {
                editor.value = savedCode;
                this.updateLineNumbers(editor);
            }
        });
        this.updateOutput();
    }

    // Debounce funksiyasi
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Avtomatik saqlash
    initializeAutoSave() {
        setInterval(() => {
            this.saveCode();
        }, AUTOSAVE_DELAY);
    }
}

// Dasturni ishga tushirish
document.addEventListener('DOMContentLoaded', () => {
    new CodeEditor();
});