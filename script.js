const keranjang = [];

function tambahKeKeranjang(nama, harga) {
  keranjang.push({ nama, harga });
  updateKeranjang();
}

function updateKeranjang() {
  const keranjangList = document.getElementById('keranjang-list');
  if (keranjang.length === 0) {
    keranjangList.innerHTML = '<p>Belum ada produk dipilih.</p>';
    return;
  }

  let total = 0;
  keranjangList.innerHTML = '<ul>' + keranjang.map(item => {
    total += item.harga;
    return `<li>${item.nama} - Rp${item.harga.toLocaleString()}</li>`;
  }).join('') + `</ul><p><strong>Total: Rp${total.toLocaleString()}</strong></p>`;
}

function generateTransaksiID() {
  return "TRX" + Math.floor(100000 + Math.random() * 900000);
}

document.addEventListener("DOMContentLoaded", function () {
  const tombolBayar = document.getElementById("btnBayar");
  const form = document.querySelector("form");

  if (tombolBayar) {
    tombolBayar.addEventListener("click", function () {
      const nama = form.nama.value.trim();
      const alamat = form.alamat.value.trim();

      if (keranjang.length === 0) {
        alert("Keranjang masih kosong!");
        return;
      }

      if (nama === "" || alamat === "") {
        alert("Lengkapi data terlebih dahulu!");
        return;
      }

      const idTransaksi = generateTransaksiID();
      let total = keranjang.reduce((sum, item) => sum + item.harga, 0);

      const strukDiv = document.getElementById("struk");
      strukDiv.innerHTML = `
        <h3>Pembayaran Berhasil!</h3>
        <p>Terima kasih, <strong>${nama}</strong>!</p>
        <p>ID Transaksi: <strong>${idTransaksi}</strong></p>
        <p>Total Pembayaran: <strong>Rp${total.toLocaleString()}</strong></p>
      `;
      strukDiv.style.display = "block";

      tombolBayar.disabled = true;
      tombolBayar.innerText = "Sudah Dibayar";

      alert("Pembayaran berhasil!");
    });
  }
  });
});
