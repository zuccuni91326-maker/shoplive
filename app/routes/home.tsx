import { useState } from "react";
import type { Route } from "./+types/home";

type Product = { name: string; price: string; image: string; label?: string; tone?: string };

const products: Product[] = [
	{ name: "Cloud carry-on", price: "$248", label: "New", image: "https://images.unsplash.com/photo-1553531889-56e3f5f6f769?auto=format&fit=crop&w=800&q=85" },
	{ name: "Linen beach chair", price: "$126", label: "Best seller", image: "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=800&q=85" },
	{ name: "Woven market bag", price: "$88", image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=85" },
	{ name: "Sunday glassware", price: "$64", image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=800&q=85" },
];

export function meta({}: Route.MetaArgs) {
	return [
		{ title: "ShopLive — the good kind of everyday" },
		{ name: "description", content: "ShopLive is a considered collection for home, away, and in between." },
	];
}

function BagIcon() {
	return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 8.5h14l-1 12H6l-1-12Zm4-1V6a3 3 0 0 1 6 0v1.5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

function ArrowIcon() {
	return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h13M14 7l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

export default function Home() {
	const [bag, setBag] = useState(0);
	const [saved, setSaved] = useState<number[]>([]);
	const [notice, setNotice] = useState("");
	const toggleSaved = (index: number) => setSaved((items) => items.includes(index) ? items.filter((item) => item !== index) : [...items, index]);
	const addToBag = (product: Product) => { setBag((count) => count + 1); setNotice(`${product.name} added to your bag`); window.setTimeout(() => setNotice(""), 2600); };

	return (
		<main>
			{notice && <div className="toast" role="status">{notice}</div>}
			<div className="top-note">Complimentary shipping on orders over $100 <span>•</span> Easy 30-day returns</div>
			<header className="site-header">
				<button className="menu-button" aria-label="Open menu"><span></span><span></span></button>
				<a className="wordmark" href="#top">ShopLive</a>
				<nav aria-label="Primary navigation"><a href="#new">New arrivals</a><a href="#shop">Shop all</a><a href="#journal">Journal</a></nav>
				<div className="header-actions"><button aria-label="Search"><span className="search-icon"></span></button><button className="bag-button" aria-label={`Shopping bag with ${bag} items`}><BagIcon />{bag > 0 && <b>{bag}</b>}</button></div>
			</header>

			<section className="hero" id="top">
				<img src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1800&q=90" alt="Warm neutral chair in a sunny, styled living room" />
				<div className="hero-copy"><p className="eyebrow">The summer edit</p><h1>Make room<br />for ease.</h1><p>Thoughtful pieces for sun-soaked days<br />and slower evenings at home.</p><a className="text-link" href="#new">Shop the collection <ArrowIcon /></a></div>
				<p className="hero-credit">A softer way to live, wherever you are.</p>
			</section>

			<section className="intro" id="shop"><p className="eyebrow">Living, considered</p><h2>Things that feel<br /><em>like you.</em></h2><p className="intro-copy">We make useful, beautiful essentials for people who care about how their spaces feel — not just how they look.</p><a className="outline-link" href="#new">Our story <ArrowIcon /></a></section>

			<section className="categories" aria-label="Shop by category">
				<a href="#new"><img src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=900&q=85" alt="Living room seating" /><span>For the home <ArrowIcon /></span></a>
				<a href="#new"><img src="https://images.unsplash.com/photo-1527631746610-bca00a040d60?auto=format&fit=crop&w=900&q=85" alt="Summer accessories on a beach" /><span>For the weekend <ArrowIcon /></span></a>
				<a href="#new"><img src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=900&q=85" alt="Softly lit bedroom" /><span>For the ritual <ArrowIcon /></span></a>
			</section>

			<section className="collection" id="new"><div className="section-heading"><div><p className="eyebrow">Just in</p><h2>Fresh finds, <em>good feeling.</em></h2></div><a className="all-link" href="#new">Shop new arrivals <ArrowIcon /></a></div>
				<div className="product-grid">{products.map((product, index) => <article className="product" key={product.name}><div className="product-image"><img src={product.image} alt={product.name} />{product.label && <span className="product-label">{product.label}</span>}<button className={`heart ${saved.includes(index) ? "saved" : ""}`} onClick={() => toggleSaved(index)} aria-label={`Save ${product.name}`}><span>♥</span></button><button className="quick-add" onClick={() => addToBag(product)}>Add to bag</button></div><div className="product-detail"><h3>{product.name}</h3><p>{product.price}</p></div></article>)}</div>
			</section>

			<section className="story-banner" id="journal"><img src="https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1800&q=85" alt="Peaceful architectural exterior by water" /><div><p className="eyebrow">From the journal</p><h2>A home for the<br /><em>in-between.</em></h2><p>Notes on creating spaces that invite you to stay a little longer.</p><a href="#journal" className="text-link">Read the story <ArrowIcon /></a></div></section>

			<footer><a className="wordmark" href="#top">ShopLive</a><p>Made for the beautifully ordinary.</p><div><a href="#shop">Instagram</a><a href="#shop">Contact</a><a href="#shop">Shipping & returns</a></div></footer>
		</main>
	);
}
