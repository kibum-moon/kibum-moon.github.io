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
const cardLiftClass = 'group relative overflow-hidden rounded-sm border border-transparent bg-[#f7f8f5] transition-all duration-300 hover:-translate-y-1 hover:border-[#cfe2dc] hover:shadow-[0_18px_36px_rgba(44,52,49,0.08),0_0_0_1px_rgba(238,248,245,0.82),0_0_18px_rgba(125,238,216,0.22)]';
const rowCardClass = `${cardLiftClass} flex flex-col gap-2 px-4 py-4 md:flex-row md:items-baseline md:justify-between`;
const cardAccentClass = 'pointer-events-none absolute inset-y-4 left-0 w-[3px] bg-[#63d6c5] opacity-0 transition-all duration-300 group-hover:inset-y-3 group-hover:opacity-100';
const inlineLinkClass = 'inline-flex items-center gap-2 transition-all duration-200 hover:translate-x-1 hover:text-[#1b8f7e] hover:[text-shadow:0_0_8px_rgba(125,238,216,0.24)]';

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
const awardEndYear = (period: string) => {
  const matches = period.match(/\d{4}/g);
  if (!matches) return 0;
  return Math.max(...matches.map(Number));
};

const orderedAwards = HONORS_AWARDS_DATA.flatMap((category) =>
  category.items.map((item) => ({ ...item, category: category.category })),
).sort((a, b) => awardEndYear(b.period) - awardEndYear(a.period));

const formatAuthors = (authors: string[]) =>
  authors.map((author, index) => (
    <React.Fragment key={`${author}-${index}`}>
      {index > 0 ? ', ' : null}
      {author === 'Moon, K.' ? <strong className="font-semibold text-[#17140f]">Moon, K.</strong> : author}
    </React.Fragment>
  ));

const SectionTitle: React.FC<{ title: string; subtitle?: string }> = ({ title, subtitle }) => (
  <div className="mb-6">
    <h2 className="text-3xl font-bold tracking-tight text-[#17140f]" style={headingStyle}>
      {title}
    </h2>
    {subtitle ? <p className="mt-2 max-w-2xl text-[0.95rem] leading-6 text-[#626863]">{subtitle}</p> : null}
  </div>
);

const Subheading: React.FC<{ title: string }> = ({ title }) => (
  <div className="mb-4 flex items-center gap-3">
    <span className="h-2 w-2 bg-[#6abda9]" aria-hidden />
    <h3 className="text-[0.78rem] font-bold uppercase tracking-[0.22em] text-[#6b746d]">{title}</h3>
  </div>
);

const UpdatesRail: React.FC<{ compact?: boolean }> = ({ compact = false }) => (
  <section
    className={`${compact ? 'p-0' : 'p-0'}`}
    style={bodyStyle}
  >
    <SectionTitle title="Updates" />
    <div className="space-y-4">
      {recentUpdates.map((update) => (
        <a
          key={`${update.date}-${update.title}`}
          href={update.link}
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          <article className={`${cardLiftClass} px-3 py-3`}>
            <span aria-hidden className={cardAccentClass} />
            <div className="relative z-10">
              <div className="flex flex-wrap items-center gap-2 text-[0.68rem] uppercase tracking-[0.18em] text-[#7c847d] transition-colors duration-200 group-hover:text-[#636b65]">
                <span>{update.eyebrow}</span>
                <span className="ml-auto">{update.date}</span>
              </div>
              <h3 className="mt-2 pr-4 text-[0.96rem] leading-5 text-[#17140f] transition-all duration-200 group-hover:translate-x-1 group-hover:text-[#1b8f7e] group-hover:[text-shadow:0_0_10px_rgba(125,238,216,0.22)]">
                {update.title}
              </h3>
              <p className="mt-1.5 text-[0.84rem] leading-5 text-[#575d58] transition-colors duration-200 group-hover:text-[#404743]">
                {update.summary}
              </p>
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
    <a
      href={publication.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group block"
      aria-label={`Open publication: ${publication.title}`}
    >
      <article className={`${cardLiftClass} px-3 py-3 group-active:translate-y-[1px] group-active:scale-[0.992] group-active:border-[#9fd8ce] group-active:shadow-[0_10px_18px_rgba(44,52,49,0.08),0_0_14px_rgba(125,238,216,0.18)]`}>
        <span aria-hidden className={cardAccentClass} />
        <span aria-hidden className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-150 group-active:opacity-100 bg-[radial-gradient(circle_at_28%_50%,rgba(125,238,216,0.14),transparent_42%)]" />
        <div className="relative z-10 grid gap-3 transition-transform duration-200 group-active:translate-x-[2px] md:grid-cols-[128px_minmax(0,1fr)] md:gap-4">
          <div className="shrink-0 w-full sm:w-[128px]">
            {hasCoverImage ? (
              <div className="overflow-hidden border border-[#d8ddd7] bg-[#fafbf8] p-1 transition-all duration-300 group-hover:border-[#cfe2dc] group-hover:shadow-[0_12px_24px_rgba(45,54,50,0.08),0_0_14px_rgba(125,238,216,0.18)] group-active:border-[#9fd8ce]">
                <div className="aspect-[5/7] w-full bg-white">
                  <img
                    src={publication.image}
                    alt={publication.title}
                    className="h-full w-full object-contain object-top transition-transform duration-500 group-hover:scale-[1.03] group-active:scale-[0.985]"
                    loading="lazy"
                  />
                </div>
              </div>
            ) : (
              <div className="flex aspect-[5/7] w-full flex-col justify-end border border-[#d8ddd7] bg-[#eff2ee] p-3 transition-all duration-300 group-hover:border-[#cfe2dc] group-hover:bg-[#f4faf8] group-active:border-[#9fd8ce]">
                <h4 className="text-[1rem] font-serif leading-tight text-[#17140f] italic opacity-80" style={{ fontStyle: 'italic' }}>
                  {publication.venue.split(',')[0]}
                </h4>
              </div>
            )}
          </div>
          <div className="space-y-1.5 transition-transform duration-300 group-hover:translate-x-0.5">
            <h3 className="text-[1.06rem] font-bold leading-6 text-[#17140f] transition-all duration-200 group-hover:text-[#1b8f7e] group-hover:[text-shadow:0_0_10px_rgba(125,238,216,0.22)] group-active:translate-x-1" style={headingStyle}>
              {publication.title}
            </h3>
            <p className="text-[0.88rem] leading-5 text-[#4b514c]">
              {formatAuthors(publication.authors)} ({publication.year}).
            </p>
            <p className="text-[0.88rem] italic leading-5 text-[#6c746d] transition-all duration-200 group-hover:translate-x-1 group-hover:text-[#1b8f7e] group-hover:[text-shadow:0_0_8px_rgba(125,238,216,0.2)] group-active:translate-x-2">
              {publication.venue}
            </p>
            {publication.abstract && (
              <p className="text-[0.84rem] leading-5 text-[#4b514c]">{publication.abstract}</p>
            )}
            <div className="flex flex-wrap items-center gap-2 pt-0.5 text-[0.7rem] uppercase tracking-[0.18em] text-[#75807a]">
              <span className="inline-flex items-center gap-2 transition-all duration-200">
                {doiLabel}
              </span>
            </div>
          </div>
        </div>
      </article>
    </a>
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
    <div className="min-h-screen bg-[#f1f3f0] text-[#1f1a14]" style={bodyStyle}>
      <div className="mx-auto grid max-w-[1600px] gap-8 px-5 py-8 md:px-8 lg:grid-cols-[280px_minmax(0,1fr)] xl:grid-cols-[280px_minmax(0,1fr)_280px] xl:gap-12 xl:px-10">
        <aside className="lg:sticky lg:top-8 lg:self-start">
          <div className="border-r border-[#d6dad4] pr-6 lg:pr-8">
            <h1 className="text-4xl font-bold leading-tight text-[#17140f]" style={headingStyle}>
              {PROFILE_DATA.name}
            </h1>
            <p className="mt-3 text-[0.95rem] leading-7 text-[#4b514c]">
              {PROFILE_DATA.title}
              <br />
              {PROFILE_DATA.institution}
            </p>

            <div className="group mt-8 w-full max-w-[210px]">
              <div className="overflow-hidden border border-[#d6dad4] transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_16px_28px_rgba(45,54,50,0.08),0_0_14px_rgba(125,238,216,0.16)]">
                <img
                  src={PROFILE_IMAGE_URL}
                  alt={PROFILE_DATA.name}
                  className="aspect-[4/5] w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
              </div>
            </div>

            <div className="mt-8 space-y-3 text-[0.92rem] leading-6 text-[#4b514c]">
              <p>{PROFILE_DATA.email}</p>
              <a
                href={SOCIAL_LINKS.googleScholar}
                target="_blank"
                rel="noopener noreferrer"
                className={inlineLinkClass}
              >
                Google Scholar →
              </a>
              <a
                href={PROFILE_DATA.cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={inlineLinkClass}
              >
                Download CV →
              </a>
            </div>

            <nav className="mt-8 pt-6">
              <ul className="space-y-3 text-[0.78rem] uppercase tracking-[0.18em] text-[#75807a]">
                {navigationLinks.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} className={inlineLinkClass}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </aside>

        <main className="min-w-0 border border-[#d8ddd7] bg-[#fcfdfb] px-6 py-7 md:px-8 md:py-8 xl:px-10">
          <section id="about" className="pb-10">
            <SectionTitle title="About" />
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
              <div className="space-y-5 text-[0.98rem] leading-8 text-[#313632]">
                <p>{PROFILE_DATA.bio}</p>
              </div>

              <div>
                <p className="text-[0.78rem] uppercase tracking-[0.2em] text-[#7c847d]">Focus Areas</p>
                <ul className="mt-4 space-y-2 text-[0.95rem] leading-7 text-[#4b514c]">
                  {RESEARCH_INTERESTS.map((interest) => (
                    <li key={interest} className="flex items-start gap-2">
                      <span className="text-[#a5b5ad]">―</span> {interest}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <div className="xl:hidden">
            <UpdatesRail compact />
          </div>

          <section id="publications" className="py-10">
            <SectionTitle title="Publications" />
            <div className="mb-6 flex flex-wrap gap-2 pb-2">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`rounded-full border px-3 py-1.5 text-[0.75rem] uppercase tracking-[0.18em] transition-all duration-200 ${activeTab === tab
                      ? 'border-[#17140f] bg-[#17140f] text-[#fcfdfb] shadow-[0_8px_18px_rgba(23,20,15,0.14),0_0_12px_rgba(125,238,216,0.14)]'
                      : 'border-[#d8ddd7] text-[#737d77] hover:-translate-y-0.5 hover:border-[#cfe2dc] hover:bg-[#f2fbf8] hover:text-[#1b8f7e] hover:[text-shadow:0_0_8px_rgba(125,238,216,0.22)] hover:shadow-[0_10px_22px_rgba(45,54,50,0.06),0_0_14px_rgba(125,238,216,0.14)]'
                    }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="space-y-3">
              {displayedPublications.map((publication) => (
                <PublicationCard key={`${publication.year}-${publication.title}`} publication={publication} />
              ))}
            </div>
          </section>

          <section id="teaching" className="py-10">
            <SectionTitle title="Teaching" />
            <div className="space-y-3">
              {teachingHighlights.map((course) => (
                <article key={`${course.period}-${course.title}`} className={rowCardClass}>
                  <span aria-hidden className={cardAccentClass} />
                  <div className="relative z-10">
                    <h3 className="flex flex-wrap items-center gap-2 text-[1.08rem] font-medium leading-7 text-[#17140f] transition-colors duration-200 group-hover:text-[#1b8f7e] group-hover:[text-shadow:0_0_8px_rgba(125,238,216,0.2)]" style={headingStyle}>
                      <span>{course.title}</span>
                      {course.link && (
                        <a href={course.link} target="_blank" rel="noopener noreferrer" className="border border-[#d6dad4] px-2 py-0.5 text-[0.65rem] uppercase tracking-widest text-[#5f6761] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#cfe2dc] hover:text-[#1b8f7e] hover:[text-shadow:0_0_8px_rgba(125,238,216,0.2)] hover:shadow-[0_0_12px_rgba(125,238,216,0.14)]">
                          Syllabus
                        </a>
                      )}
                    </h3>
                    <p className="mt-1 text-[0.88rem] leading-6 text-[#4b514c] transition-colors duration-200 group-hover:text-[#414742]">{course.institution}</p>
                  </div>
                  <p className="relative z-10 text-[0.76rem] uppercase tracking-[0.2em] text-[#7c847d] transition-colors duration-200 group-hover:text-[#636b65] shrink-0 md:text-right">{course.period}</p>
                </article>
              ))}
            </div>
          </section>

          <section id="experience" className="py-10">
            <SectionTitle title="Experience" />

            <div className="mb-8">
              <Subheading title="Research Experience" />
              <div className="space-y-3">
                {RESEARCH_EXPERIENCE_DATA.map((exp) => (
                  <article key={`${exp.period}-${exp.title}`} className={rowCardClass}>
                    <span aria-hidden className={cardAccentClass} />
                    <div className="relative z-10">
                      <h4 className="text-[1.05rem] font-medium leading-7 text-[#17140f] transition-colors duration-200 group-hover:text-[#1b8f7e] group-hover:[text-shadow:0_0_8px_rgba(125,238,216,0.2)]" style={headingStyle}>
                        {exp.title}
                      </h4>
                      <p className="mt-1 text-[0.88rem] leading-6 text-[#4b514c] transition-colors duration-200 group-hover:text-[#414742]">{exp.institution}</p>
                      {exp.details && <p className="mt-1 text-[0.85rem] italic leading-6 text-[#626863] transition-colors duration-200 group-hover:text-[#4a514c]">{exp.details}</p>}
                    </div>
                    <p className="relative z-10 text-[0.76rem] uppercase tracking-[0.2em] text-[#7c847d] transition-colors duration-200 group-hover:text-[#636b65] shrink-0 md:text-right">
                      {exp.period}
                    </p>
                  </article>
                ))}
              </div>
            </div>

            <div>
              <Subheading title="Professional Experience" />
              <div className="space-y-3">
                {PROFESSIONAL_EXPERIENCE_DATA.map((exp) => (
                  <article key={`${exp.period}-${exp.title}`} className={rowCardClass}>
                    <span aria-hidden className={cardAccentClass} />
                    <div className="relative z-10">
                      <h4 className="text-[1.05rem] font-medium leading-7 text-[#17140f] transition-colors duration-200 group-hover:text-[#1b8f7e] group-hover:[text-shadow:0_0_8px_rgba(125,238,216,0.2)]" style={headingStyle}>
                        {exp.title}
                      </h4>
                      <p className="mt-1 text-[0.88rem] leading-6 text-[#4b514c] transition-colors duration-200 group-hover:text-[#414742]">{exp.institution}</p>
                      {exp.details && <p className="mt-1 text-[0.85rem] italic leading-6 text-[#626863] transition-colors duration-200 group-hover:text-[#4a514c]">{exp.details}</p>}
                    </div>
                    <p className="relative z-10 text-[0.76rem] uppercase tracking-[0.2em] text-[#7c847d] transition-colors duration-200 group-hover:text-[#636b65] shrink-0 md:text-right">
                      {exp.period}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section id="awards" className="py-10">
            <SectionTitle title="Honors & Awards" />
            <div className="space-y-3">
              {orderedAwards.map((award) => (
                <article key={`${award.period}-${award.title}`} className={rowCardClass}>
                  <span aria-hidden className={cardAccentClass} />
                  <div className="relative z-10">
                    <p className="mb-1 text-[0.68rem] uppercase tracking-[0.2em] text-[#6b746d] transition-colors duration-200 group-hover:text-[#5d6761]">{award.category}</p>
                    <h3 className="text-[1.05rem] font-medium leading-7 text-[#17140f] transition-colors duration-200 group-hover:text-[#1b8f7e] group-hover:[text-shadow:0_0_8px_rgba(125,238,216,0.2)]" style={headingStyle}>
                      {award.title}
                    </h3>
                    {award.details ? <p className="mt-1 text-[0.88rem] leading-6 text-[#626863] transition-colors duration-200 group-hover:text-[#4a514c]">{award.details}</p> : null}
                  </div>
                  <p className="relative z-10 text-[0.76rem] uppercase tracking-[0.2em] text-[#7c847d] transition-colors duration-200 group-hover:text-[#636b65] shrink-0 md:text-right">
                    {award.period}
                  </p>
                </article>
              ))}
            </div>
          </section>
        </main>

        <aside className="hidden xl:block xl:sticky xl:top-8 xl:self-start">
          <div className="scrollbar-hidden max-h-[calc(100vh-4rem)] overflow-y-auto border-l border-[#d6dad4] pl-8 pr-2">
            <UpdatesRail />
          </div>
        </aside>
      </div>

      <footer className="px-5 py-5 text-center text-[0.78rem] uppercase tracking-[0.18em] text-[#7c847d] md:px-8 xl:px-10">
        © {new Date().getFullYear()} {PROFILE_DATA.name}
      </footer>
    </div>
  );
};

export default HomePage;
