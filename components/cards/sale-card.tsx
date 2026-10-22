"use client";

import { Fragment, useEffect, useState, type CSSProperties } from "react";
import Image from "next/image";
import { FiArrowRight, FiChevronDown } from "react-icons/fi";
import {
  paymentAssets,
  saleCardContent,
} from "@/lib/content/sale-card";

const saleOpensAt = Date.UTC(2026, 10, 15);

function getCountdown() {
  const remainingSeconds = Math.max(0, Math.floor((saleOpensAt - Date.now()) / 1000));
  return [
    [Math.floor(remainingSeconds / 86400), "Days"],
    [Math.floor((remainingSeconds % 86400) / 3600), "Hours"],
    [Math.floor((remainingSeconds % 3600) / 60), "Mins"],
    [remainingSeconds % 60, "Sec"],
  ] as const;
}

// Keep the sale panel legible while limiting its height on shorter screens.
const q = (n: number) => {
  const fluid = `${((n / 800) * 100).toFixed(3)}cqw`;
  const minimum = `${(n * 0.63).toFixed(2)}px`;
  return n < 0 ? `min(${fluid}, ${minimum})` : `max(${fluid}, ${minimum})`;
};

const fs = (n: number): CSSProperties => ({
  fontSize: `max(${q(n)}, ${n >= 20 ? `${(n * 0.7).toFixed(1)}px` : "11px"})`,
});

function Chevron({ size = 12 }: { size?: number }) {
  return (
    <FiChevronDown
      aria-hidden="true"
      strokeWidth={2}
      className="shrink-0"
      style={{ width: q(size), height: q(size) }}
    />
  );
}

export function SaleCard() {
  const [countdown, setCountdown] = useState<ReturnType<typeof getCountdown> | null>(null);

  useEffect(() => {
    const updateCountdown = () => setCountdown(getCountdown());
    updateCountdown();
    const interval = window.setInterval(updateCountdown, 1000);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <div
      className="w-full min-w-0 max-w-[615px]"
      style={{ containerType: "inline-size" }}
    >
      <div
        className="bg-gradient-to-b from-[#f08a24] via-[#5a2a6e] to-[#a63de8] p-px shadow-[0_25px_100px_#0008]"
        style={{ borderRadius: q(40) }}
      >
        <div
          className="bg-[#05030a] text-white"
          style={{ borderRadius: q(39), padding: `${q(38)} ${q(32)}` }}
        >
          <div className="flex items-center justify-between">
            <div
              className="inline-flex items-center bg-[#1f1d26] font-medium uppercase"
              style={{
                ...fs(14),
                height: q(33),
                padding: `0 ${q(12)}`,
                gap: q(10),
                borderRadius: q(10),
              }}
            >
              {saleCardContent.round}
              <Chevron />
            </div>
            <div
              className="inline-flex items-center bg-[#26232d] font-medium uppercase"
              style={{
                ...fs(14),
                height: q(33),
                padding: `0 ${q(15)}`,
                borderRadius: q(10),
              }}
            >
              {saleCardContent.status}
            </div>
          </div>

          <p
            className="bg-gradient-to-r from-[#f26d6a] via-[#e2469b] to-[#a845e2] bg-clip-text font-bold uppercase tracking-[0.02em] text-transparent"
            style={{ ...fs(18), marginTop: q(21), lineHeight: q(24) }}
          >
            {saleCardContent.countdownTitle}
          </p>

          <div
            className="flex items-center justify-between bg-[#24212b]"
            style={{
              marginTop: q(19),
              height: q(83),
              padding: `0 ${q(28)}`,
              borderRadius: q(14),
            }}
            aria-label="Countdown to 15 November 2026 at 00:00 UTC"
          >
            {(countdown ?? [["--", "Days"], ["--", "Hours"], ["--", "Mins"], ["--", "Sec"]]).map(([value, label], index) => (
              <Fragment key={label}>
                {index > 0 && (
                  <span
                    aria-hidden="true"
                    className="bg-[#6a6573]"
                    style={{ width: 1, height: q(57) }}
                  />
                )}
                <div className="text-center">
                  <strong
                    className="block font-bold"
                    style={{ ...fs(40), lineHeight: q(40) }}
                  >
                    {typeof value === "number" ? String(value).padStart(2, "0") : value}
                  </strong>
                  <span
                    className="block font-semibold"
                    style={{ ...fs(20), lineHeight: q(20), marginTop: q(-3) }}
                  >
                    {label}
                  </span>
                </div>
              </Fragment>
            ))}
          </div>

          <div
            className="bg-white/75"
            style={{ marginTop: q(22), height: 1 }}
          />

          <div
            className="flex items-center justify-between"
            style={{ ...fs(15), marginTop: q(26), marginInline: q(-10) }}
          >
            <div style={{ lineHeight: q(22) }}>
              <span className="block text-[#cdc8d4]">
                {saleCardContent.currentRoundLabel}
              </span>
              <b
                className="block font-medium"
                style={{ marginTop: q(6) }}
              >
                {saleCardContent.round}
              </b>
              <span
                className="block text-[#ff9a1f]"
                style={{ marginTop: q(6) }}
              >
                {saleCardContent.currentRoundPrice}
              </span>
            </div>
            <FiArrowRight
              aria-hidden="true"
              strokeWidth={1.8}
              style={{ width: q(16), height: q(16) }}
            />
            <div className="text-right" style={{ lineHeight: q(22) }}>
              <span className="block text-[#cdc8d4]">
                {saleCardContent.nextRoundLabel}
              </span>
              <b
                className="block font-medium"
                style={{ marginTop: q(6) }}
              >
                {saleCardContent.nextRound}
              </b>
              <span
                className="block text-[#ff9a1f]"
                style={{ marginTop: q(6) }}
              >
                {saleCardContent.nextRoundPrice}
              </span>
            </div>
          </div>

          <div
            className="inline-flex items-center font-medium"
            style={{
              ...fs(15),
              marginTop: q(25),
              marginLeft: q(2),
              gap: q(8),
              lineHeight: q(22),
            }}
          >
            View All Rounds
            <Chevron size={13} />
          </div>

          <div
            className="overflow-hidden rounded-full bg-[#dcd9df]"
            style={{ marginTop: q(19), height: q(7) }}
            role="progressbar"
            aria-label={saleCardContent.progressLabel}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={0}
          >
            <div className="h-full w-0 rounded-full bg-gradient-to-r from-[#ee6a2a] via-[#e2469b] to-[#a845e2]" />
          </div>

          <div
            className="flex justify-between text-[#9a95a3]"
            style={{ marginTop: q(19), marginInline: q(-10), lineHeight: q(20) }}
          >
            <span style={fs(14)}>{saleCardContent.progressAmount}</span>
            <span style={fs(13)}>{saleCardContent.progressFilled}</span>
          </div>

          <div
            className="flex items-center rounded-full border border-[#4b4654]"
            style={{
              ...fs(15),
              marginTop: q(16),
              height: q(48),
              paddingLeft: q(20),
              gap: q(18),
            }}
          >
            <Image
              src="/assets/icons/cryptocurrency-color_bnb.png"
              alt=""
              width={22}
              height={22}
              className="shrink-0"
              style={{ width: q(22), height: q(22) }}
            />
            <span className="text-[#e0dce4]">{saleCardContent.networkLabel}</span>
            <b className="font-medium">{saleCardContent.network}</b>
          </div>

          <p
            className="text-[#e0dce4]"
            style={{ ...fs(15), marginTop: q(27), lineHeight: q(22) }}
          >
            {saleCardContent.paymentLabel}
          </p>

          <div
            className="grid grid-cols-3"
            style={{ marginTop: q(19), gap: q(23), marginRight: q(-13) }}
          >
            {paymentAssets.map(({ name, icon }) => (
              <div
                key={name}
                className="flex items-center justify-center rounded-full border border-[#4b4654] font-medium"
                style={{ ...fs(15), height: q(48), gap: q(10) }}
              >
                <Image
                  src={icon}
                  alt=""
                  width={22}
                  height={22}
                  className="shrink-0"
                  style={{ width: q(22), height: q(22) }}
                />
                {name}
              </div>
            ))}
          </div>

          <p
            className="text-[#e0dce4]"
            style={{ ...fs(15), marginTop: q(26), lineHeight: q(22) }}
          >
            {saleCardContent.amountLabel}
          </p>

          <div
            className="flex items-center rounded-full border border-[#4b4654] font-medium"
            style={{
              ...fs(15),
              marginTop: q(26),
              height: q(48),
              paddingLeft: q(20),
            }}
          >
            {saleCardContent.paymentPlaceholder}
          </div>

          <div
            className="flex items-center justify-between bg-[#1e1b3f]"
            style={{
              ...fs(15),
              marginTop: q(24),
              height: q(53),
              padding: `0 ${q(18)}`,
              borderRadius: q(14),
            }}
          >
            <span className="text-[#d4cfe6]">{saleCardContent.receiveLabel}</span>
            <span className="font-medium">{saleCardContent.receiveAmount}</span>
          </div>

          <div
            className="flex items-start"
            style={{ marginTop: q(22), marginLeft: q(-1) }}
          >
            <Image
              src="/assets/icons/shield.png"
              alt=""
              width={22}
              height={25}
              className="shrink-0 object-contain"
              style={{ width: q(22), height: q(25), marginRight: q(25) }}
            />
            <p
              className="text-[#d8d2de]"
              style={{ ...fs(14), lineHeight: q(18) }}
            >
              {saleCardContent.notice}
            </p>
          </div>

          <button
            type="button"
            disabled
            className="flex w-full cursor-not-allowed items-center justify-center rounded-full bg-gradient-to-b from-[#f8861f] via-[#e44a8c] to-[#a63de8] font-medium text-white opacity-50 shadow-[inset_0_1px_#ffffff40]"
            style={{ ...fs(17), marginTop: q(22), height: q(53) }}
          >
            {saleCardContent.actionLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
