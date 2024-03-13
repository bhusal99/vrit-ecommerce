import { FaMinus, FaPlus } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { FaTrash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useState } from "react";
import {
  clearCart,
  decreaseQuantity,
  removeItemFromCart,
} from "./../redux/cartSlice";
import { increaseQuantity } from "./../redux/cartSlice";
import axios from "axios";
import { toast } from "react-hot-toast";

const CartPage = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  // Dispatch action to add item to the cart

  const handleOrder = async () => {
    try {
      setLoading(true);
      const totalAmount = Math.ceil(
        cartItems.reduce(
          (acc, item) =>
            acc +
            (item.price - (item.price * item.discountPercentage) / 100) *
              item.quantity,
          0
        )
      );

      const products = cartItems.map((item) => ({
        name: item.title,
        quantity: item.quantity,
        price: item.price - (item.price * item.discountPercentage) / 100,
      }));

      const sendingData = {
        totalAmount,
        products,
      };

      const response = await axios.post(
        "http://localhost:8000/orders",
        sendingData
      );

      // const getOrders = await axios.get("http://localhost:3000/orders");

      if (response.data) {
        toast("Order has been placed successfully");
      } else {
        // Handle unexpected response status
        console.error("Unexpected response status:", response.status);
      }
      setLoading(false);

      dispatch(clearCart()); // Dispatch the clearCart action
    } catch (error) {
      // Handle Axios request error
      // console.error("Error placing order:", error);
      toast("Failed to place order. Please try again later.");
    }
  };
  return (
    <div className="group">
      <div
        className={`cartItems   p-5  top-10 right-0 shadow-md bg-white border-[1px] border-gray-300 rounded-md z-20`}
      >
        <div className="heading flex justify-between gap-3 items-center">
          <h3 className="text-xl mb-3 font-bold uppercase text-gray-600">
            My Shopping Bag
          </h3>
          {cartItems.length > 0 && (
            <div className="totalAmount">
              Cart Total
              <span className="ml-2 p-2 py-0 rounded-sm bg-purple-200 text-purple-700">
                $
                {Math.ceil(
                  cartItems.reduce(
                    (acc, item) =>
                      acc +
                      (item.price -
                        (item.price * item.discountPercentage) / 100) *
                        item.quantity,
                    0
                  )
                )}
              </span>
            </div>
          )}
        </div>
        <div className="items space-y-3 max-h-96 overflow-scroll overflow-x-hidden">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="shadow-md rounded-md relative flex gap-3 border-gray-200 border-[1px] py-2 px-3"
              >
                <div className="image w-20">
                  <img
                    src={item.thumbnail}
                    alt=""
                    className="size-16 rounded-lg bg-gray-100 p-2 object-cover"
                  />
                </div>
                <div className="info w-full">
                  <h2 className="text-purple-600 font-bold">
                    {item.title} (
                    {item.quantity > 1
                      ? `${item.quantity} items`
                      : `${item.quantity} item`}
                    )
                  </h2>
                  <p>
                    {(item.price -
                      (item.price * item.discountPercentage) / 100) *
                      item.quantity}
                  </p>
                </div>

                <div className="updateQuantity flex gap-3 w-24 flex-col pr-10">
                  <button
                    onClick={() => dispatch(increaseQuantity(item.id))}
                    className="btn flex justify-center items-center"
                  >
                    <FaPlus />
                  </button>
                  <button
                    onClick={() => dispatch(decreaseQuantity(item.id))}
                    className="btn flex justify-center items-center"
                  >
                    <FaMinus />
                  </button>
                </div>
                <div
                  onClick={() => dispatch(removeItemFromCart(item.id))}
                  className="deleteItem closeBtn absolute right-2 top-6 border-2 border-white cursor-pointer h-8 w-8 bg-red-500 text-white rounded-full flex justify-center items-center "
                >
                  <FaTrash />
                </div>
              </div>
            ))
          ) : (
            <div>There are no items in the cart</div>
          )}
        </div>

        <div className="actions mt-5 flex gap-5 justify-between">
          <button className="btn" onClick={handleOrder}>
            {loading ? "Sending Order..." : "Send Order"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;

// {
//   "totalAmount": 2300,
//   "products": [
//     {
//       "name": "Product 1",
//       "quantity": 2,
//       "price": 1000
//     },
//     {
//       "name": "Product 2",
//       "quantity": 1,
//       "price": 500
//     },
//     {
//       "name": "Product 3",
//       "quantity": 4,
//       "price": 200
//     }
//   ]
// }
