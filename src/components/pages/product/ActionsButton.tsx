"use client";
import { Button } from "@/components/ui/button";
import ProductCartCounter from "./ProductCartCounter";
import { ShoppingCart } from "lucide-react";
import type { TProduct } from "@/types/product.type";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import type { TCartItems } from "@/types/cart.type";
import { useEffect, useMemo, useState } from "react";
import { addToCart } from "@/redux/features/shoppingCartSlice";
import { updateVariant } from "@/redux/features/productSlice";
import toast from "react-hot-toast";
import { Badge } from "@/components/ui/badge";
import { currency } from "@/helpers/utils";
import { calculateProductPrice } from "@/helpers/product.helper";
import { calculateDiscount } from "@/helpers/product.helper";
import { useRouter } from "next/navigation";

type Props = {
  product: TProduct;
};

const ActionsButton = ({ product }: Props) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const { carts } = useAppSelector((state) => state.cart);
  const { attributes: getAttributes } = useAppSelector(
    (state) => state.attributes
  );
  const { attributeConfigs: getAttrConfigs } = useAppSelector(
    (state) => state.attributeConfigs
  );
  const { variant } = useAppSelector((state) => state.product);

  const cart = useMemo(
    () => carts?.find((cart: TCartItems) => cart?.product === product?._id),
    [carts, product]
  );

  const [quantity, setQuantity] = useState(cart?.quantity || 1);
  const [isPrice, setIsPrice] = useState({ oPrice: 0, pPrice: 0 });
  const [attributeIds, setAttributesIds] = useState<string[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  const attributes = useMemo(() => {
    const attrIds = product?.attributes?.map((attr) => attr?.attribute) || [];
    return getAttributes?.filter((attr) => attrIds.includes(attr?._id)) || [];
  }, [product, getAttributes]);

  const attrConfigs = useMemo(() => {
    const configIds =
      product?.attributes?.flatMap((attr) => attr?.attributeConfig) || [];
    return getAttrConfigs?.filter((cfg) => configIds.includes(cfg?._id)) || [];
  }, [product, getAttrConfigs]);

  // Initialize first variation for variable products
  useEffect(() => {
    if (
      product?.variant === "Variable Product" &&
      product?.variations &&
      product.variations.length > 0 &&
      attributes.length > 0 &&
      attrConfigs.length > 0 &&
      !isInitialized
    ) {
      const firstVariation = product.variations[0];

      // Get attribute config IDs from first variation
      const firstVariationConfigIds = firstVariation.attributeConfigs.map(
        (ac) => ac.value
      );

      // Map these to the correct order based on attributes array
      const orderedAttributeIds = attributes.map((attr) => {
        const matchingConfig = firstVariationConfigIds.find((configId) => {
          const config = getAttrConfigs.find((cfg) => cfg._id === configId);
          return config?.attribute === attr._id;
        });
        return matchingConfig || "";
      });

      // Set the ordered attribute IDs
      setAttributesIds(orderedAttributeIds);

      // Update variant in Redux
      dispatch(updateVariant(firstVariation));

      // Set price from first variation
      setIsPrice({
        pPrice: firstVariation?.productPrice || 0,
        oPrice: firstVariation?.offerPirce || 0,
      });

      setIsInitialized(true);
    } else if (product?.variant !== "Variable Product" && !isInitialized) {
      // For single products, use calculateDiscount function
      if (product?.price) {
        const discountData = calculateDiscount(product);
        setIsPrice({
          oPrice: discountData.finalPrice, // This is the discounted price
          pPrice: product.price.productPrice, // This is the original price
        });
      }
      setIsInitialized(true);
    }
  }, [
    product,
    attributes,
    attrConfigs,
    getAttrConfigs,
    dispatch,
    isInitialized,
  ]);

  // Build a map of valid config options per attribute
  const validConfigMap = useMemo(() => {
    if (!product?.variations || !getAttrConfigs) return {};
    const result: Record<string, string[]> = {};

    attributes.forEach((attr) => {
      const currentAttrId = attr._id;
      const selectedMap = attributeIds.reduce((acc, id, i) => {
        const aid = attributes[i]?._id;
        if (aid && id) acc[aid] = id;
        return acc;
      }, {} as Record<string, string>);

      const validIds = product.variations
        .filter((variation) => {
          return Object.entries(selectedMap).every(([attrId, configId]) => {
            if (attrId === currentAttrId) return true;
            return variation.attributeConfigs.some((ac) => {
              const config = getAttrConfigs.find((cfg) => cfg._id === ac.value);
              return (
                config && config.attribute === attrId && config._id === configId
              );
            });
          });
        })
        .flatMap((v) =>
          v.attributeConfigs
            .map((ac) => ac.value)
            .filter((val) => {
              const cfg = getAttrConfigs.find((c) => c._id === val);
              return cfg?.attribute === currentAttrId;
            })
        );
      result[currentAttrId] = validIds;
    });
    return result;
  }, [attributeIds, attributes, product?.variations, getAttrConfigs]);

  const increment = () => setQuantity((prev) => (prev < 20 ? prev + 1 : prev));
  const decrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : prev));

  const handleAddToCart = (action: "cart" | "buy" = "cart") => {
    // For variable products, check if all attributes are selected
    if (
      product?.variant === "Variable Product" &&
      product?.attributes &&
      product?.attributes?.length > 0 &&
      attributeIds?.length !== product?.attributes?.length
    ) {
      const prodAttributes = product?.attributes?.map(
        (item) => item?.attribute
      );
      const missingAttrs = getAttributes?.filter((attr) =>
        prodAttributes?.includes(attr?._id)
      );
      toast.custom(
        <div className="py-2 px-3 rounded-md text-sm bg-white text-black shadow-md">
          Please select:{" "}
          {missingAttrs?.map((a, i) => (
            <span key={i} className="font-semibold">
              {a?.name}
              {i < missingAttrs.length - 1 && ", "}
            </span>
          ))}
        </div>
      );
      return;
    }

    let cartData: TCartItems = {
      user: null,
      product: product?._id,
      quantity,
      pImage:
        product?.variant !== "Variable Product"
          ? product?.featureImage?.image
          : variant?.image || "",
      pName: product?.name,
      price:
        product?.variant !== "Variable Product"
          ? +calculateProductPrice(product)
          : 0,
      sku: product?.skuCode,
    };

    // Add attribute information to cart for variable products
    if (
      product?.variant === "Variable Product" &&
      attributeIds?.length ===
        (product?.attributes && product?.attributes?.length)
    ) {
      const attrConfigs = getAttrConfigs?.filter((attrCon) =>
        attributeIds?.includes(attrCon?._id)
      );
      attrConfigs?.forEach((item) => {
        if (!cartData.attributes) {
          cartData.attributes = {};
        }
        const findAttr = getAttributes?.find(
          (attr) => attr?._id === item?.attribute
        );
        if (!findAttr) {
          toast.error("Something went wrong with attributes");
          return;
        }
        cartData.attributes[findAttr?.name] = item?.name;
      });
    }

    // Update cart data for variable products
    if (product?.variant === "Variable Product" && variant) {
      cartData = {
        ...cartData,
        price: variant?.offerPirce
          ? Number(variant?.offerPirce)
          : Number(variant?.productPrice) || 0,
        sku: variant?.sku || "default",
      };
    }

    if (isAuthenticated) {
      cartData.user = user?._id as string;
    }

    dispatch(addToCart(cartData));
    if (action === "buy") {
      // Redirect to cart or checkout page
      router.push("/checkout");
    }
    toast.success("Product added to cart!");
  };

  useEffect(() => {
    if (cart?.quantity) setQuantity(cart?.quantity);
  }, [cart]);

  const handleChangeAttribute = (id: string, index: number) => {
    setAttributesIds((prev) => {
      const newArr = [...prev];
      newArr[index] = id;
      return newArr;
    });
  };

  // Handle variation changes when attributes are manually selected
  useEffect(() => {
    if (
      product?.variant === "Variable Product" &&
      product?.variations &&
      attributeIds?.length > 0 &&
      isInitialized
    ) {
      const variantObject = product?.variations?.find((item) =>
        attributeIds.every((id) =>
          item.attributeConfigs.some((attr) => attr.value === id)
        )
      );
      if (variantObject) {
        dispatch(updateVariant(variantObject));
        setIsPrice({
          pPrice: variantObject?.productPrice || 0,
          oPrice: variantObject?.offerPirce || 0,
        });
      }
    }
  }, [attributeIds, product, dispatch, isInitialized]);

  return (
    <>
      <div className="space-y-2">
        {product?.variant === "Variable Product" && (
          <div className="flex items-baseline gap-3">
            <span className="text-xl font-bold text-gray-900">
              {currency}
              {calculateProductPrice(product)}
            </span>
            <span className="text-lg text-gray-500">Range</span>
          </div>
        )}
        {isPrice?.oPrice &&
        isPrice.oPrice > 0 &&
        isPrice.oPrice < isPrice.pPrice ? (
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-bold text-gray-900">
              {currency}
              {isPrice?.oPrice?.toFixed(2)}
            </span>
            <span className="text-lg text-gray-500 line-through">
              {currency}
              {isPrice?.pPrice?.toFixed(2)}
            </span>
            <Badge className="bg-red-100 text-red-700 px-3 py-1">
              {product?.variant !== "Variable Product"
                ? `${calculateDiscount(product).percentage}% OFF`
                : `${Math.round(
                    ((isPrice.pPrice - isPrice.oPrice) / isPrice.pPrice) * 100
                  )}% OFF`}
            </Badge>
          </div>
        ) : (
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-bold text-gray-900">
              {currency}
              {isPrice.pPrice?.toFixed(2)}
            </span>
          </div>
        )}
        <p className="text-sm text-gray-500">Price includes all taxes</p>
      </div>

      {product?.variant === "Variable Product" && attributes?.length > 0 && (
        <div className="space-y-4">
          {attributes.map((attr, index) => {
            const matchedConfigs = attrConfigs?.filter(
              (ac) => ac?.attribute === attr?._id
            );
            const validIds = validConfigMap[attr._id] || [];

            const selectedAttrValue = matchedConfigs?.filter(
              (attr) => attributeIds.includes(attr._id) && attr
            );

            return (
              <div key={index}>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  {attr.name}: {selectedAttrValue[0]?.name}
                </label>
                <div className="flex gap-2 flex-wrap">
                  {matchedConfigs?.map((config, iKey) => (
                    <Button
                      disabled={
                        validIds.length > 0 && !validIds.includes(config._id)
                      }
                      key={iKey}
                      onClick={() => handleChangeAttribute(config?._id, index)}
                      variant="outline"
                      size="sm"
                      className={`text-xs h-8 px-3 border rounded transition-all ${
                        attributeIds?.includes(config?._id)
                          ? "border-emerald-500 bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                          : "border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50"
                      } ${
                        validIds.length > 0 && !validIds.includes(config._id)
                          ? "opacity-50 cursor-not-allowed"
                          : ""
                      }`}
                    >
                      {config.name}
                    </Button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className=" items-center gap-3 mt-6">
        <ProductCartCounter
          increment={increment}
          decrement={decrement}
          quantity={quantity || 1}
        />
        <div className="flex gap-2 mt-2 items-center">
          <Button
            type="button"
            onClick={() => handleAddToCart("cart")}
            className="flex items-center  gap-2"
          >
            <ShoppingCart className="w-4 h-4" />
            Add to cart
          </Button>
          <Button
            variant="outline"
            onClick={() => handleAddToCart("buy")}
            className="bg-main text-white  hover:bg-main hover:text-white"
          >
            Buy Now
          </Button>
        </div>
      </div>
    </>
  );
};

export default ActionsButton;
