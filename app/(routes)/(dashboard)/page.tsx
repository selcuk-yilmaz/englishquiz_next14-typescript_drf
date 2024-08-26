import Category from "@/components/Category/Category";
import { CarouselPlugin } from "@/components/Dashboard/CarouselPlugin";

export default function Home() {

  return (
    <div className="mt-4">
      <Category />
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="w-full max-w-4xl mt-8">
          <CarouselPlugin />
        </div>
      </div>
    </div>
  );
}
