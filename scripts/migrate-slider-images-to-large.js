"use strict";

require("dotenv").config();
const path = require("path");
const fs = require("fs").promises;

// Load app models
const db = require("../src/models");
const SliderBanner = db.SliderBanner;
const storageConfig = require("../src/configs/storage.config");

async function migrate() {
  try {
    const uploadDir = storageConfig.local.uploadDir.replace(/^\.\//, "");
    const publicUrl = storageConfig.local.publicUrl.replace(/\/$/, "");

    // Find slider records with medium images
    const sliders = await SliderBanner.findAll({
      where: {
        image: {
          [db.Sequelize.Op.like]: "%_medium.%",
        },
      },
    });

    console.log(`Found ${sliders.length} slider(s) with _medium images`);

    let updated = 0;
    for (const s of sliders) {
      const imageUrl = s.image || "";
      const parts = imageUrl.split("/uploads/");
      if (parts.length < 2) {
        console.log(`Skipping (no /uploads/): ${imageUrl}`);
        continue;
      }

      const publicId = parts[1];
      const largePublicId = publicId.replace("_medium", "_large");
      const largeFilePath = path.join(uploadDir, largePublicId);

      try {
        await fs.access(largeFilePath);
        const newUrl = `${publicUrl}/uploads/${largePublicId}`;
        await s.update({ image: newUrl });
        updated++;
        console.log(`Updated slider ${s.id}: ${imageUrl} -> ${newUrl}`);
      } catch (err) {
        console.log(
          `Large file not found for slider ${s.id}: ${largeFilePath}`
        );
      }
    }

    console.log(`Migration complete. Updated ${updated} record(s).`);
    process.exit(0);
  } catch (err) {
    console.error("Migration failed:", err.message);
    process.exit(1);
  }
}

migrate();
