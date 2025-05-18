
import { useState, useEffect } from "react";
import { useProfile } from "../../contexts/ProfileContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Address } from "../../types/order";
import { Checkbox } from "@/components/ui/checkbox";

interface AddressFormProps {
  address?: Address;
  onCancel: () => void;
}

const AddressForm = ({ address, onCancel }: AddressFormProps) => {
  const { addAddress, updateAddress } = useProfile();
  const [formData, setFormData] = useState({
    name: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    isDefault: false,
  });

  useEffect(() => {
    if (address) {
      setFormData({
        name: address.name,
        street: address.street,
        city: address.city,
        state: address.state,
        zipCode: address.zipCode,
        country: address.country,
        isDefault: address.isDefault,
      });
    }
  }, [address]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (address) {
      updateAddress(address.id, formData);
    } else {
      addAddress(formData);
    }
    
    onCancel();
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="address-name">Address Name</Label>
              <Input
                id="address-name"
                placeholder="Home, Work, etc."
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                placeholder="Country"
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                required
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="street">Street Address</Label>
            <Input
              id="street"
              placeholder="Street address"
              value={formData.street}
              onChange={(e) => setFormData({ ...formData, street: e.target.value })}
              required
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                placeholder="City"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="state">State</Label>
              <Input
                id="state"
                placeholder="State"
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="zip">Zip Code</Label>
              <Input
                id="zip"
                placeholder="Zip code"
                value={formData.zipCode}
                onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                required
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox
              id="default-address"
              checked={formData.isDefault}
              onCheckedChange={(checked) => 
                setFormData({
                  ...formData,
                  isDefault: checked === true,
                })
              }
            />
            <Label htmlFor="default-address" className="cursor-pointer">
              Set as default address
            </Label>
          </div>
          
          <div className="flex space-x-2">
            <Button type="submit">
              {address ? 'Update Address' : 'Add Address'}
            </Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddressForm;
