import Input from "@/components/Input";
import ZTodos from "@/components/ZTodos";

export default function Home() {
  return (
    <div className="bg-slate-300 min-h-screen">
      <h1>Next App</h1>
      <Input />
      <ZTodos />
    </div>
  );
}
