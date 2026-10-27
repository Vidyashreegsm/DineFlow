import { useState, type FormEvent } from 'react'
import {
  ArrowDown,
  ArrowRight,
  Clock3,
  MapPin,
  Menu,
  Minus,
  Plus,
  ShoppingBag,
  Star,
  X,
} from 'lucide-react'
import './App.css'

const dishes = [
  {
    id: 1,
    name: 'Truffle Mushroom Pasta',
    category: 'Mains',
    price: 349,
    rating: '4.9',
    description: 'Creamy parmesan, wild mushrooms & fresh herbs',
    image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=900&q=85',
    tag: 'Bestseller',
  },
  {
    id: 2,
    name: 'Garden Fresh Pizza',
    category: 'Mains',
    price: 299,
    rating: '4.8',
    description: 'Wood-fired crust, basil & seasonal vegetables',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=85',
    tag: 'Popular',
  },
  {
    id: 3,
    name: 'Crispy Avocado Toast',
    category: 'Starters',
    price: 219,
    rating: '4.7',
    description: 'Sourdough, smashed avocado & chilli flakes',
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=900&q=85',
    tag: '',
  },
  {
    id: 4,
    name: 'Chocolate Lava Cake',
    category: 'Desserts',
    price: 189,
    rating: '5.0',
    description: 'Warm chocolate centre with vanilla cream',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=900&q=85',
    tag: 'Must try',
  },
  {
    id: 5,
    name: 'Strawberry Cooler',
    category: 'Drinks',
    price: 129,
    rating: '4.8',
    description: 'Fresh strawberries, lime & sparkling water',
    image: 'https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=900&q=85',
    tag: '',
  },
  {
    id: 6,
    name: 'Creamy Alfredo Pasta',
    category: 'Mains',
    price: 329,
    rating: '4.9',
    description: 'Silky Alfredo sauce, parmesan & cracked pepper',
    image: 'https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?auto=format&fit=crop&w=900&q=85',
    tag: '',
  },
]

const categories = ['All', 'Starters', 'Mains', 'Desserts', 'Drinks']

type CartItem = {
  id: number
  quantity: number
}

type CustomerDetails = {
  name: string
  phone: string
  orderType: 'Dine in' | 'Takeaway'
  instructions: string
}

type CompletedOrder = {
  orderNumber: string
  customer: CustomerDetails
  items: CartItem[]
  total: number
}

function App() {
  const [category, setCategory] = useState('All')
  const [cart, setCart] = useState<CartItem[]>([])
  const [cartOpen, setCartOpen] = useState(false)
  const [checkoutOpen, setCheckoutOpen] = useState(false)
  const [completedOrder, setCompletedOrder] =
    useState<CompletedOrder | null>(null)

  const [customer, setCustomer] = useState<CustomerDetails>({
    name: '',
    phone: '',
    orderType: 'Dine in',
    instructions: '',
  })

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const visibleDishes =
    category === 'All'
      ? dishes
      : dishes.filter((dish) => dish.category === category)

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  const cartTotal = cart.reduce((sum, item) => {
    const dish = dishes.find((d) => d.id === item.id)
    return sum + (dish?.price ?? 0) * item.quantity
  }, 0)

  function addToCart(id: number) {
    setCart((current) => {
      const existing = current.find((item) => item.id === id)

      if (existing) {
        return current.map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        )
      }

      return [...current, { id, quantity: 1 }]
    })
  }

  function changeQuantity(id: number, amount: number) {
    setCart((current) =>
      current
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + amount }
            : item,
        )
        .filter((item) => item.quantity > 0),
    )
  }

  function scrollToMenu() {
    document.getElementById('menu')?.scrollIntoView({
      behavior: 'smooth',
    })
    setMobileMenuOpen(false)
  }

  function submitCheckout(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (cart.length === 0) return

    const orderNumber = `DF-${Date.now().toString().slice(-6)}`

    setCompletedOrder({
      orderNumber,
      customer: { ...customer },
      items: cart.map((item) => ({ ...item })),
      total: cartTotal,
    })

    setCart([])
    setCheckoutOpen(false)
    setCartOpen(false)
  }

  function closeConfirmation() {
    setCompletedOrder(null)
    setCustomer({
      name: '',
      phone: '',
      orderType: 'Dine in',
      instructions: '',
    })
  }

  return (
    <div className="site-shell">
      <div className="announcement">
        <span>GOOD FOOD. GOOD MOOD.</span>
        <span className="announcement-right">
          <Clock3 size={13} /> Open today · 11 AM – 11 PM
        </span>
      </div>

      <header className="navbar">
        <a href="#home" className="brand">
          <span className="brand-icon">d.</span>
          <span>
            dine<span className="brand-accent">flow</span>
            <small>FRESH · LOCAL · LOVELY</small>
          </span>
        </a>

        <nav className={`nav-links ${mobileMenuOpen ? 'nav-open' : ''}`}>
          <a href="#home" onClick={() => setMobileMenuOpen(false)}>
            Home
          </a>
          <a href="#menu" onClick={() => setMobileMenuOpen(false)}>
            Our Menu
          </a>
          <a href="#story" onClick={() => setMobileMenuOpen(false)}>
            Our Story
          </a>
          <a href="#visit" onClick={() => setMobileMenuOpen(false)}>
            Find Us
          </a>
        </nav>

        <div className="nav-actions">
          <button
            className="cart-button"
            onClick={() => setCartOpen(true)}
            aria-label="Open shopping cart"
          >
            <ShoppingBag size={18} />
            <span>My order</span>
            <span className="cart-count">{cartCount}</span>
          </button>

          <button
            className="mobile-menu-button"
            onClick={() => setMobileMenuOpen((open) => !open)}
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-copy">
            <div className="eyebrow">
              <span className="eyebrow-line" />
              YOUR NEW FAVOURITE SPOT
            </div>

            <h1>
              A little taste
              <br />
              of <span>happiness.</span>
            </h1>

            <p className="hero-description">
              Thoughtfully made food, beautiful ingredients, and
              moments worth slowing down for. Your table is waiting.
            </p>

            <div className="hero-actions">
              <button className="primary-button" onClick={scrollToMenu}>
                Explore our menu <ArrowRight size={17} />
              </button>
              <a href="#story" className="text-button">
                Our little story <ArrowDown size={15} />
              </a>
            </div>

            <div className="hero-social-proof">
              <div className="avatar-stack">
                <img src="https://i.pravatar.cc/80?img=47" alt="" />
                <img src="https://i.pravatar.cc/80?img=12" alt="" />
                <img src="https://i.pravatar.cc/80?img=44" alt="" />
                <span>+</span>
              </div>
              <div>
                <div className="proof-stars">
                  <Star size={13} fill="currentColor" />
                  <Star size={13} fill="currentColor" />
                  <Star size={13} fill="currentColor" />
                  <Star size={13} fill="currentColor" />
                  <Star size={13} fill="currentColor" />
                </div>
                <p>Loved by food people everywhere</p>
              </div>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-image-frame">
              <img
                className="hero-image"
                src="https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1300&q=90"
                alt="Freshly prepared colourful restaurant food"
              />
              <div className="image-caption">
                <span>MADE WITH LOVE</span>
                <span>Every single day.</span>
              </div>
            </div>

            <div className="floating-note">
              <span className="note-icon">✳</span>
              <div>
                <strong>Fresh, always.</strong>
                <p>Seasonal ingredients, local love.</p>
              </div>
            </div>

            <div className="hero-stamp">
              <span>GOOD FOOD</span>
              <span className="stamp-star">✳</span>
              <span>GOOD PEOPLE</span>
            </div>
          </div>

          <div className="hero-bottom-note">
            <MapPin size={14} /> MADE FOR YOUR NEIGHBOURHOOD
          </div>
        </section>

        <section className="benefits-strip">
          <div>
            <span className="benefit-icon">✳</span>
            <span>Fresh ingredients, always</span>
          </div>
          <div>
            <span className="benefit-icon">♡</span>
            <span>Made with a little extra love</span>
          </div>
          <div>
            <span className="benefit-icon">☼</span>
            <span>Good food, no fuss</span>
          </div>
        </section>

        <section className="menu-section" id="menu">
          <div className="section-heading">
            <div>
              <div className="eyebrow">
                <span className="eyebrow-line" />
                SOMETHING FOR EVERY CRAVING
              </div>
              <h2>
                The good <span>stuff.</span>
              </h2>
              <p>Made fresh. Served happy. Always worth a bite.</p>
            </div>
            <a href="#menu-grid" className="view-all-link">
              Explore the menu <ArrowRight size={16} />
            </a>
          </div>

          <div className="category-tabs">
            {categories.map((item) => (
              <button
                key={item}
                onClick={() => setCategory(item)}
                className={`category-tab ${category === item ? 'active' : ''}`}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="menu-grid" id="menu-grid">
            {visibleDishes.map((dish) => {
              const quantity =
                cart.find((item) => item.id === dish.id)?.quantity ?? 0

              return (
                <article className="food-card" key={dish.id}>
                  <div className="food-image-wrap">
                    <img src={dish.image} alt={dish.name} loading="lazy" />
                    {dish.tag && <span className="food-tag">{dish.tag}</span>}

                    <button
                      className="quick-add"
                      onClick={() => addToCart(dish.id)}
                      aria-label={`Add ${dish.name} to cart`}
                    >
                      <Plus size={19} />
                    </button>
                  </div>

                  <div className="food-card-content">
                    <div className="food-title-row">
                      <h3>{dish.name}</h3>
                      <span className="food-rating">
                        <Star size={13} fill="currentColor" /> {dish.rating}
                      </span>
                    </div>

                    <p>{dish.description}</p>

                    <div className="food-card-bottom">
                      <strong>₹{dish.price}</strong>

                      {quantity > 0 ? (
                        <div className="quantity-controls home-quantity-controls">
                          <button
                            type="button"
                            onClick={() => changeQuantity(dish.id, -1)}
                            aria-label={`Remove one ${dish.name}`}
                            title="Decrease quantity"
                          >
                            <Minus size={13} />
                          </button>
                          <span aria-live="polite">{quantity}</span>
                          <button
                            type="button"
                            onClick={() => changeQuantity(dish.id, 1)}
                            aria-label={`Add one ${dish.name}`}
                            title="Increase quantity"
                          >
                            <Plus size={13} />
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          className="add-button"
                          onClick={() => addToCart(dish.id)}
                        >
                          Add to order <Plus size={13} />
                        </button>
                      )}
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </section>

        <section className="story-section" id="story">
          <div className="story-image">
            <img
              src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1100&q=85"
              alt="A beautifully presented meal at a restaurant"
              loading="lazy"
            />
            <div className="story-image-label">A PLACE TO FEEL GOOD</div>
          </div>

          <div className="story-copy">
            <div className="eyebrow">
              <span className="eyebrow-line" /> A LITTLE ABOUT US
            </div>

            <h2>
              Food tastes better
              <br />
              when it feels like <span>home.</span>
            </h2>

            <p>
              We believe a great meal is about more than what's on the
              plate. It's the ingredients we choose, the people we share
              it with, and the little moments that make an ordinary day
              feel special.
            </p>

            <p>
              Come as you are. Bring your appetite. We'll take care of
              the rest.
            </p>

            <button className="primary-button" onClick={scrollToMenu}>
              Find your favourite <ArrowRight size={17} />
            </button>
          </div>
        </section>

        <section className="visit-section" id="visit">
          <div>
            <div className="eyebrow">
              <span className="eyebrow-line" /> COME SAY HELLO
            </div>
            <h2>
              Your table is <span>waiting.</span>
            </h2>
            <p>Good food, good company, and a seat saved just for you.</p>
          </div>

          <a className="primary-button" href="mailto:hello@dineflow.example">
            Get in touch <ArrowRight size={17} />
          </a>
        </section>
      </main>

      <footer className="footer">
        <a href="#home" className="brand footer-brand">
          <span className="brand-icon">d.</span>
          <span>
            dine<span className="brand-accent">flow</span>
            <small>FRESH · LOCAL · LOVELY</small>
          </span>
        </a>
        <p>Made with love, served with a smile. © 2026 DineFlow.</p>
        <a href="#home" className="back-top">
          Back to top ↑
        </a>
      </footer>

      {cartOpen && (
        <div className="cart-overlay" onClick={() => setCartOpen(false)}>
          <aside className="cart-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="cart-header">
              <div>
                <span className="eyebrow">YOUR SELECTION</span>
                <h2>
                  Your order <span>({cartCount})</span>
                </h2>
              </div>

              <button
                className="icon-button"
                onClick={() => setCartOpen(false)}
                aria-label="Close cart"
              >
                <X />
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="empty-cart">
                <span className="empty-cart-icon">
                  <ShoppingBag size={30} />
                </span>
                <h3>A little hungry?</h3>
                <p>Your order is empty. Let's fix that.</p>
                <button
                  className="primary-button"
                  onClick={() => {
                    setCartOpen(false)
                    scrollToMenu()
                  }}
                >
                  Browse the menu <ArrowRight size={16} />
                </button>
              </div>
            ) : (
              <>
                <div className="cart-items">
                  {cart.map((item) => {
                    const dish = dishes.find((d) => d.id === item.id)
                    if (!dish) return null

                    return (
                      <div className="cart-item" key={item.id}>
                        <img src={dish.image} alt={dish.name} />

                        <div className="cart-item-info">
                          <h3>{dish.name}</h3>
                          <p>₹{dish.price}</p>

                          <div className="quantity-controls">
                            <button
                              onClick={() => changeQuantity(item.id, -1)}
                              aria-label={`Remove one ${dish.name}`}
                            >
                              <Minus size={13} />
                            </button>
                            <span>{item.quantity}</span>
                            <button
                              onClick={() => changeQuantity(item.id, 1)}
                              aria-label={`Add one ${dish.name}`}
                            >
                              <Plus size={13} />
                            </button>
                          </div>
                        </div>

                        <strong>₹{dish.price * item.quantity}</strong>
                      </div>
                    )
                  })}
                </div>

                <div className="cart-summary">
                  <div>
                    <span>Subtotal</span>
                    <strong>₹{cartTotal}</strong>
                  </div>

                  <p>
                    Taxes and any applicable charges are calculated at
                    checkout.
                  </p>

                  <button
                    className="primary-button checkout-button"
                    onClick={() => {
                      setCartOpen(false)
                      setCheckoutOpen(true)
                    }}
                  >
                    Continue to checkout <ArrowRight size={17} />
                  </button>
                </div>
              </>
            )}
          </aside>
        </div>
      )}

      {checkoutOpen && (
        <div
          className="checkout-overlay"
          onClick={() => setCheckoutOpen(false)}
        >
          <section
            className="checkout-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="checkout-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="checkout-header">
              <div>
                <span className="eyebrow">ALMOST THERE</span>
                <h2 id="checkout-title">
                  Complete your <span>order.</span>
                </h2>
                <p>Enter your details to review your order.</p>
              </div>

              <button
                className="icon-button"
                onClick={() => setCheckoutOpen(false)}
                aria-label="Close checkout"
                type="button"
              >
                <X />
              </button>
            </div>

            <form className="checkout-form" onSubmit={submitCheckout}>
              <label htmlFor="customer-name">Your name *</label>
              <input
                id="customer-name"
                name="name"
                type="text"
                autoComplete="name"
                placeholder="Enter your full name"
                value={customer.name}
                onChange={(event) =>
                  setCustomer((current) => ({
                    ...current,
                    name: event.target.value,
                  }))
                }
                required
                minLength={2}
                maxLength={80}
              />

              <label htmlFor="customer-phone">Mobile number *</label>
              <input
                id="customer-phone"
                name="phone"
                type="tel"
                inputMode="numeric"
                autoComplete="tel"
                placeholder="10-digit mobile number"
                value={customer.phone}
                onChange={(event) =>
                  setCustomer((current) => ({
                    ...current,
                    phone: event.target.value.replace(/\D/g, '').slice(0, 10),
                  }))
                }
                pattern="[6-9][0-9]{9}"
                title="Enter a valid 10-digit Indian mobile number starting with 6, 7, 8, or 9."
                required
              />

              <label htmlFor="order-type">How would you like your order?</label>
              <select
                id="order-type"
                name="orderType"
                value={customer.orderType}
                onChange={(event) =>
                  setCustomer((current) => ({
                    ...current,
                    orderType: event.target.value as CustomerDetails['orderType'],
                  }))
                }
              >
                <option value="Dine in">Dine in</option>
                <option value="Takeaway">Takeaway</option>
              </select>

              <label htmlFor="order-instructions">
                Special instructions (optional)
              </label>
              <textarea
                id="order-instructions"
                name="instructions"
                placeholder="Allergies, less spicy, or other requests..."
                rows={3}
                maxLength={300}
                value={customer.instructions}
                onChange={(event) =>
                  setCustomer((current) => ({
                    ...current,
                    instructions: event.target.value,
                  }))
                }
              />

              <div className="checkout-order-summary">
                <div className="checkout-summary-title">
                  <strong>Your order</strong>
                  <span>
                    {cartCount} {cartCount === 1 ? 'item' : 'items'}
                  </span>
                </div>

                {cart.map((item) => {
                  const dish = dishes.find((entry) => entry.id === item.id)
                  if (!dish) return null

                  return (
                    <div className="checkout-summary-row" key={item.id}>
                      <span>
                        {item.quantity} × {dish.name}
                      </span>
                      <strong>₹{dish.price * item.quantity}</strong>
                    </div>
                  )
                })}

                <div className="checkout-total-row">
                  <span>Total</span>
                  <strong>₹{cartTotal}</strong>
                </div>

                <p className="checkout-demo-note">
                  Demo checkout only — no payment will be taken and this
                  order is not saved to a server yet.
                </p>
              </div>

              <button className="primary-button checkout-submit" type="submit">
                Place demo order <ArrowRight size={17} />
              </button>

              <button
                className="checkout-back-button"
                type="button"
                onClick={() => {
                  setCheckoutOpen(false)
                  setCartOpen(true)
                }}
              >
                Back to your cart
              </button>
            </form>
          </section>
        </div>
      )}

      {completedOrder && (
        <div className="checkout-overlay" onClick={closeConfirmation}>
          <section
            className="confirmation-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="confirmation-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="icon-button confirmation-close"
              onClick={closeConfirmation}
              aria-label="Close order confirmation"
              type="button"
            >
              <X />
            </button>

            <div className="confirmation-check">✓</div>
            <span className="eyebrow">ORDER RECEIVED · DEMO</span>

            <h2 id="confirmation-title">
              That looks <span>delicious!</span>
            </h2>

            <p className="confirmation-message">
              Thanks, {completedOrder.customer.name}. Your demo order has
              been prepared on this page.
            </p>

            <div className="confirmation-number">
              <span>Demo order number</span>
              <strong>{completedOrder.orderNumber}</strong>
            </div>

            <div className="confirmation-details">
              <div>
                <span>Order type</span>
                <strong>{completedOrder.customer.orderType}</strong>
              </div>
              <div>
                <span>Mobile</span>
                <strong>{completedOrder.customer.phone}</strong>
              </div>
              <div>
                <span>Total</span>
                <strong>₹{completedOrder.total}</strong>
              </div>
            </div>

            <div className="confirmation-items">
              <strong>Items ordered</strong>

              {completedOrder.items.map((item) => {
                const dish = dishes.find((entry) => entry.id === item.id)
                if (!dish) return null

                return (
                  <div className="checkout-summary-row" key={item.id}>
                    <span>
                      {item.quantity} × {dish.name}
                    </span>
                    <strong>₹{dish.price * item.quantity}</strong>
                  </div>
                )
              })}

              {completedOrder.customer.instructions && (
                <p>
                  <strong>Instructions:</strong>{' '}
                  {completedOrder.customer.instructions}
                </p>
              )}
            </div>

            <p className="checkout-demo-note">
              This is a frontend demo. The order has not been sent to
              restaurant staff or stored in a database.
            </p>

            <button
              className="primary-button checkout-submit"
              onClick={closeConfirmation}
              type="button"
            >
              Back to DineFlow <ArrowRight size={17} />
            </button>
          </section>
        </div>
      )}
    </div>
  )
}

export default App