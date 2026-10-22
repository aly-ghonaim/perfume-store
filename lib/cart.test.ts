import { test } from "node:test";
import assert from "node:assert/strict";
import { addToCart, setQty, toggleWishlist, mergeGuest, emptyBucket, cartCount } from "./cart.ts";

test("addToCart increments quantity without mutating", () => {
  const a = emptyBucket();
  const b = addToCart(addToCart(a, "p1"), "p1");
  assert.equal(b.cart.p1, 2);
  assert.deepEqual(a.cart, {});
});

test("setQty to 0 removes the line", () => {
  const b = setQty(addToCart(emptyBucket(), "p1"), "p1", 0);
  assert.deepEqual(b.cart, {});
});

test("toggleWishlist adds then removes", () => {
  const on = toggleWishlist(emptyBucket(), "p2");
  assert.deepEqual(on.wishlist, ["p2"]);
  assert.deepEqual(toggleWishlist(on, "p2").wishlist, []);
});

test("mergeGuest sums quantities and dedupes wishlist", () => {
  const account = { ...addToCart(emptyBucket(), "p1"), wishlist: ["p2"] };
  const guest = { ...setQty(emptyBucket(), "p1", 2), wishlist: ["p2", "p3"] };
  const m = mergeGuest(account, guest);
  assert.equal(m.cart.p1, 3);
  assert.deepEqual(m.wishlist, ["p2", "p3"]);
  assert.equal(cartCount(m), 3);
});
