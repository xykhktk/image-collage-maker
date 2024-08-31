
import Canvas from "@/src/components/Canvas";
import { Toolbar } from "@/src/components/toolbar";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center p-8 md:p-10">
      <div>
      <Toolbar></Toolbar>
      <Canvas></Canvas>
      </div>
    </section>
  );
}
