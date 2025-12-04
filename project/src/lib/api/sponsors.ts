import { Sponsor } from "../supabase";
import { createCrudApi } from "./base";

export const sponsorsApi = createCrudApi<Sponsor>("sponsors");
