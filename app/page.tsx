import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { demoOrders, initialOrder } from "@/lib/orders";
import { etb, when } from "@/lib/format.js";
import PlaceOrderForm from "@/components/PlaceOrderForm";

export const metadata: Metadata = {
  title: "Order Overview",
  description: "Review recent Addis Eats orders, order totals, and delivery progress. Open the live delivery tracker or export records as CSV."
};

export default function HomePage() {
  const delivered = demoOrders.filter(order => order.status === "Delivered").length;
  const total = demoOrders.reduce((sum, order) => sum + order.total, 0);
  return <main className="container">
    <section className="hero card" aria-labelledby="hero-title">
      <div className="hero-copy">
        <div className="eyebrow">A taste of Ethiopia</div>
        <h1 id="hero-title">Gather around something delicious.</h1>
        <p className="sub">Explore comforting Ethiopian favorites, prepared with care and delivered while they are fresh.</p>
        <div className="hero-actions"><Link className="btn primary" href="#recent-orders">View recent orders</Link><Link className="btn" href={`/delivery/${initialOrder.id}`}>Track a delivery</Link></div>
        <div className="hero-note"><span aria-hidden="true">✦</span> Shared plates. Bold flavors. A warm welcome.</div>
      </div>
      <div className="hero-art">
        <Image
          src="/images/ethiopian-platter.svg"
          alt="Illustration of an Ethiopian shared platter with injera, lentils, greens, and vegetables"
          width={960}
          height={720}
          sizes="(max-width: 480px) calc(100vw - 68px), (max-width: 850px) calc(92vw - 46px), min(calc(46vw - 34px), 500px)"
          priority
          className="hero-image"
        />
      </div>
    </section>
    <div className="heading"><div><div className="eyebrow">Merchant workspace</div><h1>Order overview</h1><p className="sub">Monitor the latest orders and follow deliveries from one place.</p></div><Link className="btn primary" href={`/delivery/${initialOrder.id}`}>Track active delivery →</Link></div>
    <div className="layout">
      <section className="card card-pad"><h2>Today's snapshot</h2><p className="card-sub">Summary calculated from the demo order records.</p>
        <div className="detail-row"><span>Total demo orders</span><b>{demoOrders.length}</b></div>
        <div className="detail-row"><span>Delivered orders</span><b>{delivered}</b></div>
        <div className="detail-row"><span>Gross order value</span><b>{etb(total)}</b></div>
        <div className="detail-row"><span>Latest order created</span><b>{when(initialOrder.createdAt)}</b></div>
      </section>
      <section className="card card-pad"><h2>Active delivery</h2><p className="card-sub">Order {initialOrder.id}</p><div className="order-head"><div><b>{initialOrder.customer}</b><p className="sub">{initialOrder.dish}</p></div><div className="price">{etb(initialOrder.total)}</div></div><p className="sub">Courier: {initialOrder.courier}</p><p><span className="pill">{initialOrder.status}</span></p><Link className="btn primary" href={`/delivery/${initialOrder.id}`}>Open live tracker</Link></section>
    </div>
    <div className="order-form-wrap"><PlaceOrderForm /></div>
    <section id="recent-orders" className="card table-card"><div className="table-head"><div><h2>Recent orders</h2><p className="card-sub" style={{marginBottom:0}}>Includes test values with commas and quotation marks for CSV escaping.</p></div><Link className="btn" href={`/delivery/${initialOrder.id}`}>Export from tracker</Link></div>
      <div className="table-wrap"><table><caption>Recent orders with status and total</caption><thead><tr><th>Order</th><th>Customer</th><th>Dish</th><th>Status</th><th className="right">Total</th></tr></thead><tbody>{demoOrders.map(order=><tr key={order.id}><td><b>{order.id}</b></td><td>{order.customer}</td><td>{order.dish}</td><td><span className={`status ${order.status.toLowerCase()}`}>{order.status}</span></td><td className="right">{etb(order.total)}</td></tr>)}</tbody></table></div>
    </section>
  </main>;
}