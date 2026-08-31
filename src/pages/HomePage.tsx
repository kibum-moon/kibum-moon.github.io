import React, { useMemo } from 'react';
import {
  BLOG_DATA,
  PROFILE_DATA,
  PUBLICATIONS_DATA,
  RESEARCH_INTERESTS,
  RESEARCH_PROGRAMS,
  SOCIAL_LINKS,
  TEACHING_EXPERIENCE_DATA,
} from '../content/siteContent';
import { PROFILE_IMAGE_URL } from '../content/assets';

const inlineLinkClass = 'inline-flex items-center transition-colors duration-200 hover:text-accent-1 font-medium';
const sidebarContactLinkClass = 'block w-fit border-b border-transparent pb-0.5 text-text-secondary transition-colors duration-200 hover:border-accent-2 hover:text-accent-2 font-medium';
const pillLinkClass = 'inline-flex items-center rounded-full bg-accent-1/10 px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-[0.15em] text-accent-1 transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent-1 hover:text-white hover:shadow-lg hover:shadow-accent-1/30';

const navigationLinks = [
  { label: 'About', href: '#about' },
  { label: 'News & Updates', href: '#updates' },
  { label: 'Research', href: '#research' },
  { label: 'Publications', href: '#publications' },
  { label: 'Teaching', href: '#teaching' },
];

const highlightedUpdateTitles = [
  'Social Technology Use and Life Satisfaction in a Five-Wave Panel Study of U.S. Adults',
  'Human vs. AI: Analyzing Generative Diversity Using Semantic Embeddings',
  "What 370,000 College Essays Tell Us About A.I.'s Effects on Creativity",
] as const;
const recentUpdates = highlightedUpdateTitles
  .map((title) => BLOG_DATA.find((update) => update.title === title))
  .filter((update): update is (typeof BLOG_DATA)[number] => Boolean(update));

const highlightedTeachingTitles = [
  'AI & Data-Driven Psychology – Main Instructor',
  'Human vs. AI: Analyzing Generative Diversity Using Semantic Embeddings – Workshop Instructor',
  'Digital Well-being – Teaching Tutorials',
] as const;
const teachingHighlights = highlightedTeachingTitles
  .map((title) => TEACHING_EXPERIENCE_DATA.find((course) => course.title === title))
  .filter((course): course is (typeof TEACHING_EXPERIENCE_DATA)[number] => Boolean(course));
const publicationSourceOrder = new Map(PUBLICATIONS_DATA.map((publication, index) => [publication.title, index]));
const publicationRecencyRank = new Map<string, number>([
  ['Social Technology Use and Life Satisfaction in a Five-Wave Panel Study of U.S. Adults', 600],
  ['The Persistence of Self-Preference Bias in LLM Evaluations of Creativity', 500],
  ['The Link Between Diverse Words and Original Ideas Is Weakening in the AI-Era College Admissions', 400],
  ['Relational Compartmentalization: How Culture Keeps Our Social Worlds Apart', 300],
  ['Who values passion in education?', 200],
  ['Which foot forward? Cultural models of self-presentation in college applications', 100],
  ['The Relationship Between Borderline Personality Features and Affective Responses to Altering Emotional Context', 30],
  ['A Validation of the Korean Version of Adolescent Positive Mental Health Scale', 20],
  ['The Mirror of Mind: Visualizing Mental Representations of Self Through Reverse Correlation', 10],
  ['A Validation Study of Mental Health Two-Factor Model: In a Sexual Minority Population', 20],
  ['The Effects of Ego Depletion and Psychological Burden on Fatigue in Everyday Life: Focusing on Narcissism', 10],
]);
const sortPublications = (left: (typeof PUBLICATIONS_DATA)[0], right: (typeof PUBLICATIONS_DATA)[0]) => {
  if (right.year !== left.year) return right.year - left.year;
  const leftIsUnderReview = left.venue.toLowerCase().includes('under review');
  const rightIsUnderReview = right.venue.toLowerCase().includes('under review');
  if (leftIsUnderReview !== rightIsUnderReview) return leftIsUnderReview ? 1 : -1;
  const leftRank = publicationRecencyRank.get(left.title);
  const rightRank = publicationRecencyRank.get(right.title);
  if (leftRank !== undefined || rightRank !== undefined) return (rightRank ?? 0) - (leftRank ?? 0);
  return (publicationSourceOrder.get(left.title) ?? 0) - (publicationSourceOrder.get(right.title) ?? 0);
};
const groupAllPublications = (publications: typeof PUBLICATIONS_DATA) => {
  return Array.from(
    publications.reduce((groups, publication) => {
      const yearGroup = groups.get(publication.year) || [];
      yearGroup.push(publication);
      groups.set(publication.year, yearGroup);
      return groups;
    }, new Map<number, typeof PUBLICATIONS_DATA>()),
  )
    .sort(([leftYear], [rightYear]) => rightYear - leftYear)
    .map(([year, yearPublications]) => ({
      label: String(year),
      publications: yearPublications.sort(sortPublications),
    }));
};
const formatUpdateDate = (date: string) => {
  const parsedDate = new Date(date);
  if (Number.isNaN(parsedDate.getTime())) return date;
  return parsedDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
};

const formatAuthors = (authors: string[], coFirstAuthors: string[] = []) =>
  authors.map((author, index) => (
    <React.Fragment key={`${author}-${index}`}>
      {index > 0 ? ', ' : null}
      {author === 'Moon, K.' ? <strong className="font-semibold text-text-primary">Moon, K.</strong> : author}
      {coFirstAuthors.includes(author) ? <sup className="ml-0.5 text-[0.65em]">*</sup> : null}
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

const UpdatesPanel: React.FC = () => (
  <section id="updates" className="py-10 font-sans">
    <SectionTitle title="News & Updates" />
    <div className="border-y border-gray-200">
      {recentUpdates.map((update) => (
        <article
          key={`${update.date}-${update.title}`}
          className="group border-t border-gray-200 px-2 py-4 first:border-t-0 transition-all duration-300 hover:bg-white/40 rounded-lg"
        >
          <div className="grid gap-2 md:grid-cols-[100px_minmax(0,1fr)_92px] md:items-start md:gap-4">
            <p className="text-[0.8rem] font-medium uppercase tracking-[0.1em] text-text-secondary transition-colors duration-200 group-hover:text-accent-1 md:pt-0.5">
              {formatUpdateDate(update.date)}
            </p>
            <div className="min-w-0">
              <div className="flex gap-3">
                {update.image ? (
                  <div className="mt-1 h-16 w-20 shrink-0 overflow-hidden rounded-md border border-gray-200 bg-white/70">
                    <img
                      src={update.image}
                      alt={update.imageAlt ?? ''}
                      className={`h-full w-full ${update.image.includes('.svg') ? 'object-contain p-2' : 'object-cover'}`}
                      loading="lazy"
                    />
                  </div>
                ) : null}
                <div className="min-w-0">
                  <p className="text-[1rem] leading-7 text-text-primary transition-colors duration-200">
                    <a
                      href={update.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-text-primary decoration-accent-2/30 decoration-2 underline-offset-4 transition-all duration-300 hover:text-accent-2 hover:underline group-hover:decoration-accent-2"
                    >
                      {update.title}
                    </a>
                    {update.summary ? <span className="text-text-secondary">. {update.summary}</span> : null}
                  </p>
                  {update.links?.length ? (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {update.links.map((action) => (
                        <a key={`${update.title}-${action.label}`} href={action.href} target="_blank" rel="noopener noreferrer" className={pillLinkClass}>
                          {action.label}
                        </a>
                      ))}
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
            <a
              href={update.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-start text-[0.75rem] font-bold uppercase tracking-[0.15em] text-text-secondary transition-all duration-300 hover:text-accent-2 group-hover:translate-x-1 md:justify-end md:pt-0.5"
            >
              Open &rarr;
            </a>
          </div>
        </article>
      ))}
    </div>
  </section>
);

type ResearchProgram = (typeof RESEARCH_PROGRAMS)[number];
type ResearchProject = ResearchProgram['projects'][number];

const ResearchProjectCard: React.FC<{ project: ResearchProject }> = ({ project }) => {
  const publication = PUBLICATIONS_DATA.find((item) => item.title === project.publicationTitle);
  if (!publication) return null;

  const isClickable = publication.isCardClickable !== false && publication.link !== '#';
  const content = (
    <>
      <div className="aspect-[16/9] border-b border-slate-200 bg-slate-50 p-3">
        {publication.image ? (
          <img src={publication.image} alt="" className="h-full w-full object-contain object-center" loading="lazy" />
        ) : (
          <div className="flex h-full items-center justify-center px-4 text-center text-xs font-semibold text-text-secondary">
            {publication.venue.split(',')[0]}
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h4 className="font-heading text-[1rem] font-bold leading-snug text-text-primary transition-colors group-hover:text-accent-1">
          {project.title}
        </h4>
        <p className="mt-2 text-[0.8rem] leading-5 text-text-secondary">{project.description}</p>
        <span className="mt-auto pt-4 text-[0.65rem] font-bold uppercase tracking-[0.14em] text-text-secondary">Paper</span>
      </div>
    </>
  );
  const className =
    'group flex min-w-0 flex-col overflow-hidden rounded-lg border border-slate-200 bg-white transition duration-200 hover:-translate-y-0.5 hover:border-slate-400 hover:shadow-md';

  return isClickable ? (
    <a href={publication.link} target="_blank" rel="noopener noreferrer" className={className}>
      {content}
    </a>
  ) : (
    <article className={className}>{content}</article>
  );
};

const ResearchProgramSection: React.FC<{ program: ResearchProgram; first?: boolean }> = ({ program, first = false }) => (
  <section id={program.id} className={first ? '' : 'border-t border-slate-200 pt-10'}>
    <div className="mb-6">
      <div className="flex items-center gap-4">
        <h3 className="font-heading text-2xl font-extrabold tracking-tight text-text-primary">{program.title}</h3>
        <span className="h-px flex-1 bg-slate-300" aria-hidden />
      </div>
      <p className="mt-2 max-w-2xl text-[0.92rem] leading-6 text-text-secondary">{program.subtitle}</p>
      {program.nextQuestion ? (
        <p className="mt-3 max-w-2xl font-serif text-[0.86rem] italic leading-6 text-slate-500">{program.nextQuestion}</p>
      ) : null}
    </div>
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {program.projects.map((project) => (
        <ResearchProjectCard key={project.publicationTitle} project={project} />
      ))}
    </div>
  </section>
);

const publicationLinkLabel = (publication: (typeof PUBLICATIONS_DATA)[0]) =>
  publication.venue.toLowerCase().includes('under review') ? 'Preprint' : 'Paper';

const PublicationCard: React.FC<{ publication: (typeof PUBLICATIONS_DATA)[0] }> = ({ publication }) => {
  const hasImage = Boolean(publication.image);
  const isFigure = publication.imageKind === 'figure';
  const isClickable = publication.isCardClickable !== false && publication.link !== '#';
  const resourceLinks = [
    ...(isClickable ? [{ label: publicationLinkLabel(publication), href: publication.link }] : []),
    ...(publication.resourceLinks ?? []),
  ];

  return (
    <article className="grid gap-4 border-b border-slate-200 py-5 sm:grid-cols-[108px_minmax(0,1fr)] md:grid-cols-[172px_minmax(0,1fr)] md:gap-6">
      <div className="flex h-[84px] w-[108px] items-center justify-center md:h-[116px] md:w-[172px]">
        {hasImage ? (
          isFigure ? (
            <img src={publication.image} alt="" className="h-full w-full object-contain object-center" loading="lazy" />
          ) : (
            <img
              src={publication.image}
              alt=""
              className="max-h-full max-w-[64px] border border-slate-200 bg-white object-contain object-top shadow-sm md:max-w-[92px]"
              loading="lazy"
            />
          )
        ) : (
          <div className="flex h-full w-full items-center justify-center border border-slate-200 bg-slate-50 p-3 text-center text-[0.65rem] font-semibold leading-tight text-text-secondary">
            {publication.venue.split(',')[0]}
          </div>
        )}
      </div>
      <div className="min-w-0">
        <h4 className="font-heading text-[1.05rem] font-bold leading-snug text-text-primary">
          {isClickable ? (
            <a
              href={publication.link}
              target="_blank"
              rel="noopener noreferrer"
              className="decoration-accent-2/30 underline-offset-4 transition hover:text-accent-1 hover:underline"
            >
              {publication.title}
            </a>
          ) : (
            publication.title
          )}
        </h4>
        <p className="mt-1 text-[0.85rem] leading-snug text-text-secondary">
          {formatAuthors(publication.authors, publication.coFirstAuthors)}.
        </p>
        {publication.coFirstAuthors?.length ? <p className="mt-1 text-[0.7rem] text-text-secondary">* Co-first authors</p> : null}
        <p className="mt-1 text-[0.85rem] font-medium italic text-text-secondary">{publication.venue}</p>
        {publication.abstract ? <p className="mt-2 text-[0.8rem] leading-5 text-gray-600">{publication.abstract}</p> : null}
        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2">
          {resourceLinks.length ? (
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              {resourceLinks.map((resource) => (
                <a
                  key={`${publication.title}-${resource.label}-${resource.href}`}
                  href={resource.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[0.7rem] font-medium uppercase tracking-[0.04em] text-slate-500 transition-colors hover:text-text-primary"
                >
                  {resource.label}
                </a>
              ))}
            </div>
          ) : null}
          {publication.mediaCoverage?.length ? (
            <div className="flex flex-wrap items-center gap-2 border-l border-slate-300 pl-3">
              <span className="font-serif text-[0.72rem] italic text-text-secondary">Featured in</span>
              {publication.mediaCoverage.map((outlet) => (
                <a
                  key={`${publication.title}-${outlet.label}`}
                  href={outlet.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-[3px] border border-slate-300 bg-white px-2 py-1 text-[0.65rem] font-semibold text-text-secondary transition hover:border-slate-700 hover:text-text-primary"
                >
                  {outlet.label}
                </a>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </article>
  );
};

const PublicationYearHeading: React.FC<{ label: string }> = ({ label }) => (
  <div className="flex items-center gap-4 pt-4">
    <h3 className="font-heading text-xl font-bold leading-none tracking-tight text-[#315f78]">{label}</h3>
    <span className="h-px flex-1 bg-[#315f78]/25" aria-hidden />
  </div>
);

const HomePage: React.FC = () => {
  const publicationGroups = useMemo(() => groupAllPublications([...PUBLICATIONS_DATA].sort(sortPublications)), []);

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
          </section>

          <UpdatesPanel />

          <section id="research" className="py-10">
            <SectionTitle title="Research" />
            <div className="space-y-12">
              {RESEARCH_PROGRAMS.map((program, index) => (
                <ResearchProgramSection key={program.id} program={program} first={index === 0} />
              ))}
            </div>
          </section>

          <section id="publications" className="py-10">
            <SectionTitle title="Publications" />
            <div className="space-y-8">
              {publicationGroups.map(({ label, publications }) => (
                <div key={label}>
                  <PublicationYearHeading label={label} />
                  <div>
                    {publications.map((publication) => (
                      <PublicationCard key={`${publication.year}-${publication.title}`} publication={publication} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section id="teaching" className="py-10">
            <SectionTitle title="Selected Teaching" />
            <div className="border-y border-slate-200">
              {teachingHighlights.map((course) => (
                <article
                  key={`${course.period}-${course.title}`}
                  className="grid gap-3 border-t border-slate-200 py-5 first:border-t-0 md:grid-cols-[150px_minmax(0,1fr)_auto] md:items-start md:gap-6"
                >
                  <div className="text-[0.72rem] leading-5 text-text-secondary">
                    <p className="font-semibold uppercase tracking-[0.08em] text-[#315f78]">{course.period}</p>
                    <p className="mt-1">{course.institution}</p>
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-heading text-[1rem] font-bold leading-6 text-text-primary">{course.title}</h3>
                    {course.details ? <p className="mt-1 text-[0.82rem] leading-5 text-text-secondary">{course.details}</p> : null}
                  </div>
                  <div className="flex flex-wrap gap-x-3 gap-y-1 md:justify-end md:pt-0.5">
                    {(course.links?.length
                      ? course.links
                      : course.link
                        ? [{ label: 'Syllabus', href: course.link }]
                        : []
                    ).map((action) => (
                      <a
                        key={`${course.title}-${action.label}`}
                        href={action.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center rounded-[3px] border border-slate-300 bg-white px-2.5 py-1 text-[0.67rem] font-semibold uppercase tracking-[0.05em] text-text-secondary transition-colors hover:border-slate-600 hover:text-text-primary"
                      >
                        {action.label}
                      </a>
                    ))}
                  </div>
                </article>
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
