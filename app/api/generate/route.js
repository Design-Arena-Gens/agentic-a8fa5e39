import { NextResponse } from "next/server";
import { generateScenario } from "../../../lib/generator";

export async function POST(request) {
  try {
    const { prompt } = await request.json();
    if (!prompt || typeof prompt !== "string" || !prompt.trim()) {
      return NextResponse.json({ error: "Prompt manquant" }, { status: 400 });
    }
    const data = generateScenario(prompt.trim());
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: "Erreur interne" }, { status: 500 });
  }
}
