
export interface Author {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  socialLinks: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  readingTime: number;
  publishedDate: string;
  category: string;
  tags: string[];
  author: Author;
  featured?: boolean;
  trending?: boolean;
  views: number;
  likes: number;
  comments: Comment[];
}

export interface Comment {
  id: string;
  content: string;
  author: {
    id: string;
    name: string;
    avatar: string;
  };
  publishedDate: string;
  likes: number;
  replies?: Comment[];
}

export const authors: Author[] = [
  {
    id: "1",
    name: "Alex Johnson",
    avatar: "https://i.pravatar.cc/150?img=1",
    bio: "Senior frontend developer passionate about creating beautiful, accessible user interfaces. When not coding, I'm hiking or playing piano.",
    socialLinks: {
      twitter: "https://twitter.com/alexjohnson",
      linkedin: "https://linkedin.com/in/alexjohnson",
      github: "https://github.com/alexjohnson"
    }
  },
  {
    id: "2",
    name: "Sophia Chen",
    avatar: "https://i.pravatar.cc/150?img=5",
    bio: "Full-stack developer and AI enthusiast. I write about the intersection of design and technology. Tea addict and amateur photographer.",
    socialLinks: {
      twitter: "https://twitter.com/sophiachen",
      linkedin: "https://linkedin.com/in/sophiachen",
      github: "https://github.com/sophiachen"
    }
  },
  {
    id: "3",
    name: "Marcus Williams",
    avatar: "https://i.pravatar.cc/150?img=3",
    bio: "UX designer turned developer. I focus on creating intuitive interfaces backed by clean code. I love cycling and craft beer.",
    socialLinks: {
      twitter: "https://twitter.com/marcuswilliams",
      linkedin: "https://linkedin.com/in/marcuswilliams"
    }
  },
  {
    id: "4",
    name: "Emma Rodriguez",
    avatar: "https://i.pravatar.cc/150?img=9",
    bio: "Tech writer and backend developer specialized in performance optimization. I enjoy sharing knowledge and building communities.",
    socialLinks: {
      twitter: "https://twitter.com/emmarodriguez",
      github: "https://github.com/emmarodriguez"
    }
  }
];

export const categories = [
  "Technology",
  "Design",
  "Development",
  "AI & Machine Learning",
  "UX/UI",
  "Programming",
  "Web Development",
  "Mobile Development"
];

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "The Future of Web Development: What to Expect in 2024",
    excerpt: "Discover the cutting-edge trends and technologies shaping the future of web development in 2024 and beyond.",
    content: `
# The Future of Web Development: What to Expect in 2024

The landscape of web development continues to evolve at a rapid pace. As we move into 2024, several exciting trends are emerging that promise to transform how we build and experience the web.

## AI-Assisted Development

Artificial intelligence is no longer just a buzzword in tech circles. In 2024, AI is becoming an essential partner for developers. From code suggestions to automated testing, AI tools are helping developers work more efficiently and with fewer errors.

\`\`\`javascript
// Example of AI-assisted code generation
const generateComponent = async (description) => {
  const aiResponse = await ai.generateCode({
    description,
    language: 'jsx',
    framework: 'react'
  });
  return aiResponse.code;
};
\`\`\`

## WebAssembly Goes Mainstream

WebAssembly (Wasm) has been gaining traction for years, but 2024 is seeing it truly go mainstream. By allowing high-performance code written in languages like C++, Rust, and Go to run in the browser, Wasm is enabling more complex applications with near-native performance.

## Serverless Architecture Evolution

Serverless architecture continues to evolve, with more sophisticated offerings that make it easier than ever to deploy scalable applications without managing infrastructure.

## Micro-Frontends for Scalable Teams

Large organizations are increasingly adopting micro-frontend architectures to allow teams to work independently while maintaining a cohesive user experience.

## Conclusion

The future of web development is bright, with advancements in AI, WebAssembly, and serverless architecture leading the way. By staying informed and adaptable, developers can leverage these trends to build better, faster, and more user-friendly web applications.
`,
    coverImage: "https://images.unsplash.com/photo-1510915228340-29c85a43dcfe?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    readingTime: 8,
    publishedDate: "2023-06-15",
    category: "Technology",
    tags: ["Web Development", "AI", "WebAssembly", "Serverless", "Trends"],
    author: authors[0],
    featured: true,
    trending: true,
    views: 15420,
    likes: 347,
    comments: [
      {
        id: "c1",
        content: "Great insights! I'm especially excited about the potential of WebAssembly.",
        author: {
          id: "u1",
          name: "Daniel Smith",
          avatar: "https://i.pravatar.cc/150?img=4"
        },
        publishedDate: "2023-06-16",
        likes: 12,
        replies: [
          {
            id: "c1r1",
            content: "Absolutely agree. WebAssembly is a game-changer for browser-based applications.",
            author: {
              id: "1",
              name: "Alex Johnson",
              avatar: "https://i.pravatar.cc/150?img=1"
            },
            publishedDate: "2023-06-16",
            likes: 5
          }
        ]
      }
    ]
  },
  {
    id: "2",
    title: "Mastering Modern CSS: Best Practices for 2023",
    excerpt: "Learn the essential CSS techniques and best practices that every modern web developer should know.",
    content: `
# Mastering Modern CSS: Best Practices for 2023

CSS has evolved significantly in recent years, with powerful new features that make it easier to create responsive, maintainable designs. This post covers essential techniques and best practices for modern CSS development.

## Embrace CSS Custom Properties (Variables)

CSS custom properties have transformed how we write and maintain stylesheets. They allow for more dynamic and flexible styling with native CSS.

\`\`\`css
:root {
  --primary-color: #5D4FFF;
  --secondary-color: #3D85C6;
  --spacing-unit: 1rem;
  --border-radius: 0.25rem;
}

.button {
  background-color: var(--primary-color);
  padding: var(--spacing-unit);
  border-radius: var(--border-radius);
}
\`\`\`

## Layout with CSS Grid and Flexbox

Modern CSS layout techniques like Grid and Flexbox have revolutionized how we approach web layouts, making it easier to create complex designs with less code.

## Responsive Design with Container Queries

While media queries have been the standard for responsive design, container queries are changing the game by allowing components to respond to their parent container's size rather than the viewport.

## Conclusion

Modern CSS is more powerful than ever. By embracing variables, modern layout techniques, and new responsive design approaches, you can create more maintainable and flexible stylesheets for your projects.
`,
    coverImage: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    readingTime: 6,
    publishedDate: "2023-05-22",
    category: "Design",
    tags: ["CSS", "Web Design", "Responsive Design", "Frontend"],
    author: authors[1],
    featured: false,
    trending: true,
    views: 9872,
    likes: 215,
    comments: []
  },
  {
    id: "3",
    title: "Building Accessible Web Applications: A Comprehensive Guide",
    excerpt: "Discover how to make your web applications accessible to everyone, regardless of ability or disability.",
    content: "This is the full content of the accessibility blog post...",
    coverImage: "https://images.unsplash.com/photo-1586893333252-535e94f5a9ca?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    readingTime: 10,
    publishedDate: "2023-04-10",
    category: "Development",
    tags: ["Accessibility", "A11y", "WCAG", "Inclusive Design"],
    author: authors[2],
    featured: true,
    trending: false,
    views: 7653,
    likes: 189,
    comments: []
  },
  {
    id: "4",
    title: "Getting Started with React Server Components",
    excerpt: "Learn how React Server Components work and how they can improve your application's performance.",
    content: "This is the full content of the React Server Components blog post...",
    coverImage: "https://images.unsplash.com/photo-1602265585142-6b221b9b2c24?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    readingTime: 7,
    publishedDate: "2023-03-18",
    category: "Development",
    tags: ["React", "JavaScript", "Server Components", "Performance"],
    author: authors[0],
    featured: false,
    trending: true,
    views: 12543,
    likes: 276,
    comments: []
  },
  {
    id: "5",
    title: "Introduction to Machine Learning for Web Developers",
    excerpt: "Discover how machine learning can enhance your web applications and improve user experiences.",
    content: "This is the full content of the machine learning blog post...",
    coverImage: "https://images.unsplash.com/photo-1580894742597-87bc8789db3d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    readingTime: 9,
    publishedDate: "2023-02-05",
    category: "AI & Machine Learning",
    tags: ["Machine Learning", "AI", "Web Development", "TensorFlow.js"],
    author: authors[3],
    featured: true,
    trending: false,
    views: 9865,
    likes: 203,
    comments: []
  },
  {
    id: "6",
    title: "The Ultimate Guide to TypeScript in 2023",
    excerpt: "Master TypeScript with this comprehensive guide covering everything from basics to advanced techniques.",
    content: "This is the full content of the TypeScript guide...",
    coverImage: "https://images.unsplash.com/photo-1597239450996-ea7c2c564412?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    readingTime: 12,
    publishedDate: "2023-01-20",
    category: "Programming",
    tags: ["TypeScript", "JavaScript", "Web Development"],
    author: authors[1],
    featured: false,
    trending: true,
    views: 14352,
    likes: 315,
    comments: []
  }
];
