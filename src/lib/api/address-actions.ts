"use server";

import { revalidatePath } from "next/cache";
import {
  createAddress,
  updateAddress,
  deleteAddress,
} from "./addresses";

export async function createAddressAction(data: {
  street: string;
  city: string;
  state: string;
  zip_code: string;
  country: string;
}) {
  await createAddress(data);
  revalidatePath("/account/addresses");
}

export async function updateAddressAction(
  id: number,
  data: {
    street: string;
    city: string;
    state: string;
    zip_code: string;
    country: string;
  },
) {
  await updateAddress(id, data);
  revalidatePath("/account/addresses");
}

export async function deleteAddressAction(id: number) {
  await deleteAddress(id);
  revalidatePath("/account/addresses");
}
