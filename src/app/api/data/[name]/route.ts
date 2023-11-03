import { parseCsv } from "@/app/helpers/lib";
import axios from "axios";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest, { params }: any) {
  const { name } = params;
  const nameRaw = name.replace(" Validated", "");

  const res1 = await axios.get(
    `https://influx.itsubotica2030.rs/query?orgID=aee2ccaad633faa0&db=itsubotica2030&q=SELECT latitude, longitude FROM "${name}" LIMIT 1`,
    {
      headers: {
        Accept: "application/csv",
        Authorization:
          "Token oF9m5j2AkEdZ4YXdDHgHkgYJJ4Ixd73DipElqU2voEebu6dWrLKgBYIblfJsPc3VZ-3H0oydq9BbfOoGKL9euQ==",
      },
    }
  );

  const res2 = await axios.get(
    `https://influx.itsubotica2030.rs/query?orgID=aee2ccaad633faa0&db=itsubotica2030&q=SELECT * FROM "${nameRaw}"`,
    {
      headers: {
        Accept: "application/csv",
        Authorization:
          "Token oF9m5j2AkEdZ4YXdDHgHkgYJJ4Ixd73DipElqU2voEebu6dWrLKgBYIblfJsPc3VZ-3H0oydq9BbfOoGKL9euQ==",
      },
    }
  );

  const { data: data1 } = res1;
  const { data: data2 } = res2;

  const jsonData1: any = parseCsv(data1);
  const jsonData2: any = parseCsv(data2);

  return Response.json({ ...jsonData2[0], ...jsonData1[0] });
}
