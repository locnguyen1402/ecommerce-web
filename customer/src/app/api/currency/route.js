import currency from "./currency.json";
import { NextResponse, NextRequest } from "next/server";

export async function GET() {
  return NextResponse.json(currency);
}
