
import React, { useState, useEffect } from 'react';
import type { Publication } from '../types';
import { RESEARCH_INTERESTS, PUBLICATIONS_DATA, PROFILE_DATA } from '../constants';
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


const PublicationItem: React.FC<{ pub: Publication }> = ({ pub }) => {
  const [isAbstractVisible, setAbstractVisible] = useState(false);

  const getHighlightedAuthors = (authors: string[]) => {
    const fullString = authors.join(', ');
    // Split by the name to highlight, keeping the delimiter in the result array
    const parts = fullString.split(/(Moon, K\.)/g);
    return parts.map((part, index) => 
      part === 'Moon, K.' ? <strong key={index} className="font-bold text-text-light">Moon, K.</strong> : part
    );
  };
  
  return (
    <div className="mb-6 bg-card-dark p-4 rounded-lg border border-accent/20 transition-all duration-300 hover:border-accent hover:shadow-glow-accent">
      <h4 className="text-xl font-semibold text-text-light">
        <a href={pub.link} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">{pub.title}</a>
      </h4>
      <p className="text-text-secondary text-base my-1">{getHighlightedAuthors(pub.authors)}</p>
      <p className="text-text-secondary/80 text-base italic">{pub.venue}, {pub.year}</p>
      <div className="mt-2 flex flex-wrap gap-2 items-center">
        {pub.tags.map(tag => (
          <span key={tag} className="bg-accent/10 text-accent text-xs font-semibold px-2.5 py-0.5 rounded-full">{tag}</span>
        ))}
        {pub.abstract && (
            <button 
                onClick={() => setAbstractVisible(!isAbstractVisible)}
                className="text-accent text-xs font-semibold px-2.5 py-0.5 rounded-full hover:bg-accent/20 transition-colors"
                aria-expanded={isAbstractVisible}
            >
                {isAbstractVisible ? 'Hide' : 'Show'} Abstract
            </button>
        )}
      </div>
      {isAbstractVisible && pub.abstract && (
        <p className="text-text-secondary text-base mt-3 bg-bg-dark p-4 rounded-md border border-accent/10">{pub.abstract}</p>
      )}
    </div>
  );
};

const Research: React.FC = () => {
  const [publications, setPublications] = useState<Publication[]>(PUBLICATIONS_DATA);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!PROFILE_DATA.orcidId) {
      return; // Use manual data if no ORCID iD is provided
    }

    const fetchOrcidData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`https://pub.orcid.org/v3.0/${PROFILE_DATA.orcidId}/works`, {
          headers: { 'Accept': 'application/json' }
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch ORCID data (Status: ${response.status})`);
        }

        const data = await response.json();
        
        const getDoiLink = (externalIds: any[]): string => {
          if (!externalIds || !Array.isArray(externalIds)) return "#";
          const doi = externalIds.find(id => id['external-id-type'] === 'doi');
          return doi ? `https://doi.org/${doi['external-id-value']}` : "#";
        };

        const mappedPublications: Publication[] = data.group.map((work: any) => {
          const workSummary = work['work-summary'][0];
          
          const lastName = PROFILE_DATA.name.split(' ').pop();
          // Adjust logic to correctly get first initial "K" from "Kibum" instead of "M" from "Moon"
          const firstName = PROFILE_DATA.name.split(' ')[0]; 
          const firstNameInitial = firstName ? firstName.charAt(0) : '';
          const authors = [`${lastName}, ${firstNameInitial}.`, "et al."];

          return {
            title: workSummary.title.title.value,
            authors: authors,
            venue: workSummary['journal-title']?.value || "Publication Venue Not Available",
            year: parseInt(workSummary['publication-date']?.year?.value, 10) || new Date().getFullYear(),
            link: getDoiLink(workSummary['external-ids']['external-id']),
            abstract: "", 
            tags: ["Fetched from ORCID"],
          };
        }).filter(Boolean);

        setPublications(mappedPublications);
      } catch (err) {
        console.error("ORCID Fetch Error:", err);
        setError("Could not load publications from ORCID. Displaying manually entered data as a fallback.");
        setPublications(PUBLICATIONS_DATA); 
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrcidData();
  }, []);

  return (
    <SectionWrapper id="research" title="Research">
        <div className="max-w-4xl mx-auto">
          <AnimatedComponent>
            <div className="bg-card-dark p-6 rounded-lg border border-accent/20 mb-12">
              <h3 className="text-3xl text-accent mb-4">Research Interests</h3>
              <ul className="list-disc list-inside space-y-2 text-text-secondary text-lg columns-1 md:columns-2">
                  {RESEARCH_INTERESTS.map(interest => <li key={interest}>{interest}</li>)}
              </ul>
            </div>
          </AnimatedComponent>
            
          <AnimatedComponent delay={200}>
            <h3 className="text-3xl text-accent mb-6">Publications</h3>
            
            {PROFILE_DATA.orcidId && !error && (
              <div className="text-base text-text-secondary/80 mb-6 text-center md:text-left">
                Publication list is automatically sourced from <a href={`https://orcid.org/${PROFILE_DATA.orcidId}`} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">ORCID</a>.
              </div>
            )}
          </AnimatedComponent>
            
            {isLoading && <p className="text-center text-text-secondary">Loading publications from ORCID...</p>}
            
            {error && <p className="text-center text-red-400 bg-red-900/50 p-3 rounded-md mb-4">{error}</p>}
            
            <div className={isLoading ? 'hidden' : 'block'}>
                {publications.map((pub, index) => (
                  <AnimatedComponent key={index} delay={index * 100}>
                    <PublicationItem pub={pub} />
                  </AnimatedComponent>
                ))}
            </div>
        </div>
    </SectionWrapper>
  );
};

export default Research;
