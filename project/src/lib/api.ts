import { supabase, Speaker, Volunteer } from "./supabase";

export const speakersApi = {
  async getAll(): Promise<Speaker[]> {
    const { data, error } = await supabase
      .from("speakers")
      .select("*")
      .order("sort_order");

    if (error) throw error;
    return data || [];
  },

  async getById(id: string): Promise<Speaker | null> {
    const { data, error } = await supabase
      .from("speakers")
      .select("*")
      .eq("id", id)
      .maybeSingle();

    if (error) throw error;
    return data;
  },

  async create(speaker: Omit<Speaker, "id" | "created_at">): Promise<Speaker> {
    const { data, error } = await supabase
      .from("speakers")
      .insert([speaker])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async insertMany(
    speakers: Omit<Speaker, "id" | "created_at">[]
  ): Promise<Speaker[]> {
    const { data, error } = await supabase
      .from("speakers")
      .insert(speakers)
      .select();

    if (error) throw error;
    return data || [];
  },

  async update(
    id: string,
    speaker: Partial<Omit<Speaker, "id" | "created_at">>
  ): Promise<Speaker> {
    const { data, error } = await supabase
      .from("speakers")
      .update(speaker)
      .eq("id", id)
      .select()
      .maybeSingle();

    if (error) {
      console.error("Update error:", error);
      throw error;
    }
    if (!data) {
      throw new Error("No speaker found with that ID");
    }
    return data;
  },

  async delete(id: string): Promise<void> {
    console.log("Deleting speaker with ID:", id);
    const { data, error, count } = await supabase
      .from("speakers")
      .delete()
      .eq("id", id)
      .select();

    console.log("Delete result:", { data, error, count });
    if (error) {
      console.error("Delete error:", error);
      throw error;
    }
  },
};

export const volunteersApi = {
  async getAll(): Promise<Volunteer[]> {
    const { data, error } = await supabase
      .from("volunteers")
      .select("*")
      .order("sort_order");

    if (error) throw error;
    return data || [];
  },

  async create(
    volunteer: Omit<Volunteer, "id" | "created_at">
  ): Promise<Volunteer> {
    const { data, error } = await supabase
      .from("volunteers")
      .insert([volunteer])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async insertMany(
    volunteers: Omit<Volunteer, "id" | "created_at">[]
  ): Promise<Volunteer[]> {
    const { data, error } = await supabase
      .from("volunteers")
      .insert(volunteers)
      .select();

    if (error) throw error;
    return data || [];
  },

  async upsert(
    volunteer: Omit<Volunteer, "id" | "created_at">
  ): Promise<Volunteer> {
    const { data, error } = await supabase
      .from("volunteers")
      .upsert([volunteer], { onConflict: "email" })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async update(
    id: string,
    volunteer: Partial<Omit<Volunteer, "id" | "created_at">>
  ): Promise<Volunteer> {
    const { data, error } = await supabase
      .from("volunteers")
      .update(volunteer)
      .eq("id", id)
      .select()
      .maybeSingle();

    if (error) {
      console.error("Update error:", error);
      throw error;
    }
    if (!data) {
      throw new Error("No volunteer found with that ID");
    }
    return data;
  },

  async delete(id: string): Promise<void> {
    console.log("Deleting volunteer with ID:", id);
    const { data, error, count } = await supabase
      .from("volunteers")
      .delete()
      .eq("id", id)
      .select();

    console.log("Delete result:", { data, error, count });
    if (error) {
      console.error("Delete error:", error);
      throw error;
    }
  },
};
