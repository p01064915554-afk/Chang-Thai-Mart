const P = [
  ["태국 자스민쌀", "ข้าวหอมมะลิ", 12900, "🍚"],
  ["똠얌 라면", "บะหมี่ต้มยำ", 1500, "🍜"],
  ["태국 고추", "พริกไทย", 3500, "🌶️"],
  ["코코넛", "มะพร้าว", 2900, "🥥"]
];

let cart = {};

function addCart(index) {
  cart[index] = (cart[index] || 0) + 1;
  renderCart();
}

function removeCart(index) {
  if (!cart[index]) return;

  cart[index]--;

  if (cart[index] <= 0) {
    delete cart[index];
  }

  renderCart();
}

function isThai() {
  const btn = document.getElementById("langBtn");
  return btn && btn.innerText.trim() === "한국어";
}

function renderCart() {
  const cartBox = document.getElementById("cart");
  if (!cartBox) return;

  const thai = isThai();
  let total = 0;

  let html = thai
    ? "<h2>ตะกร้าสินค้า</h2>"
    : "<h2>장바구니</h2>";

  const keys = Object.keys(cart);

  if (keys.length === 0) {
    html += thai
      ? "<p>ตะกร้าสินค้าว่าง</p>"
      : "<p>장바구니가 비어 있습니다.</p>";
  } else {
    keys.forEach(index => {
      const product = P[index];
      const qty = cart[index];
      const price = product[2] * qty;

      total += price;

      html += `
        <div style="padding:12px 0;border-bottom:1px solid #ddd;">
          <strong>${thai ? product[1] : product[0]}</strong>
          × ${qty}
          <br>
          ₩${price.toLocaleString()}
          <br>
          <button onclick="removeCart(${index})"
            style="margin-top:8px;padding:7px 14px;">
            ${thai ? "ลบ 1 ชิ้น" : "1개 빼기"}
          </button>
        </div>
      `;
    });
  }

  html += thai
    ? `<h3>รวม ₩${total.toLocaleString()}</h3>`
    : `<h3>합계 ₩${total.toLocaleString()}</h3>`;

  cartBox.innerHTML = html;
}

function submitOrder() {
  const thai = isThai();

  const name =
    document.getElementById("name")?.value.trim();

  const phone =
    document.getElementById("phone")?.value.trim();

  const address =
    document.getElementById("address")?.value.trim();

  if (Object.keys(cart).length === 0) {
    alert(
      thai
        ? "กรุณาใส่สินค้าลงในตะกร้าก่อน"
        : "상품을 먼저 장바구니에 담아주세요."
    );
    return;
  }

  if (!name || !phone || !address) {
    alert(
      thai
        ? "กรุณากรอกชื่อ เบอร์โทรศัพท์ และที่อยู่"
        : "이름, 전화번호, 주소/요청사항을 입력해주세요."
    );
    return;
  }

  let total = 0;
  let order = "";

  Object.keys(cart).forEach(index => {
    const product = P[index];
    const qty = cart[index];
    const price = product[2] * qty;

    total += price;

    order +=
      `${thai ? product[1] : product[0]} × ${qty} = ₩${price.toLocaleString()}\n`;
  });

  const message =
    `${thai ? "รับคำสั่งซื้อแล้ว" : "주문이 접수되었습니다."}\n\n` +
    `${thai ? "ชื่อ" : "이름"}: ${name}\n` +
    `${thai ? "เบอร์โทร" : "전화번호"}: ${phone}\n` +
    `${thai ? "ที่อยู่" : "주소"}: ${address}\n\n` +
    order +
    `${thai ? "รวม" : "합계"}: ₩${total.toLocaleString()}`;

  alert(message);
}

renderCart();
