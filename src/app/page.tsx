import Location from "./components/Location";
import axios from "axios";
import { parseCsv } from "./helpers/lib";

export default async function Home() {
  const res = await axios.get(
    "https://influx.itsubotica2030.rs/query?orgID=aee2ccaad633faa0&db=itsubotica2030&q=SHOW MEASUREMENTS",
    {
      headers: {
        Accept: "application/csv",
        Authorization:
          "Token oF9m5j2AkEdZ4YXdDHgHkgYJJ4Ixd73DipElqU2voEebu6dWrLKgBYIblfJsPc3VZ-3H0oydq9BbfOoGKL9euQ==",
      },
    }
  );

  const { data } = res;
  const jsonObj = parseCsv(data);

  return (
    <div className="p-12">
      {jsonObj.map((el) =>
        el.name.includes("Validated") ? (
          <Location key={el.name} name={el.name} />
        ) : null
      )}
    </div>
  );
}
