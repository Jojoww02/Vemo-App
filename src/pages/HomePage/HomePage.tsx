import { Button, Input } from "@/components/atoms";
import { FormProvider, useForm } from "react-hook-form";

export default function HomePage(): JSX.Element {
  const methods = useForm()
  const onSubmit = (data: any) => console.log(data);
  return (
    <div className="flex h-screen overflow-y-hidden">

            {/* Content Left Start */}
            <div className="w-2/5 flex flex-col justify-evenly px-10">
                <div>
                    <h1 className="text-6xl font-bold">Welcome!</h1>
                    <div className="flex items-center text-3xl xl:text-4xl ml-2 mt-1">
                        <p className="font-medium">to</p>
                        <span className="flex items-center ml-5">
                            <img src="/src/assets/iconVemo.svg" alt="" className="w-[60px] xl:w-[80px]" />
                            <p className="text-[#F4B400] font-semibold italic ml-3 tracking-wide">
                                VEMO
                            </p>
                        </span>
                    </div>
                </div>
                <div className="2xl:text-xl text-md text-[#8391A1] font-medium flex flex-col gap-6 overflow-y-auto">
                    <p>
                        VEMO is an app website that provides repairing your two-wheeled vehicle,
                        you can find out the condition of your engine and motorcycle performance.
                    </p>
                    <p>
                        VEMO adalah sebuah website app yang menyediakan memperbaiki kendaraan beroda dua anda,
                        anda bisa mengetahui kondisi mesin dan peforma motor anda.
                    </p>
                </div>
                <div className="flex items-center">
                    <span className="flex items-center">
                        <img src="/src/assets/iconVemo.svg" alt="" className="w-[30px] xl:w-[40px]" />
                        <p className="text-[#F4B400] font-semibold italic ml-2 tracking-wide xl:text-lg">
                            VEMO
                        </p>
                    </span>
                    <p className="mx-2 font-medium text-lg">|</p>
                    <p className="font-medium text-xs xl:text-base">
                        The best place for your vehicle
                    </p>
                </div>
            </div>
            {/* Content Left End */}

            {/* Content Right Start */}
            <div className="relative w-3/5 bg-cover grid place-items-center bg-[url('/src/assets/homeLanding/landing-image.webp')]">
                <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-30"></div>

                {/* Card */}
                <div className="w-3/5 xl:w-1/2 p-8 rounded-[2rem] bg-white z-10 shadow-[0px_2px_7px_5px_#00000040]">
                    <p className="font-bold text-2xl mb-6 text-center">Create an Account</p>
                    <FormProvider {...methods}>
                        <form onSubmit={methods.handleSubmit(onSubmit)} className="flex-col flex gap-5">
                            <Input 
                                label="Name"
                                isFill={methods.watch().name}
                                placeholder="Input Your Name"
                            />
                            <Input 
                                label="Email"
                                isFill={methods.watch().email}
                                placeholder="Input Your Email"
                            />
                            <Input 
                                label="Password"
                                isFill={methods.watch().password}
                                placeholder="Input Your Password"
                                type="password"
                            />
                            <Input 
                                label="Confirm Password"
                                isFill={methods.watch().confirmPassword}
                                placeholder="Confirm Your Password"
                                type="password"
                            />
                            <div className="flex flex-col gap-2">
                                <Button className="py-6 text-lg font-semibold">
                                    Sign Up
                                </Button>
                                <Button className="py-6 text-lg font-semibold bg-dark hover:bg-dark/80">
                                    Log In
                                </Button>
                            </div>
                        </form>
                    </FormProvider>
                </div>
            </div>
        </div>
  )
}
