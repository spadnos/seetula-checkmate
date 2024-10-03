import { UseFormRegister } from "react-hook-form";
import { Label } from "../ui/label";

type props = {
  type: string;
  name: string;
  label: string;
  placeholder: string;
  defaultValue: string;
  error: any;
  register: UseFormRegister<FormData>;
};

function FormInput2({
  type,
  name,
  label,
  placeholder,
  defaultValue,
  error,
  register,
}: props) {
  return (
    <>
      <div className="">
        <Label htmlFor={name} className="text-right">
          {name}
        </Label>
        <input {...register(name)} className="" />
        {error && <p>{error.message}</p>}
      </div>
    </>
  );
}
export default FormInput2;
