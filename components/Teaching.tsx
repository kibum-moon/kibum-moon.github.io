import React from 'react';
import { TEACHING_DATA } from '../constants';
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

const AnimatedTeachingItem: React.FC<{course: (typeof TEACHING_DATA)[0], delay: number}> = ({ course, delay }) => {
  const { ref, isIntersecting } = useIntersectionObserver<HTMLLIElement>({ threshold: 0.1 });
  return (
    <li 
      ref={ref}
      className={`transition-all duration-700 ${isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} bg-card-dark p-4 rounded-lg border border-accent/20 mb-4`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="flex justify-between items-start gap-4">
          <div>
              <h3 className="text-xl font-semibold text-accent">{course.title}</h3>
              <p className="text-text-secondary/80 text-base mb-2">{course.code} &bull; {course.semester}</p>
              <p className="text-text-secondary text-lg">{course.description}</p>
          </div>
          {course.syllabusUrl && (
              <a href={course.syllabusUrl} target="_blank" rel="noopener noreferrer" className="flex-shrink-0 ml-4 inline-block bg-accent/20 text-accent text-base font-semibold px-4 py-2 rounded-md hover:bg-accent hover:text-bg-dark transition-all duration-300 hover:shadow-glow-accent">
                  Syllabus
              </a>
          )}
      </div>
    </li>
  );
};

const Teaching: React.FC = () => {
  return (
    <SectionWrapper id="teaching" title="Teaching">
      <ul className="max-w-4xl mx-auto">
        {TEACHING_DATA.map((course, index) => (
          <AnimatedTeachingItem key={index} course={course} delay={index * 150} />
        ))}
      </ul>
    </SectionWrapper>
  );
};

export default Teaching;