"use client";
import React from 'react';
import Link from 'next/link';
import styles from './StoriesGrid.module.css';

const stories = [
  {
    slug: 'earth',
    title: 'Blue World — Earth',
    excerpt: 'A short tale about oceans, life, and the fragile blue world.',
    color: '#6b93d6',
    img: '/globe.svg'
  },
  {
    slug: 'mars',
    title: 'Red Dust — Mars',
    excerpt: 'A story of exploration and rust-red horizons.',
    color: '#c1440e',
    img: '/file.svg'
  },
  {
    slug: 'jupiter',
    title: 'Giant Storms — Jupiter',
    excerpt: 'A short chronicle about storms bigger than nations.',
    color: '#d8ca9d',
    img: '/next.svg'
  },
  {
    slug: 'saturn',
    title: 'Rings of Memory — Saturn',
    excerpt: 'An orbit of stories wrapped in icy rings.',
    color: '#e3cfab',
    img: '/window.svg'
  }
];

export default function StoriesGrid() {
  return (
    <section className={styles.stage} aria-label="Space stories">
      <div className={styles.stars} aria-hidden="true" />
      <div className={styles.nebula} aria-hidden="true" />
      <header className={styles.header}>
        <h1 className={styles.heading}>Space Stories</h1>
        <p className={styles.sub}>Hover a planet to read a preview — click to open the full story.</p>
      </header>

      <div className={styles.grid} role="list">
        {stories.map((s, i) => (
          <Link key={s.slug} href={`/stories/${s.slug}`} className={styles.item} role="listitem">
            <div className={styles.orbit} style={{ animationDelay: `${i * 0.15}s` }}>
              <div className={styles.planet} style={{ background: `radial-gradient(circle at 30% 25%, rgba(255,255,255,0.18), transparent 10%), ${s.color}` }}>
                <img src={s.img} alt="" className={styles.planetImg} />
              </div>
              <div className={styles.card}>
                <h3>{s.title}</h3>
                <p>{s.excerpt}</p>
                <span className={styles.cta}>Read story →</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
