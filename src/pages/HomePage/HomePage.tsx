
export default function HomePage(): JSX.Element {
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

                </div>
            </div>
        </div>
  )
}
