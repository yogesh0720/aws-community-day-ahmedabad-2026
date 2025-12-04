import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY
);

const volunteers = [
  {
    name: "Priya Sharma",
    email: "priya.sharma@email.com",
    phone: "+91 98765 43210",
    role: "Registration Desk",
    experience_level: "experienced",
    availability: ["Event Day (Dec 13)", "Day Before (Dec 12)"],
    motivation:
      "I love helping organize tech events and want to contribute to the AWS community in Gujarat.",
    photo_url:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
    linkedin_url: "https://linkedin.com/in/priyasharma",
    twitter_url: null,
    github_url: null,
    sort_order: 1,
  },
  {
    name: "Rahul Patel",
    email: "rahul.patel@email.com",
    phone: "+91 87654 32109",
    role: "Speaker Support",
    experience_level: "event-organizer",
    availability: ["Event Day (Dec 13)"],
    motivation:
      "As a cloud architect, I want to support speakers and help make their presentations successful.",
    photo_url:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    linkedin_url: "https://linkedin.com/in/rahulpatel",
    twitter_url: "https://twitter.com/rahulpatel",
    github_url: "https://github.com/rahulpatel",
    sort_order: 2,
  },
  {
    name: "Anjali Mehta",
    email: "anjali.mehta@email.com",
    phone: null,
    role: "Photography/Video",
    experience_level: "experienced",
    availability: ["Event Day (Dec 13)", "Day After (Dec 14)"],
    motivation:
      "I'm passionate about capturing memorable moments at tech events and creating content for the community.",
    photo_url:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
    linkedin_url: null,
    twitter_url: "https://twitter.com/anjalimehta",
    github_url: null,
    sort_order: 3,
  },
  {
    name: "Kiran Shah",
    email: "kiran.shah@email.com",
    phone: "+91 76543 21098",
    role: "Social Media",
    experience_level: "first-time",
    availability: ["Event Day (Dec 13)"],
    motivation:
      "I want to help promote the event on social media and engage with the AWS community online.",
    photo_url:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    linkedin_url: "https://linkedin.com/in/kiranshah",
    twitter_url: null,
    github_url: null,
    sort_order: 4,
  },
  {
    name: "Yogesh Nayi",
    email: "yogeshnayi7@email.com",
    phone: "+91 9510550720",
    role: "Venue Setup",
    experience_level: "experienced",
    availability: ["Day Before (Dec 12)", "Event Day (Dec 13)"],
    motivation:
      "I enjoy the behind-the-scenes work that makes events successful and want to contribute my organizational skills.",
    photo_url: "https://avatars.githubusercontent.com/u/3468283?v=4",
    linkedin_url: "https://www.linkedin.com/in/yogeshnayi/",
    twitter_url: null,
    github_url: "https://github.com/yogeshnayi",
    sort_order: 5,
  },
];

async function seedVolunteers() {
  try {
    // Check existing emails
    const { data: existing } = await supabase
      .from("volunteers")
      .select("email")
      .in(
        "email",
        volunteers.map((v) => v.email)
      );

    const existingEmails = existing?.map((v) => v.email) || [];
    const existingVolunteers = volunteers.filter((v) =>
      existingEmails.includes(v.email)
    );
    const newVolunteers = volunteers.filter(
      (v) => !existingEmails.includes(v.email)
    );

    // Show existing volunteers
    if (existingVolunteers.length > 0) {
      console.log(`\nFound ${existingVolunteers.length} existing volunteers:`);
      existingVolunteers.forEach((v) => {
        console.log(`   - ${v.name} (${v.email})`);
      });
    }

    if (newVolunteers.length === 0) {
      console.log("\nAll volunteers already exist in database");
      return;
    }

    const { data, error } = await supabase
      .from("volunteers")
      .insert(newVolunteers);

    if (error) {
      console.error("Error inserting volunteers:", error);
      return;
    }

    console.log(
      `\nSuccessfully inserted ${newVolunteers.length} new volunteers:`
    );
    newVolunteers.forEach((v) => {
      console.log(`   + ${v.name} (${v.email})`);
    });
  } catch (error) {
    console.error("Script error:", error);
  }
}

seedVolunteers();
