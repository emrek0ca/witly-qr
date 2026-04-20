import { iyzicoRequest } from "@/server/iyzico/client";

export type CreatePaymentLinkInput = {
  name: string;
  description?: string;
  price: string;
  currencyCode: "TRY";
  callbackUrl: string;
};

export type CreatePaymentLinkResponse = {
  status: string;
  token?: string;
  url?: string;
  errorCode?: string;
  errorMessage?: string;
  errorGroup?: string;
  systemTime?: number;
};

export async function createPaymentLink(input: CreatePaymentLinkInput) {
  return await iyzicoRequest<CreatePaymentLinkResponse>({
    path: "/v2/payment/link/create",
    body: {
      name: input.name,
      description: input.description,
      price: input.price,
      currencyCode: input.currencyCode,
      callbackUrl: input.callbackUrl,
    },
  });
}
