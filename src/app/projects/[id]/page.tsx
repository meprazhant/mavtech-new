import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import dbConnect from '@/lib/db';
import Project from '@/models/Project';
import ProjectDetailClient from './ProjectDetailClient';

interface ProjectData {
    _id: string;
    title: string;
    featuredImage: string;
    gallery: string[];
    shortDescription: string;
    longDescription: string;
    status: 'In Development' | 'Released' | 'Beta Released';
    tags: string[];
    category: string;
    location: string;
    duration: string;
    createdAt: string;
}

interface PageProps {
    params: Promise<{ id: string }>;
}

// Server-side data fetching function
async function getProject(id: string): Promise<ProjectData | null> {
    try {
        await dbConnect();
        const project = await Project.findById(id).lean() as any;

        if (!project) {
            return null;
        }

        // Convert MongoDB document to plain object
        return {
            _id: project._id.toString(),
            title: project.title,
            featuredImage: project.featuredImage,
            gallery: project.gallery || [],
            shortDescription: project.shortDescription,
            longDescription: project.longDescription,
            status: project.status,
            tags: project.tags || [],
            category: project.category,
            location: project.location,
            duration: project.duration,
            createdAt: project.createdAt ? new Date(project.createdAt).toISOString() : new Date().toISOString(),
        };
    } catch (error) {
        console.error('Failed to fetch project:', error);
        return null;
    }
}

// Generate dynamic metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { id } = await params;
    const project = await getProject(id);

    if (!project) {
        return {
            title: 'Project Not Found',
            description: 'The requested project could not be found.',
        };
    }

    return {
        title: `${project.title} | Projects`,
        description: project.shortDescription,
        keywords: [...project.tags, project.category, 'project', 'portfolio'].join(', '),
        openGraph: {
            title: project.title,
            description: project.shortDescription,
            images: [
                {
                    url: project.featuredImage,
                    width: 1200,
                    height: 630,
                    alt: project.title,
                },
            ],
            type: 'article',
            publishedTime: project.createdAt,
        },
        twitter: {
            card: 'summary_large_image',
            title: project.title,
            description: project.shortDescription,
            images: [project.featuredImage],
        },
    };
}

// Server Component
export default async function ProjectDetailPage({ params }: PageProps) {
    const { id } = await params;
    const project = await getProject(id);

    // Return 404 if project not found
    if (!project) {
        notFound();
    }

    // Pass data to client component for animations
    return <ProjectDetailClient project={project} />;
}
