import { useForm, FormProvider } from "react-hook-form";
import { Input } from "@/components/atoms";

export default function ListVehiclesPage() {
  const methods = useForm();
  const onSubmit = (data: any) => console.log(data);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="w-[400px]">
        <Input
          label="Login Input"
          isFill={methods.watch().loginInput}
          placeholder="Please input your email"
        />
        <input type="submit" />
      </form>
    </FormProvider>
  );
}
