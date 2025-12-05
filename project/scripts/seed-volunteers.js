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
    experience_level: "advanced",
    availability: ["Event Day (Dec 13)", "Day Before (Dec 12)"],
    motivation:
      "I love helping organize tech events and want to contribute to the AWS community in Gujarat.",
    photo_url:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
    linkedin_url: "https://linkedin.com/in/priyasharma",
    twitter_url: null,
    github_url: null,
  },
  {
    name: "Rahul Patel",
    email: "rahul.patel@email.com",
    phone: "+91 87654 32109",
    role: "Speaker Support",
    experience_level: "intermediate",
    availability: ["Event Day (Dec 13)"],
    motivation:
      "As a cloud architect, I want to support speakers and help make their presentations successful.",
    photo_url:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    linkedin_url: "https://linkedin.com/in/rahulpatel",
    twitter_url: "https://twitter.com/rahulpatel",
    github_url: "https://github.com/rahulpatel",
  },
  {
    name: "Anjali Mehta",
    email: "anjali.mehta@email.com",
    phone: null,
    role: "Photography/Video",
    experience_level: "advanced",
    availability: ["Event Day (Dec 13)", "Day After (Dec 14)"],
    motivation:
      "I'm passionate about capturing memorable moments at tech events and creating content for the community.",
    photo_url:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
    linkedin_url: null,
    twitter_url: "https://twitter.com/anjalimehta",
    github_url: null,
  },
  {
    name: "Kiran Shah",
    email: "kiran.shah@email.com",
    phone: "+91 76543 21098",
    role: "Social Media",
    experience_level: "beginner",
    availability: ["Event Day (Dec 13)"],
    motivation:
      "I want to help promote the event on social media and engage with the AWS community online.",
    photo_url:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    linkedin_url: "https://linkedin.com/in/kiranshah",
    twitter_url: null,
    github_url: null,
  },
  {
    name: "Yogesh Nayi",
    email: "yogeshnayi7@email.com",
    phone: "+91 9510550720",
    role: "Venue Setup",
    experience_level: "advanced",
    availability: ["Day Before (Dec 12)", "Event Day (Dec 13)"],
    motivation:
      "I enjoy the behind-the-scenes work that makes events successful and want to contribute my organizational skills.",
    photo_url: "https://avatars.githubusercontent.com/u/3468283?v=4",
    linkedin_url: "https://www.linkedin.com/in/yogeshnayi/",
    twitter_url: null,
    github_url: "https://github.com/yogeshnayi",
  },
  {
    name: "Amit Kumar",
    email: "amit.kumar@email.com",
    phone: "+91 98765 12345",
    role: "Event Day Support",
    experience_level: "intermediate",
    availability: ["Event Day (Dec 13)"],
    motivation: "I want to help make this event a success and learn from the community.",
    photo_url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
    linkedin_url: "https://linkedin.com/in/amitkumar",
    twitter_url: null,
    github_url: "https://github.com/amitkumar"
  },
  {
    name: "Sneha Joshi",
    email: "sneha.joshi@email.com",
    phone: "+91 87654 98765",
    role: "Registration Desk",
    experience_level: "beginner",
    availability: ["Event Day (Dec 13)", "Day Before (Dec 12)"],
    motivation: "First time volunteering at a tech event, excited to contribute!",
    photo_url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face",
    linkedin_url: "https://linkedin.com/in/snehajoshi",
    twitter_url: "https://twitter.com/snehajoshi",
    github_url: null
  },
  {
    name: "Vikram Singh",
    email: "vikram.singh@email.com",
    phone: "+91 76543 87654",
    role: "Logistics",
    experience_level: "advanced",
    availability: ["Day Before (Dec 12)", "Event Day (Dec 13)", "Day After (Dec 14)"],
    motivation: "Experienced in event logistics, want to ensure smooth operations.",
    photo_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    linkedin_url: "https://linkedin.com/in/vikramsingh",
    twitter_url: null,
    github_url: "https://github.com/vikramsingh"
  },
  {
    name: "Pooja Agarwal",
    email: "pooja.agarwal@email.com",
    phone: null,
    role: "Social Media",
    experience_level: "intermediate",
    availability: ["Event Day (Dec 13)"],
    motivation: "Love creating content and engaging with tech communities online.",
    photo_url: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
    linkedin_url: "https://linkedin.com/in/poojaagarwal",
    twitter_url: "https://twitter.com/poojaagarwal",
    github_url: null
  },
  {
    name: "Ravi Gupta",
    email: "ravi.gupta@email.com",
    phone: "+91 65432 10987",
    role: "Speaker Support",
    experience_level: "advanced",
    availability: ["Event Day (Dec 13)"],
    motivation: "Want to help speakers deliver their best presentations.",
    photo_url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    linkedin_url: "https://linkedin.com/in/ravigupta",
    twitter_url: null,
    github_url: "https://github.com/ravigupta"
  },
  {
    name: "Neha Verma",
    email: "neha.verma@email.com",
    phone: "+91 54321 09876",
    role: "Photography/Video",
    experience_level: "beginner",
    availability: ["Event Day (Dec 13)"],
    motivation: "Passionate about photography and want to capture event memories.",
    photo_url: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
    linkedin_url: null,
    twitter_url: "https://twitter.com/nehaverma",
    github_url: null
  },
  {
    name: "Arjun Reddy",
    email: "arjun.reddy@email.com",
    phone: "+91 43210 98765",
    role: "Venue Setup",
    experience_level: "intermediate",
    availability: ["Day Before (Dec 12)", "Event Day (Dec 13)"],
    motivation: "Enjoy setting up events and ensuring everything runs smoothly.",
    photo_url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
    linkedin_url: "https://linkedin.com/in/arjunreddy",
    twitter_url: null,
    github_url: "https://github.com/arjunreddy"
  },
  {
    name: "Kavya Nair",
    email: "kavya.nair@email.com",
    phone: "+91 32109 87654",
    role: "Accessibility Support",
    experience_level: "advanced",
    availability: ["Event Day (Dec 13)"],
    motivation: "Passionate about making tech events inclusive for everyone.",
    photo_url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face",
    linkedin_url: "https://linkedin.com/in/kavyanair",
    twitter_url: "https://twitter.com/kavyanair",
    github_url: null
  },
  {
    name: "Rohit Sharma",
    email: "rohit.sharma@email.com",
    phone: "+91 21098 76543",
    role: "Event Day Support",
    experience_level: "beginner",
    availability: ["Event Day (Dec 13)"],
    motivation: "New to AWS but eager to help and learn from the community.",
    photo_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    linkedin_url: "https://linkedin.com/in/rohitsharma",
    twitter_url: null,
    github_url: null
  },
  {
    name: "Divya Iyer",
    email: "divya.iyer@email.com",
    phone: null,
    role: "Registration Desk",
    experience_level: "intermediate",
    availability: ["Event Day (Dec 13)", "Day Before (Dec 12)"],
    motivation: "Love interacting with people and helping them get settled at events.",
    photo_url: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
    linkedin_url: "https://linkedin.com/in/divyaiyer",
    twitter_url: "https://twitter.com/divyaiyer",
    github_url: "https://github.com/divyaiyer"
  },
  {
    name: "Manish Jain",
    email: "manish.jain@email.com",
    phone: "+91 10987 65432",
    role: "Logistics",
    experience_level: "advanced",
    availability: ["Day Before (Dec 12)", "Event Day (Dec 13)"],
    motivation: "Experienced in managing large events and ensuring smooth logistics.",
    photo_url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    linkedin_url: "https://linkedin.com/in/manishjain",
    twitter_url: null,
    github_url: "https://github.com/manishjain"
  },
  {
    name: "Sanya Kapoor",
    email: "sanya.kapoor@email.com",
    phone: "+91 09876 54321",
    role: "Social Media",
    experience_level: "beginner",
    availability: ["Event Day (Dec 13)"],
    motivation: "Want to help promote AWS community and share event highlights.",
    photo_url: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
    linkedin_url: null,
    twitter_url: "https://twitter.com/sanyakapoor",
    github_url: null
  },
  {
    name: "Deepak Yadav",
    email: "deepak.yadav@email.com",
    phone: "+91 98765 43210",
    role: "Speaker Support",
    experience_level: "intermediate",
    availability: ["Event Day (Dec 13)"],
    motivation: "Want to ensure speakers have everything they need for great presentations.",
    photo_url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
    linkedin_url: "https://linkedin.com/in/deepakyadav",
    twitter_url: null,
    github_url: "https://github.com/deepakyadav"
  },
  {
    name: "Ritika Malhotra",
    email: "ritika.malhotra@email.com",
    phone: "+91 87654 32109",
    role: "Photography/Video",
    experience_level: "advanced",
    availability: ["Event Day (Dec 13)", "Day After (Dec 14)"],
    motivation: "Professional photographer wanting to document this amazing AWS event.",
    photo_url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face",
    linkedin_url: "https://linkedin.com/in/ritikamalhotra",
    twitter_url: "https://twitter.com/ritikamalhotra",
    github_url: null
  },
  {
    name: "Aakash Pandey",
    email: "aakash.pandey@email.com",
    phone: "+91 76543 21098",
    role: "Venue Setup",
    experience_level: "beginner",
    availability: ["Day Before (Dec 12)"],
    motivation: "Want to contribute to the setup and learn about event organization.",
    photo_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    linkedin_url: "https://linkedin.com/in/aakashpandey",
    twitter_url: null,
    github_url: "https://github.com/aakashpandey"
  }
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

    // Insert in batches of 5 to avoid 500 errors
    const batchSize = 5;
    let insertedCount = 0;
    
    for (let i = 0; i < newVolunteers.length; i += batchSize) {
      const batch = newVolunteers.slice(i, i + batchSize);
      
      const { data, error } = await supabase
        .from("volunteers")
        .insert(batch);

      if (error) {
        console.error(`Error inserting batch ${Math.floor(i/batchSize) + 1}:`, error);
        continue;
      }
      
      insertedCount += batch.length;
      console.log(`Inserted batch ${Math.floor(i/batchSize) + 1}: ${batch.length} volunteers`);
    }

    console.log(`\nSuccessfully inserted ${insertedCount} new volunteers total`);
    newVolunteers.slice(0, insertedCount).forEach((v) => {
      console.log(`   + ${v.name} (${v.email})`);
    });
  } catch (error) {
    console.error("Script error:", error);
  }
}

seedVolunteers();
