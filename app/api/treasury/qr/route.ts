import { connection, NextResponse } from "next/server";
import QRCode from "qrcode";
import { chainConfig } from "@/lib/server/chain-config";

export async function GET() {
  await connection();

  const png = await QRCode.toBuffer(chainConfig.treasuryAddress, {
    type: "png",
    width: 320,
    margin: 1,
    errorCorrectionLevel: "M",
  });

  return new NextResponse(new Uint8Array(png), {
    headers: {
      "content-type": "image/png",
      "cache-control": "public, max-age=86400, immutable",
    },
  });
}
