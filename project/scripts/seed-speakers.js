import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY
);

const speakers = [
  {
    name: "John Smith",
    title: "Senior Cloud Architect",
    organization: "AWS",
    talk_title: "Building Scalable Applications with AWS Lambda",
    abstract:
      "Learn how to build serverless applications that scale automatically with AWS Lambda and other serverless services.",
    bio: "John has 10+ years of experience in cloud architecture and has helped hundreds of companies migrate to AWS.",
    photo_url:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    linkedin_url: "https://linkedin.com/in/johnsmith",
    twitter_url: "https://twitter.com/johnsmith",
    github_url: "https://github.com/johnsmith",
    talk_length_minutes: 45,
    sort_order: 1,
  },
  {
    name: "Sarah Johnson",
    title: "DevOps Engineer",
    organization: "Microsoft",
    talk_title: "CI/CD Best Practices with AWS CodePipeline",
    abstract:
      "Discover how to implement robust CI/CD pipelines using AWS CodePipeline, CodeBuild, and CodeDeploy.",
    bio: "Sarah is a DevOps expert with experience in automating deployment processes for enterprise applications.",
    photo_url:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
    linkedin_url: "https://linkedin.com/in/sarahjohnson",
    twitter_url: null,
    github_url: null,
    talk_length_minutes: 30,
    sort_order: 2,
  },
  {
    name: "Mike Chen",
    title: "Data Engineer",
    organization: "Google",
    talk_title: "Real-time Analytics with AWS Kinesis",
    abstract:
      "Build real-time data processing pipelines using AWS Kinesis Data Streams and Kinesis Analytics.",
    bio: "Mike specializes in big data solutions and has implemented data lakes for Fortune 500 companies.",
    photo_url:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    linkedin_url: null,
    twitter_url: "https://twitter.com/mikechen",
    github_url: "https://github.com/mikechen",
    talk_length_minutes: 45,
    sort_order: 3,
  },
  {
    name: "Emily Davis",
    title: "Security Architect",
    organization: "Cloudflare",
    talk_title: "AWS Security Best Practices",
    abstract:
      "Learn essential security practices for AWS including IAM, VPC security, and compliance frameworks.",
    bio: "Emily is a cybersecurity expert focused on cloud security and compliance in regulated industries.",
    photo_url:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
    linkedin_url: "https://linkedin.com/in/emilydavis",
    twitter_url: null,
    github_url: null,
    talk_length_minutes: 60,
    sort_order: 4,
  },
];

async function seedSpeakers() {
  try {
    // Check existing speakers by name
    const { data: existing } = await supabase
      .from("speakers")
      .select("name")
      .in(
        "name",
        speakers.map((s) => s.name)
      );

    const existingNames = existing?.map((s) => s.name) || [];
    const existingSpeakers = speakers.filter((s) =>
      existingNames.includes(s.name)
    );
    const newSpeakers = speakers.filter((s) => !existingNames.includes(s.name));

    // Show existing speakers
    if (existingSpeakers.length > 0) {
      console.log(`\nFound ${existingSpeakers.length} existing speakers:`);
      existingSpeakers.forEach((s) => {
        console.log(`   - ${s.name} (${s.organization})`);
      });
    }

    if (newSpeakers.length === 0) {
      console.log("\nAll speakers already exist in database");
      return;
    }

    const { data, error } = await supabase.from("speakers").insert(newSpeakers);

    if (error) {
      console.error("Error inserting speakers:", error);
      return;
    }

    console.log(`\nSuccessfully inserted ${newSpeakers.length} new speakers:`);
    newSpeakers.forEach((s) => {
      console.log(`   + ${s.name} (${s.organization})`);
    });
  } catch (error) {
    console.error("Script error:", error);
  }
}

seedSpeakers();
