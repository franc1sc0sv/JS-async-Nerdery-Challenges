import products from "./products.js";
import prices from "./prices.js";

const generateID = () => new Date().getTime().toString().slice(-2);

async function solution() {
  const ID = generateID();

  // Promises
  const promises = [products(ID), prices(ID)];

  // Promise.All
  try {
    const [productName, productPrice] = await Promise.all(promises);
    console.log(`(Promise.All):`, {
      id: ID,
      product: productName,
      price: productPrice,
    });
  } catch (error) {
    console.log(`Error (Promise.All): ${error.message || "Unknown error"}`);
  }

  // Promise.allSettled
  const resultsAllSettled = await Promise.allSettled(promises);

  const allFulfilled = resultsAllSettled.every(
    (result) => result.status === "fulfilled"
  );

  if (allFulfilled) {
    const productName = resultsAllSettled[0].value;
    const productPrice = resultsAllSettled[1].value;

    console.log(`(Promise.AllSettled):`, {
      id: ID,
      product: productName,
      price: productPrice,
    });
  }

  if (!allFulfilled) {
    console.log(
      `Error (Promise.allSettled): ${
        resultsAllSettled[0].reason || "Unknown error"
      }`
    );
  }

  // Promise.race -- Returns the first promise to be resolve o reject and finishing all the others (In this case always is going to be product promise It's the first in the array )
  try {
    const firstResolved = await Promise.race(promises);
    console.log(`First resolved (Promise.race):`, {
      id: ID,
      data: firstResolved,
    });
  } catch (error) {
    console.log(`Error (Promise.race): ${error.message || "Unknown error"}`);
  }

  //Promise.any() -- Returns the first to be resolve successfully
  try {
    const firstFulfilled = await Promise.any(promises);
    console.log(`First fulfilled (Promise.any):`, {
      id: ID,
      data: firstFulfilled,
    });
  } catch (error) {
    console.log(`Error (Promise.any): ${error.errors || "Unknown error"}`);
  }
}

solution();
