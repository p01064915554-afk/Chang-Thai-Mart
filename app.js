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

function renderCart() {
  const cartBox = document.getElementById("cart");
  if (!cartBox) return;

  let html = "<h2>장바구니</h2>";
  let total = 0;

  Object.keys(cart).forEach(index => {
    const item = P[index];
    const qty = cart[index];
    const price = item[2] * qty;
    total += price;

    html += `
      <div class="cart-item">
        <span>${item[0]} × ${qty}</span>
        <strong>₩${price.toLocaleString()}</strong>
      </div>
    `;
  });

  if (total === 0) {
    html += "<p>장바구니가 비어 있습니다.</p>";
  }

  html += `<h3>합계 ₩${total.toLocaleString()}</h3>`;
  cartBox.innerHTML = html;
}

function submitOrder() {
  const name = document.getElementById("name")?.value.trim();
  const phone = document.getElementById("phone")?.value.trim();
  const address = document.getElementById("address")?.value.trim();

  if (Object.keys(cart).length === 0) {
    alert("상품을 먼저 장바구니에 담아주세요.");
    return;
  }

  if (!name || !phone || !address) {
    alert("이름, 전화번호, 주소/요청사항을 입력해주세요.");
    return;
  }

 
