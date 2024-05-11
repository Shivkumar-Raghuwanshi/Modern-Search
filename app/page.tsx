import Image from "next/image";
import Logo from "@/public/logo.png";
import SearchComponent from "@/components/SearchComponent";

export default function Home() {
  return (
    <div className="bg-background bg-cover bg-center bg-no-repeat h-screen relative flex flex-col items-center ">
      <div className="sm:absolute sm:top-4 sm:right-4 ">
        <Image src={Logo} alt="logo" width={86} height={45} className="mt-2 " />
      </div>
      <div className="w-full py-4 md:py-10 px-2">
        <SearchComponent />
      </div>
    </div>
  );
}
