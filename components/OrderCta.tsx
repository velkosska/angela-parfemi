"use client";
import { useCart } from "@/context/CartContext";

export default function OrderCta() {
  const { cart, openCart, openCheckout } = useCart();

  const handleOrder = () => {
    if (cart.length > 0) openCheckout();
    else openCart();
  };

  return (
    <section id="order" className="py-16 lg:py-20 px-5 lg:px-10" style={{ background: "white" }}>
      <div className="max-w-2xl mx-auto text-center">
        <p
          className="text-[9px] tracking-[0.4em] uppercase mb-4 font-[400]"
          style={{ fontFamily: "var(--font-sans)", color: "var(--gold)" }}
        >
          Нарачај
        </p>
        <h2
          className="text-3xl lg:text-4xl font-[300] mb-4"
          style={{ fontFamily: "var(--font-serif)", color: "var(--onyx)" }}
        >
          Подготвени сте?
        </h2>
        <p
          className="text-sm font-[300] mb-8 leading-relaxed"
          style={{ fontFamily: "var(--font-sans)", color: "var(--mid)" }}
        >
          Додајте парфеми во кошничката, проверете го резимето и завршете ја нарачката на едно место.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button type="button" onClick={handleOrder} className="btn-dark sm:min-w-[200px]">
            {cart.length > 0 ? "Заврши ја нарачката →" : "Отвори кошничка"}
          </button>
          <a href="tel:075263594" className="btn-outline justify-center no-underline sm:min-w-[200px]">
            📞 075 263 594
          </a>
        </div>
      </div>
    </section>
  );
}
