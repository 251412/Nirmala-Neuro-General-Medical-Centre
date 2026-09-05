import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, User, BookOpen, ShieldAlert, Share2 } from 'lucide-react';

interface Blog {
  id: string;
  title: string;
  slug: string;
  featuredImage: string;
  content: string;
  author: string;
  category: string;
  seoTitle: string;
  seoDescription: string;
  publishedAt: string;
}

export default function BlogDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);
    fetch(`/api/public/blogs/${slug}`)
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data) => {
        setBlog(data);
        // Dynamically update document title for SEO
        if (data.seoTitle) document.title = `${data.seoTitle} | Nirmala Hospital`;
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return <div className="spinner-container"><div className="spinner" /></div>;
  }

  if (error || !blog) {
    return (
      <div className="container" style={{ padding: '80px 24px', textAlign: 'center' }}>
        <ShieldAlert size={48} style={{ color: 'var(--danger)', marginBottom: '16px' }} />
        <h2>Article Not Found</h2>
        <p style={{ color: 'var(--text-muted)', marginTop: '8px', marginBottom: '24px' }}>The health article you requested might have been unpublished or removed.</p>
        <Link to="/blog" className="btn btn-primary">Back to Health Library</Link>
      </div>
    );
  }

  return (
    <div className="animate-fade-in" style={{ backgroundColor: 'white', padding: '60px 0' }}>
      <div className="container" style={{ maxWidth: '840px' }}>
        {/* Back Link */}
        <Link to="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontWeight: '600', marginBottom: '32px' }}>
          <ArrowLeft size={16} />
          <span>Back to Health Library</span>
        </Link>

        {/* Post Header */}
        <div style={{ marginBottom: '32px' }}>
          <span className="badge badge-secondary" style={{ marginBottom: '16px' }}>{blog.category}</span>
          <h1 style={{ fontSize: '2.5rem', color: 'var(--primary)', lineHeight: '1.25', marginBottom: '16px' }}>
            {blog.title}
          </h1>
          <div style={{ display: 'flex', gap: '20px', color: 'var(--text-muted)', fontSize: '0.9rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '20px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <User size={16} />
              <span>By <strong>{blog.author}</strong></span>
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Calendar size={16} />
              <span>{new Date(blog.publishedAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </span>
          </div>
        </div>

        {/* Featured Image */}
        <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', marginBottom: '40px', boxShadow: 'var(--shadow-md)' }}>
          <img
            src={blog.featuredImage}
            alt={blog.title}
            style={{ width: '100%', maxHeight: '420px', objectFit: 'cover' }}
          />
        </div>

        {/* Render HTML Content */}
        <div
          style={{
            lineHeight: '1.8',
            color: 'var(--text-dark)',
            fontSize: '1.05rem',
            marginBottom: '60px'
          }}
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />

        {/* Author Footer */}
        <div className="card" style={{ padding: '24px', backgroundColor: 'var(--bg-main)', display: 'flex', gap: '20px', alignItems: 'center' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', flexShrink: 0 }}>
            {blog.author.charAt(0)}
          </div>
          <div>
            <h4 style={{ fontSize: '1.05rem', color: 'var(--primary)', marginBottom: '4px' }}>Written by {blog.author}</h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Medical Officer & Health Contributor at Nirmala Neuro & General Medical Centre.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
