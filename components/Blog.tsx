
import React from 'react';
import { BLOG_DATA } from '../constants';
import useIntersectionObserver from './useIntersectionObserver';

const SectionWrapper: React.FC<{id: string; title: string; children: React.ReactNode}> = ({id, title, children}) => (
    <section id={id} className="py-20 px-4 sm:px-6 lg:px-8 bg-bg-dark/50">
        <div className="container mx-auto">
            <h2 className="text-4xl font-bold text-text-light mb-12 text-center relative pb-2">
              {title}
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 h-0.5 bg-accent"></span>
            </h2>
            {children}
        </div>
    </section>
);

const AnimatedNewsItem: React.FC<{post: (typeof BLOG_DATA)[0], delay: number}> = ({ post, delay }) => {
  const { ref, isIntersecting } = useIntersectionObserver<HTMLLIElement>({ threshold: 0.1 });
  return (
    <li 
      ref={ref}
      className={`transition-all duration-700 ${isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} py-4 border-b border-accent/20 last:border-b-0`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <p className="text-text-secondary/80 text-sm mb-1">{post.date}</p>
      <h3 className="text-lg font-medium text-text-light">
          <a href={post.link} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors flex items-start gap-2">
            <span>{post.title}</span>
            <i className="fa-solid fa-arrow-up-right-from-square text-xs mt-1.5 opacity-50"></i>
          </a>
      </h3>
    </li>
  );
};


const Blog: React.FC = () => {
  return (
    <SectionWrapper id="blog" title="News & Talks">
        <ul className="max-w-4xl mx-auto bg-card-dark p-6 rounded-lg border border-accent/20">
            {BLOG_DATA.map((post, index) => (
                <AnimatedNewsItem key={index} post={post} delay={index * 150} />
            ))}
        </ul>
    </SectionWrapper>
  );
};

export default Blog;
