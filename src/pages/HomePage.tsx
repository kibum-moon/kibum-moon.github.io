import React, { useMemo, useState } from 'react';
import {
  BLOG_DATA,
  CONFERENCE_PRESENTATIONS_DATA,
  HONORS_AWARDS_DATA,
  PROFILE_DATA,
  PROFESSIONAL_EXPERIENCE_DATA,
  PUBLICATIONS_DATA,
  RESEARCH_EXPERIENCE_DATA,
  RESEARCH_INTERESTS,
  SOCIAL_LINKS,
  TEACHING_EXPERIENCE_DATA,
} from '../content/siteContent';
import { PROFILE_IMAGE_URL } from '../content/assets';

const headingStyle = { fontFamily: '"Raleway", sans-serif' };
const bodyStyle = { fontFamily: '"Roboto Mono", monospace' };

const navigationLinks = [
  { label: 'About', href: '#about' },
  { label: 'Publications', href: '#publications' },
  { label: 'Teaching', href: '#teaching' },
  { label: 'Experience', href: '#experience' },
  { label: 'Awards', href: '#awards' },
];

const recentUpdates = BLOG_DATA.slice(0, 4);
const recentTalks = CONFERENCE_PRESENTATIONS_DATA.flatMap((category) => category.items).slice(0, 4);
const teachingHighlights = TEACHING_EXPERIENCE_DATA;
const selectedAwards = HONORS_AWARDS_DATA.flatMap((category) =>
  category.items.map((item) => ({ ...item, category: category.category })),
).filter((award) => parseInt(award.period) >= 2021).slice(0, 4);

const formatAuthors = (authors: string[]) =>
  authors.map((author, index) => (
    <React.Fragment key={`${author}-${index}`}>
      {index > 0 ? ', ' : null}
      {author === 'Moon, K.' ? <strong className="font-semibold text-[#17140f]">Moon, K.</strong> : author}
    </React.Fragment>
  ));

const SectionTitle: React.FC<{ title: string; subtitle?: string }> = ({ title, subtitle }) => (
  <div className="mb-5 border-b border-[#ddd6cb] pb-3">
    <h2 className="text-3xl font-bold tracking-tight text-[#17140f]" style={headingStyle}>
      {title}
    </h2>
    {subtitle ? <p className="mt-2 text-[0.9rem] leading-6 text-[#655f55]">{subtitle}</p> : null}
  </div>
);

const UpdatesRail: React.FC<{ compact?: boolean }> = ({ compact = false }) => (
  <section
    className={`border border-[#e5ded2] bg-white/90 ${compact ? 'p-5' : 'p-6'} shadow-[0_14px_35px_rgba(41,33,22,0.06)]`}
    style={bodyStyle}
  >
    <SectionTitle title="Updates" subtitle="Recent papers, press, and funding with a little more pull." />
    <div className="space-y-4">
      {recentUpdates.map((update, index) => (
        <a
          key={`${update.date}-${update.title}`}
          href={update.link}
          target="_blank"
          rel="noopener noreferrer"
          className="group block"
        >
          <article className="relative overflow-hidden border border-[#e8e1d5] bg-[#fcfaf4] p-4 transition-all duration-300 hover:-translate-y-1 hover:border-[#2457a6] hover:bg-[#faf6ed] hover:shadow-[0_18px_40px_rgba(36,87,166,0.12)]">
            <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#2457a6] via-[#c96f4a] to-[#e2b04d] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="flex flex-wrap items-center gap-2 text-[0.68rem] uppercase tracking-[0.18em] text-[#7e776b]">
              <span className="border border-[#d7cfbf] bg-white px-2 py-1 text-[#4d473d]">{update.eyebrow}</span>
              {index === 0 ? <span className="bg-[#17140f] px-2 py-1 text-white">Newest</span> : null}
              <span className="ml-auto">{update.date}</span>
            </div>
            <h3 className="mt-3 text-[1rem] leading-6 text-[#17140f] transition-colors duration-300 group-hover:text-[#2457a6]">
              {update.title}
            </h3>
            <p className="mt-2 text-[0.82rem] leading-6 text-[#5f584d]">
              {update.summary}
            </p>
            <div className="mt-4 flex items-center justify-between border-t border-[#ece4d8] pt-3 text-[0.7rem] uppercase tracking-[0.18em] text-[#7e776b]">
              <span>Open update</span>
              <span className="text-base transition-transform duration-300 group-hover:translate-x-1">↗</span>
            </div>
          </article>
        </a>
      ))}
    </div>
  </section>
);

const PublicationCard: React.FC<{ publication: (typeof PUBLICATIONS_DATA)[0] }> = ({ publication }) => {
  const doiLabel = publication.link.startsWith('https://doi.org/')
    ? publication.link.replace('https://doi.org/', '')
    : 'Open link';

  const hasCoverImage = Boolean(publication.image);

  return (
    <article className="flex flex-col sm:flex-row gap-5 border-b border-[#e7e0d4] py-6 first:pt-0 items-start">
      <div className="shrink-0 w-full sm:w-[200px]">
        <a href={publication.link} target="_blank" rel="noopener noreferrer" className="block transition-opacity hover:opacity-80">
          {hasCoverImage ? (
            <img src={publication.image} alt={publication.title} className="w-full aspect-[4/3] object-contain bg-white border border-[#ddd6cb] p-1" loading="lazy" />
          ) : (
            <div className="w-full aspect-[4/3] bg-[#efede6] border border-[#ddd6cb] flex flex-col justify-end p-5">
              <h4 className="text-[1.1rem] font-serif leading-tight text-[#17140f] italic opacity-80" style={{ fontStyle: 'italic' }}>
                {publication.venue.split(',')[0]}
              </h4>
            </div>
          )}
        </a>
      </div>

      <div className="flex-1 space-y-3 mt-1">
        <div>
          <span className="text-[0.68rem] font-bold tracking-[0.25em] text-[#1f1a14] bg-[#f5efe3] border border-[#ddd6cb] px-2.5 py-1 uppercase" style={bodyStyle}>
            {publication.year}
          </span>
        </div>
        <h3 className="text-[1.1rem] font-bold leading-7 text-[#17140f] pt-2" style={headingStyle}>
          <a
            href={publication.link}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-[#2457a6]"
          >
            {publication.title}
          </a>
        </h3>
        <p className="text-[0.92rem] leading-7 text-[#4d473d]">{formatAuthors(publication.authors)}</p>
        <p className="text-[0.92rem] italic leading-6 text-[#6c675d]">{publication.venue}</p>
        {publication.abstract && (
          <p className="text-[0.88rem] leading-7 text-[#4d473d]">{publication.abstract}</p>
        )}
        <div className="flex flex-wrap items-center gap-4 text-[0.82rem] uppercase tracking-[0.16em] text-[#6f675a]">
          <a
            href={publication.link}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-[#2457a6]"
          >
            {doiLabel}
          </a>
        </div>
      </div>
    </article>
  );
};

const HomePage: React.FC = () => {
  const tabs = ['Selected', 'AI & Tech', 'Digital Well-being', 'Higher Ed', 'Clinical', 'Social/Culture'];
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const displayedPublications = useMemo(() => {
    if (activeTab === 'Selected') {
      const selected = PUBLICATIONS_DATA.filter((pub) => pub.authors[0].includes('Moon, K.'));
      const targetTitle = "The Creative Link Between Words and Ideas is Weakening in the AI Era";
      const targetIdx = selected.findIndex(p => p.title === targetTitle);
      if (targetIdx > -1) {
        const [target] = selected.splice(targetIdx, 1);
        selected.unshift(target);
      }
      return selected;
    }
    const themeMap: Record<string, string[]> = {
      'AI & Tech': ['AI', 'LLMs', 'Deep Learning', 'Recommender System', 'Mobile App', 'Online Learning', 'Prediction Model', 'Education', 'Creativity'],
      'Digital Well-being': ['Digital Well-being', 'Well-being', 'Digital Detox', 'Intervention', 'COVID-19'],
      'Higher Ed': ['Higher Ed'],
      'Clinical': ['Clinical Psychology', 'Validation', 'Scale Development', 'Mental Representation', 'Personality'],
      'Social/Culture': ['Culture', 'Social Relationships', 'Social Psychology', 'Narcissism', 'Self-Image', 'Ego Depletion', 'Reverse Correlation']
    };
    const targetTags = themeMap[activeTab] || [];
    let filtered = PUBLICATIONS_DATA.filter((pub) => pub.tags.some((t) => targetTags.includes(t)));
    if (activeTab === 'AI & Tech') {
      filtered = filtered.filter(pub => !pub.title.includes('The Promise and Peril'));
    }
    return filtered;
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-[#fcfaf4] text-[#1f1a14]" style={bodyStyle}>
      <div className="mx-auto grid max-w-[1680px] gap-8 px-5 py-6 md:px-8 lg:grid-cols-[320px_minmax(0,1fr)] xl:grid-cols-[320px_minmax(0,1fr)_310px] xl:gap-10 xl:px-10 xl:py-8">
        <aside className="lg:sticky lg:top-8 lg:self-start">
          <div className="border border-[#e5ded2] bg-white p-6 shadow-[0_14px_35px_rgba(41,33,22,0.06)]">
            <h1 className="mt-4 text-4xl font-bold leading-tight text-[#17140f]" style={headingStyle}>
              {PROFILE_DATA.name}
            </h1>
            <p className="mt-3 text-[0.92rem] leading-7 text-[#4d473d]">
              {PROFILE_DATA.title}
              <br />
              {PROFILE_DATA.institution}
            </p>

            <img
              src={PROFILE_IMAGE_URL}
              alt={PROFILE_DATA.name}
              className="mt-8 h-44 w-44 rounded-full object-cover"
            />

            <div className="mt-8 space-y-3 text-[0.88rem] leading-6 text-[#4d473d]">
              <p>{PROFILE_DATA.email}</p>
              <a
                href={SOCIAL_LINKS.googleScholar}
                target="_blank"
                rel="noopener noreferrer"
                className="block transition-colors hover:text-[#2457a6]"
              >
                Google Scholar →
              </a>
              <a
                href={PROFILE_DATA.cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block transition-colors hover:text-[#2457a6]"
              >
                Download CV →
              </a>
            </div>

            <nav className="mt-8 border-t border-[#eee8dd] pt-6">
              <ul className="space-y-3 text-[0.78rem] uppercase tracking-[0.18em] text-[#6f675a]">
                {navigationLinks.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} className="transition-colors hover:text-[#2457a6]">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </aside>

        <main className="min-w-0 space-y-12">
          <section id="about" className="border border-[#e5ded2] bg-white p-6 shadow-[0_14px_35px_rgba(41,33,22,0.06)] md:p-8">
            <SectionTitle title="About" />
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
              <div className="space-y-5 text-[0.92rem] leading-8 text-[#312c24]">
                <p>{PROFILE_DATA.bio}</p>
              </div>

              <div>
                <p className="text-[0.78rem] uppercase tracking-[0.2em] text-[#7e776b]">Focus Areas</p>
                <ul className="mt-4 space-y-1.5 text-[0.9rem] leading-6 text-[#4d473d]">
                  {RESEARCH_INTERESTS.map((interest) => (
                    <li key={interest} className="flex items-start gap-2">
                      <span className="text-[#b5ac9b]">―</span> {interest}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <div className="xl:hidden">
            <UpdatesRail compact />
          </div>

          <section id="publications" className="border border-[#e5ded2] bg-white p-6 shadow-[0_14px_35px_rgba(41,33,22,0.06)] md:p-8">
            <SectionTitle title="Publications" />
            <div className="mb-6 flex flex-wrap gap-2 border-b border-[#eee8dd] pb-4">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`border px-3 py-1.5 text-[0.75rem] uppercase tracking-[0.12em] transition-colors ${activeTab === tab
                      ? 'border-[#1f1a14] bg-[#1f1a14] text-white'
                      : 'border-[#d5cdbf] text-[#5b5449] hover:border-[#1f1a14] hover:text-[#1f1a14]'
                    }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div>
              {displayedPublications.map((publication) => (
                <PublicationCard key={`${publication.year}-${publication.title}`} publication={publication} />
              ))}
            </div>
          </section>

          <section id="teaching" className="border border-[#e5ded2] bg-white p-6 shadow-[0_14px_35px_rgba(41,33,22,0.06)] md:p-8">
            <SectionTitle title="Teaching" />
            <div className="space-y-4">
              {teachingHighlights.map((course) => (
                <article key={`${course.period}-${course.title}`} className="border-b border-[#eee8dd] pb-4 first:pt-0 last:border-b-0 last:pb-0 flex flex-col md:flex-row md:items-baseline md:justify-between gap-2">
                  <div>
                    <h3 className="text-[1.05rem] font-medium leading-7 text-[#17140f] flex flex-wrap items-center gap-2" style={headingStyle}>
                      <span>{course.title}</span>
                      {course.link && (
                        <a href={course.link} target="_blank" rel="noopener noreferrer" className="text-[0.65rem] tracking-widest uppercase border border-[#d5cdbf] px-2 py-0.5 text-[#5b5449] hover:bg-[#2457a6] hover:text-white hover:border-[#2457a6] transition-colors rounded-sm">
                          Syllabus
                        </a>
                      )}
                    </h3>
                    <p className="mt-1 text-[0.88rem] leading-6 text-[#4d473d]">{course.institution}</p>
                  </div>
                  <p className="text-[0.76rem] uppercase tracking-[0.2em] text-[#7e776b] shrink-0 md:text-right">{course.period}</p>
                </article>
              ))}
            </div>
          </section>

          <section id="experience" className="border border-[#e5ded2] bg-white p-6 shadow-[0_14px_35px_rgba(41,33,22,0.06)] md:p-8">
            <SectionTitle title="Experience" />

            <div className="mb-8">
              <h3 className="mb-4 text-[0.85rem] font-bold uppercase tracking-widest text-[#2457a6]">Research Experience</h3>
              <div className="space-y-4">
                {RESEARCH_EXPERIENCE_DATA.map((exp) => (
                  <article key={`${exp.period}-${exp.title}`} className="border-b border-[#eee8dd] pb-4 first:pt-0 last:border-b-0 last:pb-0 flex flex-col md:flex-row md:items-baseline md:justify-between gap-2">
                    <div>
                      <h4 className="text-[1.05rem] font-medium leading-7 text-[#17140f]" style={headingStyle}>
                        {exp.title}
                      </h4>
                      <p className="mt-1 text-[0.88rem] leading-6 text-[#4d473d]">{exp.institution}</p>
                      {exp.details && <p className="mt-1 text-[0.85rem] italic leading-6 text-[#655f55]">{exp.details}</p>}
                    </div>
                    <p className="text-[0.76rem] uppercase tracking-[0.2em] text-[#7e776b] shrink-0 md:text-right">
                      {exp.period}
                    </p>
                  </article>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-4 text-[0.85rem] font-bold uppercase tracking-widest text-[#2457a6]">Professional Experience</h3>
              <div className="space-y-4">
                {PROFESSIONAL_EXPERIENCE_DATA.map((exp) => (
                  <article key={`${exp.period}-${exp.title}`} className="border-b border-[#eee8dd] pb-4 first:pt-0 last:border-b-0 last:pb-0 flex flex-col md:flex-row md:items-baseline md:justify-between gap-2">
                    <div>
                      <h4 className="text-[1.05rem] font-medium leading-7 text-[#17140f]" style={headingStyle}>
                        {exp.title}
                      </h4>
                      <p className="mt-1 text-[0.88rem] leading-6 text-[#4d473d]">{exp.institution}</p>
                      {exp.details && <p className="mt-1 text-[0.85rem] italic leading-6 text-[#655f55]">{exp.details}</p>}
                    </div>
                    <p className="text-[0.76rem] uppercase tracking-[0.2em] text-[#7e776b] shrink-0 md:text-right">
                      {exp.period}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section id="awards" className="border border-[#e5ded2] bg-white p-6 shadow-[0_14px_35px_rgba(41,33,22,0.06)] md:p-8">
            <SectionTitle title="Selected Honors & Awards" />
            <div className="space-y-4">
              {selectedAwards.map((award) => (
                <article key={`${award.period}-${award.title}`} className="border-b border-[#eee8dd] pb-4 first:pt-0 last:border-b-0 last:pb-0 flex flex-col md:flex-row md:items-baseline md:justify-between gap-2">
                  <div>
                    <h3 className="text-[1.05rem] font-medium leading-7 text-[#17140f]" style={headingStyle}>
                      {award.title}
                    </h3>
                    {award.details ? <p className="mt-1 text-[0.88rem] leading-6 text-[#655f55]">{award.details}</p> : null}
                  </div>
                  <p className="text-[0.76rem] uppercase tracking-[0.2em] text-[#7e776b] shrink-0 md:text-right">
                    {award.period}
                  </p>
                </article>
              ))}
            </div>
          </section>
        </main>

        <aside className="hidden xl:block xl:sticky xl:top-8 xl:self-start">
          <UpdatesRail />
        </aside>
      </div>

      <footer className="border-t border-[#e5ded2] px-5 py-5 text-center text-[0.78rem] uppercase tracking-[0.18em] text-[#7e776b] md:px-8 xl:px-10">
        © {new Date().getFullYear()} {PROFILE_DATA.name}
      </footer>
    </div>
  );
};

export default HomePage;
