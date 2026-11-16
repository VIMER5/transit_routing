const fs = require("fs");
const path = require("path");

const INPUT = path.join(__dirname, "../routing/routing.incy.json");
const OUTPUT_DIR = path.join(__dirname, "../generated");

const BASE64_FILE = path.join(OUTPUT_DIR, "transit-lab.base64");

const LINK_FILE = path.join(OUTPUT_DIR, "transit-lab.link");

const PROFILE_NAME = "Transit LAB";

function build() {
  try {
    console.log("Building routing profile...");

    // Read source JSON
    const raw = fs.readFileSync(INPUT, "utf8");
    const config = JSON.parse(raw);

    // Basic validation
    if (!config.Name) {
      throw new Error("Missing profile Name");
    }

    // Encode JSON to Base64
    const base64 = Buffer.from(JSON.stringify(config), "utf8").toString("base64");

    const link = `incy://routing/add/${base64}`;

    // Create output directory
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });

    // Write generated files
    fs.writeFileSync(BASE64_FILE, base64);
    fs.writeFileSync(LINK_FILE, link);

    console.log("Build completed!");
    console.log(`Profile: ${config.Name}`);
    console.log(`Base64: ${BASE64_FILE}`);
    console.log(`Happ link: ${LINK_FILE}`);
    console.log(`Base64 length: ${base64.length}`);
  } catch (error) {
    console.error("Build failed:", error.message);
    process.exitCode = 1;
  }
}

build();
