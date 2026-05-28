"use client";
import { useCart, DrawerView } from "@/context/CartContext";
import CartSidebar from "@/components/CartSidebar";
import CartCheckout from "@/components/CartCheckout";
import CartSuccess from "@/components/CartSuccess";

const STEPS: { id: DrawerView; label: string }[] = [
  { id: "cart", label: "Кошничка" },
  { id: "checkout", label: "Достава" },
  { id: "success", label: "Потврда" },
];

function stepIndex(view: DrawerView) {
  if (view === "cart") return 0;
  if (view === "checkout") return 1;
  return 2;
}

export default function CartDrawer() {
  const {
    cart,
    cartOpen,
    drawerView,
    setCartOpen,
    removeFromCart,
    updateQty,
    openCheckout,
    backToCart,
    closeCart,
  } = useCart();

  const currentStep = stepIndex(drawerView);
  const isWide = drawerView === "checkout";

  const titles: Record<DrawerView, string> = {
    cart: "Ваша кошничка",
    checkout: "Заврши ја нарачката",
    success: "Благодариме",
  };

  return (
    <>
      <div
        className={`fixed inset-0 z-40 transition-opacity duration-300 ${
          cartOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        style={{ background: "rgba(0,0,0,0.4)" }}
        onClick={closeCart}
        aria-hidden={!cartOpen}
      />

      <div
        className={`fixed top-0 right-0 h-full z-50 flex flex-col transition-all duration-350 ease-out ${
          cartOpen ? "translate-x-0" : "translate-x-full"
        } ${isWide ? "w-full max-w-lg" : "w-full max-w-md"}`}
        style={{
          background: "white",
          borderLeft: "1px solid var(--border)",
          boxShadow: "-12px 0 48px rgba(0,0,0,0.1)",
        }}
        role="dialog"
        aria-modal="true"
        aria-label={titles[drawerView]}
      >
        <div className="flex-shrink-0 px-5 pt-5 pb-4" style={{ borderBottom: "1px solid var(--border)" }}>
          <div className="flex items-center justify-between mb-4">
            <h2
              className="text-lg font-[400]"
              style={{ fontFamily: "var(--font-serif)", color: "var(--onyx)" }}
            >
              {titles[drawerView]}
            </h2>
            <button
              type="button"
              onClick={closeCart}
              className="w-9 h-9 flex items-center justify-center hover:bg-[var(--cream)] transition-colors"
              style={{ color: "var(--mid)" }}
              aria-label="Затвори"
            >
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
                <line x1="1" y1="1" x2="13" y2="13" />
                <line x1="13" y1="1" x2="1" y2="13" />
              </svg>
            </button>
          </div>

          {drawerView !== "success" && (
            <div className="flex items-center gap-2">
              {STEPS.slice(0, 2).map((step, i) => (
                <div key={step.id} className="flex items-center gap-2 flex-1">
                  <div
                    className={`w-6 h-6 flex items-center justify-center text-[10px] font-[500] flex-shrink-0 ${
                      i <= currentStep
                        ? "bg-[var(--onyx)] text-white"
                        : "bg-white text-[var(--mid)]"
                    }`}
                    style={{
                      fontFamily: "var(--font-sans)",
                      border: i <= currentStep ? "none" : "1px solid var(--border)",
                    }}
                  >
                    {i + 1}
                  </div>
                  <span
                    className={`text-[9px] tracking-[0.12em] uppercase hidden sm:inline ${
                      i === currentStep ? "font-[500]" : "font-[300]"
                    }`}
                    style={{
                      fontFamily: "var(--font-sans)",
                      color: i <= currentStep ? "var(--onyx)" : "var(--mid)",
                    }}
                  >
                    {step.label}
                  </span>
                  {i < 1 && (
                    <div className="flex-1 h-px mx-1" style={{ background: "var(--border)" }} />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex-1 min-h-0 flex flex-col px-5 pb-5">
          {drawerView === "cart" && (
            <CartSidebar
              items={cart}
              onRemove={removeFromCart}
              onQuantityChange={updateQty}
              onCheckout={openCheckout}
            />
          )}
          {drawerView === "checkout" && <CartCheckout />}
          {drawerView === "success" && <CartSuccess />}
        </div>
      </div>
    </>
  );
}
