import { createServer } from "http";
import next from "next";
import { parse } from "url";

const port = process.env.PORT || 3000; // jangan ada spasi setelah process.env.
const dev = process.env.NODE_ENV !== "production"; // harus pakai !==, bukan langsung string
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => { // arrow function harus pakai => bukan =
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(port, (err) => { // callback harus pakai => juga
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`); // backtick template string
  });
});
