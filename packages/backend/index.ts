import express, { type Express, type Request, type Response } from "express";
import cors from "cors";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import fs from "fs/promises";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { CreatePlantDto } from "@myplants/shared";
import { validateBody } from "./src/middleware/validate";

const app: Express = express();
app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const FILE_ENCODING = "utf8";
const FILE_PATH = path.join(__dirname, "data.json");
const PORT = process.env.PORT || 3000;

// TODO: data will be as { plants:  CreatePlantDto[], notes: CreateNoteDto[], ... } so type here has to be upated
let data = new Map<string, CreatePlantDto[]>();

const server = app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  const rawData = await fs.readFile(FILE_PATH, FILE_ENCODING);
  const parsedData = JSON.parse(rawData);
  data = new Map(Object.entries(parsedData));
});

app.get("/", (_, res: Response) => {
  res.send(JSON.stringify("Hello World!"));
});

app.get("/api/plants", (req, res) => {
  res.send(JSON.stringify(data.get("plants")));
});

app.post(
  "/api/plants",
  validateBody(CreatePlantDto),
  (req: Request<{ id: string }>, res) => {
    const plantsData = data.get("plants");

    if (!plantsData) {
      data.set("plants", []);
    }
    console.log(req.params);

    const plantById = plantsData?.find((plant) => plant.id === req.params.id);
    if (plantById && plantsData) {
      const plantIndex = plantsData?.findIndex((el) => el.id === req.params.id);

      if (!plantIndex) {
        return;
      }

      plantsData[plantIndex] = {
        ...plantById,
        name: req.body.name ?? plantById.name,
        species: req.body.species ?? plantById.name,
        placedAt: req.body.palcedAt ?? plantById.name,
        acquiredAt: req.body.acquiredAt ?? plantById.name,
      };
      res.send(JSON.stringify(data.get("plants")));
    } else {
      const plantId = uuidv4();
      plantsData?.push({
        id: plantId,
        name: req.body.name,
        species: req.body.species,
        placedAt: req.body.palcedAt,
        acquiredAt: req.body.acquiredAt,
        // TODO: add photo upload later
        // coverPhotoId: z.uuid().optional(),
        createdAt: new Date(),
      });
      res.send(JSON.stringify(plantsData));
    }
  },
);

app.delete("/api/plants/:id", (req: Request<{ id: string }>, res: Response) => {
  const plants = data.get("plants");
  if (!plants) return;

  const plantById = plants.find((plant) => plant.id === req.params.id);
  if (plantById) {
    const updatedPlants = plants.filter((plant) => plant.id !== req.params.id);
    data.set("plants", updatedPlants);
    res.send(JSON.stringify(data.get("plants")));
  } else {
    res.send(JSON.stringify("User is not found"));
  }
});

async function gracefulShutdown(signal: string) {
  console.log(`Received ${signal}. Starting graceful shutdown...`);

  const forceExitTimeout = setTimeout(() => {
    console.error("Forced shutdown initiated: Active connections hung.");
    process.exit(1);
  }, 30000);

  server.close(async (err) => {
    if (err) {
      console.error("Error during server close:", err);
      process.exit(1);
    }
    console.log("HTTP server closed. No more active connections.");

    try {
      console.log("Saving data to the file...");
      try {
        const dataObject = Object.fromEntries(data);
        if (!data || Object.keys(dataObject).length === 0) {
          console.log("No data to save");
        } else {
          const stringData = JSON.stringify(dataObject, null, 2);

          await fs.writeFile(FILE_PATH, stringData, FILE_ENCODING);

          console.log("Data successfully saved to file");
        }
      } catch (error) {
        console.error("Failed to write file:", error);
      }

      console.log("Shutdown complete.");
      clearTimeout(forceExitTimeout);
      process.exit(0);
    } catch (dbErr) {
      console.error("Error closing database:", dbErr);
      process.exit(1);
    }
  });
}

process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
process.on("SIGINT", () => gracefulShutdown("SIGINT"));
