import React, { useState, useEffect } from 'react';
import { PROFILE_DATA, SOCIAL_LINKS } from '../constants';
import { GoogleScholarIcon, OrcidIcon, LinkedInIcon, GithubIcon, TwitterIcon, MailIcon } from './icons/SocialIcons';
import { PROFILE_IMAGE_URL } from './assets';

const SectionWrapper: React.FC<{id: string; children: React.ReactNode}> = ({id, children}) => (
    <section id={id} className="relative min-h-screen flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="container mx-auto z-10">
            {children}
        </div>
    </section>
);


const Home: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <SectionWrapper id="home">
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
            <div className={`md:w-1/3 flex-shrink-0 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
                <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto">
                  <div className="absolute inset-0 rounded-full bg-accent animate-pulse"></div>
                  <img
                      src={PROFILE_IMAGE_URL}
                      alt={PROFILE_DATA.name}
                      className="relative rounded-full w-full h-full object-cover shadow-2xl border-4 border-bg-dark"
                  />
                </div>
            </div>
            <div className={`md:w-2/3 text-center md:text-left bg-card-dark backdrop-blur-md p-6 rounded-lg border border-accent/20 transition-all duration-1000 delay-200 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
                <h1 className="text-5xl md:text-6xl font-bold text-text-light mb-2">{PROFILE_DATA.name}</h1>
                <h2 className="text-2xl md:text-3xl text-accent font-semibold mb-4">{PROFILE_DATA.title}</h2>
                <p className="text-xl text-text-secondary mb-6">{PROFILE_DATA.bio}</p>
                {PROFILE_DATA.rotatingQuote && <p className="text-lg text-text-secondary/80 italic mb-6">"{PROFILE_DATA.rotatingQuote}"</p>}
                <div className="flex justify-center md:justify-start space-x-5">
                    {SOCIAL_LINKS.email && <a href={SOCIAL_LINKS.email} aria-label="Email" className="text-text-secondary hover:text-accent transition-transform hover:scale-110"><MailIcon /></a>}
                    {SOCIAL_LINKS.googleScholar && <a href={SOCIAL_LINKS.googleScholar} target="_blank" rel="noopener noreferrer" aria-label="Google Scholar" className="text-text-secondary hover:text-accent transition-transform hover:scale-110"><GoogleScholarIcon /></a>}
                    {SOCIAL_LINKS.orcid && <a href={SOCIAL_LINKS.orcid} target="_blank" rel="noopener noreferrer" aria-label="ORCID" className="text-text-secondary hover:text-accent transition-transform hover:scale-110"><OrcidIcon /></a>}
                    {SOCIAL_LINKS.linkedIn && <a href={SOCIAL_LINKS.linkedIn} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-text-secondary hover:text-accent transition-transform hover:scale-110"><LinkedInIcon /></a>}
                    {SOCIAL_LINKS.github && <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-text-secondary hover:text-accent transition-transform hover:scale-110"><GithubIcon /></a>}
                    {SOCIAL_LINKS.twitter && <a href={SOCIAL_LINKS.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="text-text-secondary hover:text-accent transition-transform hover:scale-110"><TwitterIcon /></a>}
                </div>
            </div>
        </div>
    </SectionWrapper>
  );
};

export default Home;