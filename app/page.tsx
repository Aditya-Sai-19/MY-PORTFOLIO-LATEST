import Atmosphere from "@/components/Atmosphere";
import Navbar from "@/components/Navbar";
import { AdityaHero } from "@/components/ui/prisma-hero";
import Projects from "@/components/Projects";
import About from "@/components/About";
import HowItWorks from "@/components/ui/how-it-works";
import Skills from "@/components/Skills";
import Certifications from "@/components/Certifications";
import Community from "@/components/Community";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectionWord } from "@/components/ui/section-word";
import { Reveal } from "@/components/ui/reveal";
import { StaggerTestimonials } from "@/components/ui/stagger-testimonials";
import Footer from "@/components/Footer";

const TESTIMONIALS = [
  // --- Dummy testimonials (commented out) ---
  // {
  //   quote:
  //     "The attention to detail and innovative features have completely transformed our workflow. This is exactly what we've been looking for.",
  //   name: "Sarah Chen",
  //   designation: "Product Manager at TechFlow",
  //   src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  // },
  // {
  //   quote:
  //     "Implementation was seamless and the results exceeded our expectations. The platform's flexibility is remarkable.",
  //   name: "Michael Rodriguez",
  //   designation: "CTO at InnovateSphere",
  //   src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  // },
  // {
  //   quote:
  //     "This solution has significantly improved our team's productivity. The intuitive interface makes complex tasks simple.",
  //   name: "Emily Watson",
  //   designation: "Operations Director at CloudScale",
  //   src: "https://images.unsplash.com/photo-1623582854588-d60de57fa33f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  // },
  // {
  //   quote:
  //     "Outstanding support and robust features. It's rare to find a product that delivers on all its promises.",
  //   name: "James Kim",
  //   designation: "Engineering Lead at DataPro",
  //   src: "https://images.unsplash.com/photo-1636041293178-808a6762ab39?q=80&w=3464&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  // },
  // {
  //   quote:
  //     "The scalability and performance have been game-changing for our organization. Highly recommend to any growing business.",
  //   name: "Lisa Thompson",
  //   designation: "VP of Technology at FutureNet",
  //   src: "https://images.unsplash.com/photo-1624561172888-ac93c696e10c?q=80&w=2592&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  // },
  // {
  //   quote:
  //     "Aditya's phishing detection model caught patterns our team had been missing for months. The precision is genuinely impressive.",
  //   name: "Priya Sharma",
  //   designation: "Security Engineer at NetShield",
  //   src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=500&q=80",
  // },
  // {
  //   quote:
  //     "He led the robotics demo at our campus showcase — the sensor integration was flawless and the crowd loved every second.",
  //   name: "Rahul Verma",
  //   designation: "Organizer at TechFest",
  //   src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=500&q=80",
  // },
  // --- End dummy testimonials ---
  {
    quote:
      "I had the opportunity to work with Aditya and was genuinely impressed by his strong expertise in Generative AI. He has a solid understanding of modern AI technologies and demonstrates an excellent ability to explore and apply GenAI concepts to real-world problems. Aditya stands out for his curiosity, innovative mindset, and ability to understand complex AI concepts and turn them into practical solutions. His technical skills, problem-solving approach, and enthusiasm for emerging GenAI technologies make him a valuable addition to any team. I would highly recommend Aditya for building innovative AI-driven solutions.",
    name: "Jayant Verma",
    designation: "Senior Software Engineer at Capgemini",
    src: "/JayantVerma.jpeg",
    linkedin: "https://www.linkedin.com/in/jayant-verma-13062001/",
  },
  // Position -1 (immediate left of center)
  {
    quote:
      "Working with Aditya on the Culture Sense app at Kodryx was an unforgettable experience. He tackled the complex analytics pipelines with impressive skill, but what stands out most is his insatiable appetite for learning. Aditya possesses a glorious, unstoppable need to ask 'why' and 'how' about absolutely everything. He is delightfully relentless when it comes to extracting knowledge from his peers. Any team would be lucky to have him though they might need to schedule extra time just to answer all his fantastic questions!",
    name: "Panindhra",
    designation: "Software Engineer at SporoHealth",
    src: "/Panindhra.jpg",
    linkedin: "https://www.linkedin.com/in/panindhra/",
  },
  // Center (index 8 = position 0)
  {
    quote:
      "CultureSense, a cockpit for CHROs for Culture, one of a kind product in Workplace Culture space was passionately designed and created by Aditya, Tejaswi and his team from KodryxAI. The special part is his passion towards technology and building things in AI for Organizations which will make an impact in people's lives.",
    name: "Santhana Selvan",
    designation: "Founder & CBO at Unity Circle",
    src: "/SanthanaSelvan.jpg",
    linkedin: "https://www.linkedin.com/in/santhanaselvan/",
  },
  // Right side (near center to far)
  {
    quote:
      "Aditya is one of the most knowledgeable and supportive people I've had the opportunity to work with. He is always willing to share his knowledge and guide the team whenever needed. As a team lead, he manages tasks efficiently, keeps everyone aligned, and ensures everything is completed according to schedule. His attention to detail, consistency, and perfectionism really stand out. I've learned a lot from working with him, and I truly appreciate his guidance and support.",
    name: "Tejaswi",
    designation: "AI Engineer at Kodryx AI",
    src: "/TejaswiThudi.jpg",
    linkedin: "https://www.linkedin.com/in/tejaswithudi/",
  },
  {
    quote:
      "Aditya was an excellent team lead to work with. As a fresher, I truly appreciated his patience, expertise, and willingness to guide and support me. His calm and approachable nature made the experience even better.",
    name: "Harshini",
    designation: "AI Engineer Intern at Kodryx AI",
    src: "/Harshini.jpeg",
    linkedin: "https://www.linkedin.com/in/harshini-sadagopan/",
  },
  {
    quote:
      "It was a pleasure collaborating with you on projects at Kodryx AI. You consistently demonstrated strong technical expertise, clear communication, and a collaborative approach, making our work together both productive and enjoyable.",
    name: "Sai Hrudhay",
    designation: "AI Engineer Intern at Kodryx AI",
    src: "/SaiHrudhay.jpg",
    linkedin: "https://www.linkedin.com/in/sai-hrudhay-parna-41692b299/",
  },
  {
    quote:
      "I had the pleasure of working with Aditya during our collaboration at Kodryx AI. He is a highly driven and curious AI professional who brings strong technical skills, a learning mindset, and a genuine passion for emerging technologies. His ability to connect technology with practical outcomes makes him a valuable contributor to any AI-driven team.",
    name: "Raaj Meesa",
    designation: "AI Marketing Coach | Media & Content Strategist at Kodryx AI",
    src: "/RaajMeesa.jpg",
    linkedin: "https://www.linkedin.com/in/raajmeesa/",
  },
  {
    quote:
      "It's been wonderful knowing and collaborating with Aditya through different community events. He is incredibly active, approachable, and always brings positive energy to the community. What stands out to me is his genuine interest in connecting with people, exchanging ideas, and making every interaction meaningful. His enthusiasm and willingness to get involved make him a valuable part of any community. He's someone who is always open to new ideas and brings a collaborative spirit wherever he goes. I'm happy to have met him through the community and hope we get to work together on many more events in the future.",
    name: "Mahima Tiwari",
    designation: "Anchor at MFUGH Community",
    src: "/MAHIMA.jpeg",
    linkedin: "https://www.linkedin.com/in/mahima-tiwari-62313634a/",
  },
  {
    quote:
      "I had a great experience working with Aditya on the Culture Sense project for Unity Circle, led by Santhana Selvan, through Kodryx AI. Aditya stood out for his ownership, problem-solving ability, and collaborative mindset. He consistently contributed thoughtful ideas, took initiative, and worked with the team to turn concepts into practical solutions. What I particularly appreciated was his willingness to take responsibility and keep things moving even when we faced challenges. It was genuinely a pleasure working with him on this project, and I'd be happy to collaborate with Aditya again.",
    name: "Venkata Karthik Sai",
    designation: "AI Engineer Intern at Kodryx AI",
    src: "/Venkata Karthik Sai.jpg",
    linkedin: "https://www.linkedin.com/in/venkata-karthik-sai-sunkara/",
  },
];

export default function Home() {
  return (
    /* body paints the background; no bg here so the fixed Atmosphere orbs (z -10) show through */
    <div className="min-h-screen overflow-x-hidden text-foreground">
      {/* Structured Data for SEO / AEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Aditya Sai — AI/ML Engineer Portfolio",
            url: "https://aditya-sai-19-portfolio.vercel.app",
            description:
              "Portfolio of Kolapalli Aditya Sai, an AI/ML Engineer at Kodryx AI in Hyderabad, India.",
            author: {
              "@type": "Person",
              name: "Kolapalli Aditya Sai",
            },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Kolapalli Aditya Sai",
            alternateName: "Aditya Sai",
            jobTitle: "AI Engineer",
            description:
              "AI/ML Engineer specializing in intelligent systems, applied machine learning, robotics, and cybersecurity. Building production-grade AI solutions.",
            url: "https://aditya-sai-19-portfolio.vercel.app",
            image: "https://aditya-sai-19-portfolio.vercel.app/aditya-profile.jpeg",
            email: "workingprofessional19@outlook.com",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Hyderabad",
              addressRegion: "Telangana",
              addressCountry: "IN",
            },
            worksFor: {
              "@type": "Organization",
              name: "Kodryx AI",
              url: "https://kodryx.ai",
            },
            alumniOf: {
              "@type": "CollegeOrUniversity",
              name: "Joginpally B R Engineering College",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Hyderabad",
                addressCountry: "IN",
              },
            },
            knowsAbout: [
              "Artificial Intelligence",
              "Machine Learning",
              "Deep Learning",
              "Computer Vision",
              "Natural Language Processing",
              "Robotics",
              "Cybersecurity",
              "Python",
              "TensorFlow",
              "PyTorch",
              "FastAPI",
            ],
            sameAs: [
              "https://github.com/Aditya-Sai-19",
              "https://linkedin.com/in/aditya-sai-3317702a6",
              "https://huggingface.co/Aditya-Sai-19",
              "https://www.instagram.com/magnum_opus_prolix/",
            ],
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "Who is Aditya Sai?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Kolapalli Aditya Sai is an AI/ML Engineer based in Hyderabad, India, currently working at Kodryx AI. He specializes in intelligent systems, applied machine learning, robotics, and cybersecurity.",
                },
              },
              {
                "@type": "Question",
                name: "What does Aditya Sai do at Kodryx AI?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "As an AI Engineer Intern at Kodryx AI, Aditya developed scalable AI-driven systems including WhatsApp automation platforms, real-time surveillance solutions, and multi-tenant SaaS systems using FastAPI and computer vision pipelines.",
                },
              },
              {
                "@type": "Question",
                name: "What are Aditya Sai's technical skills?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Aditya is proficient in Python, Java, C, SQL, and has expertise in Machine Learning, Deep Learning, NLP, Computer Vision, TensorFlow, PyTorch, LangChain, FastAPI, AWS, Docker, and Firebase.",
                },
              },
              {
                "@type": "Question",
                name: "What projects has Aditya Sai worked on?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Notable projects include CultureSense (AI-powered workplace culture platform), a phishing detection ML model, robotics sensor integration demos, and workflow automation systems.",
                },
              },
              {
                "@type": "Question",
                name: "How can I contact Aditya Sai?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "You can reach Aditya via email at workingprofessional19@outlook.com, or connect with him on LinkedIn, GitHub, or Hugging Face.",
                },
              },
            ],
          }),
        }}
      />
      <Atmosphere />
      <Navbar />
      <main>
        <AdityaHero />
        <Projects />
        <About />
        <div id="journey" className="atmosphere-luminous relative">
        <Reveal y={48} duration={1.1}>
        <HowItWorks
          features={[
            {
              title: "AI Engineer Intern",
              description:
                "Kodryx AI, Hyderabad · Oct 2025 – Mar 2026\n\nDeveloped scalable AI-driven systems including WhatsApp automation platforms and real-time surveillance solutions. Designed backend architectures using FastAPI and asynchronous processing. Built multi-tenant SaaS systems with queue-based message delivery. Implemented computer vision pipelines for real-time object detection and tracking.",
              colorTheme: "orange",
            },
            {
              title: "Content Moderator cum Data Research Analyst",
              description:
                "Concentrix (Avalon Project) via Ixora Global Services, Hyderabad · Jul 2021 – Jul 2025\n\nAnnotated and classified multimedia content for ML model training. Maintained high accuracy standards and met tight delivery timelines.",
              colorTheme: "blue",
            },
            {
              title: "AI Job Simulation Intern",
              description:
                "Cognizant (via Forage)\n\nPerformed EDA on client data using Python in Google Colab. Built and evaluated a machine learning model and presented findings.",
              colorTheme: "purple",
            },
            {
              title: "B.Tech in CSE (AI & ML)",
              description:
                "Joginpally B R Engineering College, Hyderabad · Jul 2021 – Jul 2025\nCGPA: 7.8\n\nSpecialized in artificial intelligence and machine learning, building a strong foundation in Python, deep learning, and intelligent systems.",
              colorTheme: "orange",
            },
            {
              title: "Intermediate (MPC)",
              description:
                "Toppers Junior College, Hyderabad · Jun 2018 – Mar 2020\nPercentage: 93.6%",
              colorTheme: "blue",
            },
            {
              title: "Xth Standard",
              description:
                "St. Martin's High School, Hyderabad · Jun 2017 – Mar 2018\nPercentage: 83.3%",
              colorTheme: "purple",
            },
          ]}
        >
          <SectionWord align="center" variant="gradient" rotate={-6}>HUSTLE</SectionWord>
        </HowItWorks>
        </Reveal>
        </div>
        <Skills />
        <Certifications />
        <Community />
        <section id="testimonials" className="relative overflow-hidden py-24 md:py-32">
          <div className="mx-auto max-w-6xl px-4 md:px-10">
            <SectionHeading
              label="Testimonials"
              title={
                <>
                  Kind words from{" "}
                  <em className="font-semibold italic text-accent">people I&apos;ve worked with</em>
                </>
              }
              align="center"
            />
          </div>

          {/* Full-bleed stagger fan */}
          <div className="mt-14">
            <StaggerTestimonials
              testimonials={TESTIMONIALS.map((t, i) => ({
                id: i,
                quote: t.quote,
                by: `${t.name}, ${t.designation}`,
                imgSrc: t.src,
                linkedin: (t as any).linkedin,
              }))}
              initialCenter={2}
            />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
