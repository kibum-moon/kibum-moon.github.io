
import type { Publication, BlogPost, CVSection, CVEntry, Manuscript, Patent, ConferenceCategory, AwardCategory, Skill, TeachingCourse } from './types';

// --- EDITABLE CONTENT STARTS HERE ---

export const PROFILE_DATA = {
  name: "Kibum Moon",
  title: "Ph.D. Student in Psychology",
  institution: "Georgetown University",
  email: "km1735@georgetown.edu",
  orcidId: "", // Set to empty to use manual publication list
  bio: "I am a Ph.D. Student in Psychology at Georgetown University, advised by Dr. Kostadin Kushlev and Dr. Adam Green. My research explores the intersection of technology, psychology, and creativity, aiming to understand how we can leverage innovations like AI to help people live happier, smarter, and more creative lives while fostering digital well-being. I leverage computational methods and experimental designs to tackle these complex questions.",
  rotatingQuote: "",
  contactAddress: "Department of Psychology, Georgetown University, Washington, D.C.",
  cvUrl: "https://drive.google.com/file/d/1ogOO1HHNuTM9tr_bj7mLy00O8AgM05gX/", // Placeholder for CV file
  lastUpdated: "Sep 23, 2025",
};

export const SOCIAL_LINKS = {
    email: `mailto:${PROFILE_DATA.email}`,
    website: "https://kibum-moon-674791267323.us-west1.run.app/",
    googleScholar: "https://scholar.google.co.kr/citations?user=IhNP0EkAAAAJ&hl=en",
    orcid: "",
    linkedIn: "",
    github: "",
    twitter: "",
};

export const RESEARCH_INTERESTS: string[] = [
  "Creativity & Large Language Models (LLMs)",
  "Digital Well-being & Mental Health",
  "Computational Social Psychology",
  "AI-driven Homogenization",
  "Online Learning & Engagement",
  "Human-Computer Interaction",
];

// --- FULL CV DATA ---

export const EDUCATION_DATA: CVEntry[] = [
    {
        period: "Aug. 2022 – May 2027 (Expected)",
        title: "Ph.D. Student in Psychology",
        institution: "Georgetown University",
        location: "Washington, DC",
        details: "Advisor: Kostadin Kushlev, Ph.D. & Adam Green, Ph.D. (Co-Advising)",
    },
    {
        period: "Sep. 2022 – May 2024",
        title: "Master of Public Policy (MPP)",
        institution: "Georgetown University",
        location: "Washington, DC",
        details: [
          "Thesis title: Homogenizing effect of large language model on creativity: An empirical comparison of human and ChatGPT writing"
        ]
    },
    {
        period: "Sep. 2015 – Feb. 2018",
        title: "M.A. in Clinical and Counseling Psychology",
        institution: "Korea University",
        location: "Seoul, Korea",
        details: [
            "Thesis title: The Effect of Implicit Attitude Toward a Partner on Relationship Satisfaction and Relational Conflict",
            "Advisor: Young-gun Ko, Ph.D."
        ]
    },
    {
        period: "Mar. 2009 – Feb. 2015",
        title: "B.A. in Psychology & B.A. in Science Technology Studies (Double Major)",
        institution: "Korea University",
        location: "Seoul, Korea",
    },
    {
        period: "Feb. 2014 – May 2014",
        title: "Exchange student in the School of Psychology",
        institution: "University of New South Wales",
        location: "Sydney, Australia",
    },
];

export const PUBLICATIONS_DATA: Publication[] = [
  {
    title: "Relational Compartmentalization: How Culture Keeps Our Social Worlds Apart",
    authors: ["Wu, J.", "English, A. S.", "Zhou, X.", "Brooks, C.", "Moon, K.", "& Chentsova-Dutton, Y."],
    venue: "Personality and Social Psychology Bulletin",
    year: 2026,
    link: "https://doi.org/10.1177/01461672251404548",
    abstract: "",
    tags: ["Culture", "Social Relationships"]
  },
    {
    title: "The Promise and Peril of Mental Health Apps",
    authors: ["Kushlev, K.", "Moon, K.", "Harris, M.", "& Falgoust, G."],
    venue: "Policy Insights from the Behavioral and Brain Sciences",
    year: 2025,
    link: "https://doi.org/10.1177/23727322251405255",
    abstract: "",
    tags: ["Digital Well-being", "Policy", "Mobile App"]
  },

  {
    title: "Homogenizing Effect of Large Language Models (LLMs) on Creative Diversity: An Empirical Comparison of Human and ChatGPT Writing",
    authors: ["Moon, K.", "Green, A. E.", "& Kushlev, K."],
    venue: "Computers in Human Behavior: Artificial Humans, 100207",
    year: 2025,
    link: "https://doi.org/10.1016/j.chbah.2025.100207",
    abstract: "",
    tags: ["LLMs", "Creativity", "AI"]
  },
  {
    title: "Time-Specific Digital Detox Interventions: Effects and Effectiveness Among College Students",
    authors: ["King, D.", "Moon, K.", "& Kushlev, K."],
    venue: "Technology, Mind, and Behavior, 6(3)",
    year: 2025,
    link: "https://doi.org/10.1037/tmb0000173",
    abstract: "",
    tags: ["Digital Detox", "Well-being", "Intervention"]
  },
  {
    title: "Comparative analysis of sleep physiology using qualitative and quantitative criteria for insomnia symptoms",
    authors: ["Lee, R.", "Larson, O.", "Dhaliwal, S.", "Moon, K.", "Gerardy, B.", "de Chazal, P.", "... & Gehrman, P."],
    venue: "Sleep, zsae301",
    year: 2025,
    link: "https://doi.org/10.1093/sleep/zsae301",
    abstract: "",
    tags: ["Clinical Psychology", "Sleep"]
  },
  {
    title: "Childhood Maltreatment and Suicide Attempts in Major Depression and Bipolar Disorders in South Korea: A prospective Nationwide Cohort Study",
    authors: ["Kim, S.", "Dunn, N.", "Moon, K.", "Casement, M.D.", "Nam, Y.", "Yeom, J.", "Cho, C.H.", "Lee, H.J."],
    venue: "Journal of Affective Disorders",
    year: 2024,
    link: "https://doi.org/10.1016/j.jad.2024.06.012",
    abstract: "",
    tags: ["Clinical Psychology", "Mental Health"]
  },
  {
    title: "Study Examines Difference between Communal Narcissism and Altruism in Korean College Students Using Close-Other Reports",
    authors: ["Kim, H.", "Kim, J.", "Moon, K.", "Jeong, J.", "Ko, Y.G."],
    venue: "Korean Journal of Clinical Psychology, 42(3), 82-93",
    year: 2023,
    link: "https://doi.org/10.15842/kjcp.2023.42.3.004",
    abstract: "",
    tags: ["Social Psychology", "Narcissism"]
  },
  {
    title: "The Relationship between Mental Representations of Self and Social Evaluation: Examining the Validity and Usefulness of Visual Proxies of Self-Image",
    authors: ["Kim, J.", "Moon, K.", "Kim, S.", "Kim, H.", "& Ko, Y. G."],
    venue: "Frontiers in Psychology, 13, 8361",
    year: 2023,
    link: "https://doi.org/10.3389/fpsyg.2022.937905",
    abstract: "",
    tags: ["Self-Image", "Mental Representation"]
  },
  {
    title: "Online learning performance and engagement during the COVID-19 pandemic: Application of the dual-continua model of mental health",
    authors: ["Kim, J.", "Moon, K.", "Lee, J.", "Jeong, Y.", "Lee, S.", "& Ko, Y. G."],
    venue: "Frontiers in psychology, 4228",
    year: 2022,
    link: "https://doi.org/10.3389/fpsyg.2022.932777",
    abstract: "",
    tags: ["Online Learning", "COVID-19", "Mental Health"]
  },
  {
    title: "Development and validation of COVID-19 Impact Scale",
    authors: ["Min, H.", "Kim, J.", "Moon, K.", "et al."],
    venue: "BMC Psychol 10, 88",
    year: 2022,
    link: "https://doi.org/10.1186/s40359-022-00793-w",
    abstract: "",
    tags: ["Scale Development", "COVID-19"]
  },
  {
    title: "The Early Prediction Model of Student Performance Based on Deep Neural Network Using Massive LMS Log Data",
    authors: ["Moon, K.", "Kim, J.", "Lee, J."],
    venue: "Journal of the Korea Contents Association",
    year: 2021,
    link: "https://doi.org/10.5392/JKCA.2021.21.10.001",
    abstract: "",
    tags: ["Deep Learning", "Prediction Model"]
  },
  {
    title: "Development and Application of an AI-Powered Adaptive Course Recommender System in Higher Education: An Example from K University",
    authors: ["Lee, J.", "Moon, K.", "Han, S.", "Lee, S.", "Kwon, H.", "Han, J."],
    venue: "Journal of Educational Technology",
    year: 2021,
    link: "https://doi.org/10.17232/KSET.37.2.267",
    abstract: "",
    tags: ["AI", "Education", "Recommender System"]
  },
  {
    title: "The Mirror of Mind: Visualizing Mental Representations of Self Through Reverse Correlation",
    authors: ["Moon, K.", "Kim, S.", "Kim, J.", "Kim, H.", "& Ko, Y."],
    venue: "Frontiers in Psychology, 11, 1149",
    year: 2020,
    link: "https://doi.org/10.3389/fpsyg.2020.01149",
    abstract: "",
    tags: ["Reverse Correlation", "Self-Image"]
  },
  {
    title: "The Relationship Between Borderline Personality Features and Affective Responses to Altering Emotional Context",
    authors: ["Kim, S.", "Moon, K.", "Kim, J.", "& Ko, Y."],
    venue: "Current Psychology",
    year: 2020,
    link: "https://doi.org/10.1007/s12144-020-01077-5",
    abstract: "",
    tags: ["Clinical Psychology", "Personality"]
  },
  {
    title: "A Validation of the Korean Version of Adolescent Positive Mental Health Scale",
    authors: ["Kim, J.", "Moon, K.", "& Ko, Y."],
    venue: "Korean Journal of Health Psychology, 25(4), 823-834",
    year: 2020,
    link: "https://doi.org/10.17315/kjhp.2020.25.4.012",
    abstract: "",
    tags: ["Validation", "Mental Health"]
  },
  {
    title: "The Effects of Ego Depletion and Psychological Burden on Fatigue in Everyday Life: Focusing on Narcissism",
    authors: ["Lee, S.", "Moon, K.", "& Ko, Y."],
    venue: "Korean Journal of Clinical Psychology, 38(1), 60-69",
    year: 2019,
    link: "https://doi.org/10.15842/kjcp.2019.38.1.005",
    abstract: "",
    tags: ["Narcissism", "Ego Depletion"]
  },
  {
    title: "A Validation Study of Mental Health Two-Factor Model: In a Sexual Minority Population",
    authors: ["Back, I.", "Moon, K.", "& Ko, Y."],
    venue: "The Korean Journal of Woman Psychology, 24(4)",
    year: 2019,
    link: "#", // No DOI in provided CV
    abstract: "",
    tags: ["Validation", "Mental Health"]
  },
];

export const MANUSCRIPTS_DATA: Manuscript[] = [
    {
        authors: ["Kushlev, K.", "Harris, M.", "Moon, K."],
        title: "The Promise and Peril of Mental Health Apps.",
        status: "in progress",
        link: "https://psyarxiv.com/4uh7f"
    }
];

export const PATENTS_DATA: Patent[] = [
    {
        inventors: ["Moon, K.", "Lee, J.", "Lee, S.", "Han, S.", "Kwon, H.", "Han, J.", "Kim, G.T."],
        year: 2022,
        title: "System and Method for Recommending Related Courses Based on Graph Data and Recording Medium for Performing the Same.",
        id: "Patent Number: 10-2557827"
    },
    {
        inventors: ["Moon, K.", "Lee, J.", "Lee, S.", "Han, S.", "Kwon, H.", "Han, J.", "Kim, G.T."],
        year: 2022,
        title: "System and Method for Integrated Recommendation of Learning Activities Based on Keywords of Interest Using Academic Domain Embedding and Recording Medium for Performing the Same.",
        id: "Patent Number: 10-2540417"
    },
    {
        inventors: ["Moon, K.", "Lee, J.", "Lee, S.", "Han, S.", "Kwon, H.", "Han, J.", "Kim, G.T."],
        year: 2021,
        title: "System and Method for Recommendation Major Based on Keywords of Interests by Users and Computer Program for the Same.",
        id: "Patent Number: 10-2691360"
    },
    {
        inventors: ["Kim, G.T.", "Moon, K.", "Han, J.", "Kwon, H.", "Lee, S.", "Lee, J.", "Han, S."],
        year: 2021,
        title: "System and Method for Recommendation of Course Based on Course Similarity and Computer Program for the Same.",
        id: "Patent Number: 10-2375755"
    },
    {
        inventors: ["Lee, J.", "Moon, K.", "Han, S.", "Kwon, H.", "Han, J.", "Kim, G.T."],
        year: 2022,
        title: "Major Recommendation System and Major Recommendation Method Using Relationship-Based Knowledge Graph Embedding.",
        id: "Application Number: 10-2022-0028171"
    }
];

export const CONFERENCE_PRESENTATIONS_DATA: ConferenceCategory[] = [
    {
        category: "Conference Talks & Data Blitz",
        items: [
            { authors: ["Moon, K.", "Johnson, D.", "Beaty, R. E.", "Kushlev, K.", "Patterson, J. D.", "Green, A. E."], date: "2025, March 13-15", title: "AI Creativity Assessment and AI-driven Homogenization in College Admissions.", conference: "Annual Conference of The Society for the Psychology of Aesthetics, Creativity, and the Arts (Division 10 of the American Psychological Association)", location: "New Haven, CT." },
            { authors: ["Moon, K.", "Kushlev, K.", "Patterson, J. D.", "Beaty, R. E.", "Green, A. E."], date: "2024, April 11-12", title: "A Computational Approach to Creativity: Fostering Success and Equity in College Admissions.", conference: "Annual Conference of the Society for the Neuroscience of Creativity (SfNC)", location: "Toronto, Canada" },
            { authors: ["Moon, K.", "Patterson, J. D.", "Kushlev, K.", "Beaty, R. E.", "Green, A. E."], date: "2024, February 8", title: "A Computational Approach to Creativity: Fostering Success and Equity in College Admissions.", conference: "The Computational Social Psychology Preconference at the Annual Convention of the Society for Personality and Social Psychology", location: "San Diego, CA" },
            { authors: ["Kushlev, K.", "Castelo, N.", "King, D.", "Moon, K.", "Ward, A.", "Esterman, M.", "Reiner, P.", "Simon-Thomas, E., Wetchler, E., Heintzelman, S. J., & Layous, K."], date: "2025, February 20-22", title: "Does digital detox improve wellbeing? Insights from three field experiments.", conference: "Annual Meeting of the Society of Personality and Social Psychology", location: "Denver, CO." },
            { authors: ["Kleinmintz, O.", "Moon, K.", "Kushlev, K.", "Patterson, J. D.", "Beaty, R. E., Green, A. E."], date: "2023, Dec. 15", title: "Using Creativity to Select the Next Generation of College Students: A Computational Approach.", conference: "The International Society for the Study of Creativity and Innovation (ISSCI)", location: "virtual." },
            { authors: ["Kushlev, K.", "Moon, K.", "Green, A. E."], date: "2024, February 8-10", title: "Does ChatGPT promote or hinder human creativity?", conference: "Annual Convention of the Society for Personality and Social Psychology", location: "San Diego, CA." },
            { authors: ["Moon, K."], date: "2020", title: "The Impact of COVID-19 on Quality Education: Focusing on Socio-economic Disparity in Online Learning.", conference: "Oral presentation at the 3rd K.U. Innovation Forum", location: "Seoul, Republic of Korea" },
            { authors: ["Lee, J.", "Moon, K.", "Lee, S.", "Han, S.", "Han, J., & Kwon, H."], date: "2019", title: "Convergence in University Interdisciplinary Education.", conference: "Oral presentation at 2019 Korea Academy of Complexity Studies", location: "Seoul, Republic of Korea" },
            { authors: ["Park, K.", "Jung, S.", "Moon, K.", "Pyo, S., & Choi, K."], date: "2016", title: "Empirically Supported Treatments in Korea.", conference: "The 2016 Spring Conference of Korean Clinical Psychology Association", location: "Chuncheon, Korea" },
        ]
    },
    {
        category: "Posters",
        items: [
            { authors: ["Moon, K.", "Kushlev, K.", "Patterson, J. D.", "Beaty, R. E., Green, A. E."], date: "2024, April 13-16", title: "A Computational Approach to Creativity: Fostering Success and Equity in College Admissions.", conference: "The Cognitive Neuroscience Society (CNS) 2024 Annual Meeting", location: "Toronto, Canada." },
            { authors: ["Moon, K.", "Kronthal, E.", "Green, A. E.", "Kushlev, K."], date: "2024, April 11-12", title: "Human-Generated Content Achieves More Divergence in Aggregate than LLM-Generated Content: An Empirical Comparison of Human and ChatGPT Creativity.", conference: "Annual Conference of the Society for the Neuroscience of Creativity (SfNC)", location: "Toronto, Canada" },
            { authors: ["Moon, K.", "Kronthal, E.", "Green, A. E.", "Kushlev, K."], date: "2024, February 8-10", title: "Does ChatGPT promote or hinder human creativity?", conference: "Annual Convention of the Society for Personality and Social Psychology", location: "San Diego, CA." },
            { authors: ["Kim, S.", "Dunn, N.", "Moon, K.", "Casement, M.", "Yeom, J., Lee, H."], date: "2023, July 15", title: "The Longitudinal Relationship Between Childhood Trauma and Suicide Attempts Among Patients with Early Mood Disorders in South Korea.", conference: "2023 APA Division 45 Research Conference", location: "San Diego, CA." },
            { authors: ["Moon, K.", "Lee, S.", "Ko, Y.G., & Kushlev, K."], date: "2023, May 25-28", title: "Benefits of happiness on learning: Emotional well-being predicts GPA and online learning engagement during COVID-19.", conference: "The 2023 APS Annual Convention", location: "Washington, D.C., USA." },
            { authors: ["Moon, K.", "Lee, S.", "Ko, Y.G., & Kushlev, K."], date: "2023, Feb. 23", title: "Does happiness benefit learning? Emotional well-being predicts GPA and online learning engagement during COVID-19.", conference: "Happiness and Well-Being Preconference at the Annual Convention of the Society for Personality and Social Psychology", location: "Atlanta, GA." },
            { authors: ["Kim, S.", "Kim, J.", "Moon, K.", "Kang, W., Ko, Y."], date: "2021", title: "The Relationship between Meta-emotion and Mental Health.", conference: "The 2021 Spring Conference of Korean Clinical Psychology Association", location: "Seoul, South Korea" },
            { authors: ["Kim, D.", "Shin, W.", "Han., K.", "Lee, J.", "Moon, K.", "Lee, S.", "Han, S., Han, S."], date: "2020", title: "A system for recommending university liberal arts courses using collaborative filtering.", conference: "Short Paper at the 2020 Fall Conference of Korean Institute of Industrial Engineers", location: "Seoul, South Korea" },
            { authors: ["Kim, H.", "Moon, K.", "Kim, J., & Ko, Y."], date: "2020", title: "The Relationship Between Communal Narcissism and Altruism.", conference: "The 2020 Fall Conference of Korean Clinical Psychology Association", location: "Virtual" },
            { authors: ["Kim, J.", "Moon, K.", "Kim, S., & Ko, Y."], date: "2020", title: "Clinical Usefulness of Visualizing Mental Representations of Self through Reverse Correlation Method to Assess Depression and Anxiety.", conference: "The 2020 APS Annual Convention, Virtual Poster Showcase", location: "Virtual" },
            { authors: ["Kim, J.", "Moon, K.", "Park, J., Kim, S., & Ko., Y."], date: "2020", title: "The Relationship Between Mental Health and Belongingness Orientation of the Homeless.", conference: "The 2020 Spring Conference of Korean Clinical Psychology Association", location: "Virtual" },
            { authors: ["Moon, K.", "& Ko, Y."], date: "2018", title: "Facial Expression Accommodation Predicts Quality and Durability of Romantic Relationships.", conference: "The 30th APS Annual Convention", location: "San Francisco, CA. U.S." },
            { authors: ["Moon, K.", "Kim, H.", "Kim, S.", "Lee, C., & Ko, Y."], date: "2017", title: "Validation Study of the Korean version of the Balanced Index of Psychological Mindedness.", conference: "The 2017 Fall Conference of Korean Clinical Psychology Association", location: "Seoul, South Korea" },
        ]
    }
];

export const HONORS_AWARDS_DATA: AwardCategory[] = [
    {
        category: "Graduate",
        items: [
            { period: "2025", title: "SPSP Summer Institute in Social and Personality Psychology (SISPP)" },
            { period: "2023 - 2025", title: "Georgetown Psychology Conference Travel Grant" },
            { period: "2021", title: "Fulbright Scholarship (Offered, Declined)", details: "* Principal Candidate for the 2022 Fulbright Graduate Student Program Award" },
        ]
    },
    {
        category: "Undergraduate",
        items: [
            { period: "2015 – 2017", title: "Korea University Research Assistance Scholarship", details: "* Full tuition for 4 semesters" },
            { period: "2014", title: "(Merit-Based) Korea University Alumni Scholarships", details: "* Full tuition - Selected as 1 of 177 students at Korea University selected for this merit-based scholarship, awarded for academic excellence and potential to positively impact society." },
            { period: "2013", title: "(Merit-Based) Choonpha Hwangchungha Scholarships", details: "* Full tuition - Selected as 1 of 6 students at Korea University to receive this merit-based scholarship, awarded for academic excellence" },
            { period: "2013", title: "(Merit-Based) Sung Ryun Scholarships", details: "* Full tuition - Selected as 1 of 65 students nationwide in South Korea for this scholarship, awarded for potential to become a global leader" },
            { period: "2012, 2014", title: "(Merit-Based) Korea University Study Scholarships", details: "* $1000 - Awarded for high academic achievement" },
            { period: "2009", title: "(Merit-Based) Korea University Honors Scholarships", details: "* 35% of the tuition - A merit-based scholarship awarded for students in the top 5% of GPA in the Department" },
            { period: "2009 – 2014", title: "Korea University Semester High Honors", details: "* Awarded for achieving higher GPAs (over 4.0 out 4.5), for 5 semesters" },
        ]
    }
];

export const RESEARCH_EXPERIENCE_DATA: CVEntry[] = [
    { period: "Jan. 2023 – Present", title: "Graduate Researcher", institution: "Laboratory for Relational Cognition – Georgetown University", details: "PI: Dr. Adam Green" },
    { period: "Aug. 2022 – Present", title: "Graduate Researcher", institution: "Digital Health and Happiness Lab – Georgetown University", details: "PI: Dr. Kostadin Kushlev" },
    { period: "Feb. 2019 – Sep. 2019", title: "Clinical Researcher", institution: "Student Counseling Center – Korea University" },
    { period: "Feb. 2019 – Sep. 2019", title: "Post-Master Research Associate", institution: "Mentoring Counseling Center – Korea University" },
    { period: "Sep. 2015 – Feb. 2018", title: "Master Student Researcher", institution: "The Happiness Lab – Korea University", details: "PI: Dr. Young-gun Ko" },
];

export const PROFESSIONAL_EXPERIENCE_DATA: CVEntry[] = [
    { period: "Oct. 2022 – Present", title: "Graduate Research Affiliate", institution: "Office of Assessment and Decision Support – Georgetown University" },
    { period: "Oct. 2019 – Feb. 2022", title: "Full-time Data Scientist", institution: "Data Hub Team, Office of Digital Information – Korea University" },
];

export const TEACHING_EXPERIENCE_DATA: CVEntry[] = [
    { period: "Fall 2025", title: "AI & Data Driven Psychology – Main Instructor", institution: "Georgetown University" },
    { period: "Spring 2025", title: "Digital Well-being – Teaching Tutorials", institution: "Georgetown University" },
    { period: "Fall 2024", title: "Social Psychology – Teaching Fellow", institution: "Georgetown University" },
    { period: "Spring 2024", title: "Physiological Psychology – Teaching Fellow", institution: "Georgetown University" },
    { period: "Fall 2023", title: "Research Methods & Statistics – Recitation Instructor", institution: "Georgetown University" },
    { period: "Spring 2023", title: "Psychological Disorders – Teaching Fellow", institution: "Georgetown University" },
    { period: "Spring 2017 – 2019", title: "Life Designing and Self Understanding – Co-Instructor", institution: "Korea University" },
    { period: "2018 – 2020", title: "R Programming and Advanced Statistics Workshops – Main Instructor", institution: "Workshop Hosting" },
];

export const PROFESSIONAL_SKILLS_DATA: Skill[] = [
    { category: "Statistical Software & Programming Languages", list: "R, Python, SQL, JavaScript, Linux, Git, MATLAB, SPSS, STATA, JAMOVI, M-Plus" },
    { category: "Statistical Analysis", list: "Multilevel models (MLM), structural equation models (SEM), RI-CLMP, factor analyses, generalized regression models, social network analyses, actor-partner interdependent models (APIM), ecological diversity analyses, Bayesian analyses, bootstrapping." },
    { category: "Machine Learning & Deep Learning Frameworks", list: "Natural Language Processing (NLP), Dimension reduction, predictive modeling, time serial analyses, graph analytics, network representation learning, recommendation system, Pytorch, Tensorflow, Scikit-learn, Stellargraph, Genism, Tidymodels." },
    { category: "Data Visualization Tools", list: "R Shiny, Plotly/Dash, Gephi, Tableau, Power BI, Adobe Photoshop, Illustrator" },
    { category: "Language", list: "English (proficient), Korean (native), Japanese (Intermediate)" },
];

// FIX: Add empty TEACHING_DATA to resolve import error in Teaching.tsx
export const TEACHING_DATA: TeachingCourse[] = [];


// --- DATA FOR MAIN PAGE ---

export const CV_DATA: CVSection[] = [
    {
        title: "Education",
        items: [
            { period: "2022 - 2027 (Exp.)", title: "Ph.D. in Psychology", institution: "Georgetown University" },
            { period: "2022 - 2024", title: "Master of Public Policy (MPP)", institution: "Georgetown University" },
            { period: "2015 - 2018", title: "M.A. in Clinical and Counseling Psychology", institution: "Korea University" },
            { period: "2009 - 2015", title: "B.A. in Psychology & Science Technology Studies", institution: "Korea University" },
        ]
    },
    {
        title: "Selected Research Experience",
        items: [
            { period: "Jan 2023 - Present", title: "Graduate Researcher", institution: "Laboratory for Relational Cognition – Georgetown University (PI: Dr. Adam Green)" },
            { period: "Aug 2022 - Present", title: "Graduate Researcher", institution: "Digital Health and Happiness Lab – Georgetown University (PI: Dr. Kostadin Kushlev)" },
            { period: "Feb 2019 - Sep 2019", title: "Clinical Researcher", institution: "Student Counseling Center – Korea University" },
        ]
    },
    {
        title: "Selected Teaching Experience",
        items: [
            { period: "Fall 2025", title: "AI & Data Driven Psychology – Main Instructor (Std Eval: 4.86 / 5)", institution: "Georgetown University" },
            { period: "Spring 2025", title: "Digital Well-being – Teaching Tutorials", institution: "Georgetown University" },
            { period: "Fall 2024", title: "Social Psychology – Teaching Fellow", institution: "Georgetown University" },
        ]
    },
    {
        title: "Selected Honors & Awards",
        items: [
            { period: "2025", title: "SPSP Summer Institute in Social and Personality Psychology (SISPP)" },
            { period: "2021", title: "Fulbright Scholarship (Offered, Declined)", institution: "Principal Candidate for the 2022 Fulbright Graduate Student Program Award" },
            { period: "2015 - 2017", title: "Korea University Research Assistance Scholarship" },
        ]
    }
];

export const BLOG_DATA: BlogPost[] = [
  {
    title: "Our paper, 'Relational Compartmentalization: How Culture Keeps Our Social Worlds Apart', has been published in Personality and Social Psychology Bulletin.",
    date: "January 18, 2026",
    summary: "",
    link: "https://doi.org/10.1177/01461672251404548"
  },


  {
    title: "The Green Lab and our research on creativity and AI were recently featured in a lab spotlight by The Hoya.",
    date: "October 10, 2025",
    summary: "",
    link: "https://thehoya.com/science/lab-spotlight-green-lab-explores-benefits-of-creativity-impacts-of-ai/"
  },

  {
    title: "Our paper, 'Homogenizing Effect of Large Language Models (LLMs) on Creative Diversity: An Empirical Comparison of Human and ChatGPT Writing', has been published in Computers in Human Behavior: Artificial Humans.",
    date: "September 1, 2025",
    summary: "",
    link: "https://doi.org/10.1016/j.chbah.2025.100207"
  },

  {
    title: "We received a $2.5 million grant from the NSF to study the role of AI in human creativity.",
    date: "December 5, 2024",
    summary: "",
    link: "https://thehoya.com/news/campus-life/gu-professors-research-team-receives-2-5-million-grant/"
  }




];

// --- EDITABLE CONTENT ENDS HERE ---
