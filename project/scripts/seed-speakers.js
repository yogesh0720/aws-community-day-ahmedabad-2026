import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY
);

const speakers = [
  {
    name: "Test Speaker",
    title: "Test Title",
    organization: "Test Org",
    talk_title: "Test Talk",
    abstract: "Test abstract",
    bio: "Test bio",
    photo_url: null,
    linkedin_url: null,
    twitter_url: null,
    github_url: null,
    talk_length_minutes: 30
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
    talk_length_minutes: 30
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
    talk_length_minutes: 45
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
    talk_length_minutes: 60
  },
  {
    name: "Sarah Wilson",
    title: "Principal Solutions Architect",
    organization: "Amazon Web Services",
    talk_title: "Serverless Architecture Patterns for Enterprise",
    abstract: "Explore advanced serverless patterns and best practices for building enterprise-grade applications on AWS.",
    bio: "Sarah has 12+ years of experience in cloud architecture and has helped Fortune 500 companies adopt serverless technologies.",
    photo_url: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
    linkedin_url: "https://linkedin.com/in/sarahwilson",
    twitter_url: "https://twitter.com/sarahwilson",
    github_url: null,
    talk_length_minutes: 45
  },
  {
    name: "Raj Patel",
    title: "Cloud Security Engineer",
    organization: "Accenture",
    talk_title: "Zero Trust Security in AWS",
    abstract: "Learn how to implement zero trust security principles in your AWS infrastructure for maximum protection.",
    bio: "Raj specializes in cloud security and has implemented zero trust architectures for multiple enterprises.",
    photo_url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    linkedin_url: "https://linkedin.com/in/rajpatel",
    twitter_url: null,
    github_url: "https://github.com/rajpatel",
    talk_length_minutes: 30
  },
  {
    name: "Lisa Chen",
    title: "Machine Learning Engineer",
    organization: "Netflix",
    talk_title: "MLOps on AWS: From Model to Production",
    abstract: "Discover how to build robust MLOps pipelines using AWS SageMaker and other ML services.",
    bio: "Lisa has built ML systems at scale and is passionate about making machine learning accessible to developers.",
    photo_url: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
    linkedin_url: "https://linkedin.com/in/lisachen",
    twitter_url: "https://twitter.com/lisachen",
    github_url: "https://github.com/lisachen",
    talk_length_minutes: 45
  },
  {
    name: "David Kumar",
    title: "DevOps Lead",
    organization: "Spotify",
    talk_title: "Container Orchestration with AWS EKS",
    abstract: "Master Kubernetes on AWS with EKS, including best practices for scaling and monitoring.",
    bio: "David leads DevOps initiatives at Spotify and has extensive experience with container technologies.",
    photo_url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
    linkedin_url: "https://linkedin.com/in/davidkumar",
    twitter_url: null,
    github_url: "https://github.com/davidkumar",
    talk_length_minutes: 60
  },
  {
    name: "Maria Rodriguez",
    title: "Data Architect",
    organization: "Airbnb",
    talk_title: "Building Data Lakes with AWS Lake Formation",
    abstract: "Learn how to build secure, scalable data lakes using AWS Lake Formation and related services.",
    bio: "Maria designs data architectures for large-scale applications and is an expert in AWS data services.",
    photo_url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face",
    linkedin_url: "https://linkedin.com/in/mariarodriguez",
    twitter_url: "https://twitter.com/mariarodriguez",
    github_url: null,
    talk_length_minutes: 45
  },
  {
    name: "James Thompson",
    title: "Solutions Architect",
    organization: "Deloitte",
    talk_title: "Cost Optimization Strategies for AWS",
    abstract: "Practical strategies and tools for optimizing AWS costs without compromising performance.",
    bio: "James helps enterprises optimize their cloud spending and has saved millions in AWS costs.",
    photo_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    linkedin_url: "https://linkedin.com/in/jamesthompson",
    twitter_url: null,
    github_url: "https://github.com/jamesthompson",
    talk_length_minutes: 30
  },
  {
    name: "Priya Sharma",
    title: "Cloud Engineer",
    organization: "Flipkart",
    talk_title: "Multi-Region Disaster Recovery on AWS",
    abstract: "Design and implement robust disaster recovery solutions across multiple AWS regions.",
    bio: "Priya has implemented DR solutions for e-commerce platforms handling millions of transactions.",
    photo_url: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
    linkedin_url: "https://linkedin.com/in/priyasharma",
    twitter_url: "https://twitter.com/priyasharma",
    github_url: null,
    talk_length_minutes: 45
  },
  {
    name: "Alex Johnson",
    title: "Platform Engineer",
    organization: "Uber",
    talk_title: "Event-Driven Architecture with AWS EventBridge",
    abstract: "Build scalable event-driven systems using AWS EventBridge and serverless technologies.",
    bio: "Alex builds platform infrastructure at Uber and specializes in event-driven architectures.",
    photo_url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    linkedin_url: "https://linkedin.com/in/alexjohnson",
    twitter_url: null,
    github_url: "https://github.com/alexjohnson",
    talk_length_minutes: 45
  },
  {
    name: "Anita Desai",
    title: "Senior Developer",
    organization: "Zomato",
    talk_title: "GraphQL APIs with AWS AppSync",
    abstract: "Learn how to build real-time GraphQL APIs using AWS AppSync and integrate with various data sources.",
    bio: "Anita has built APIs for food delivery platforms and is passionate about GraphQL technologies.",
    photo_url: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
    linkedin_url: "https://linkedin.com/in/anitadesai",
    twitter_url: "https://twitter.com/anitadesai",
    github_url: "https://github.com/anitadesai",
    talk_length_minutes: 30
  },
  {
    name: "Robert Lee",
    title: "Infrastructure Architect",
    organization: "Tesla",
    talk_title: "IoT Data Processing with AWS IoT Core",
    abstract: "Process and analyze IoT data at scale using AWS IoT services and real-time analytics.",
    bio: "Robert designs IoT infrastructure for automotive applications and has expertise in real-time data processing.",
    photo_url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
    linkedin_url: "https://linkedin.com/in/robertlee",
    twitter_url: null,
    github_url: "https://github.com/robertlee",
    talk_length_minutes: 45
  },
  {
    name: "Kavya Nair",
    title: "Full Stack Developer",
    organization: "Swiggy",
    talk_title: "Building Progressive Web Apps on AWS",
    abstract: "Create fast, reliable PWAs using AWS services like CloudFront, S3, and Lambda@Edge.",
    bio: "Kavya builds web applications for food delivery and specializes in progressive web technologies.",
    photo_url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face",
    linkedin_url: "https://linkedin.com/in/kavyanair",
    twitter_url: "https://twitter.com/kavyanair",
    github_url: "https://github.com/kavyanair",
    talk_length_minutes: 30
  },
  {
    name: "Michael Brown",
    title: "Site Reliability Engineer",
    organization: "Slack",
    talk_title: "Observability and Monitoring on AWS",
    abstract: "Implement comprehensive observability using AWS CloudWatch, X-Ray, and third-party tools.",
    bio: "Michael ensures reliability for communication platforms and is an expert in monitoring and alerting.",
    photo_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    linkedin_url: "https://linkedin.com/in/michaelbrown",
    twitter_url: null,
    github_url: "https://github.com/michaelbrown",
    talk_length_minutes: 45
  },
  {
    name: "Sneha Gupta",
    title: "AI/ML Researcher",
    organization: "OpenAI",
    talk_title: "Generative AI Applications with AWS Bedrock",
    abstract: "Explore building generative AI applications using AWS Bedrock and foundation models.",
    bio: "Sneha researches AI applications and has experience deploying ML models in production environments.",
    photo_url: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
    linkedin_url: "https://linkedin.com/in/snehagupta",
    twitter_url: "https://twitter.com/snehagupta",
    github_url: "https://github.com/snehagupta",
    talk_length_minutes: 60
  },
  {
    name: "Daniel Garcia",
    title: "Backend Engineer",
    organization: "WhatsApp",
    talk_title: "High-Performance APIs with AWS Lambda",
    abstract: "Build high-performance, scalable APIs using AWS Lambda and API Gateway optimization techniques.",
    bio: "Daniel builds backend systems for messaging platforms and specializes in serverless architectures.",
    photo_url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    linkedin_url: "https://linkedin.com/in/danielgarcia",
    twitter_url: null,
    github_url: "https://github.com/danielgarcia",
    talk_length_minutes: 30
  },
  {
    name: "Ritu Singh",
    title: "Cloud Consultant",
    organization: "IBM",
    talk_title: "Hybrid Cloud Strategies with AWS Outposts",
    abstract: "Design hybrid cloud solutions using AWS Outposts for on-premises and edge computing needs.",
    bio: "Ritu helps enterprises design hybrid cloud strategies and has extensive experience with AWS Outposts.",
    photo_url: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
    linkedin_url: "https://linkedin.com/in/ritusingh",
    twitter_url: "https://twitter.com/ritusingh",
    github_url: null,
    talk_length_minutes: 45
  },
  {
    name: "Kevin Wong",
    title: "Blockchain Developer",
    organization: "Coinbase",
    talk_title: "Blockchain Applications on AWS",
    abstract: "Build and deploy blockchain applications using AWS Managed Blockchain and related services.",
    bio: "Kevin develops blockchain solutions for cryptocurrency platforms and understands distributed systems.",
    photo_url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
    linkedin_url: "https://linkedin.com/in/kevinwong",
    twitter_url: null,
    github_url: "https://github.com/kevinwong",
    talk_length_minutes: 45
  }
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

    // Insert in batches of 5 to avoid 500 errors
    const batchSize = 5;
    let insertedCount = 0;
    
    for (let i = 0; i < newSpeakers.length; i += batchSize) {
      const batch = newSpeakers.slice(i, i + batchSize);
      
      const { data, error } = await supabase
        .from("speakers")
        .insert(batch);

      if (error) {
        console.error(`Error inserting batch ${Math.floor(i/batchSize) + 1}:`, error);
        continue;
      }
      
      insertedCount += batch.length;
      console.log(`Inserted batch ${Math.floor(i/batchSize) + 1}: ${batch.length} speakers`);
    }

    console.log(`\nSuccessfully inserted ${insertedCount} new speakers total`);
    newSpeakers.slice(0, insertedCount).forEach((s) => {
      console.log(`   + ${s.name} (${s.organization})`);
    });
  } catch (error) {
    console.error("Script error:", error);
  }
}

seedSpeakers();
