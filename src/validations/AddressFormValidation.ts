import { TAddress } from "@/types/address.type";

  // Validation function
  export const addressFormValidation = (address:TAddress) => {
    const newErrors: Record<string, string> = {};

    // Check if firstName is not empty
    if (!address.firstName) {
      newErrors.firstName = "First name is required";
    }

    // Check if lastName is not empty
    if (!address.lastName) {
      newErrors.lastName = "Last name is required";
    }

    // Check if address is not empty
    if (!address.address) {
      newErrors.address = "Address is required";
    }

    // Check if city is not empty
    if (!address.city) {
      newErrors.city = "City is required.";
    }
    // Check if city is not empty
    if (!address.subCity) {
      newErrors.subCity = "Sub City is required.";
    }

    // Validate phone number (basic validation for length)
    if (!address.phone || address.phone.length < 10) {
      newErrors.phone = "Phone number must be at least 10 digits.";
    }

    // Validate email (simple regex)
    // const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    // if (!forms.email || !emailRegex.test(forms.email)) {
    //   newErrors.email = "Please enter a valid email address.";
    // }

    // Update errors state
    return newErrors;
    // setErrors(newErrors);

    // Return true if no errors
    // return Object.keys(newErrors).length === 0;
  };