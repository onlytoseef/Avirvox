import Decimal from "decimal.js";
import { z } from "zod";
import { isValidAddress, isValidTxHash } from "./addresses";

const emailSchema = z.string().trim().toLowerCase().email("Enter a valid email");
const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(200, "Password is too long");

export const registerSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export const signupStartSchema = z.object({
  email: emailSchema,
});

export const signupCompleteSchema = z.object({
  email: emailSchema,
  code: z
    .string()
    .trim()
    .regex(/^\d{6}$/, "Enter the 6-digit code from your email"),
  password: passwordSchema,
});

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Password is required").max(200),
});

export const verifyEmailSchema = z.object({
  token: z.string().min(20, "Invalid token").max(200),
});

export const paymentAssetSchema = z.enum(["BNB", "USDT", "USDC"]);

const amountSchema = z
  .string()
  .trim()
  .regex(/^\d+(\.\d+)?$/, "Enter a valid amount")
  .refine((value) => {
    try {
      return new Decimal(value).gt(0);
    } catch {
      return false;
    }
  }, "Amount must be greater than 0");

export const purchaseSchema = z.object({
  asset: paymentAssetSchema,
  amountPaid: amountSchema,
  walletAddress: z
    .string()
    .trim()
    .toLowerCase()
    .refine(isValidAddress, "Enter a valid BSC wallet address"),
  txHash: z
    .string()
    .trim()
    .toLowerCase()
    .refine(isValidTxHash, "Enter a valid transaction hash"),
  name: z.string().trim().min(1, "Name is required").max(120),
  email: emailSchema,
  country: z.string().trim().min(1, "Country is required").max(120),
});
