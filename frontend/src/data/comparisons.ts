export interface ComparisonRow {
  label: string;
  values: string[];
}

export interface ComparisonSet {
  id: string;
  title: string;
  options: string[];
  rows: ComparisonRow[];
}

export const comparisons: ComparisonSet[] = [
  {
    id: 'science-commerce-arts',
    title: 'Science vs Commerce vs Arts',
    options: ['Science', 'Commerce', 'Arts'],
    rows: [
      { label: 'Best for', values: ['Logical, analytical minds', 'Numbers, business-minded students', 'Language, creative, social minds'] },
      { label: 'Top careers', values: ['Engineer, Doctor, Scientist', 'CA, MBA, Banker', 'Lawyer, Civil Services, Journalist'] },
      { label: 'Entrance exams', values: ['JEE, NEET', 'CA Foundation, CUET', 'CLAT, CUET'] },
      { label: 'Flexibility to switch', values: ['High \u2014 can move to Commerce/Arts', 'Medium', 'Medium'] },
    ],
  },
  {
    id: 'bca-btech',
    title: 'BCA vs B.Tech',
    options: ['BCA', 'B.Tech'],
    rows: [
      { label: 'Duration', values: ['3 years', '4 years'] },
      { label: 'Focus', values: ['Software & applications', 'Core engineering + software'] },
      { label: 'Fees', values: ['Lower', 'Higher'] },
      { label: 'Best for', values: ['Quick entry into software jobs', 'Deeper technical roles, higher package ceiling'] },
    ],
  },
  {
    id: 'bcom-bba',
    title: 'B.Com vs BBA',
    options: ['B.Com', 'BBA'],
    rows: [
      { label: 'Focus', values: ['Accounting, finance, taxation', 'Management, leadership, business strategy'] },
      { label: 'Good for', values: ['CA / CMA aspirants', 'MBA aspirants, entrepreneurs'] },
      { label: 'Job roles', values: ['Accountant, Tax Analyst', 'Manager, Business Analyst'] },
    ],
  },
  {
    id: 'mbbs-bds-nursing',
    title: 'MBBS vs BDS vs Nursing',
    options: ['MBBS', 'BDS', 'Nursing'],
    rows: [
      { label: 'Duration', values: ['5.5 years', '5 years', '4 years'] },
      { label: 'Entrance exam', values: ['NEET UG', 'NEET UG', 'NEET UG / state exams'] },
      { label: 'Career', values: ['Doctor', 'Dentist', 'Nurse'] },
      { label: 'Cost', values: ['High (private) / Low (govt.)', 'Medium', 'Low to Medium'] },
    ],
  },
  {
    id: 'data-analyst-scientist',
    title: 'Data Analyst vs Data Scientist',
    options: ['Data Analyst', 'Data Scientist'],
    rows: [
      { label: 'Focus', values: ['Reporting, dashboards, trends', 'Modelling, prediction, machine learning'] },
      { label: 'Skills', values: ['Excel, SQL, Power BI', 'Python, ML, Statistics'] },
      { label: 'Entry difficulty', values: ['Easier to start', 'Needs stronger math/coding base'] },
      { label: 'Avg salary', values: ['\u20b94\u20138 LPA', '\u20b98\u201318 LPA'] },
    ],
  },
  {
    id: 'swe-ai-engineer',
    title: 'Software Engineer vs AI Engineer',
    options: ['Software Engineer', 'AI Engineer'],
    rows: [
      { label: 'Focus', values: ['Building applications & systems', 'Building AI/ML models & pipelines'] },
      { label: 'Core skills', values: ['DSA, system design, frameworks', 'Python, ML, deep learning, math'] },
      { label: 'Demand trend', values: ['Consistently high', 'Rapidly growing'] },
    ],
  },
  {
    id: 'govt-private-job',
    title: 'Government Job vs Private Job',
    options: ['Government Job', 'Private Job'],
    rows: [
      { label: 'Job security', values: ['Very high', 'Moderate, performance-based'] },
      { label: 'Salary growth', values: ['Slower, fixed increments', 'Faster, performance-linked'] },
      { label: 'Work-life balance', values: ['Generally stable', 'Varies by company'] },
      { label: 'Entry path', values: ['Competitive exams (UPSC, SSC, Banking)', 'Campus placement, direct hiring'] },
    ],
  },
  {
    id: 'degree-certification',
    title: 'College Degree vs Online Certification',
    options: ['College Degree', 'Online Certification'],
    rows: [
      { label: 'Recognition', values: ['Widely recognised, needed for many govt./PSU jobs', 'Growing acceptance, strong in tech/skill roles'] },
      { label: 'Duration', values: ['3\u20135 years', 'Weeks to months'] },
      { label: 'Cost', values: ['Higher', 'Lower'] },
      { label: 'Best used', values: ['As a foundation', 'To add specific in-demand skills'] },
    ],
  },
  {
    id: 'india-abroad',
    title: 'India Job vs Abroad Path',
    options: ['India Job', 'Abroad Path'],
    rows: [
      { label: 'Cost to start', values: ['Low', 'High (visa, travel, living costs)'] },
      { label: 'Salary (relative)', values: ['Lower in absolute terms', 'Often higher in absolute terms'] },
      { label: 'Family proximity', values: ['Close to home', 'Away from home'] },
      { label: 'Requirements', values: ['Standard hiring process', 'Visa, English tests, sometimes further study'] },
    ],
  },
  {
    id: 'startup-job',
    title: 'Startup vs Job',
    options: ['Startup', 'Established Job'],
    rows: [
      { label: 'Learning speed', values: ['Very fast, broad exposure', 'Structured, role-focused'] },
      { label: 'Risk', values: ['Higher', 'Lower'] },
      { label: 'Pay stability', values: ['Variable', 'Stable'] },
      { label: 'Growth ceiling', values: ['Potentially very high', 'Steady, defined'] },
    ],
  },
  {
    id: 'internship-fulltime',
    title: 'Internship vs Full-Time Job',
    options: ['Internship', 'Full-Time Job'],
    rows: [
      { label: 'Duration', values: ['Weeks to 6 months', 'Ongoing'] },
      { label: 'Purpose', values: ['Learning, exploring, building resume', 'Career, income, growth'] },
      { label: 'Pay', values: ['Stipend or unpaid', 'Full salary + benefits'] },
    ],
  },
  {
    id: 'product-service',
    title: 'Product Company vs Service Company',
    options: ['Product Company', 'Service Company'],
    rows: [
      { label: 'Focus', values: ['Builds & owns its own product', 'Builds solutions for clients'] },
      { label: 'Pace', values: ['Fast-paced, ownership-driven', 'Structured, process-driven'] },
      { label: 'Pay (entry-level)', values: ['Generally higher', 'Generally lower, more stable volume of jobs'] },
      { label: 'Good for', values: ['Deep technical growth', 'Broad exposure across industries'] },
    ],
  },
];
