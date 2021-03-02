# 🍕Dominos API🍕
Dominos API for ordering pizza with node. Dominos.com currently does not have a public API.

## Install 
npm install

```
const API_URL = "https://order.dominos.com/power";
async function getStoresNearAddress(
  orderType,
  cityRegionOrPostalCode,
  streetAddress = ""
) {
  const response = await fetch(
    `https://order.dominos.com/power/store-locator?type=${orderType}&c=${cityRegionOrPostalCode}&s=${streetAddress}`
  );
  const data = await response.json();
  console.log(data.Stores[0]);
}

async function getStoreInfo(storeId) {
  const response = await fetch(`${API_URL}/store/${storeId}/profile`);
  return response.json();
}
//getStoresNearAddress(orderTypes.Carryout,95112,'San Jose, CA');

async function getStoreMenu(storeId) {
  const response = await fetch(
    `${API_URL}/store/${storeId}/menu?lang=en&structured=true`
  );
  return response.json();
}

async function getStoreCoupon(storeId, couponId) {
  const response = await fetch(
    `${API_URL}/store/${storeId}/coupon/${couponId}?lang=en`
  );
  return response.json();
}

async function validateOrder(order) {
  const response = await fetch(
    "https://order.dominos.com/power/validate-order",
    {
      headers: {
        "content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(order),
      method: "POST",
    }
  );
  return response.json();
}
async function priceOrder(order) {
  const response = await fetch("https://order.dominos.com/power/price-order", {
    headers: {
      "content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(order),
    method: "POST",
  });
  return response.json();
}
async function placeOrder(order, payment) { //THIS METHOD WILL CHARGE YOUR CARD, CONTINUE CAREFULLY
  const response = await fetch("https://order.dominos.com/power/place-order", {
    headers: {
      "content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(order),
    method: "POST",
  });
  return response.json();
}


```
