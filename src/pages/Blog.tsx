import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Calendar, User, BookOpen } from 'lucide-react';

interface Blog {
  id: string;
  title: string;
  slug: string;
  featuredImage: string;
  author: string;
  publishedAt: string;
  category: string;
  content: string;
}

export default function Blog() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    let url = '/api/public/blogs?';
    if (selectedCategory) url += `category=${encodeURIComponent(selectedCategory)}&`;
    if (search) url += `search=${encodeURIComponent(search)}&`;

    fetch(url)
      .then((r) => r.json())
      .then((data) => setBlogs(data))
      .catch((e) => console.error("Error loading blogs", e))
      .finally(() => setLoading(false));
  }, [search, selectedCategory]);

  const categories = ['Neurology', 'General Health', 'Cardiology', 'Wellness'];

  // Helper to extract a text snippet from HTML string content
  const getExcerpt = (html: string) => {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    const text = tmp.textContent || tmp.innerText || '';
    return text.length > 140 ? text.substring(0, 140) + '...' : text;
  };

  return (
    <div className="animate-fade-in">
      {/* Banner */}
      <section style={{
        background: 'linear-gradient(135deg, var(--primary) 0%, #0d3c66 100%)',
        color: 'white',
        padding: '60px 0',
        textAlign: 'center'
      }}>
        <div className="container">
          <h1 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-heading)', color: 'white', marginBottom: '8px' }}>Health Library & News</h1>
          <p style={{ color: '#93c5fd', fontSize: '1.05rem' }}>Medical advice, stroke prevention guidelines, and wellness tips from our clinicians.</p>
        </div>
      </section>

      {/* Filter and Search */}
      <section style={{ padding: '30px 0', backgroundColor: 'white', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container">
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
            <div style={{ position: 'relative', flex: '1 1 300px' }}>
              <Search size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }} />
              <input
                type="text"
                placeholder="Search articles by title or keyword..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px 12px 42px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-color)',
                  fontSize: '0.95rem',
                  backgroundColor: 'var(--bg-main)'
                }}
              />
            </div>

            <div style={{ flex: '1 1 200px' }}>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-color)',
                  fontSize: '0.95rem',
                  backgroundColor: 'var(--bg-main)',
                  cursor: 'pointer'
                }}
              >
                <option value="">All Categories</option>
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Cards */}
      <section className="section">
        <div className="container">
          {loading ? (
            <div className="spinner-container"><div className="spinner" /></div>
          ) : blogs.length === 0 ? (
            <div className="empty-state">
              <BookOpen size={48} />
              <h3>No Blog Articles Found</h3>
              <p style={{ marginTop: '8px' }}>There are currently no health articles matching your criteria.</p>
            </div>
          ) : (
            <div className="grid grid-2">
              {blogs.map((blog) => (
                <div key={blog.id} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
                  <img
                    src={blog.featuredImage}
                    alt={blog.title}
                    style={{ width: '100%', height: '240px', objectFit: 'cover' }}
                  />
                  <div style={{ padding: '28px', flex: '1', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                      <span className="badge badge-secondary">{blog.category}</span>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Calendar size={14} />
                        {new Date(blog.publishedAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                      </span>
                    </div>

                    <h3 style={{ fontSize: '1.4rem', marginBottom: '12px', lineHeight: '1.35' }}>
                      <Link to={`/blog/${blog.slug}`} style={{ color: 'var(--text-dark)' }}>{blog.title}</Link>
                    </h3>

                    <p style={{ color: 'var(--text-muted)', fontSize: '0.925rem', marginBottom: '24px', lineHeight: '1.6' }}>
                      {getExcerpt(blog.content)}
                    </p>

                    <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '16px', marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <User size={14} />
                        <span>By {blog.author}</span>
                      </span>
                      <Link to={`/blog/${blog.slug}`} style={{ color: 'var(--primary)', fontWeight: '600', fontSize: '0.9rem' }}>Read Article →</Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
