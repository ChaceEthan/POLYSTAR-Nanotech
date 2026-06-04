"use client";

import { QRCodeSVG } from "qrcode.react";
import { siteConfig } from "@/lib/constants";

export function QrCodeCard() {
  return (
    <div className="rounded-lg border border-white/15 bg-white p-3 text-polystar-dark">
      <QRCodeSVG value={siteConfig.qrCompanyProfileUrl} size={128} includeMargin level="M" />
      <p className="mt-2 text-center text-xs font-semibold">Company Profile</p>
    </div>
  );
}
