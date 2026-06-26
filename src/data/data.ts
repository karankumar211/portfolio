// src/data/data.ts
import vercelImg from '../assets/you.jpeg';
export interface Experience {
  id: string;
  role: string;
  company: string;
  duration: string;
  description: string;
}

export interface Project {
  id: string;
  title: string;
  techStack: string[];
  description: string;
  githubLink?: string;
  liveLink?: string;
  imageUrl?: string;
}

export interface SkillCategory {
  title: string;
  description: string;
  skills: string[];
  type: "icons" | "pills";
}

export const experienceData: Experience[] = [
  {
    id: "exp-1",
    role: "Frontend Developer Intern",
    company: "Galactix Solutions Pvt. Ltd.",
    duration: "March 2026 - June 2026",
    description: "Engineered 10+ reusable React components to standardize the UI, significantly reducing development overhead. Integrated critical REST APIs to improve page response performance and implemented Jest testing to guarantee workflow stability.",
  },
  {
    id: "exp-2",
    role: "B.Tech Computer Science and Engineering",
    company: "Hyderabad Institute of Technology and Management (HITAM)",
    duration: "2023 - 2027",
    description: "Maintaining an 8.5 CGPA with a rigorous focus on core computer science fundamentals, including Operating Systems, Computer Organization and Architecture (COA), and System Design basics. Active participant in multiple national hackathons.",
  }
];

export const projectsData: Project[] = [
  {
    id: "proj-1",
    title: "Mini Vercel Deployment Pipeline",
    techStack: ["React", "Node.js", "AWS S3"],
    description: "Architected a custom deployment platform supporting automated frontend builds. Engineered a specialized deployment workflow and storage pipeline leveraging AWS S3 that actively reduces deployment latency for static assets.",
    githubLink: "https://github.com/karankumar211",
    imageUrl: vercelImg
  },
  {
    id: "proj-2",
    title: "Real-Time Code Collab",
    techStack: ["React", "Node.js", "WebSockets", "MongoDB"],
    description: "Developed a secure, multi-user real-time code editing environment. Managed complex state synchronization across clients using WebSockets and enforced session security via strict JWT-based authentication.",
    githubLink: "https://github.com/karankumar211",
    imageUrl: vercelImg
  },
  {
    id: "proj-3",
    title: "Native Language Identification",
    techStack: ["NLP", "Python", "Data Analysis"],
    description: "Designed and trained models for language identification, utilizing layer-wise analysis to optimize prediction accuracy across diverse linguistic datasets.",
    githubLink: "https://github.com/karankumar211/Native-Language-Identification-Project",
    imageUrl: vercelImg
  },
  {
    id: "proj-4",
    title: "Zero-Trust Asset Delivery System",
    techStack: ["Docker", "System Design", "Microservices"],
    description: "Initiated the architecture for a highly secure asset delivery system, emphasizing zero-trust boundaries and containerized deployment using Docker to isolate operational environments.",
    imageUrl: vercelImg
  }
];

export const skillsData: SkillCategory[] = [
  {
    title: "Front-End Development",
    description: "Building engaging and user-friendly web interfaces using modern frameworks and technologies with expertise.",
    skills: ["React", "Next.js", "Redux"],
    type: "icons"
  },
  {
    title: "Back-End Development",
    description: "Developing robust server-side logic and APIs to power dynamic and scalable web applications.",
    skills: ["Node.js", "Express", "REST APIs", "WebSockets"],
    type: "icons"
  },
  {
    title: "Programming Languages",
    description: "Proficient in problem-solving and applying programming languages to implement efficient data structures and algorithms.",
    skills: ["C++", "Java", "JavaScript", "TypeScript"],
    type: "icons"
  },
  {
    title: "Database Management",
    description: "Designing and managing databases to ensure secure and efficient data storage and retrieval.",
    skills: ["MongoDB", "MySQL"],
    type: "icons"
  },
  {
    title: "Core Computer Science Concepts",
    description: "Demonstrating a strong foundation in core computer science principles, including problem-solving, system design, and efficient computing techniques.",
    skills: ["Operating Systems", "Computer Networks", "Object-Oriented Programming", "DSA", "System Design (Basics)", "DBMS"],
    type: "pills"
  },
  {
    title: "Cloud & DevOps",
    description: "Experienced in deploying and managing applications using modern cloud platforms and tools.",
    skills: ["Docker", "AWS", "Git"],
    type: "icons"
  },
  {
    title: "Personal Development",
    description: "Committed to continuous learning and personal growth to excel in both professional and collaborative environments.",
    skills: ["Time Management", "Problem Solving", "Communication", "Leadership"],
    type: "pills"
  },
  {
    title: "Testing & Debugging",
    description: "Ensuring code quality and reliability through rigorous testing and debugging processes.",
    skills: ["Postman", "Jest", "Selenium"],
    type: "icons"
  }
];

export const personalInfo = {
  name: "Karan Kumar",
  title: "Software Engineer",
  email: "karankumar21143@gmail.com",
  phone: "+91 9154994175",
  github: "https://github.com/karankumar211",
  linkedin: "https://linkedin.com/in/karankumar211",
  leetcode: "https://leetcode.com/u/karankumar211/",
  shortBio: "I am a Software Engineer Passionate about building scalable, high-performance applications and delivering intuitive, user-centric digital experiences through clean, maintainable code.",
  resumeUrl: "/google Resume.pdf"
};