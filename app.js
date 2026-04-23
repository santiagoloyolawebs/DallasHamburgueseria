const MENU = [
    {
        categoria: "COMBOS DESTACADOS",
        items: [
            { nombre: "2 Hamburguesas dobles c/papas", desc: "A elección.", opciones: [{ label: "Variedad Clásica", precio: 20999 }, { label: "Variedad Especial", precio: 23999 }], img: "assets/imagen-card.png" },
            { nombre: "Combo Houston Doble", desc: "Houston Doble + Papas + Bebida.", opciones: [{ label: "Único", precio: 11499 }], img: "https://d2nagnwby8accc.cloudfront.net/companies/products/images/800/ae44b161-f73f-4f15-b7ce-ded1e4118443.webp" },
            { nombre: "Combo Dallas TX Doble", desc: "Dallas TX Doble + Papas + Bebida.", opciones: [{ label: "Único", precio: 13499 }], img: "https://d2nagnwby8accc.cloudfront.net/companies/products/images/800/7e3b01e3-1818-4716-b719-8cee7af70de2.webp" },
            { nombre: "Combo Crispy Doble", desc: "Crispy Doble + Papas + Bebida.", opciones: [{ label: "Único", precio: 13999 }], img: "https://d2nagnwby8accc.cloudfront.net/companies/products/images/800/790387c5-c211-4ee2-8abc-0120299e21f1.webp" }
        ]
    },
    {
        categoria: "HAMBURGUESAS (Incluyen papas)",
        items: [
            { nombre: "Houston-Cheese", desc: "Cheddar, pepinillos.", opciones: [{ label: "Único", precio: 9500 }], img: "https://d2nagnwby8accc.cloudfront.net/companies/products/images/800/8b04a4a7-cbf9-4de7-a229-066ab01b0ad6.webp" },
            { nombre: "Álamo", desc: "Cheddar, bacon, BBQ.", opciones: [{ label: "Único", precio: 11000 }], img: "https://d2nagnwby8accc.cloudfront.net/companies/products/images/800/abba26f6-1bb4-434c-ae96-4673d418bcac.webp" },
            { nombre: "San Antonio / Classic", desc: "Lechuga, tomate.", opciones: [{ label: "Único", precio: 10500 }], img: "https://d2nagnwby8accc.cloudfront.net/companies/products/images/800/c7fc52f8-a7ea-409a-a0de-2ccd3e14a78c.webp" },
            { nombre: "Dallas TX", desc: "Smash, Thousand Island.", opciones: [{ label: "Único", precio: 11000 }], img: "https://d2nagnwby8accc.cloudfront.net/companies/products/images/800/cd8f08e1-79bd-4c91-addb-899ccefb9806.webp" },
            { nombre: "Austin", desc: "Bacon, huevo frito.", opciones: [{ label: "Único", precio: 11000 }], img: "https://d2nagnwby8accc.cloudfront.net/companies/products/images/800/a7b2a506-46ae-4b43-83a3-40246ba11a0d.webp" },
            { nombre: "Arlington", desc: "Queso azul, alioli.", opciones: [{ label: "Único", precio: 11000 }], img: "https://d2nagnwby8accc.cloudfront.net/companies/products/images/800/77b20b6c-9ec6-46f5-96f7-4ec3cb5dd4d5.webp" }
        ]
    }
];

const numeroWhatsappGlobal = "5493765242100"; 
let carrito = [];
let toastTimeout;

const contenedorBurgers = document.getElementById('productos-contenedor');
const cartSidebar = document.getElementById('cart-sidebar');
const cartOverlay = document.getElementById('cart-overlay');
const listaCarrito = document.getElementById('lista-carrito');
const precioTotalDOM = document.getElementById('precio-total');
const cartCounter = document.getElementById('cart-counter');
const btnWhatsApp = document.getElementById('btn-whatsapp');

function cargarMenu() {
    contenedorBurgers.innerHTML = '';
    MENU.forEach((cat, cIdx) => {
        const h2 = document.createElement('h2');
        h2.className = 'categoria-separador';
        h2.innerText = cat.categoria;
        contenedorBurgers.appendChild(h2);
        cat.items.forEach((p, iIdx) => {
            const div = document.createElement('div');
            div.className = 'product-card';
            div.innerHTML = `
                <img src="${p.img}" class="product-img" loading="lazy" onerror="this.src='assets/imagen-card.png'">
                <div class="product-info">
                    <h3 class="product-title">${p.nombre}</h3>
                    <p class="product-desc">${p.desc}</p>
                    <select id="sel-${cIdx}-${iIdx}" class="size-selector">
                        ${p.opciones.map(o => `<option value="${o.label}|${o.precio}">${o.label} - $${o.precio}</option>`).join('')}
                    </select>
                    <button class="btn-add" onclick="agregar(${cIdx}, ${iIdx})">AGREGAR AL PEDIDO</button>
                </div>`;
            contenedorBurgers.appendChild(div);
        });
    });
}

function agregar(cIdx, iIdx) {
    const p = MENU[cIdx].items[iIdx];
    const sel = document.getElementById(`sel-${cIdx}-${iIdx}`).value.split('|');
    carrito.push({ nombre: `${p.nombre} (${sel[0]})`, precio: parseInt(sel[1]) });
    actualizar();
    notificar(`¡${p.nombre} añadido!`);
}

function eliminar(i) { carrito.splice(i, 1); actualizar(); }

function actualizar() {
    listaCarrito.innerHTML = ''; 
    let t = 0;
    cartCounter.innerText = carrito.length;
    if (carrito.length === 0) {
        listaCarrito.innerHTML = '<p class="empty-msg">Tu carrito está vacío.</p>';
        btnWhatsApp.disabled = true;
    } else {
        btnWhatsApp.disabled = false;
        carrito.forEach((it, i) => {
            t += it.precio;
            const li = document.createElement('li');
            li.className = 'cart-item';
            li.innerHTML = `
                <div class="item-details">
                    <h4>${it.nombre}</h4>
                    <p>$${it.precio.toLocaleString('es-AR')}</p>
                </div>
                <button class="btn-remove" onclick="eliminar(${i})"><i class="fa-solid fa-trash"></i></button>`;
            listaCarrito.appendChild(li);
        });
    }
    precioTotalDOM.innerText = "$" + t.toLocaleString('es-AR');
}

function notificar(m) {
    const n = document.getElementById('notificacion');
    n.innerText = m; n.classList.add('show');
    if (toastTimeout) clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => n.classList.remove('show'), 2000);
}

function toggleDireccion() {
    const m = document.getElementById('metodo-entrega').value;
    document.getElementById('grupo-direccion').style.display = m === 'Delivery' ? 'block' : 'none';
}

document.getElementById('btn-abrir-carrito').onclick = () => { cartSidebar.classList.add('active'); cartOverlay.classList.add('active'); document.body.classList.add('no-scroll'); };
document.getElementById('btn-cerrar-carrito').onclick = () => { cartSidebar.classList.remove('active'); cartOverlay.classList.remove('active'); document.body.classList.remove('no-scroll'); };
cartOverlay.onclick = document.getElementById('btn-cerrar-carrito').onclick;

btnWhatsApp.onclick = () => {
    let m = "*NUEVO PEDIDO - DALLAS HAMBURGUESERÍA*\n\n";
    let t = 0;
    carrito.forEach(i => { m += `• ${i.nombre}: $${i.precio.toLocaleString('es-AR')}\n`; t += i.precio; });
    m += `\n*TOTAL: $${t.toLocaleString('es-AR')}*\n*Medio de Pago:* ${document.getElementById('metodo-pago').value}\n`;
    const metodo = document.getElementById('metodo-entrega').value;
    m += `*Entrega:* ${metodo}\n`;
    if (metodo === 'Delivery') { m += `*Dirección:* ${document.getElementById('direccion-envio').value}\n`; }
    const notas = document.getElementById('pedido-notas').value;
    if (notas.trim() !== '') { m += `*Aclaraciones:* ${notas}\n`; }
    m += "\n_Pedido generado desde la web_";
    window.open(`https://wa.me/${numeroWhatsappGlobal}?text=${encodeURIComponent(m)}`);
};

cargarMenu();
actualizar();
toggleDireccion();