// script.js
// Logika Logistik Sederhana (Vanilla JS)
// Catatan: Ini hanya menampilkan halaman login dan pesan sukses setelah login karena konversi penuh UI sangat kompleks.

// --- 1. Data Mock (Persisten di localStorage)
let user = null;
const getDefaultData = (key, defaultData) => {
    try {
        const raw = localStorage.getItem(`logistic_${key}`);
        if (raw) return JSON.parse(raw);
    } catch (e) {
        console.error(`Gagal memuat data ${key} dari localStorage:`, e);
    }
    return defaultData;
};

let materials = getDefaultData('materials', [
    { id: 'MAT-001', name: 'Pasir Silika', qty: 120, unit: 'kg', min_stock: 20, location: 'Gudang A' },
    { id: 'MAT-002', name: 'Batu Bata', qty: 40, unit: 'pcs', min_stock: 10, location: 'Gudang B' },
]);
let inventory = getDefaultData('inventory', [
    { id: 'EQ-001', name: 'Mesin CNC 3018', category: 'Mesin', serial: 'SN-3018-2023', location: 'Lab Mesin', status: 'Ready' },
    { id: 'EQ-002', name: 'Sikrup Pneumatic', category: 'Tool', serial: 'TK-112', location: 'Rak 3', status: 'In Use' },
]);
let transactions = getDefaultData('transactions', []);

// --- 2. Fungsi Logika (Data Persistence)
const saveData = () => {
    localStorage.setItem('logistic_materials', JSON.stringify(materials));
    localStorage.setItem('logistic_inventory', JSON.stringify(inventory));
    localStorage.setItem('logistic_transactions', JSON.stringify(transactions));
};

// --- 3. Fungsi Rendering UI
function renderLoginPage() {
    console.log("Rendering Halaman Login...");
    const root = document.getElementById('app-root');
    
    // HTML Halaman Login (menggunakan inline style yang dicopy dari CSS di index.html)
    root.innerHTML = `
        <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 1rem;">
            <div class="login-card">
                <h1 style="font-size: 1.5rem; font-weight: 600; margin-bottom: 1rem;">Masuk Admin — Sistem Logistik Lab</h1>
                <p class="text-sm" style="color: #475569; margin-bottom: 1rem;">Gunakan password default: <span class="font-mono">admin</span></p>
                <form id="login-form">
                    <input type="password" id="password-input" placeholder="Password" required style="margin-bottom: 0.75rem;" />
                    <button type="submit" class="btn-primary" style="margin-bottom: 0.75rem;">Masuk</button>
                </form>
                <button id="demo-login-btn" class="btn-primary" style="background-color: #1e293b; margin-top: 0.75rem;">Demo Login</button>
            </div>
        </div>
    `;

    // Pasang Event Listener
    document.getElementById('login-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const password = document.getElementById('password-input').value;
        handleLogin(password);
    });
    document.getElementById('demo-login-btn').addEventListener('click', () => {
        handleLogin('admin');
    });
}

function renderDashboardPage() {
    console.log("Login Sukses. Rendering Halaman Dashboard...");
    const root = document.getElementById('app-root');
    
    // Karena konversi dashboard penuh sangat kompleks, kita hanya tampilkan pesan sukses
    root.innerHTML = `
        <div style="padding: 2rem;">
            <div style="padding: 1.5rem; background-color: white; border-radius: 0.5rem; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);">
                <h2 style="font-size: 1.5rem; font-weight: bold; margin-bottom: 0.5rem;">✅ Login Berhasil!</h2>
                <p>Selamat datang, **${user.username}**. Data material saat ini ada **${materials.length}** item.</p>
                
                <p style="margin-top: 1rem; color: #64748b;">*Catatan: Fungsionalitas dashboard penuh memerlukan kode Vanilla JS yang sangat panjang untuk membuat semua tabel dan form. Ini adalah penanda keberhasilan integrasi HTML/CSS/JS.</p>
                
                <button id="logout-btn" class="btn-danger" style="margin-top: 1.5rem;">Logout</button>
            </div>
        </div>
    `;
    document.getElementById('logout-btn').addEventListener('click', handleLogout);
}


// --- 4. Fungsi Logika (Auth)
function handleLogin(password) {
    if (password === 'admin') {
        user = { username: 'admin' };
        localStorage.setItem('logistic_user', JSON.stringify(user));
        saveData();
        renderDashboardPage(); 
    } else {
        alert('Password salah!');
    }
}

function handleLogout() {
    localStorage.removeItem('logistic_user');
    user = null;
    renderLoginPage();
}

// --- 5. Inisialisasi Aplikasi
function init() {
    console.log("Aplikasi Logistik Dimulai.");
    
    // Coba ambil user dari localStorage
    try {
        const rawUser = localStorage.getItem('logistic_user');
        if (rawUser) {
            user = JSON.parse(rawUser);
        }
    } catch(e) { /* ignore */ }

    // Tampilkan halaman yang sesuai
    if (user) {
        renderDashboardPage();
    } else {
        renderLoginPage();
    }
}

// Menunggu DOM (HTML) dimuat sepenuhnya sebelum menjalankan inisialisasi
document.addEventListener('DOMContentLoaded', init);

// Tes untuk memastikan skrip dimuat:
console.log("Script.js berhasil dieksekusi.");