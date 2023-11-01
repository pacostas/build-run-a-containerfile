const db = require("./db/database");
const dbUrl = "dbtype://localhost:2023/mydatabase";
const helmet = require("helmet");
const v8 = require("v8");

//=====> Connect to a DB <=======
db.connect(dbUrl);

const runHelmet = helmet();

//Create the server
const server = require("http").createServer((req, res) => {
  runHelmet(req, res, async (err) => {
    if (err) {
      res.statusCode = 500;
      res.end(
        "Helmet failed for some unexpected reason. Was it configured correctly?"
      );
      return;
    }

    if (req.url === "/users") {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      const result = await db.query("SELECT * FROM users");
      res.end(JSON.stringify(result));
    } else {
      res.statusCode = 404;
      res.end();
    }
  });
});

//Set server listening to port 3000 as default
server.listen(process.env.PORT || 3000, () =>
  console.log("Server is running...")
);

//=======> SIGNAL HANDLERS <========
const signals = {
  SIGHUP: "SIGHUP",
  SIGINT: "SIGINT",
  SIGTERM: "SIGTERM",
};

async function signalHandler(signal) {
  console.log(`==>Received event: ${signal}<==`);
  const { SIGINT, SIGTERM } = signals;
  if (signal === SIGINT || signal === SIGTERM) {
    await db.close();
    process.exit(0);
  }
}

if (process.env.REGISTER_SIGNAL_HANDLERS === "true") {
  process.on("SIGHUP", signalHandler);
  process.on("SIGTERM", signalHandler);
  process.on("SIGINT", signalHandler);
}

//=======>MEMORY USAGE <========
const memoryUsage = process.memoryUsage();

// Retrieve the heap statistics
const heapStatistics = v8.getHeapStatistics();

// Compute the available heap size
const availableHeapSize = heapStatistics.heap_size_limit - memoryUsage.heapUsed;

console.log(
  `Available heap size: ${bytesToMBConversion(availableHeapSize)} MB`
);

function bytesToMBConversion(bytes) {
  return Math.round((bytes / 1024 / 1024) * 100) / 100;
}
