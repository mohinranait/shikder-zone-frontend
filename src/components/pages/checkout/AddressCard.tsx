import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { TAddress, TAddressResponse } from "@/types/address.type";
import { Check, Edit, Home, Hotel, MapPin, Phone, Trash } from "lucide-react";
import React from "react";
interface AddressSelectionProps {
  address: TAddressResponse;
  setFromAddress: React.Dispatch<React.SetStateAction<TAddress>>;
  selectedAddress: TAddressResponse | null;
  setSelectedAddress: React.Dispatch<
    React.SetStateAction<TAddressResponse | null>
  >;
  index: number;
  setIsAddressOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleDeleteAddress: (addressId: string) => Promise<void>;
}

const AddressCard = ({
  address,
  selectedAddress,
  setSelectedAddress,
  index,
  setFromAddress,
  setIsAddressOpen,
  handleDeleteAddress,
}: AddressSelectionProps) => {
  const isSelected = selectedAddress?._id === address._id;

  const handleAddressSelect = (addressId: TAddressResponse) => {
    setSelectedAddress(addressId);
  };

  const getAddressIcon = (type: string) => {
    switch (type) {
      case "Home":
        return <Home className="w-5 h-5 text-white" />;
      case "Office":
        return <Hotel className="w-5 h-5 text-white" />;
      default:
        return <MapPin className="w-5 h-5 text-white" />;
    }
  };

  const getAddressTypeColor = (type: string) => {
    switch (type) {
      case "Home":
        return "bg-main";
      case "Office":
        return "bg-primary";
      default:
        return "bg-gray-500";
    }
  };

  const handleEdit = () => {
    setFromAddress((prev) => ({
      ...prev,
      firstName: address?.firstName,
      lastName: address?.lastName,
      phone: address?.phone,
      address: address?.address,
      subCity: address?.subCity,
      city: address?.city,
      type: address?.type,
    }));
    setIsAddressOpen(true);
  };

  return (
    <Card
      className={`w-full cursor-pointer transition-all duration-200 hover:shadow-md ${
        isSelected
          ? "ring-2 ring-main  "
          : "border-gray-200 hover:border-gray-300"
      }`}
      onClick={() => handleAddressSelect(address)}
    >
      <CardHeader className="py-4 px-4 pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10  rounded-lg flex items-center justify-center ${getAddressTypeColor(
                address.type
              )}`}
            >
              {getAddressIcon(address.type)}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-700 capitalize">
                {address.type}
              </span>

              {index === 0 && (
                <Badge
                  variant="secondary"
                  className="bg-gray-100 text-gray-600 text-xs"
                >
                  Default
                </Badge>
              )}
            </div>
          </div>

          {/* Selection Indicator */}
          <div
            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
              isSelected ? "border-main bg-main" : "border-gray-300"
            }`}
          >
            {isSelected && <Check className="w-3 h-3 text-white" />}
          </div>
        </div>
      </CardHeader>

      <CardContent className="px-4 py-3 pt-0">
        <div className="space-y-3">
          <div>
            <h4 className="font-semibold text-gray-900">
              {address.firstName} {address.lastName}
            </h4>
          </div>

          <div className="space-y-2">
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-gray-600 leading-relaxed">
                {address.address}, {address.subCity}, {address.city},
                <br />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-gray-400 flex-shrink-0" />
              <span className="text-sm text-gray-600">{address.phone}</span>
            </div>
          </div>

          {/* Action Buttons - Only show for selected address */}
          {isSelected && (
            <div className="flex gap-2 pt-3 border-t border-gray-100">
              <Button
                onClick={handleEdit}
                type="button"
                variant="outline"
                size="sm"
                className=" gap-2"
              >
                <Edit className="w-3 h-3" />
              </Button>
              <Button
                onClick={() => handleDeleteAddress(address?._id)}
                type="button"
                variant="outline"
                size="sm"
                className="gap-2"
              >
                <Trash className="w-3 h-3" />
              </Button>
              <Button size="sm" className="flex-1 bg-main ">
                Ship Address
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AddressCard;
