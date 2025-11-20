import { TProduct } from "@/types/product.type";
import { isAfter, isBefore, parseISO, subDays } from 'date-fns'


/**
 * Check if the current date is within the offer date range
 * @param {TProduct["offerDate"]} offerDate
 * @returns {boolean}
 */
export function isOfferStillActive(offerDate: TProduct["offerDate"]): boolean {
  if (!offerDate) return true;

  const { start_date: startDate, end_date: endDate } = offerDate;
  const currentDate = new Date();

  if (startDate && !endDate) {
    return isAfter(currentDate, parseISO(startDate.toString()));
  }

  if (startDate && endDate) {
    return (
      isAfter(currentDate, parseISO(startDate.toString())) &&
      isBefore(currentDate, parseISO(endDate.toString()))
    );
  }

  return true;
}


/**
 * Calculate product price considering offer and discount type
 * @param {TProduct} product
 * @returns {string | number} - The final price of the product
 */
export const calculateProductPrice = (product:TProduct)  => {
    const { variations,price, variant, offerDate} = product || {}
   if (variant === "Variable Product") {
      const allPrice = variations?.map((vari) =>
        vari?.offerPirce ? Number(vari?.offerPirce) : Number(vari?.productPrice)
      );
      const max = Math.max(...allPrice) || 0;
      const min = Math.min(...allPrice) || 0;
      return `${Number(min) || 0}-${max || 0}`;
    } else{
      const hasDiscount = price?.discountValue && price?.discountType;
      const isOfferActive = isOfferStillActive(offerDate)


      // If offer is active, apply the discount
      if (hasDiscount && isOfferActive) {
        const finalPrice =
          price?.discountType === "fixed"
            ? price?.productPrice - price?.discountValue
            : price?.discountType === "percent"
            ? price?.productPrice - (price?.productPrice * price?.discountValue) / 100
            : price?.productPrice;

        return finalPrice?.toFixed(2);
      } else {
        return price?.productPrice.toFixed(2); 
      }
    }
}


/**
 * Calculate the discount details (discount amount and final price)
 * @param {TProduct} product
 * @returns {Object} - Discount amount, final price, and percentage
 */
export function calculateDiscount(product: TProduct) {
  const { price, offerDate } = product;
  let discountAmount = 0;
  let percentage = 0;

  const isOfferActive = isOfferStillActive(offerDate)

  // Calculate discount if the offer is active
  if (price?.discountType === "percent" && isOfferActive) {
    discountAmount = (price?.productPrice * price?.discountValue) / 100;
    percentage = price?.discountValue;
  } else if (price?.discountType === "fixed" && isOfferActive) {
    discountAmount = price?.discountValue;
    percentage = (discountAmount / price?.productPrice) * 100;
  }

  const finalPrice = price?.productPrice - discountAmount;

  return {
    discountAmount,
    finalPrice,
    percentage: Number(percentage.toFixed(2)),
  };
}



// Find new product 
  // finding new product
  export const newProduct = (product:TProduct) => {
    const createdDate = product?.createdAt;
    const today = new Date();
    const fiveDaysAgo = subDays(today, 15);
    return isAfter(createdDate, fiveDaysAgo);
  };

