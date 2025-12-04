#!/usr/bin/env node
/*
Simple script to insert a speaker into Supabase using the service role key.

Usage:
  1. Add these lines to your project `.env` (do NOT commit this file):
     SUPABASE_URL=https://xyzcompany.supabase.co
     SUPABASE_SERVICE_ROLE=eyJ....

  2. Prepare a JSON file describing the speaker, e.g. `scripts/example-speaker.json`.

  3. Run:
     node ./scripts/add-speaker.js ./scripts/example-speaker.json

This script uses the service role key, so keep the `.env` file secret.
*/

import fs from "fs";
import path from "path";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceRole = process.env.SUPABASE_SERVICE_ROLE;

if (!supabaseUrl || !supabaseServiceRole) {
  console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE in .env");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceRole);

async function main() {
  const arg = process.argv[2];
  if (!arg) {
    console.error("Usage: node add-speaker.js <path-to-speaker-json>");
    process.exit(1);
  }

  const filePath = path.resolve(process.cwd(), arg);
  if (!fs.existsSync(filePath)) {
    console.error("File not found:", filePath);
    process.exit(1);
  }

  let raw;
  try {
    raw = fs.readFileSync(filePath, "utf-8");
  } catch (err) {
    console.error("Failed to read file:", err);
    process.exit(1);
  }

  let speaker;
  try {
    speaker = JSON.parse(raw);
  } catch (err) {
    console.error("Invalid JSON:", err);
    process.exit(1);
  }

  // Basic validation
  if (!speaker.name || !speaker.talk_title) {
    console.error("Speaker must include at least `name` and `talk_title`.");
    process.exit(1);
  }

  try {
    const { data, error } = await supabase
      .from("speakers")
      .insert([speaker])
      .select();
    if (error) {
      console.error("Supabase error:", error);
      process.exit(1);
    }
    console.log("Inserted speaker:", JSON.stringify(data, null, 2));
  } catch (err) {
    console.error("Unexpected error:", err);
    process.exit(1);
  }
}

main();
