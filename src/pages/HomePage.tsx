import React, { useEffect, useMemo, useState } from 'react';
import {
  BLOG_DATA,
  FEATURED_WORK,
  HIGHLIGHTED_UPDATE_TITLES,
  PROFILE_DATA,
  PUBLICATIONS_DATA,
  RESEARCH_PROGRAMS,
  SOCIAL_LINKS,
  TEACHING_EXPERIENCE_DATA,
} from '../content/siteContent';
import { PROFILE_IMAGE_URL } from '../content/assets';

type Publication = (typeof PUBLICATIONS_DATA)[number];
type ResearchProgram = (typeof RESEARCH_PROGRAMS)[number];
type PublicationFilter = 'all' | ResearchProgram['id'];

const navigationLinks = [
  { label: 'About', href: '#about' },
  { label: 'News', href: '#updates' },
  { label: 'Featured', href: '#featured' },
  { label: 'Publications', href: '#publications' },
  { label: 'Teaching', href: '#teaching' },
];

const recentUpdates = HIGHLIGHTED_UPDATE_TITLES
  .map((title) => BLOG_DATA.find((update) => update.title === title))
  .filter((update): update is (typeof BLOG_DATA)[number] => Boolean(update));
const INITIAL_UPDATE_COUNT = 3;

const highlightedTeachingTitles = [
  'AI & Data-Driven Psychology – Instructor of Record',
  'Human vs. AI: Analyzing Generative Diversity Using Semantic Embeddings – Workshop Instructor',
  'Digital Well-being – Teaching Tutorials',
] as const;
const teachingHighlights = highlightedTeachingTitles
  .map((title) => TEACHING_EXPERIENCE_DATA.find((course) => course.title === title))
  .filter((course): course is (typeof TEACHING_EXPERIENCE_DATA)[number] => Boolean(course));

const publicationSourceOrder = new Map(PUBLICATIONS_DATA.map((publication, index) => [publication.title, index]));
const publicationRecencyRank = new Map<string, number>([
  ["Thinking Outside the Bots: Human Ideas in AI's Semantic Blind Spots Are Not Inferior", 700],
  ['Social Technology Use and Life Satisfaction in a Five-Wave Panel Study of U.S. Adults', 600],
  ['The Persistence of Self-Preference Bias in LLM Evaluations of Creativity', 500],
  ['The Link Between Diverse Words and Original Ideas Is Weakening in the AI-Era College Admissions', 400],
  ['Relational Compartmentalization: How Culture Keeps Our Social Worlds Apart', 300],
  ['The passion paradox: Passion is valued more in collectivistic societies', 200],
  ['High-stake self-presentation is culturally accented', 100],
  ['The Relationship Between Borderline Personality Features and Affective Responses to Altering Emotional Context', 30],
  ['A Validation of the Korean Version of Adolescent Positive Mental Health Scale', 20],
  ['The Mirror of Mind: Visualizing Mental Representations of Self Through Reverse Correlation', 10],
  ['A Validation Study of Mental Health Two-Factor Model: In a Sexual Minority Population', 20],
  ['The Effects of Ego Depletion and Psychological Burden on Fatigue in Everyday Life: Focusing on Narcissism', 10],
]);
const isPreprint = (publication: Publication) => /under review|under revision|submitted|preprint/i.test(publication.venue);

const sortPublications = (left: Publication, right: Publication) => {
  if (right.year !== left.year) return right.year - left.year;
  const leftIsUnderReview = isPreprint(left);
  const rightIsUnderReview = isPreprint(right);
  if (leftIsUnderReview !== rightIsUnderReview) return leftIsUnderReview ? 1 : -1;
  const leftRank = publicationRecencyRank.get(left.title);
  const rightRank = publicationRecencyRank.get(right.title);
  if (leftRank !== undefined || rightRank !== undefined) return (rightRank ?? 0) - (leftRank ?? 0);
  return (publicationSourceOrder.get(left.title) ?? 0) - (publicationSourceOrder.get(right.title) ?? 0);
};
const sortedPublications = [...PUBLICATIONS_DATA].sort(sortPublications);

const groupByYear = (publications: Publication[]) =>
  Array.from(
    publications.reduce((groups, publication) => {
      const yearGroup = groups.get(publication.year) || [];
      yearGroup.push(publication);
      groups.set(publication.year, yearGroup);
      return groups;
    }, new Map<number, Publication[]>()),
  )
    .sort(([leftYear], [rightYear]) => rightYear - leftYear)
    .map(([year, yearPublications]) => ({ year, publications: yearPublications }));

const formatUpdateDate = (date: string) => {
  const parsedDate = new Date(date);
  if (Number.isNaN(parsedDate.getTime())) return date;
  return parsedDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};

const formatAuthors = (authors: string[], coFirstAuthors: string[] = []) =>
  authors.map((author, index) => (
    <React.Fragment key={`${author}-${index}`}>
      {index > 0 ? ', ' : null}
      {author === 'Moon, K.' ? <span className="font-semibold text-neutral-900">Moon, K.</span> : author}
      {coFirstAuthors.includes(author) ? <sup className="ml-0.5 text-[0.65em]">*</sup> : null}
    </React.Fragment>
  ));

const publicationLinkLabel = (publication: Publication) => (isPreprint(publication) ? 'Preprint' : 'Paper');

const linkClass = 'text-neutral-900 underline decoration-neutral-300 underline-offset-4 transition hover:text-[#525252] hover:decoration-[#525252]';
const smallLinkClass = 'text-[0.82rem] font-medium text-neutral-600 underline decoration-neutral-300 underline-offset-4 transition hover:text-[#525252] hover:decoration-[#525252]';
const moreButtonClass = 'inline-flex items-center gap-1.5 rounded-full border border-neutral-200 px-4 py-1.5 text-[0.85rem] font-medium text-neutral-600 transition hover:border-neutral-400 hover:text-neutral-900';

const useActiveSection = (ids: string[]) => {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length) setActive(visible[0].target.id);
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    ids.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, [ids]);
  return active;
};

const sectionIds = navigationLinks.map((link) => link.href.slice(1));

const Section: React.FC<{ id: string; title: string; aside?: React.ReactNode; children: React.ReactNode }> = ({ id, title, aside, children }) => (
  <section id={id} className="scroll-mt-20 md:scroll-mt-24 border-t border-neutral-200 py-16">
    <div className="mb-9 flex flex-wrap items-end justify-between gap-3">
      <h2 className="font-heading text-[2rem] font-bold leading-none tracking-tight text-neutral-900">{title}</h2>
      {aside}
    </div>
    {children}
  </section>
);

const Header: React.FC = () => {
  const active = useActiveSection(sectionIds);
  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200/70 bg-[#ffffff]/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1040px] items-center justify-between px-6 md:h-20">
        <a href="#about" className="font-heading text-[1.6rem] font-bold leading-none tracking-tight text-neutral-900 md:text-[2.1rem]">
          {PROFILE_DATA.name}
        </a>
        <nav aria-label="Primary" className="flex items-center gap-6">
          <ul className="hidden items-center gap-6 text-[0.9rem] sm:flex">
            {navigationLinks.slice(1).map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`transition ${active === link.href.slice(1) ? 'font-medium text-[#525252]' : 'text-neutral-500 hover:text-neutral-900'}`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href={PROFILE_DATA.cvUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-neutral-300 px-3.5 py-1 text-[0.85rem] font-medium text-neutral-900 transition hover:border-neutral-900"
          >
            CV
          </a>
        </nav>
      </div>
    </header>
  );
};

// Phrases that carry the headline; only these get the marker underline.
const HEADLINE_KEYWORDS = ['human creativity and well-being', 'ideas, language, and behavior', 'AI and digital technologies'];

const headlineParts = () => {
  const pattern = new RegExp(`(${HEADLINE_KEYWORDS.map((word) => word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`);
  return PROFILE_DATA.headline.split(pattern).filter(Boolean).map((text) => ({ text, isKeyword: HEADLINE_KEYWORDS.includes(text) }));
};

const HeroLinks: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`flex flex-wrap gap-x-6 gap-y-2 text-[0.95rem] ${className}`}>
    <a href={`mailto:${PROFILE_DATA.email}`} className={linkClass}>
      {PROFILE_DATA.email}
    </a>
    <a href={SOCIAL_LINKS.googleScholar} target="_blank" rel="noopener noreferrer" className={linkClass}>
      Google Scholar
    </a>
    <a href={PROFILE_DATA.cvUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
      Download CV
    </a>
  </div>
);

const ProfilePhoto: React.FC<{ className: string }> = ({ className }) => (
  <img src={PROFILE_IMAGE_URL} alt={PROFILE_DATA.name} className={`object-cover ${className}`} />
);

// Marker-underlined statement beside the photo, then the bio broken into its three sentences.
const bioSteps = ['Approach', 'Finding', 'Aim'];
const HeroIntro: React.FC = () => {
  const sentences = PROFILE_DATA.bio.split(/(?<=\.)\s+/);
  return (
    <>
      <div className="grid grid-cols-[minmax(0,1fr)] gap-10 sm:grid-cols-[minmax(0,1fr)_200px] sm:items-start md:gap-14">
        <div className="min-w-0">
          <p className="font-heading text-[1.75rem] font-semibold leading-[1.3] tracking-tight text-neutral-900 md:text-[2.3rem]">
            {headlineParts().map(({ text, isKeyword }) =>
              isKeyword ? (
                <span key={text} className="bg-[linear-gradient(transparent_60%,#e5e5e5_60%)] [box-decoration-break:clone]">
                  {text}
                </span>
              ) : (
                text
              ),
            )}
          </p>
          <p className="mt-6 text-[1.05rem] leading-[1.7] text-neutral-700">{PROFILE_DATA.affiliation}</p>
          <HeroLinks className="mt-6" />
        </div>
        <ProfilePhoto className="order-first aspect-[4/5] w-[160px] rounded-2xl sm:order-none sm:w-full" />
      </div>
      <ol className="mt-14 grid gap-6 md:grid-cols-3 md:gap-8">
        {sentences.map((sentence, index) => (
          <li key={sentence} className="border-t border-neutral-900 pt-4">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-neutral-500">
              {String(index + 1).padStart(2, '0')} · {bioSteps[index]}
            </p>
            <p className="mt-3 text-[0.95rem] leading-[1.7] text-neutral-700">{sentence}</p>
          </li>
        ))}
      </ol>
    </>
  );
};

const Hero: React.FC = () => {
  return (
    <section id="about" className="scroll-mt-20 md:scroll-mt-24 pb-16 pt-14 md:pt-20">
      {/* The name lives in the header bar, so the hero opens with the research statement. */}
      <h1 className="sr-only">{PROFILE_DATA.name}</h1>
      <HeroIntro />
    </section>
  );
};

const UpdatesSection: React.FC = () => {
  const [showAll, setShowAll] = useState(false);
  const visibleUpdates = showAll ? recentUpdates : recentUpdates.slice(0, INITIAL_UPDATE_COUNT);
  return (
    <Section id="updates" title="News">
      <ul className="divide-y divide-neutral-100">
        {visibleUpdates.map((update) => (
          <li key={`${update.date}-${update.title}`} className="grid gap-2 py-5 first:pt-0 sm:grid-cols-[100px_minmax(0,1fr)] sm:gap-6">
            <span className="pt-0.5 text-[0.85rem] font-medium tabular-nums text-[#525252]">{formatUpdateDate(update.date)}</span>
            <div className="flex min-w-0 gap-4">
              {update.image ? (
                <div className="hidden h-[54px] w-[72px] shrink-0 overflow-hidden rounded-lg border border-neutral-200 bg-white sm:block">
                  <img
                    src={update.image}
                    alt={update.imageAlt ?? ''}
                    className={`h-full w-full ${update.imageFit === 'contain' || (!update.imageFit && update.image.includes('.svg')) ? 'object-contain p-1.5' : 'object-cover'}`}
                    loading="lazy"
                  />
                </div>
              ) : null}
              <div className="min-w-0">
                <a href={update.link} target="_blank" rel="noopener noreferrer" className="text-[1rem] font-semibold leading-7 text-neutral-900 transition hover:text-[#525252]">
                  {update.title}
                </a>
                {update.summary ? <p className="mt-1 text-[0.94rem] leading-7 text-neutral-600">{update.summary}</p> : null}
                {update.links?.length ? (
                  <div className="mt-1.5 flex flex-wrap gap-4">
                    {update.links.map((action) => (
                      <a key={`${update.title}-${action.label}`} href={action.href} target="_blank" rel="noopener noreferrer" className={smallLinkClass}>
                        {action.label}
                      </a>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
          </li>
        ))}
      </ul>
      {recentUpdates.length > INITIAL_UPDATE_COUNT ? (
        <div className="mt-6 sm:ml-[124px]">
          <button type="button" onClick={() => setShowAll((value) => !value)} className={moreButtonClass}>
            {showAll ? 'Show fewer' : `Show all ${recentUpdates.length} updates`}
            <i className={`fa-solid fa-chevron-down text-[0.6rem] transition ${showAll ? 'rotate-180' : ''}`} aria-hidden />
          </button>
        </div>
      ) : null}
    </Section>
  );
};

const FeaturedSection: React.FC = () => (
  <Section id="featured" title="Featured work">
    <div className="grid gap-x-8 gap-y-12 md:grid-cols-2">
      {FEATURED_WORK.map((item) => {
        const publication = PUBLICATIONS_DATA.find((entry) => entry.title === item.publicationTitle);
        if (!publication) return null;
        const isClickable = publication.isCardClickable !== false && publication.link !== '#';
        const image = 'image' in item ? item.image : publication.image;
        return (
          <article key={item.publicationTitle} className="flex min-w-0 flex-col">
            <div className="aspect-[16/9] overflow-hidden rounded-xl border border-neutral-200 bg-white p-4">
              {image ? <img src={image} alt="" className="h-full w-full object-contain" loading="lazy" /> : null}
            </div>
            <p className="mt-5 text-[0.78rem] font-semibold uppercase tracking-[0.12em] text-[#525252]">{item.label}</p>
            <h3 className="mt-2 font-heading text-[1.3rem] font-semibold leading-snug text-neutral-900">{item.question}</h3>
            <p className="mt-2.5 text-[0.95rem] leading-7 text-neutral-600">{item.finding}</p>
            <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-1.5 pt-4 text-[0.82rem]">
              <span className="text-neutral-500">
                {publication.year} · {publication.venue.split(/,\s*\d/)[0]}
              </span>
              {isClickable ? (
                <a href={publication.link} target="_blank" rel="noopener noreferrer" className={smallLinkClass}>
                  {publicationLinkLabel(publication)}
                </a>
              ) : null}
            </div>
          </article>
        );
      })}
    </div>
  </Section>
);

const PublicationThumbnail: React.FC<{ publication: Publication }> = ({ publication }) => (
  <div className="flex h-[68px] w-[88px] items-center justify-center overflow-hidden rounded-lg border border-neutral-200 bg-white md:h-[104px] md:w-[150px]">
    {publication.image ? (
      publication.imageKind === 'figure' ? (
        <img src={publication.image} alt="" className="h-full w-full object-contain p-1.5" loading="lazy" />
      ) : (
        <img src={publication.image} alt="" className="h-full max-w-[56%] border-x border-neutral-100 object-cover object-top" loading="lazy" />
      )
    ) : (
      <span className="px-2 text-center text-[0.62rem] font-medium leading-tight text-neutral-500 md:text-[0.7rem]">{publication.venue.split(/,\s*\d| at | to /)[0]}</span>
    )}
  </div>
);

const PublicationEntry: React.FC<{ publication: Publication }> = ({ publication }) => {
  const isClickable = publication.isCardClickable !== false && publication.link !== '#';
  const resourceLinks = [
    ...(isClickable ? [{ label: publicationLinkLabel(publication), href: publication.link }] : []),
    ...(publication.resourceLinks ?? []),
  ];
  return (
    <li className="grid grid-cols-[88px_minmax(0,1fr)] gap-4 md:grid-cols-[150px_minmax(0,1fr)] md:gap-6">
      <PublicationThumbnail publication={publication} />
      <div className="min-w-0">
      <p className="text-[1rem] font-semibold leading-7 text-neutral-900">
        {isClickable ? (
          <a href={publication.link} target="_blank" rel="noopener noreferrer" className="transition hover:text-[#525252]">
            {publication.title}
          </a>
        ) : (
          publication.title
        )}
      </p>
      <p className="mt-0.5 text-[0.9rem] leading-6 text-neutral-500">
        {formatAuthors(publication.authors, publication.coFirstAuthors)}
        {publication.coFirstAuthors?.length ? ' (* co-first)' : null}
      </p>
      <p className="text-[0.9rem] italic leading-6 text-neutral-600">{publication.venue}</p>
      {resourceLinks.length || publication.mediaCoverage?.length ? (
        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1.5">
          {resourceLinks.map((resource) => (
            <a key={`${resource.label}-${resource.href}`} href={resource.href} target="_blank" rel="noopener noreferrer" className={smallLinkClass}>
              {resource.label}
            </a>
          ))}
          {publication.mediaCoverage?.length ? (
            <span className="flex flex-wrap items-center gap-1.5">
              <span className="text-[0.8rem] text-neutral-400">Featured in</span>
              {publication.mediaCoverage.map((outlet) => (
                <a
                  key={outlet.label}
                  href={outlet.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-[#525252]/10 px-2.5 py-0.5 text-[0.76rem] font-medium text-[#525252] transition hover:bg-[#525252]/20"
                >
                  {outlet.label}
                </a>
              ))}
            </span>
          ) : null}
        </div>
      ) : null}
      </div>
    </li>
  );
};

const PublicationsSection: React.FC = () => {
  const [filter, setFilter] = useState<PublicationFilter>('all');
  const [showEarlier, setShowEarlier] = useState(false);
  const activeProgram = RESEARCH_PROGRAMS.find((program) => program.id === filter);
  const filtered = useMemo(() => {
    if (!activeProgram) return sortedPublications;
    const titles = new Set<string>(activeProgram.projects.map((project) => project.publicationTitle));
    return sortedPublications.filter((publication) => titles.has(publication.title));
  }, [activeProgram]);
  const groups = groupByYear(filtered);
  const recentYearCutoff = activeProgram ? 0 : (groups[0]?.year ?? 0) - 1;
  const visibleGroups = showEarlier ? groups : groups.filter((group) => group.year >= recentYearCutoff);
  const hiddenCount = groups.filter((group) => group.year < recentYearCutoff).reduce((total, group) => total + group.publications.length, 0);
  const filters: Array<{ key: PublicationFilter; label: string }> = [
    { key: 'all', label: 'All' },
    ...RESEARCH_PROGRAMS.map((program) => ({ key: program.id, label: program.title })),
  ];

  return (
    <Section
      id="publications"
      title="Publications"
      aside={
        // Phones wrap the five filters onto two rows so none hide off-screen; wider screens keep one pill row.
        <div className="scrollbar-hidden flex max-w-full flex-wrap gap-1 rounded-[1.1rem] border border-neutral-200 p-1 text-[0.85rem] sm:flex-nowrap sm:overflow-x-auto sm:rounded-full" role="tablist" aria-label="Filter publications">
          {filters.map(({ key, label }) => (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={filter === key}
              onClick={() => setFilter(key)}
              className={`shrink-0 whitespace-nowrap rounded-full px-3 py-1 transition ${filter === key ? 'bg-neutral-900 text-white' : 'text-neutral-500 hover:text-neutral-900'}`}
            >
              {label}
            </button>
          ))}
        </div>
      }
    >
      {/* Line questions share one grid cell, so switching only cross-fades text; All keeps the space empty so the list never moves. */}
      <div className="mb-12 grid sm:ml-[124px]">
        {RESEARCH_PROGRAMS.map((program) => (
          <p
            key={program.id}
            aria-hidden={filter !== program.id}
            className={`[grid-area:1/1] max-w-2xl font-heading text-[1.15rem] font-semibold leading-snug text-neutral-800 transition-opacity duration-300 ${filter === program.id ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
          >
            {`${program.subtitle.split('?')[0]}?`}
          </p>
        ))}
      </div>
      <div className="space-y-12">
        {visibleGroups.map(({ year, publications }) => (
          <div key={year} className="grid gap-3 sm:grid-cols-[100px_minmax(0,1fr)] sm:gap-6">
            <p className="font-heading text-[1.25rem] font-bold text-[#525252]">{year}</p>
            <ul className="space-y-7">
              {publications.map((publication) => (
                <PublicationEntry key={`${publication.year}-${publication.title}`} publication={publication} />
              ))}
            </ul>
          </div>
        ))}
      </div>
      {hiddenCount > 0 ? (
        <div className="mt-10 sm:ml-[124px]">
          <button type="button" onClick={() => setShowEarlier((value) => !value)} className={moreButtonClass}>
            {showEarlier ? 'Show recent only' : `Show ${hiddenCount} earlier publications`}
            <i className={`fa-solid fa-chevron-down text-[0.6rem] transition ${showEarlier ? 'rotate-180' : ''}`} aria-hidden />
          </button>
        </div>
      ) : null}
    </Section>
  );
};

// The three highlights stay on top; the rest of the CV's teaching list opens below them, newest first.
const otherTeaching = TEACHING_EXPERIENCE_DATA.filter((course) => !teachingHighlights.includes(course));

const TeachingSection: React.FC = () => {
  const [showAll, setShowAll] = useState(false);
  const visibleCourses = showAll ? [...teachingHighlights, ...otherTeaching] : teachingHighlights;
  return (
  <Section id="teaching" title="Teaching">
    <ul className="divide-y divide-neutral-100">
      {visibleCourses.map((course) => {
        const actions = course.links?.length ? course.links : course.link ? [{ label: 'Syllabus', href: course.link }] : [];
        return (
          <li key={course.title} className="grid gap-1 py-5 first:pt-0 sm:grid-cols-[100px_minmax(0,1fr)] sm:gap-6">
            <span className="pt-0.5 text-[0.85rem] font-medium text-[#525252]">{course.period}</span>
            <div className="min-w-0">
              <p className="text-[1rem] font-semibold leading-7 text-neutral-900">{course.title}</p>
              <p className="text-[0.9rem] leading-6 text-neutral-500">{course.institution}</p>
              {course.details ? <p className="mt-1 text-[0.93rem] leading-7 text-neutral-600">{course.details}</p> : null}
              {actions.length ? (
                <div className="mt-1.5 flex flex-wrap gap-4">
                  {actions.map((action) => (
                    <a key={action.label} href={action.href} target="_blank" rel="noopener noreferrer" className={smallLinkClass}>
                      {action.label}
                    </a>
                  ))}
                </div>
              ) : null}
            </div>
          </li>
        );
      })}
    </ul>
    {otherTeaching.length ? (
      <div className="mt-6 sm:ml-[124px]">
        <button type="button" onClick={() => setShowAll((value) => !value)} className={moreButtonClass}>
          {showAll ? 'Show fewer' : `Show all ${TEACHING_EXPERIENCE_DATA.length} courses`}
          <i className={`fa-solid fa-chevron-down text-[0.6rem] transition ${showAll ? 'rotate-180' : ''}`} aria-hidden />
        </button>
      </div>
    ) : null}
  </Section>
  );
};

const HomePage: React.FC = () => (
  <div className="min-h-screen bg-[#ffffff] font-sans text-neutral-900 antialiased">
    <Header />
    <main className="mx-auto max-w-[1040px] px-6">
      <Hero />
      <UpdatesSection />
      <FeaturedSection />
      <PublicationsSection />
      <TeachingSection />
      <footer className="flex flex-wrap justify-between gap-2 border-t border-neutral-200 py-10 text-[0.85rem] text-neutral-400">
        <span>
          © {new Date().getFullYear()} {PROFILE_DATA.name}
        </span>
        <span>Last updated {PROFILE_DATA.lastUpdated}</span>
      </footer>
    </main>
  </div>
);

export default HomePage;
