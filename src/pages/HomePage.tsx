import React, { useMemo, useState } from 'react';
import {
  BLOG_DATA,
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
import type { CVEntry } from '../types/content';

const headingStyle = {};
const bodyStyle = {};
const cardLiftClass = 'group relative overflow-hidden rounded-2xl glass-card transition-all duration-300 hover:-translate-y-1 hover:shadow-glass-hover hover:border-accent-2/30';
const rowCardClass = `${cardLiftClass} flex flex-col gap-3 px-5 py-5 md:flex-row md:items-baseline md:justify-between`;
const cardAccentClass = 'pointer-events-none absolute inset-y-4 left-0 w-[4px] bg-gradient-to-b from-accent-1 to-accent-2 opacity-0 transition-all duration-300 group-hover:inset-y-3 group-hover:opacity-100 rounded-r-md';
const inlineLinkClass = 'inline-flex items-center transition-colors duration-200 hover:text-accent-1 font-medium';
const sidebarContactLinkClass = 'block w-fit border-b border-transparent pb-0.5 text-text-secondary transition-colors duration-200 hover:border-accent-2 hover:text-accent-2 font-medium';

const navigationLinks = [
  { label: 'About', href: '#about' },
  { label: 'Updates', href: '#updates' },
  { label: 'Publications', href: '#publications' },
  { label: 'Teaching', href: '#teaching' },
  { label: 'Experience', href: '#experience' },
  { label: 'Awards', href: '#awards' },
];

const recentUpdates = BLOG_DATA.slice(0, 4);
const teachingHighlights = TEACHING_EXPERIENCE_DATA;
const featuredSelectedPublicationTitle = "The Creative Link Between Words and Ideas is Weakening in the AI Era";
const sortPublications = (left: (typeof PUBLICATIONS_DATA)[0], right: (typeof PUBLICATIONS_DATA)[0]) => {
  if (right.year !== left.year) return right.year - left.year;
  return left.title.localeCompare(right.title);
};
const isUnderReviewPublication = (publication: (typeof PUBLICATIONS_DATA)[0]) =>
  publication.venue.trim().toLowerCase() === 'under review';
const sortPublishedFirst = (left: (typeof PUBLICATIONS_DATA)[0], right: (typeof PUBLICATIONS_DATA)[0]) => {
  const leftIsUnderReview = isUnderReviewPublication(left);
  const rightIsUnderReview = isUnderReviewPublication(right);
  if (leftIsUnderReview !== rightIsUnderReview) return leftIsUnderReview ? 1 : -1;
  return sortPublications(left, right);
};
const groupAllPublications = (publications: typeof PUBLICATIONS_DATA) => {
  const publishedPublications = publications.filter((publication) => !isUnderReviewPublication(publication));
  const underReviewPublications = publications.filter(isUnderReviewPublication).sort(sortPublications);
  const yearGroups = Array.from(
    publishedPublications.reduce((groups, publication) => {
      const yearGroup = groups.get(publication.year) || [];
      yearGroup.push(publication);
      groups.set(publication.year, yearGroup);
      return groups;
    }, new Map<number, typeof PUBLICATIONS_DATA>()),
  )
    .sort(([leftYear], [rightYear]) => rightYear - leftYear)
    .map(([year, yearPublications]) => ({
      label: String(year),
      publications: yearPublications,
      showYear: false,
    }));

  if (underReviewPublications.length === 0) return yearGroups;

  return [
    ...yearGroups,
    {
      label: 'Under Review',
      publications: underReviewPublications,
      showYear: true,
    },
  ];
};
const awardEndYear = (period: string) => {
  const matches = period.match(/\d{4}/g);
  if (!matches) return 0;
  return Math.max(...matches.map(Number));
};

const formatUpdateDate = (date: string) => {
  const parsedDate = new Date(date);
  if (Number.isNaN(parsedDate.getTime())) return date;
  return parsedDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};

const orderedAwardGroups = HONORS_AWARDS_DATA.map((category) => ({
  ...category,
  items: [...category.items].sort((a, b) => awardEndYear(b.period) - awardEndYear(a.period)),
}));

const formatAuthors = (authors: string[]) =>
  authors.map((author, index) => (
    <React.Fragment key={`${author}-${index}`}>
      {index > 0 ? ', ' : null}
      {author === 'Moon, K.' ? <strong className="font-semibold text-text-primary">Moon, K.</strong> : author}
    </React.Fragment>
  ));

const SectionTitle: React.FC<{ title: string; subtitle?: string }> = ({ title, subtitle }) => (
  <div className="mb-8">
    <h2 className="text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-text-primary to-text-secondary font-heading">
      {title}
    </h2>
    {subtitle ? <p className="mt-3 max-w-2xl text-base leading-7 text-text-secondary">{subtitle}</p> : null}
  </div>
);

const Subheading: React.FC<{ title: string }> = ({ title }) => (
  <div className="mb-5 flex items-center gap-3">
    <span className="h-2.5 w-2.5 rounded-full bg-gradient-to-tr from-accent-1 to-accent-3 shadow-[0_0_8px_rgba(59,130,246,0.5)]" aria-hidden />
    <h3 className="text-[0.85rem] font-bold uppercase tracking-[0.2em] text-text-secondary">{title}</h3>
  </div>
);

const UpdatesPanel: React.FC = () => (
  <section id="updates" className="font-sans">
    <div className="mb-6">
      <p className="text-[0.85rem] font-bold uppercase tracking-[0.2em] text-text-secondary">Latest Updates</p>
    </div>
    <div className="border-y border-gray-200">
      {recentUpdates.map((update) => (
        <a
          key={`${update.date}-${update.title}`}
          href={update.link}
          target="_blank"
          rel="noopener noreferrer"
          className="group block"
          aria-label={`Open update: ${update.title}`}
        >
          <article className="border-t border-gray-200 px-2 py-4 first:border-t-0 transition-all duration-300 hover:bg-white/40 rounded-lg">
            <div className="grid gap-2 md:grid-cols-[100px_minmax(0,1fr)_92px] md:items-start md:gap-4">
              <p className="text-[0.8rem] font-medium uppercase tracking-[0.1em] text-text-secondary transition-colors duration-200 group-hover:text-accent-1 md:pt-0.5">
                {formatUpdateDate(update.date)}
              </p>
              <div className="min-w-0">
                <p className="text-[1rem] leading-7 text-text-primary transition-colors duration-200">
                  <span className="font-semibold text-text-primary decoration-accent-2/30 decoration-2 underline-offset-4 transition-all duration-300 group-hover:decoration-accent-2 group-hover:text-accent-2 group-hover:underline">
                    {update.title}
                  </span>
                  {update.summary ? <span className="text-text-secondary">. {update.summary}</span> : null}
                </p>
              </div>
              <span className="inline-flex items-center justify-start text-[0.75rem] font-bold uppercase tracking-[0.15em] text-text-secondary transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent-2 md:justify-end md:pt-0.5">
                Open &rarr;
              </span>
            </div>
          </article>
        </a>
      ))}
    </div>
  </section>
);

const PublicationCard: React.FC<{ publication: (typeof PUBLICATIONS_DATA)[0]; showYear?: boolean }> = ({
  publication,
  showYear = true,
}) => {
  const doiLabel = publication.link.startsWith('https://doi.org/')
    ? publication.link.replace('https://doi.org/', '')
    : 'Open link';

  const hasCoverImage = Boolean(publication.image);
  const isFigureImage = publication.imageKind === 'figure';
  const imageAspectClass = isFigureImage ? 'aspect-[4/3]' : 'aspect-[5/7]';
  const imageFitClass = isFigureImage ? 'object-contain object-center' : 'object-contain object-top';

  return (
    <a
      href={publication.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group block"
      aria-label={`Open publication: ${publication.title}`}
    >
      <article className={`${cardLiftClass} px-5 py-4`}>
        <span aria-hidden className={cardAccentClass} />
        <div className={`relative z-10 grid gap-4 transition-transform duration-300 group-hover:translate-x-1 ${showYear ? 'md:grid-cols-[160px_minmax(0,1fr)_80px]' : 'md:grid-cols-[160px_minmax(0,1fr)]'} md:gap-6`}>
          <div className="shrink-0 w-full sm:w-[160px]">
            {hasCoverImage ? (
              <div className="overflow-hidden rounded-md border border-gray-200/50 bg-white/50 p-1 shadow-sm transition-all duration-300 group-hover:border-accent-2/30 group-hover:shadow-md">
                <div className={`${imageAspectClass} w-full bg-white rounded overflow-hidden`}>
                  <img
                    src={publication.image}
                    alt={publication.title}
                    className={`h-full w-full ${imageFitClass} transition-transform duration-700 group-hover:scale-105`}
                    loading="lazy"
                  />
                </div>
              </div>
            ) : (
              <div className="flex aspect-[4/3] w-full flex-col justify-end rounded-md border border-gray-200/50 bg-gradient-to-br from-gray-50/50 to-gray-100/50 p-3 transition-all duration-300 group-hover:border-accent-2/30 group-hover:from-blue-50/50 group-hover:to-purple-50/50">
                <h4 className="text-[0.95rem] font-heading font-medium leading-tight text-text-primary opacity-60">
                  {publication.venue.split(',')[0]}
                </h4>
              </div>
            )}
          </div>
          <div className="space-y-1">
            <h3 className="text-[1.05rem] font-bold leading-snug text-text-primary transition-colors duration-200 group-hover:text-accent-1 font-heading">
              {publication.title}
            </h3>
            <p className="text-[0.85rem] leading-snug text-text-secondary">
              {formatAuthors(publication.authors)}.
            </p>
            <p className="text-[0.85rem] font-medium italic text-text-secondary opacity-80 transition-all duration-200 group-hover:text-accent-2">
              {publication.venue}
            </p>
            {publication.abstract && (
              <p className="text-[0.8rem] leading-snug text-gray-600 mt-1">{publication.abstract}</p>
            )}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-[0.7rem] font-bold uppercase tracking-[0.15em] text-accent-1/70">
              <span className="inline-flex items-center gap-2 transition-all duration-200 group-hover:text-accent-1">
                {doiLabel}
              </span>
            </div>
          </div>
          {showYear ? (
            <p className="relative z-10 text-[0.75rem] font-bold uppercase tracking-[0.15em] text-gray-400 transition-colors duration-200 group-hover:text-accent-3 shrink-0 md:pt-0.5 md:text-right">
              {publication.year}
            </p>
          ) : null}
        </div>
      </article>
    </a>
  );
};

const ExperienceCard: React.FC<{ entry: CVEntry }> = ({ entry }) => {
  const cardContent = (
    <>
      <span aria-hidden className={cardAccentClass} />
      <div className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">
        <h4 className="text-[1.1rem] font-bold leading-7 text-text-primary transition-colors duration-200 group-hover:text-accent-1 font-heading">
          {entry.title}
        </h4>
        <p className="mt-1 text-[0.9rem] font-medium leading-6 text-text-secondary">{entry.institution}</p>
        {entry.details && <p className="mt-1.5 text-[0.85rem] leading-relaxed text-gray-500">{entry.details}</p>}
      </div>
      <p className="relative z-10 text-[0.8rem] font-bold uppercase tracking-[0.15em] text-gray-400 transition-colors duration-200 group-hover:text-accent-2 shrink-0 md:text-right">
        {entry.period}
      </p>
    </>
  );

  if (!entry.link) {
    return <article className={rowCardClass}>{cardContent}</article>;
  }

  return (
    <a
      href={entry.link}
      target="_blank"
      rel="noopener noreferrer"
      className={rowCardClass}
      aria-label={`Open ${entry.institution || entry.title}`}
    >
      {cardContent}
    </a>
  );
};

const HomePage: React.FC = () => {
  const tabs = ['Selected', 'AI & Tech', 'Digital Well-being', 'Higher Ed', 'Clinical', 'Social/Culture', 'All'];
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const displayedPublications = useMemo(() => {
    if (activeTab === 'All') {
      return [...PUBLICATIONS_DATA].sort(sortPublications);
    }

    if (activeTab === 'Selected') {
      const selected = PUBLICATIONS_DATA.filter((pub) => pub.authors[0].includes('Moon, K.')).sort(sortPublishedFirst);
      const targetIdx = selected.findIndex(p => p.title === featuredSelectedPublicationTitle);
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
    return filtered.sort(sortPublishedFirst);
  }, [activeTab]);
  const publicationGroups = useMemo(
    () => (activeTab === 'All' ? groupAllPublications(displayedPublications) : []),
    [activeTab, displayedPublications],
  );

  return (
    <div className="min-h-screen text-text-primary font-sans relative overflow-hidden">
      {/* Decorative background blurs */}
      <div className="absolute top-0 -left-40 w-96 h-96 bg-accent-1/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob pointer-events-none" />
      <div className="absolute top-0 -right-40 w-96 h-96 bg-accent-3/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000 pointer-events-none" />
      <div className="absolute -bottom-40 left-20 w-96 h-96 bg-accent-2/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000 pointer-events-none" />

      <div className="mx-auto grid max-w-[1420px] gap-8 px-5 py-8 md:px-8 lg:grid-cols-[300px_minmax(0,1fr)] lg:gap-12 xl:px-10 relative z-10">
        <aside className="lg:sticky lg:top-12 lg:self-start">
          <div className="lg:border-r border-gray-200/60 lg:pr-8">
            <h1 className="text-5xl font-extrabold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-text-primary to-text-secondary font-heading">
              {PROFILE_DATA.name}
            </h1>
            <p className="mt-4 text-[1rem] leading-7 text-text-secondary font-medium">
              {PROFILE_DATA.title}
              <br />
              {PROFILE_DATA.institution}
            </p>

            <div className="group mt-10 w-full max-w-[220px]">
              <div className="glass-card p-2 rounded-3xl transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-glass-hover group-hover:border-accent-2/40">
                <img
                  src={PROFILE_IMAGE_URL}
                  alt={PROFILE_DATA.name}
                  className="aspect-[4/5] w-full object-cover rounded-2xl transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>

            <div className="mt-8 text-[0.92rem] leading-6 text-[#4b514c]">
              <p className="break-words">{PROFILE_DATA.email}</p>
              <div className="mt-4 space-y-1.5">
                <a href={SOCIAL_LINKS.googleScholar} target="_blank" rel="noopener noreferrer" className={sidebarContactLinkClass}>
                  Google Scholar
                </a>
                <a href={PROFILE_DATA.cvUrl} target="_blank" rel="noopener noreferrer" className={sidebarContactLinkClass}>
                  Download CV
                </a>
              </div>
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

        <main className="min-w-0 glass-card rounded-3xl px-6 py-8 md:px-10 md:py-12 xl:px-12 shadow-sm border border-white/60">
          <section id="about" className="pb-12">
            <SectionTitle title="About" />
            <div className="space-y-10">
              <div className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(280px,0.8fr)]">
                <div className="space-y-5 text-[1.05rem] leading-8 text-text-primary">
                  <p>{PROFILE_DATA.bio}</p>
                </div>

                <div className="border-t border-gray-200/60 pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
                  <p className="text-[0.85rem] font-bold uppercase tracking-[0.2em] text-text-secondary">Focus Areas</p>
                  <ul className="mt-5 space-y-3 text-[0.95rem] leading-7 text-text-primary">
                    {RESEARCH_INTERESTS.map((interest) => (
                      <li key={interest} className="flex items-start gap-3">
                        <span className="text-accent-1 mt-1"><i className="fa-solid fa-chevron-right text-xs"></i></span> {interest}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="border-t border-[#e1e6e0] pt-6">
                <UpdatesPanel />
              </div>
            </div>
          </section>

          <section id="publications" className="py-10">
            <SectionTitle title="Publications" />
            <div className="mb-8 flex flex-wrap gap-2 pb-2">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`rounded-full px-3.5 py-1.5 text-[0.7rem] font-bold uppercase tracking-[0.15em] transition-all duration-300 ${activeTab === tab
                      ? 'bg-gradient-to-r from-accent-1 to-accent-2 text-white shadow-md shadow-accent-1/30 scale-105'
                      : 'bg-white/50 border border-gray-200 text-text-secondary hover:-translate-y-0.5 hover:border-accent-2/50 hover:text-accent-2 hover:shadow-sm'
                    }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            {activeTab === 'All' ? (
              <div className="space-y-7">
                {publicationGroups.map(({ label, publications, showYear }) => (
                  <div key={label}>
                    <Subheading title={label} />
                    <div className="space-y-3">
                      {publications.map((publication) => (
                        <PublicationCard
                          key={`${publication.year}-${publication.title}`}
                          publication={publication}
                          showYear={showYear}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {displayedPublications.map((publication) => (
                  <PublicationCard key={`${publication.year}-${publication.title}`} publication={publication} />
                ))}
              </div>
            )}
          </section>

          <section id="teaching" className="py-10">
            <SectionTitle title="Teaching" />
            <div className="space-y-3">
              {teachingHighlights.map((course) => (
                <article key={`${course.period}-${course.title}`} className={rowCardClass}>
                  <span aria-hidden className={cardAccentClass} />
                  <div className="relative z-10">
                    <h3 className="flex flex-wrap items-center gap-2 text-[1.1rem] font-bold leading-7 text-text-primary transition-colors duration-200 group-hover:text-accent-1 font-heading">
                      <span>{course.title}</span>
                      {course.link && (
                        <a href={course.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center rounded-full bg-accent-1/10 px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-[0.15em] text-accent-1 transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent-1 hover:text-white hover:shadow-lg hover:shadow-accent-1/30">
                          Syllabus
                        </a>
                      )}
                    </h3>
                    <p className="mt-1 text-[0.9rem] font-medium leading-6 text-text-secondary">{course.institution}</p>
                  </div>
                  <p className="relative z-10 text-[0.8rem] font-bold uppercase tracking-[0.15em] text-gray-400 transition-colors duration-200 group-hover:text-accent-2 shrink-0 md:text-right">{course.period}</p>
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
                  <ExperienceCard key={`${exp.period}-${exp.title}`} entry={exp} />
                ))}
              </div>
            </div>

            <div>
              <Subheading title="Professional Experience" />
              <div className="space-y-3">
                {PROFESSIONAL_EXPERIENCE_DATA.map((exp) => (
                  <ExperienceCard key={`${exp.period}-${exp.title}`} entry={exp} />
                ))}
              </div>
            </div>
          </section>

          <section id="awards" className="py-10">
            <SectionTitle title="Honors & Awards" />
            <div className="space-y-8">
              {orderedAwardGroups.map((group) => (
                <div key={group.category}>
                  <Subheading title={group.category} />
                  <div className="space-y-3">
                    {group.items.map((award) => (
                      <article key={`${award.period}-${award.title}`} className={rowCardClass}>
                        <span aria-hidden className={cardAccentClass} />
                        <div className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">
                          <h3 className="text-[1.1rem] font-bold leading-7 text-text-primary transition-colors duration-200 group-hover:text-accent-1 font-heading">
                            {award.title}
                          </h3>
                          {award.details ? <p className="mt-1 text-[0.9rem] leading-6 text-gray-500">{award.details}</p> : null}
                        </div>
                        <p className="relative z-10 text-[0.8rem] font-bold uppercase tracking-[0.15em] text-gray-400 transition-colors duration-200 group-hover:text-accent-2 shrink-0 md:text-right">
                          {award.period}
                        </p>
                      </article>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>

      <footer className="px-5 py-8 text-center text-[0.8rem] font-bold uppercase tracking-[0.2em] text-text-secondary relative z-10">
        © {new Date().getFullYear()} {PROFILE_DATA.name}
      </footer>
    </div>
  );
};

export default HomePage;
