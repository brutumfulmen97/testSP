"use client";
import axios from "axios";

export default function Location({ name }: any) {
  async function handleClick() {
    console.log(name);
    const res = await axios.get(`/api/data/${name}`);

    const data = await res.data;

    console.log(data);
  }

  return (
    <div
      onClick={() => handleClick()}
      className="bg-green-300 mb-4 font-bold text-center ring ring-orange-300 text-black py-2 rounded-lg cursor-pointer hover:bg-green-400"
    >
      {name}
    </div>
  );
}
