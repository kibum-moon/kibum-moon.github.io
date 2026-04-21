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
  <div className="mb-6">
    <h2 className="text-3xl font-bold tracking-tight text-[#17140f]" style={headingStyle}>
      {title}
    </h2>
    {subtitle ? <p className="mt-2 max-w-2xl text-[0.95rem] leading-6 text-[#655f55]">{subtitle}</p> : null}
  </div>
);

const Subheading: React.FC<{ title: string }> = ({ title }) => (
  <div className="mb-4 flex items-center gap-3">
    <span className="h-2 w-2 bg-[#7d6b5a]" aria-hidden />
    <h3 className="text-[0.78rem] font-bold uppercase tracking-[0.22em] text-[#7d6b5a]">{title}</h3>
  </div>
);

const UpdatesRail: React.FC<{ compact?: boolean }> = ({ compact = false }) => (
  <section
    className={`${compact ? 'p-0' : 'p-0'}`}
    style={bodyStyle}
  >
    <SectionTitle title="Updates" />
    <div className="space-y-6">
      {recentUpdates.map((update, index) => (
        <a
          key={`${update.date}-${update.title}`}
          href={update.link}
          target="_blank"
          rel="noopener noreferrer"
          className="group block"
        >
          <article className="rounded-sm bg-[#f6f2ea] px-4 py-4 transition-colors duration-200">
            <div className="flex flex-wrap items-center gap-2 text-[0.68rem] uppercase tracking-[0.18em] text-[#7e776b]">
              <span>{update.eyebrow}</span>
              {index === 0 ? <span className="text-[#17140f]">Current</span> : null}
              <span className="ml-auto">{update.date}</span>
            </div>
            <h3 className="mt-3 pr-6 text-[1.02rem] leading-6 text-[#17140f] transition-colors duration-200 group-hover:text-[#46382c]">
              {update.title}
            </h3>
            <p className="mt-2 text-[0.9rem] leading-6 text-[#5f584d]">
              {update.summary}
            </p>
            <div className="mt-3 text-[0.72rem] uppercase tracking-[0.18em] text-[#7e776b]">
              Open update ↗
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
    <article className="grid gap-3 rounded-sm bg-[#f6f2ea] px-3 py-3 md:grid-cols-[128px_minmax(0,1fr)] md:gap-4">
      <div className="shrink-0 w-full sm:w-[128px]">
        <a href={publication.link} target="_blank" rel="noopener noreferrer" className="group block">
          {hasCoverImage ? (
            <div className="overflow-hidden border border-[#d9d2c6] bg-[#f8f5ef] p-1 transition-colors duration-200 group-hover:border-[#b7aa97]">
              <div className="aspect-[5/7] w-full bg-white">
                <img
                  src={publication.image}
                  alt={publication.title}
                  className="h-full w-full object-contain object-top"
                  loading="lazy"
                />
              </div>
            </div>
          ) : (
            <div className="flex aspect-[5/7] w-full flex-col justify-end border border-[#d9d2c6] bg-[#f1ece3] p-3">
              <h4 className="text-[1rem] font-serif leading-tight text-[#17140f] italic opacity-80" style={{ fontStyle: 'italic' }}>
                {publication.venue.split(',')[0]}
              </h4>
            </div>
          )}
        </a>
      </div>

      <div className="space-y-1.5">
        <h3 className="text-[1.06rem] font-bold leading-6 text-[#17140f]" style={headingStyle}>
          <a
            href={publication.link}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-[#46382c]"
          >
            {publication.title}
          </a>
        </h3>
        <p className="text-[0.88rem] leading-5 text-[#4d473d]">
          {formatAuthors(publication.authors)} ({publication.year}).
        </p>
        <p className="text-[0.88rem] italic leading-5 text-[#6c675d]">{publication.venue}</p>
        {publication.abstract && (
          <p className="text-[0.84rem] leading-5 text-[#4d473d]">{publication.abstract}</p>
        )}
        <div className="flex flex-wrap items-center gap-2 pt-0.5 text-[0.7rem] uppercase tracking-[0.18em] text-[#6f675a]">
          <a
            href={publication.link}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-[#46382c]"
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
    <div className="min-h-screen bg-[#f3efe8] text-[#1f1a14]" style={bodyStyle}>
      <div className="mx-auto grid max-w-[1600px] gap-8 px-5 py-8 md:px-8 lg:grid-cols-[280px_minmax(0,1fr)] xl:grid-cols-[280px_minmax(0,1fr)_280px] xl:gap-12 xl:px-10">
        <aside className="lg:sticky lg:top-8 lg:self-start">
          <div className="border-r border-[#d5cec2] pr-6 lg:pr-8">
            <h1 className="text-4xl font-bold leading-tight text-[#17140f]" style={headingStyle}>
              {PROFILE_DATA.name}
            </h1>
            <p className="mt-3 text-[0.95rem] leading-7 text-[#4d473d]">
              {PROFILE_DATA.title}
              <br />
              {PROFILE_DATA.institution}
            </p>

            <img
              src={PROFILE_IMAGE_URL}
              alt={PROFILE_DATA.name}
              className="mt-8 aspect-[4/5] w-full max-w-[210px] border border-[#d5cec2] object-cover"
            />

            <div className="mt-8 space-y-3 text-[0.92rem] leading-6 text-[#4d473d]">
              <p>{PROFILE_DATA.email}</p>
              <a
                href={SOCIAL_LINKS.googleScholar}
                target="_blank"
                rel="noopener noreferrer"
                className="block transition-colors hover:text-[#46382c]"
              >
                Google Scholar →
              </a>
              <a
                href={PROFILE_DATA.cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block transition-colors hover:text-[#46382c]"
              >
                Download CV →
              </a>
            </div>

            <nav className="mt-8 pt-6">
              <ul className="space-y-3 text-[0.78rem] uppercase tracking-[0.18em] text-[#6f675a]">
                {navigationLinks.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} className="transition-colors hover:text-[#46382c]">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </aside>

        <main className="min-w-0 border border-[#d9d2c6] bg-[#fbf9f4] px-6 py-7 md:px-8 md:py-8 xl:px-10">
          <section id="about" className="pb-10">
            <SectionTitle title="About" />
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
              <div className="space-y-5 text-[0.98rem] leading-8 text-[#312c24]">
                <p>{PROFILE_DATA.bio}</p>
              </div>

              <div>
                <p className="text-[0.78rem] uppercase tracking-[0.2em] text-[#7e776b]">Focus Areas</p>
                <ul className="mt-4 space-y-2 text-[0.95rem] leading-7 text-[#4d473d]">
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

          <section id="publications" className="py-10">
            <SectionTitle title="Publications" />
            <div className="mb-6 flex flex-wrap gap-x-5 gap-y-2 pb-2">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`border-b pb-1 text-[0.75rem] uppercase tracking-[0.18em] transition-colors ${activeTab === tab
                      ? 'border-[#17140f] text-[#17140f]'
                      : 'border-transparent text-[#7a7165] hover:border-[#b8ad9d] hover:text-[#46382c]'
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
                <article key={`${course.period}-${course.title}`} className="flex flex-col gap-2 rounded-sm bg-[#f6f2ea] px-4 py-4 md:flex-row md:items-baseline md:justify-between">
                  <div>
                    <h3 className="flex flex-wrap items-center gap-2 text-[1.08rem] font-medium leading-7 text-[#17140f]" style={headingStyle}>
                      <span>{course.title}</span>
                      {course.link && (
                        <a href={course.link} target="_blank" rel="noopener noreferrer" className="border border-[#d5cec2] px-2 py-0.5 text-[0.65rem] uppercase tracking-widest text-[#5b5449] transition-colors hover:border-[#46382c] hover:text-[#46382c]">
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

          <section id="experience" className="py-10">
            <SectionTitle title="Experience" />

            <div className="mb-8">
              <Subheading title="Research Experience" />
              <div className="space-y-3">
                {RESEARCH_EXPERIENCE_DATA.map((exp) => (
                  <article key={`${exp.period}-${exp.title}`} className="flex flex-col gap-2 rounded-sm bg-[#f6f2ea] px-4 py-4 md:flex-row md:items-baseline md:justify-between">
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
              <Subheading title="Professional Experience" />
              <div className="space-y-3">
                {PROFESSIONAL_EXPERIENCE_DATA.map((exp) => (
                  <article key={`${exp.period}-${exp.title}`} className="flex flex-col gap-2 rounded-sm bg-[#f6f2ea] px-4 py-4 md:flex-row md:items-baseline md:justify-between">
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

          <section id="awards" className="py-10">
            <SectionTitle title="Selected Honors & Awards" />
            <div className="space-y-3">
              {selectedAwards.map((award) => (
                <article key={`${award.period}-${award.title}`} className="flex flex-col gap-2 rounded-sm bg-[#f6f2ea] px-4 py-4 md:flex-row md:items-baseline md:justify-between">
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
          <div className="scrollbar-hidden max-h-[calc(100vh-4rem)] overflow-y-auto border-l border-[#d5cec2] pl-8 pr-2">
            <UpdatesRail />
          </div>
        </aside>
      </div>

      <footer className="px-5 py-5 text-center text-[0.78rem] uppercase tracking-[0.18em] text-[#7e776b] md:px-8 xl:px-10">
        © {new Date().getFullYear()} {PROFILE_DATA.name}
      </footer>
    </div>
  );
};

export default HomePage;
