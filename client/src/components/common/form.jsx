import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectItem } from "@/components/ui/select";
import {
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@radix-ui/react-select";
import { Link } from "react-router-dom";

function CommonForm({
  formControls,
  formData,
  setFormData,
  onSubmit,
  buttonText,
}) {
  function renderInputByComponentType(getControlItems) {
    let element = null;
    const value = formData[getControlItems.name] || "";
    switch (getControlItems.componentType) {
      case "input":
        element = (
          <Input
            name={getControlItems.name}
            id={getControlItems.name}
            type={getControlItems.type}
            placeholder={getControlItems.placeholder}
            label={getControlItems.label}
            value={value}
            onChange={(e) =>
              setFormData({
                ...formData,
                [getControlItems.name]: e.target.value,
              })
            }
          />
        );

        break;
      case "select":
        element = (
          <Select
            value={value}
            onValueChange={(value) =>
              setFormData({ ...formData, [getControlItems.name]: value })
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={getControlItems.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {getControlItems.options && getControlItems.options.length > 0 ? (
                getControlItems.options.map((optionItems) => (
                  <SelectItem key={optionItems.id} value={optionItems.id}>
                    {optionItems.label}
                  </SelectItem>
                ))
              ) : (
                <SelectItem disabled>No options available</SelectItem>
              )}
            </SelectContent>
          </Select>
        );
        break;
      case "email":
        element = (
          <Input
            name={getControlItems.name}
            id={getControlItems.name}
            type={getControlItems.type}
            placeholder={getControlItems.placeholder}
            label={getControlItems.label}
            value={value}
            onChange={(e) =>
              setFormData({
                ...formData,
                [getControlItems.name]: e.target.value,
              })
            }
          />
        );

        break;
      case "password":
        element = (
          <Input
            name={getControlItems.name}
            id={getControlItems.name}
            type={getControlItems.type}
            placeholder={getControlItems.placeholder}
            label={getControlItems.label}
            value={value}
            onChange={(e) =>
              setFormData({
                ...formData,
                [getControlItems.name]: e.target.value,
              })
            }
          />
        );

        break;
      case "textarea":
        element = (
          <Textarea
            name={getControlItems.name}
            id={getControlItems.name}
            placeholder={getControlItems.placeholder}
            label={getControlItems.label}
            value={value}
            onChange={(e) =>
              setFormData({
                ...formData,
                [getControlItems.name]: e.target.value,
              })
            }
          />
        );

        break;
        
      default:
        element = (
          <Input
            name={getControlItems.name}
            id={getControlItems.name}
            type={getControlItems.type}
            placeholder={getControlItems.placeholder}
            label={getControlItems.label}
            value={value}
            onChange={(e) =>
              setFormData({
                ...formData,
                [getControlItems.name]: e.target.value,
              })
            }
          />
        );
        break;
    }

    return element;
  }

  return (
    <form
      className="w-full max-w-md mx-auto p-4 bg-white shadow-md rounded-lg"
      onSubmit={onSubmit}
    >
      <div className="flex flex-col gap-4">
        {formControls.map((controlItems) => (
          <div
            key={controlItems.name}
            className="grid grid-cols-1 w-full gap-2"
          >
            <Label className="mb-1" htmlFor={controlItems.name}>
              {controlItems.label}
            </Label>
            {renderInputByComponentType(controlItems)}
          </div>
        ))}

        <Button type="submit" className="mt-2 w-full bg-blue-600 text-amber-50" variant="primary">
          {buttonText || "Submit"}
        </Button>

        <div className="mt-4">
          <p className="text-sm text-gray-600">
            By registering, you agree to our
            <Link to="/terms" className="text-blue-600 hover:underline">
              Terms of Service
            </Link>
            and
            <Link to="/privacy" className="text-blue-600 hover:underline">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </form>
  );
}

export default CommonForm;
