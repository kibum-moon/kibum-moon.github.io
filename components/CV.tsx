import React from 'react';
import { CV_DATA, PROFILE_DATA } from '../constants';
import useIntersectionObserver from './useIntersectionObserver';

const SectionWrapper: React.FC<{id: string; title: string; children: React.ReactNode}> = ({id, title, children}) => (
    <section id={id} className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
            <h2 className="text-4xl font-bold text-text-light mb-12 text-center relative pb-2">
              {title}
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-20 h-0.5 bg-accent"></span>
            </h2>
            {children}
        </div>
    </section>
);

const AnimatedComponent: React.FC<{children: React.ReactNode, delay?: number}> = ({ children, delay = 0 }) => {
  const { ref, isIntersecting } = useIntersectionObserver({ threshold: 0.1 });
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

interface CVProps {
  onShowFullCV: () => void;
}

const CV: React.FC<CVProps> = ({ onShowFullCV }) => {
  return (
    <SectionWrapper id="cv" title="Curriculum Vitae">
      <div className="max-w-4xl mx-auto">
        <AnimatedComponent>
          <div className="text-center mb-12 flex justify-center items-center gap-4">
            <a
              href={PROFILE_DATA.cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-accent text-bg-dark text-xl font-semibold px-8 py-3 rounded-md transition-all duration-300 hover:bg-accent/90 hover:shadow-glow-accent-lg transform hover:scale-105"
            >
              Download CV (PDF)
            </a>
          </div>
        </AnimatedComponent>
        
        <div className="space-y-10">
          {CV_DATA.map((section, sectionIndex) => (
            <AnimatedComponent key={section.title} delay={sectionIndex * 100}>
              <div className="bg-card-dark p-6 rounded-lg border border-accent/20">
                <h3 className="text-3xl text-accent mb-4 pb-2 border-b-2 border-accent/30">{section.title}</h3>
                <ul className="space-y-4">
                  {section.items.map((item, itemIndex) => (
                     <AnimatedComponent key={itemIndex} delay={itemIndex * 50}>
                        <li className="flex flex-col sm:flex-row text-lg">
                          <p className="sm:w-1/4 text-text-secondary/80 font-semibold">{item.period}</p>
                          <div className="sm:w-3/4">
                            <p className="font-bold text-text-light">{item.title}</p>
                            {item.institution && <p className="text-text-secondary italic">{item.institution}</p>}
                            {item.description && <p className="text-text-secondary mt-1">{item.description}</p>}
                          </div>
                        </li>
                     </AnimatedComponent>
                  ))}
                </ul>
              </div>
            </AnimatedComponent>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
};

export default CV;