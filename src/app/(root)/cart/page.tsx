import CartComponent from "@/components/pages/cart/CartComponent";
import React from "react";
const CartPage = () => {
  return (
    <section>
      <div className="container pb-10">
        <div className="py-4">
          <p className="text-2xl text-gray-800 font-semibold">Your Basket</p>
          <p className="text-base text-gray-500 font-medium">Shopping cart</p>
        </div>
        <CartComponent />
      </div>
      <div className="py-7 container">
        <div className="box">
          <div className="grid grid-cols-1  lg:grid-cols-3 gap-2 lg:gap-5">
            <div className="md:col-span-1 lg:col-span-2  ">
              <div className="mb-4">
                <p className="text-xl font-bold text-gray-900 ">Delivery</p>
              </div>
              <div className="grid md:grid-cols-2 gap-5">
                <div className="flex items-center gap-4 bg-white rounded-md px-5 py-10">
                  <div>
                    <img
                      className="w-[120px]"
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/DPD_logo_%282015%29.svg/2560px-DPD_logo_%282015%29.svg.png"
                      alt=""
                    />
                  </div>
                  <div>
                    <p className="text-xl font-semibold text-gray-800">
                      DPD delivery
                    </p>
                    <p className="text-sm font-semibold text-gray-500">
                      Exponend delivery founding
                    </p>
                  </div>
                  <div>
                    <p className="text-base md:text-lg font-bold ">$20</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 bg-white rounded-md px-5 py-6">
                  <div>
                    <img
                      className="w-[120px]"
                      src="https://assets.turbologo.com/blog/en/2019/12/19084817/Fedex-logo.png"
                      alt=""
                    />
                  </div>
                  <div>
                    <p className="text-xl font-semibold text-gray-800">
                      FedEx delivery
                    </p>
                    <p className="text-sm font-semibold text-gray-500">
                      Exponend delivery founding
                    </p>
                  </div>
                  <div>
                    <p className="text-base md:text-lg font-bold ">$20</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 bg-white rounded-md px-5 py-6">
                  <div>
                    <img
                      className="w-[120px] "
                      src="https://allvectorlogo.com/img/2021/12/ups-logo-vector.png"
                      alt=""
                    />
                  </div>
                  <div>
                    <p className="text-xl font-semibold text-gray-800">
                      UPS delivery
                    </p>
                    <p className="text-sm font-semibold text-gray-500">
                      Exponend delivery founding
                    </p>
                  </div>
                  <div>
                    <p className="text-base md:text-lg font-bold ">$20</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 bg-white rounded-md px-5 py-6">
                  <div>
                    <img
                      className="w-[120px] "
                      src="https://www.redx.com/wp-content/uploads/OnlyArtboard-6Logo.png"
                      alt=""
                    />
                  </div>
                  <div>
                    <p className="text-xl font-semibold text-gray-800">
                      RedX delivery
                    </p>
                    <p className="text-sm font-semibold text-gray-500">
                      Exponend delivery founding
                    </p>
                  </div>
                  <div>
                    <p className="text-base md:text-lg font-bold ">$20</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="mb-4">
                <p className="text-xl font-bold text-gray-900 ">
                  Another Services
                </p>
              </div>
              <div>
                <ul className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-5">
                  <li className="bg-white rounded-md py-3 px-5 flex justify-between gap-4 items-center">
                    <div>
                      <p className="text-gray-800 font-semibold text-xl">
                        Cash on delivery
                      </p>
                      <p className="text-gray-500 font-medium">
                        Lorem ipsum dolor sit amet.
                      </p>
                    </div>
                    <div>
                      <p className="text-base md:text-lg font-bold ">$20</p>
                    </div>
                  </li>
                  <li className="bg-white rounded-md py-3 px-5 flex justify-between gap-4 items-center">
                    <div>
                      <p className="text-gray-800 font-semibold text-xl">
                        Home delivery
                      </p>
                      <p className="text-gray-500 font-medium">
                        Lorem ipsum dolor sit amet.
                      </p>
                    </div>
                    <div>
                      <p className="text-base md:text-lg font-bold ">$20</p>
                    </div>
                  </li>
                  <li className="bg-white rounded-md py-3 px-5 flex justify-between gap-4 items-center">
                    <div>
                      <p className="text-gray-800 font-semibold text-xl">
                        Recive Office
                      </p>
                      <p className="text-gray-500 font-medium">
                        Lorem ipsum dolor sit amet.
                      </p>
                    </div>
                    <div>
                      <p className="text-base md:text-lg font-bold text-gray-600">
                        Free
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CartPage;
