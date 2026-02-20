
import React from 'react';
import { 
  PROFILE_DATA, 
  SOCIAL_LINKS, 
  EDUCATION_DATA,
  PUBLICATIONS_DATA,
  MANUSCRIPTS_DATA,
  PATENTS_DATA,
  CONFERENCE_PRESENTATIONS_DATA,
  HONORS_AWARDS_DATA,
  RESEARCH_EXPERIENCE_DATA,
  PROFESSIONAL_EXPERIENCE_DATA,
  TEACHING_EXPERIENCE_DATA,
  PROFESSIONAL_SKILLS_DATA,
} from '../constants';

interface CVPageProps {
  onBack: () => void;
}

const CVPage: React.FC<CVPageProps> = ({ onBack }) => {

  const handlePrint = () => {
    window.print();
  };
  
  const highlightName = (authors: string[]) => {
      const highlighted = authors.join(', ').replace('Moon, K.', '<strong>Moon, K.</strong>');
      return { __html: highlighted };
  }

  return (
    <>
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #cv-print-area, #cv-print-area * {
            visibility: visible;
          }
          #cv-print-area {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            margin: 0;
            padding: 0;
            border: 0;
            font-size: 10pt;
            color: #333333; /* charcoal */
          }
          .no-print {
            display: none !important;
          }
          a {
            text-decoration: none !important;
            color: inherit !important;
          }
          a[href]:after {
            content: "" !important;
          }
           .cv-section-title {
            color: #0F172A !important; 
            border-color: #333333 !important; /* charcoal */
           }
        }
        @page {
          size: A4;
          margin: 0.75in;
        }
      `}</style>
      <div className="bg-bg-dark min-h-screen font-sans text-text-light">
        <header className="no-print bg-bg-dark/90 backdrop-blur-lg p-4 flex justify-between items-center sticky top-0 z-50 shadow-md border-b border-accent/10">
            <button onClick={onBack} className="bg-accent/10 text-accent font-semibold py-2 px-4 rounded-md hover:bg-accent hover:text-white transition-all duration-300">
                &larr; Back to Main Site
            </button>
            <h1 className="text-xl font-bold text-text-light hidden sm:block">Curriculum Vitae</h1>
            <button onClick={handlePrint} className="bg-accent text-white font-semibold py-2 px-4 rounded-md hover:bg-accent/90 transition-colors shadow-sm">
                Print / Save as PDF
            </button>
        </header>
        
        <main id="cv-print-area" className="container mx-auto p-8 md:p-12 bg-white shadow-xl my-8 max-w-4xl text-base md:text-lg font-serif text-charcoal border border-slate-100 rounded-sm">
            {/* Header Section */}
            <header className="mb-6">
              <div className="flex justify-between items-baseline">
                <h1 className="text-4xl font-bold text-navy">{PROFILE_DATA.name}</h1>
                <p className="text-slate-500 text-xs">Last Updated ({PROFILE_DATA.lastUpdated})</p>
              </div>
              <div className="flex justify-start flex-wrap gap-x-4 gap-y-1 mt-2 text-sm text-slate-600 border-b pb-4">
                  <a href={SOCIAL_LINKS.email} className="hover:text-teal-accent transition-colors">{PROFILE_DATA.email}</a>
                  <span className="text-slate-300">|</span>
                  <a href={SOCIAL_LINKS.website} target="_blank" rel="noopener noreferrer" className="hover:text-teal-accent transition-colors">{SOCIAL_LINKS.website}</a>
              </div>
            </header>

            {/* CV Sections */}
            <div className="space-y-6">
              {/* Education */}
              <section>
                <h2 className="cv-section-title text-xl font-bold text-navy mb-3 pb-1 border-b-2 border-charcoal">EDUCATION</h2>
                <ul className="space-y-3">
                  {EDUCATION_DATA.map((item, index) => (
                    <li key={index} className="grid grid-cols-4 gap-x-4">
                      <p className="col-span-4 md:col-span-1 text-slate-600">{item.period}</p>
                      <div className="col-span-4 md:col-span-3">
                        <p className="font-bold text-charcoal">{item.title}</p>
                        <p>{item.institution}</p>
                        {item.details && (
                          <div className="text-slate-700 text-sm mt-1">
                            {Array.isArray(item.details) ? item.details.map((d, i) => <p key={i}>{d}</p>) : <p>{item.details}</p>}
                          </div>
                        )}
                      </div>
                      <p className="col-span-4 md:col-span-1"></p>
                      <p className="col-span-4 md:col-span-3 text-slate-600">{item.location}</p>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Publications */}
              <section>
                <h2 className="cv-section-title text-xl font-bold text-navy mb-3 pb-1 border-b-2 border-charcoal">PUBLICATIONS</h2>
                <ul className="space-y-3">
                  {PUBLICATIONS_DATA.map((pub, index) => (
                    <li key={index} className="leading-relaxed">
                      <p className="text-charcoal">
                        <span dangerouslySetInnerHTML={highlightName(pub.authors)}></span> ({pub.year}). {pub.title}. <em className="text-slate-700">{pub.venue}</em>. 
                        {pub.link !== "#" && <><br/><a href={pub.link} target="_blank" rel="noopener noreferrer" className="text-teal-accent hover:underline break-all">doi: {pub.link.replace('https://doi.org/', '')}</a></>}
                      </p>
                    </li>
                  ))}
                </ul>
              </section>
              
              {/* Manuscripts */}
              <section>
                <h2 className="cv-section-title text-xl font-bold text-navy mb-3 pb-1 border-b-2 border-charcoal">MANUSCRIPTS UNDER REVIEW & IN PREPARATION</h2>
                <ul className="space-y-3">
                  {MANUSCRIPTS_DATA.map((item, index) => (
                    <li key={index} className="leading-relaxed">
                        <span dangerouslySetInnerHTML={highlightName(item.authors)}></span> ({item.status}) {item.title} <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-teal-accent hover:underline break-all">{item.link}</a>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Patents */}
              <section>
                <h2 className="cv-section-title text-xl font-bold text-navy mb-3 pb-1 border-b-2 border-charcoal">PATENTS</h2>
                <ul className="space-y-3">
                  {PATENTS_DATA.map((item, index) => (
                    <li key={index} className="leading-relaxed">
                        <span dangerouslySetInnerHTML={highlightName(item.inventors)}></span> ({item.year}). {item.title}<br/>{item.id}
                    </li>
                  ))}
                </ul>
              </section>

              {/* Conference Presentations */}
              <section>
                <h2 className="cv-section-title text-xl font-bold text-navy mb-3 pb-1 border-b-2 border-charcoal">CONFERENCE PRESENTATIONS</h2>
                {CONFERENCE_PRESENTATIONS_DATA.map(cat => (
                  <div key={cat.category} className="mt-3">
                    <h3 className="font-bold mb-2 text-navy">{cat.category}</h3>
                    <ul className="space-y-3 pl-4">
                      {cat.items.map((item, index) => (
                        <li key={index} className="leading-relaxed">
                          <span dangerouslySetInnerHTML={highlightName(item.authors)}></span> ({item.date}). {item.title} <em>{item.conference}</em>, {item.location}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </section>

              {/* Honors & Awards */}
              <section>
                <h2 className="cv-section-title text-xl font-bold text-navy mb-3 pb-1 border-b-2 border-charcoal">HONORS & AWARDS</h2>
                {HONORS_AWARDS_DATA.map(cat => (
                  <div key={cat.category} className="mt-3">
                    <h3 className="font-bold mb-2 text-navy">{cat.category}</h3>
                    <ul className="space-y-3">
                      {cat.items.map((item, index) => (
                        <li key={index} className="grid grid-cols-4 gap-x-4">
                          <p className="col-span-4 md:col-span-1 text-slate-600 text-right">{item.period}</p>
                          <div className="col-span-4 md:col-span-3">
                            <p className="font-bold text-charcoal">{item.title}</p>
                            {item.details && <p className="text-slate-700 text-sm mt-1">{item.details}</p>}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </section>

              {/* Experience Sections */}
              {[
                {title: "RESEARCH EXPERIENCE", data: RESEARCH_EXPERIENCE_DATA},
                {title: "PROFESSIONAL EXPERIENCE", data: PROFESSIONAL_EXPERIENCE_DATA},
                {title: "TEACHING EXPERIENCE", data: TEACHING_EXPERIENCE_DATA},
              ].map(section => (
                <section key={section.title}>
                  <h2 className="cv-section-title text-xl font-bold text-navy mb-3 pb-1 border-b-2 border-charcoal">{section.title}</h2>
                  <ul className="space-y-3">
                    {section.data.map((item, index) => (
                      <li key={index} className="grid grid-cols-4 gap-x-4">
                        <p className="col-span-4 md:col-span-1 text-slate-600 text-right">{item.period}</p>
                        <div className="col-span-4 md:col-span-3">
                          <p className="font-bold text-charcoal">{item.title}</p>
                          <p>{item.institution}</p>
                          {item.details && <p className="text-slate-700 text-sm mt-1">{item.details}</p>}
                        </div>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
              
              {/* Professional Skills */}
               <section>
                <h2 className="cv-section-title text-xl font-bold text-navy mb-3 pb-1 border-b-2 border-charcoal">PROFESSIONAL SKILLS</h2>
                <ul className="space-y-3">
                  {PROFESSIONAL_SKILLS_DATA.map((skill, index) => (
                     <li key={index} className="grid grid-cols-4 gap-x-4">
                        <p className="col-span-4 md:col-span-1 font-bold text-charcoal">{skill.category}</p>
                        <div className="col-span-4 md:col-span-3">
                          <p>{skill.list}</p>
                        </div>
                      </li>
                  ))}
                </ul>
               </section>

            </div>
        </main>
      </div>
    </>
  );
};

export default CVPage;
