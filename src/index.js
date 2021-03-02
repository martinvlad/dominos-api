const fetch = require("node-fetch");

const orderTypes = {
  Delivery: "Delivery",
  Carryout: "Carryout",
};

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


(async function ()  {
  const storeInfo = await getStoreInfo(7994);
  console.log(storeInfo);
  // const storeMenu = await getStoreMenu(7994);
  // console.log(storeMenu)
  // const coupon = await getStoreCoupon(7994, 5001);
  // console.log(coupon);
  const order = {
    Order: {
      Address: { City: "SAN JOSE", Region: "CA", PostalCode: "95112" },
      Coupons: [
        {
          Code: "5001",
          Qty: 1,
          ID: 1,
          IsBelowMinimumOrderAmount: false,
          IsBelowMinimumPaymentAmount: false,
          Tags: { Hash: "1614708981014" },
        },
      ],
      CustomerID: "",
      Email: "", //insert email
      Extension: "",
      FirstName: "",//insert first name
      LastName: "",//insert last name
      LanguageCode: "en",
      OrderChannel: "OLO",
      OrderID: "LCV8aLvF-TlcHnk9OzTj",
      OrderMethod: "Web",
      OrderTaker: null,
      Payments: [],
      Phone: "", //insert phone number for tracking
      PhonePrefix: "",
      Products: [
        {
          Code: "14THIN",
          Qty: 1,
          ID: 2,
          isNew: true,
          Options: { X: { "1/1": "1" }, C: { "1/1": "1" }, P: { "1/1": "1" } },
        },
      ],
      ServiceMethod: "Carryout",
      SourceOrganizationURI: "order.dominos.com",
      StoreID: "7994",
      Tags: {},
      Version: "1.0",
      NoCombine: true,
      Partners: {},
      HotspotsLite: false,
      OrderInfoCollection: [],
    },
  };

  // const orderValid = await validateOrder(order);
  // console.log(orderValid);
  const pricedOrder = await priceOrder(order);
  
   const Amount = pricedOrder.Order.Amounts.Customer;
  console.log(pricedOrder);
  order.Order.Payments.push({
     Amount,
     Type: 'CreditCard',
     Number: 4242424242424242, //insert correct creditcard/debitcard info
     CardType: 'VISA', //insert card type
     Expiration: '4242', //insert expiration date of card
     SecurityCode: '424', //insert secutiy code(3 digit number on back of credit/debit card)
     PostalCode: '42424', //insert zipcode
})
  
  // const placedOrder = await placeOrder(order); METHOD WILL CHARGE CARD 
  // console.log(placedOrder)
})();
