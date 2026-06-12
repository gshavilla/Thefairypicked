// ======================
// THE FAIRY PICKED
// ======================

let cart = [];

// ======================
// TAMBAH ITEM
// ======================

function addItem(name, fee){

    cart.push({
        name: name,
        fee: fee
    });

    renderCart();
}

// ======================
// HAPUS ITEM
// ======================

function removeItem(index){

    cart.splice(index, 1);

    renderCart();
}

// ======================
// RENDER KERANJANG
// ======================

function renderCart(){

    const cartItems =
    document.getElementById("cartItems");

    let html = "";

    let total = 0;

    if(cart.length === 0){

        html =
        "<p>Belum ada item dipilih.</p>";

    }else{

        cart.forEach((item,index)=>{

            total += item.fee;

            html += `
            <div class="cart-item">

                <div>

                    <strong>${item.name}</strong>

                    <br>

                    Fee:
                    Rp${item.fee.toLocaleString()}

                </div>

                <button
                onclick="removeItem(${index})">

                    ❌

                </button>

            </div>
            `;

        });

    }

    cartItems.innerHTML = html;

    document.getElementById("subtotal").innerText =
    "Rp" + total.toLocaleString();

    document.getElementById("total").innerText =
    "Rp" + total.toLocaleString();

}

// ======================
// PREVIEW FOTO
// ======================

const fotoBarang =
document.getElementById("fotoBarang");

if(fotoBarang){

    fotoBarang.addEventListener(
        "change",
        function(){

            const file =
            this.files[0];

            if(file){

                const reader =
                new FileReader();

                reader.onload =
                function(e){

                    const preview =
                    document.getElementById(
                        "previewImage"
                    );

                    preview.src =
                    e.target.result;

                    preview.style.display =
                    "block";

                };

                reader.readAsDataURL(file);

            }

        }
    );

}

// ======================
// CHECKOUT WHATSAPP
// ======================

function checkoutWA(){

    const nama =
    document.getElementById("nama").value;

    const wa =
    document.getElementById("wa").value;

    const instagram =
    document.getElementById("instagram").value;

    const barang =
    document.getElementById("barang").value;

    if(
        nama === "" ||
        wa === "" ||
        barang === ""
    ){

        alert(
            "Mohon lengkapi data terlebih dahulu."
        );

        return;

    }

    let kategoriText = "";

    let total = 0;

    cart.forEach(item=>{

        total += item.fee;

        kategoriText +=
        `• ${item.name}
Fee: Rp${item.fee.toLocaleString()}

`;

    });

    const pesan =
`🌷 THE FAIRY PICKED 🌷

Halo Admin!

Saya ingin melakukan pemesanan jastip.

👤 Nama:
${nama}

📱 WhatsApp:
${wa}

📷 Instagram:
${instagram}

🛍️ Barang yang ingin dititipkan:
${barang}

📦 Kategori Dipilih:
${kategoriText}

💰 Total Fee Jastip:
Rp${total.toLocaleString()}

Terima kasih ✨`;

    const nomorAdmin =
    "6285172317702";

    const url =
    `https://wa.me/${nomorAdmin}?text=${encodeURIComponent(pesan)}`;

    window.open(
        url,
        "_blank"
    );

}

// ======================
// VALIDASI S&K
// ======================

function validateCheckout(){

    const agree =
    document.getElementById("agree");

    if(agree && !agree.checked){

        alert(
            "Silakan setujui Terms & Conditions terlebih dahulu."
        );

        return false;

    }

    checkoutWA();

}