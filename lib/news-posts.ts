import type { BlogSection } from "./blog-posts";

export type NewsCategory =
  | "K-12"
  | "Higher Education"
  | "Standardized Tests"
  | "District News"
  | "Policy & Legislation"
  | "College Admissions";

export const NEWS_CATEGORIES: NewsCategory[] = [
  "K-12",
  "Higher Education",
  "Standardized Tests",
  "District News",
  "Policy & Legislation",
  "College Admissions",
];

export type NewsPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  dateISO: string;
  readTime: string;
  category: NewsCategory;
  region?: string;
  sections: BlogSection[];
};

export const NEWS_POSTS: NewsPost[] = [
  {
    slug: "california-native-american-mascots-ban-july-2026",
    title: "California's Ban on Native American School Mascots Takes Effect July 1",
    description:
      "AB 3074 expands California's Racial Mascots Act, prohibiting public K-12 schools from using any derogatory Native American term as a team name or mascot starting July 1, 2026. Dozens of schools are still in the process of rebranding.",
    date: "June 12, 2026",
    dateISO: "2026-06-12",
    readTime: "4 min",
    category: "Policy & Legislation",
    region: "Statewide",
    sections: [
      {
        type: "p",
        text: "In less than three weeks, a new chapter of California's Racial Mascots Act takes effect. Starting July 1, 2026, public K-12 schools across the state are prohibited from using any derogatory Native American term as a team name, nickname, or mascot — a mandate that has prompted dozens of districts to rebrand athletic programs, update uniforms, and retire imagery tied to Indigenous peoples.",
      },
      {
        type: "h2",
        text: "What the Law Requires",
      },
      {
        type: "p",
        text: "Assembly Bill 3074, signed by Governor Gavin Newsom in 2024, expands the original 2021 law that banned the specific nickname 'Redskins.' The updated law covers a much wider set of terms explicitly listed in the statute — including Apaches, Braves, Chiefs, Chieftains, Chippewa, Comanches, Indians, Savages, Squaw, and Tribe — as well as any other term related to Native Americans that could be deemed derogatory. Schools found in violation face fines after a compliance period.",
      },
      {
        type: "p",
        text: "Two narrow exemptions remain. Public schools operated by an Indian tribe or tribal organization are exempt from the prohibition. Additionally, a school may seek an exemption by demonstrating a specific, documented connection to a tribe that has formally endorsed the use of the name.",
      },
      {
        type: "h2",
        text: "Which Schools Are Affected?",
      },
      {
        type: "p",
        text: "The California Department of Education has been tracking compliance since AB 3074 was signed. According to reporting by Action News Now and KRCR, a number of schools in rural Northern California — including several in the Sacramento Valley and Shasta County — carried Native American-themed mascots well into the 2025-26 school year and have been working toward rebrands ahead of the July deadline. Districts typically need to replace uniforms, signage, letterhead, and digital assets, a process that can cost tens of thousands of dollars.",
      },
      {
        type: "ul",
        items: [
          "Schools must retire prohibited team names, nicknames, and mascots by July 1, 2026.",
          "Explicit violations — such as continuing to use a banned name in official school communications — can trigger state fines.",
          "Tribal exemptions require formal, documented tribal endorsement — informal goodwill is not sufficient.",
          "Spirit wear and merchandise purchased before the deadline does not automatically become illegal, but schools are advised to phase it out.",
        ],
      },
      {
        type: "h2",
        text: "The Broader Context",
      },
      {
        type: "p",
        text: "California is one of the most active states in the nation on the mascot issue. The original Racial Mascots Act was among the first state-level bans in the U.S. when it passed in 2021. Advocates who pushed for AB 3074's expansion argued that the original law left too many loopholes — allowing schools to keep Native American imagery as long as they avoided the single word 'Redskins.' The expanded statute is designed to close those gaps.",
      },
      {
        type: "p",
        text: "Critics, mostly from rural districts with long mascot traditions, have raised concerns about the cost of rebranding and what they describe as a loss of community identity. Some school boards voted to fight the law before ultimately complying. A few districts have cited the tribal-endorsement exemption in attempts to retain their names, though tribes have not uniformly granted approval.",
      },
      {
        type: "h2",
        text: "What This Means for Students and Families",
      },
      {
        type: "p",
        text: "For most California students, the change will be visible in fall 2026 when new school-year uniforms and spirit materials reflect updated team names. Schools that complete rebrands before July 1 are fully compliant; those that do not will face state scrutiny when the new school year begins. Parents who are unsure whether their school is in compliance can contact their district's administrative office or check communications from the California Department of Education.",
      },
      {
        type: "p",
        text: "The law applies exclusively to public schools. Private schools are not subject to the Racial Mascots Act, though many have voluntarily adopted similar policies. Students at schools undergoing rebrands this summer may also benefit from additional academic support as districts redirect administrative resources toward compliance efforts — an area where private tutors can play a valuable role in keeping learning on track.",
      },
      {
        type: "links",
        label: "Find a Tutor in California",
        items: [
          { text: "Browse California Tutors", href: "/tutors" },
          { text: "Post a Tutoring Request", href: "/request" },
          { text: "Los Angeles History Tutors", href: "/los-angeles/history" },
        ],
      },
    ],
  },
  {
    slug: "newsom-revised-budget-california-schools-2026-27-prop98",
    title: "California Schools Eye Record Funding in Newsom's Revised Budget — But $3.9 Billion Is Still Withheld",
    description:
      "Governor Newsom's May Revision would push Prop 98 education funding to a record $127.1 billion for 2026-27, but a $3.9 billion holdback has the California Teachers Association threatening legal action.",
    date: "June 11, 2026",
    dateISO: "2026-06-11",
    readTime: "5 min",
    category: "Policy & Legislation",
    region: "Statewide",
    sections: [
      {
        type: "p",
        text: "California school districts are watching Sacramento closely this month as Governor Gavin Newsom's revised state budget — known as the May Revision — works its way through the Legislature. The proposal contains welcome news for educators: Proposition 98 funding for TK-12 schools and community colleges would reach a record $127.1 billion in 2026-27, pushing per-pupil spending to an all-time high of $21,013 — according to EdSource.",
      },
      {
        type: "h2",
        text: "What Is Proposition 98 — and Why Does It Matter?",
      },
      {
        type: "p",
        text: "Proposition 98, passed by voters in 1988, requires the state to direct roughly 40 percent of its general fund to TK-12 education and community colleges. Because the formula ties school funding to state revenue, the recent surge in California tax collections has unlocked billions in new dollars. The revised Prop 98 figure for 2026-27 would be $24.3 billion higher than what the Legislature appropriated for 2025-26, with $12.5 billion of that as ongoing, structural funding.",
      },
      {
        type: "h2",
        text: "Key Proposals in the May Revision",
      },
      {
        type: "ul",
        items: [
          "A higher cost-of-living adjustment (COLA) for school districts, which also funds a new requirement for up to 14 weeks of paid pregnancy disability leave for TK-12 and community college employees starting in 2026-27.",
          "Billions of dollars more annually for special education — a long-standing funding gap that advocacy groups have pressed the state to close.",
          "A one-time discretionary block grant that districts could spend on local priorities such as facilities, staffing, or academic support programs.",
          "Per-pupil base funding rising to a record $21,013, according to the Department of Finance.",
        ],
      },
      {
        type: "h2",
        text: "The Catch: $3.9 Billion on Hold",
      },
      {
        type: "p",
        text: "Despite the headline numbers, a significant dispute is unresolved. Newsom has proposed withholding $3.9 billion in constitutionally guaranteed Prop 98 funding until early 2027, when the administration says it will have greater certainty that projected revenues have actually materialized. In his January budget, the holdback was even larger — $5.6 billion — but the May Revision reduced it after stronger-than-expected tax receipts.",
      },
      {
        type: "p",
        text: "School advocates are not satisfied. The California Teachers Association (CTA) and the California School Boards Association have both threatened to sue the state, arguing that Prop 98 is a voter-approved constitutional guarantee and that the governor cannot legally delay its distribution. The dispute is likely to carry into budget negotiations between the governor and Legislature, with a deadline of June 15 for a balanced budget agreement.",
      },
      {
        type: "h2",
        text: "What This Could Mean for Students and Families",
      },
      {
        type: "p",
        text: "If the full Prop 98 allocation reaches districts on time, school leaders say the money could restore programs cut in leaner years — including tutoring support, intervention specialists, and expanded after-school offerings. For families whose students are behind grade level, the prospect of better-resourced schools is significant. However, districts are cautious about hiring or committing to multi-year programs until the legal and budget uncertainty is resolved.",
      },
      {
        type: "p",
        text: "In the meantime, many parents are turning to private and community tutors to fill academic gaps, particularly in math and reading, while waiting to see how district budgets take shape for the coming school year.",
      },
      {
        type: "links",
        label: "Find a Tutor in California",
        items: [
          { text: "Browse all California tutors", href: "/tutors" },
          { text: "Post a free tutoring request", href: "/request" },
          { text: "Find a math tutor near you", href: "/los-angeles/mathematics" },
        ],
      },
    ],
  },
  {
    slug: "california-k12-governance-reform-pace-report-2026",
    title: "Major Study Calls for Stronger State Oversight of California's K-12 Schools",
    description:
      "A sweeping 1,000-page report by more than 100 researchers concludes that California's fragmented school governance is holding students back — and Governor Newsom has endorsed its call for reform.",
    date: "June 11, 2026",
    dateISO: "2026-06-11",
    readTime: "5 min",
    category: "Policy & Legislation",
    region: "Statewide",
    sections: [
      {
        type: "p",
        text: "A landmark research report released in May 2026 concludes that California's K-12 governance structure — one of the most decentralized in the nation — is a major obstacle to improving student outcomes. The report, produced by the Policy Analysis for California Education (PACE) initiative and spanning nearly 1,000 pages written by over 100 researchers, is part of the recurring \"Getting Down to Facts\" series that takes stock of the state's education system roughly every decade.",
      },
      {
        type: "h2",
        text: "What the Report Found",
      },
      {
        type: "p",
        text: "For over a century, California has divided school oversight among the governor, the Legislature, the elected State Superintendent of Public Instruction, and the State Board of Education — while giving local school districts wide latitude to set their own direction. The PACE report argues this arrangement has created accountability gaps that make it difficult to drive consistent improvement, especially for California's most underserved students.",
      },
      {
        type: "ul",
        items: [
          "The shift to local control funding (through the Local Control Funding Formula) left big gaps in student performance with unclear lines of accountability.",
          "Fragmented authority among state agencies means no single body is fully responsible when districts fall short.",
          "The report recommends stronger state oversight mechanisms to ensure districts are meeting student needs — particularly for low-income students, English learners, and students with disabilities.",
        ],
      },
      {
        type: "h2",
        text: "Newsom's Governance Reform Proposal",
      },
      {
        type: "p",
        text: "Governor Gavin Newsom has endorsed the report's core findings and, as part of his 2026-27 budget proposal, has put forward a plan to consolidate state education authority. His proposal would transfer most of the elected State Superintendent's administrative duties to the State Board of Education — whose members are appointed by the governor — effectively unifying the policymaking board with the department that carries out those policies.",
      },
      {
        type: "p",
        text: "The change would take effect January 1, 2027, after both Newsom and current Superintendent Tony Thurmond leave office. Supporters argue this would eliminate the friction that arises when elected superintendents and governors hold conflicting visions for education. Critics, including some educators and local school board members, worry the move concentrates too much control in the executive branch.",
      },
      {
        type: "h2",
        text: "Who Supports — and Who's Cautious",
      },
      {
        type: "p",
        text: "The reform has drawn support from a broad coalition including the Association of California School Administrators (ACSA), California Association of School Business Officials, Californians Together, and EdTrust-West. These organizations argue that clearer lines of authority will make it easier to implement statewide initiatives — such as the rollout of new math frameworks and expanded literacy programs — with fidelity across all districts.",
      },
      {
        type: "p",
        text: "However, the outgoing State Superintendent Tony Thurmond has publicly objected to the proposal, arguing that an independently elected superintendent provides a check on gubernatorial power and represents a direct democratic voice for California's public school communities. The debate will likely continue into the legislative session as the November 2026 election approaches.",
      },
      {
        type: "h2",
        text: "What This Means for Students and Families",
      },
      {
        type: "p",
        text: "For families, the immediate practical impact is limited — school doors don't change, teachers don't change, and curricula remain set at the district level for now. But the governance debate has real downstream consequences: how the state holds underperforming districts accountable, how education funding priorities are set, and how quickly California can respond when student outcomes stall.",
      },
      {
        type: "p",
        text: "For students who are already struggling academically — particularly in math and reading — the report's findings reinforce what many parents already experience firsthand: inconsistency in support services, variation in teacher quality across districts, and a system where a student's ZIP code can determine the quality of education they receive. Parents looking to supplement their child's schooling with a private tutor often cite exactly these gaps as the reason they seek outside help.",
      },
      {
        type: "links",
        label: "Find a Tutor in California",
        items: [
          { text: "Browse Math Tutors Near You", href: "/tutors" },
          { text: "Post a Tuition Request — Free", href: "/request" },
          { text: "Find Tutors in Los Angeles", href: "/los-angeles/mathematics" },
        ],
      },
    ],
  },
  {
    slug: "california-phone-free-school-act-july-2026",
    title: "California's Phone-Free School Act Takes Effect July 1 — What Every Family Needs to Know",
    description:
      "Every California school district must have a smartphone restriction policy in place by July 1, 2026. Here's what the law requires, how districts are responding, and what it means for students heading into the 2026-27 school year.",
    date: "June 10, 2026",
    dateISO: "2026-06-10",
    readTime: "5 min",
    category: "K-12",
    region: "Statewide",
    sections: [
      {
        type: "p",
        text: "With the school year winding down, California families returning in August will find a different classroom environment: smartphones will be restricted — or banned entirely — for every student in the state. Under Assembly Bill 3216, the Phone-Free School Act signed by Governor Gavin Newsom in September 2024, every public school district, charter school, and county office of education must adopt a smartphone restriction policy by July 1, 2026.",
      },
      {
        type: "h2",
        text: "What the Law Requires",
      },
      {
        type: "p",
        text: "The law does not mandate a single approach. Districts must choose one of two paths: limit smartphone use to designated times and locations, or prohibit phones entirely during the school day. The policy must be developed with input from students, parents, and educators, and must include provisions for emergencies — students can always use a phone if there is a perceived threat to safety, or if permitted by a teacher, administrator, or doctor. Students with an individualized education program (IEP) may also have exceptions built into their plan.",
      },
      {
        type: "h2",
        text: "How Districts Are Responding",
      },
      {
        type: "p",
        text: "California's roughly 1,000 school districts have taken varied approaches. Some — including several large urban districts — have moved to full-day bans using pouches or locked storage. Others are adopting bell-to-bell restrictions that allow phones in hallways between classes but not in classrooms. A number of districts have been using Yondr pouches, magnetic locking cases students carry but cannot open during the school day.",
      },
      {
        type: "ul",
        items: [
          "Full ban: phones stored at the front office or in locked pouches for the entire school day.",
          "Classroom-only restriction: phones must be put away during instructional time but may be used during lunch or passing periods.",
          "Grade-level tiered policies: stricter rules for middle schoolers, more flexibility for high school seniors.",
        ],
      },
      {
        type: "h2",
        text: "The Research Behind the Push",
      },
      {
        type: "p",
        text: "California's move follows a growing body of research linking constant smartphone access to declining attention spans, increased anxiety, and lower academic performance — particularly in middle school students. A 2023 UNESCO report recommended phone-free schools globally. Governor Newsom cited concerns about social media's impact on youth mental health when signing the bill, and noted that schools that had already gone phone-free reported improvements in both learning and student wellbeing.",
      },
      {
        type: "h2",
        text: "What Parents Should Do Now",
      },
      {
        type: "p",
        text: "The new school year begins in late July or August for most California districts. Before then, parents should check their district's website for the specific policy — rules vary significantly between schools. Students who rely on their phone as a medical device or for disability-related accommodations should work with their school's IEP or 504 coordinator now to ensure their needs are documented before fall.",
      },
      {
        type: "p",
        text: "For families looking to use the summer productively, the phone-free transition is a natural moment to build focused study habits. A tutor who works one-on-one — without the distraction of a screen — can help students strengthen skills before the new year starts.",
      },
      {
        type: "links",
        label: "Find a Tutor in California",
        items: [
          { text: "Browse all California tutors", href: "/tutors" },
          { text: "Post a free tutoring request", href: "/request" },
          { text: "Find tutors in San Diego", href: "/san-diego" },
        ],
      },
    ],
  },
  {
    slug: "california-special-education-funding-2026-27-boost",
    title: "California Proposes $2.4 Billion Special Education Boost — A 43% Increase Over Last Year",
    description:
      "Governor Newsom's revised 2026-27 budget includes a $2.4 billion increase for special education — the largest single-year boost in recent memory. But $3.9 billion in school funding remains withheld, keeping educators on edge.",
    date: "June 10, 2026",
    dateISO: "2026-06-10",
    readTime: "5 min",
    category: "Policy & Legislation",
    region: "Statewide",
    sections: [
      {
        type: "p",
        text: "California's 2026-27 budget proposal includes a $2.4 billion increase for special education — a 43% jump over the prior year — according to EdSource. The boost comes as part of Governor Gavin Newsom's May budget revision, which added $1.8 billion to the $509 million he had already proposed for students with disabilities. If enacted, it would represent the single largest increase in California special education funding in recent memory.",
      },
      {
        type: "h2",
        text: "Why Special Education Is Getting a Major Infusion",
      },
      {
        type: "p",
        text: "California school districts have long argued that state special education funding has failed to keep pace with rising costs — including legal services, specialized staff, and individualized education program (IEP) requirements. Many districts have been forced to divert general education dollars to cover the gap, a practice sometimes called the 'special education tax' on school budgets. The proposed increase signals that the state is responding to years of advocacy from disability rights groups, parent organizations, and district administrators.",
      },
      {
        type: "p",
        text: "According to EdSource, the additional funding is tied to Newsom's broader May revision, which projects a record $127.1 billion in Proposition 98 funding for TK-12 schools and community colleges — driven by a surge in state tax revenues.",
      },
      {
        type: "h2",
        text: "The Catch: $3.9 Billion Remains Withheld",
      },
      {
        type: "p",
        text: "Despite the headline numbers, education leaders have a significant complaint: Newsom is still withholding $3.9 billion in school funds until early next year, when the next governor can reassess the state's finances. Only $1.7 billion of a larger pot is being released now. School organizations were blunt in their reaction.",
      },
      {
        type: "ul",
        items: [
          "\"ACSA rejects the Administration's proposal, as these funds belong in classrooms supporting students,\" said Edgar Zazueta, executive director of the Association of California School Administrators.",
          "CTA President David Goldberg warned that withholding the funds \"causes serious harm to public schools\" — leading to overcrowded, under-resourced classrooms.",
          "Some district leaders said the uncertainty makes it impossible to finalize hiring plans or avoid mid-year layoffs.",
        ],
      },
      {
        type: "h2",
        text: "What This Means for Students With Disabilities",
      },
      {
        type: "p",
        text: "If the full $2.4 billion increase passes the legislature and is signed into law, districts could hire more special education teachers, speech therapists, occupational therapists, and behavioral support staff. Waitlists for IEP-related services have grown in many California districts, and the funding could help reduce delays. However, final passage requires agreement between Newsom and the legislature by June 15, the constitutional budget deadline.",
      },
      {
        type: "h2",
        text: "What Comes Next",
      },
      {
        type: "p",
        text: "Budget negotiations are entering their final stretch. Legislators and the governor must reach a deal by June 15. Education advocates are pushing to have the withheld $3.9 billion released immediately rather than deferred. Watch for announcements from the California Department of Finance and the Legislative Analyst's Office in the coming days.",
      },
      {
        type: "p",
        text: "For families of students with disabilities, a tutor who specializes in IEP support, learning differences, or assistive communication can make a significant difference — especially during summer when school services pause.",
      },
      {
        type: "links",
        label: "Find a Tutor in California",
        items: [
          { text: "Browse tutors by subject", href: "/tutors" },
          { text: "Post a tutoring request", href: "/request" },
          { text: "Find tutors in Los Angeles", href: "/los-angeles" },
        ],
      },
    ],
  },
  {
    slug: "california-school-budget-2026-27-record-funding",
    title: "California Schools Set to Receive Record $127 Billion — What It Means for Students",
    description:
      "Governor Newsom's revised 2026-27 budget proposes a record $127.1 billion in Prop 98 funding for TK-12 schools and community colleges, pushing per-pupil spending to $21,013. Here's what changed and what the catch is.",
    date: "June 10, 2026",
    dateISO: "2026-06-10",
    readTime: "5 min",
    category: "Policy & Legislation",
    region: "Statewide",
    sections: [
      {
        type: "p",
        text: "California schools are on track for the largest education budget in state history. Governor Gavin Newsom's May budget revision proposes $127.1 billion in Proposition 98 funding for TK-12 schools and community colleges in 2026-27 — a figure $24.3 billion higher than what was appropriated for 2025-26. Per-pupil funding from the state would rise to a record $21,013, with total per-student spending including federal and other sources reaching $28,282.",
      },
      {
        type: "h2",
        text: "Where the Money Comes From",
      },
      {
        type: "p",
        text: "Proposition 98, passed by California voters in 1988, requires roughly 40% of the state's general fund to flow to education. This year, unexpectedly strong state revenues — fueled by a surge in capital gains and income tax receipts — pushed the Prop 98 guarantee far above earlier projections. The $12.5 billion in new ongoing funding is particularly significant because it sets a higher baseline for future years, locking in much of the increase permanently.",
      },
      {
        type: "h2",
        text: "Key Priorities in the Proposal",
      },
      {
        type: "p",
        text: "Newsom's revised plan targets the windfall at priorities school leaders had been pushing for since the beginning of the budget cycle:",
      },
      {
        type: "ul",
        items: [
          "Cost-of-living adjustment raised from 2.87% to 4.31%, giving districts more room to cover rising labor costs",
          "Billions in additional annual funding for special education, addressing one of the most persistent funding gaps in the system",
          "A one-time discretionary block grant giving districts flexibility to address local needs — from tutoring programs to facilities repairs",
          "Continued investment in community schools, which provide wraparound health, mental health, and family services on campus",
        ],
      },
      {
        type: "h2",
        text: "The Catch: $3.9 Billion Withheld",
      },
      {
        type: "p",
        text: "Despite the headlines, education leaders have mixed feelings. While the $127.1 billion figure is historic, Newsom's proposal includes a significant caveat: $3.9 billion that schools were expecting will be held back until early 2027, when the next governor can reassess. Only $1.7 billion of the withheld portion is included in the current allocation. School district superintendents and the California Teachers Association have called on the Legislature to release the full amount, arguing that districts need certainty to plan staffing, programs, and contracts.",
      },
      {
        type: "h2",
        text: "Why Districts Are Still Struggling Locally",
      },
      {
        type: "p",
        text: "Record state numbers do not always translate into relief at the district level. Enrollment across California has been declining for years, and per-pupil formulas mean fewer students equals less money even when the overall pot grows. Several Southern California districts — including some in the Los Angeles region — have warned of potential layoffs and program cuts due to shrinking enrollment and rising pension and healthcare costs. The 4.31% COLA helps, but it still may not fully cover the cost increases many districts are experiencing.",
      },
      {
        type: "h2",
        text: "What Comes Next",
      },
      {
        type: "p",
        text: "The Legislature must pass a final budget by June 15 under the state constitution. Negotiations between Newsom and legislative leaders are ongoing, with education advocates pushing to unlock the withheld $3.9 billion. The final budget deal will shape school staffing, class sizes, and program availability for the 2026-27 school year — affecting roughly six million K-12 students statewide.",
      },
      {
        type: "p",
        text: "For families navigating an uncertain school environment — whether due to program cuts, larger class sizes, or shifting resource priorities — supplemental tutoring can help fill the gap. One-on-one instruction gives students the focused attention that crowded classrooms sometimes cannot provide.",
      },
      {
        type: "links",
        label: "Find a tutor in California:",
        items: [
          { text: "Browse all California tutors", href: "/tutors" },
          { text: "Math tutors in Los Angeles", href: "/los-angeles/mathematics" },
          { text: "Post a free tuition request", href: "/request" },
        ],
      },
    ],
  },
  {
    slug: "california-superintendent-race-2026-primary",
    title: "California's Top School Job Is Up for Grabs: What the 2026 Superintendent Race Means for Families",
    description:
      "Sonja Shaw and Richard Barrera advanced to a November runoff to lead California's 10,000 public schools. Here's who they are and what their platforms mean for K-12 students.",
    date: "June 9, 2026",
    dateISO: "2026-06-09",
    readTime: "5 min",
    category: "Policy & Legislation",
    region: "Statewide",
    sections: [
      {
        type: "p",
        text: "California held its primary election on June 2, 2026, and among the races on the ballot was one that will directly affect every public school student in the state: the race for Superintendent of Public Instruction. From a crowded field of ten candidates, two emerged to face off in November — Sonja Shaw and Richard Barrera.",
      },
      {
        type: "h2",
        text: "Who Are the Two Finalists?",
      },
      {
        type: "p",
        text: "Sonja Shaw led the primary with nearly 25% of votes. She is a conservative-leaning candidate who has drawn attention for her outspoken positions on parental rights, curriculum transparency, and school choice. Shaw has been a vocal critic of some of California's recent curriculum frameworks and has positioned herself as a reform candidate willing to challenge the education establishment.",
      },
      {
        type: "p",
        text: "Richard Barrera came in second with approximately 20% of the vote. A member of the San Diego Unified School District Board, Barrera ran as a progressive candidate with strong backing from the California Teachers Association and, notably, the California Charter Schools Association — an unusual coalition that united two groups that have historically been at odds. His platform centers on equity, expanded student support services, and building on the gains made by the current administration.",
      },
      {
        type: "h2",
        text: "Why This Race Matters",
      },
      {
        type: "p",
        text: "The Superintendent of Public Instruction oversees California's K-12 public education system — the largest in the United States, serving more than six million students across 1,000 school districts. The superintendent sets policy direction on curriculum standards, standardized testing, teacher credentialing, and how state education funds are prioritized. In short, whoever wins in November will have significant influence over what is taught, how students are assessed, and what support is available in classrooms across the state.",
      },
      {
        type: "ul",
        items: [
          "Curriculum standards — including the new K-8 Math Framework and English Language Arts guidelines",
          "Standardized testing policy — including the future of CAASPP and any shift toward new assessments",
          "Oversight of special education, English learner programs, and after-school funding",
          "Direction on school choice, charter school expansion, and district accountability",
          "Implementation of state literacy initiatives at the elementary level",
        ],
      },
      {
        type: "h2",
        text: "What Parents and Tutors Should Watch",
      },
      {
        type: "p",
        text: "The November contest between Shaw and Barrera represents a genuine policy divide. A Shaw win would likely bring pressure to reverse or modify recent curriculum changes — including the K-8 Math Framework — and could shift the state's approach to standardized testing. A Barrera win would signal continuity with the current direction, including the equity-focused reforms that have defined California education policy for the past several years.",
      },
      {
        type: "p",
        text: "For tutors, the stakes are practical: changes to what is tested and how math is sequenced directly affect what students need help with. For parents, the November vote is one of the most consequential education decisions California will make in 2026. The general election is November 3, 2026.",
      },
      {
        type: "links",
        label: "Find a California Tutor While Policy Shifts Happen",
        items: [
          { text: "Browse verified tutors in California", href: "/tutors" },
          { text: "Math tutors in Los Angeles", href: "/los-angeles/mathematics" },
          { text: "Post a free tuition request", href: "/request" },
        ],
      },
    ],
  },
  {
    slug: "california-k8-math-framework-2024",
    title: "California's New K–8 Math Framework: What It Means for Your Child",
    description:
      "California adopted a sweeping new K–8 math framework in 2023. Here's what changed, what's being debated, and how students and families can stay ahead.",
    date: "June 5, 2026",
    dateISO: "2026-06-05",
    readTime: "6 min",
    category: "K-12",
    region: "Statewide",
    sections: [
      {
        type: "p",
        text: "In 2023, California adopted a new Mathematics Framework for kindergarten through grade 12 — its first major update in nearly a decade. The revision has generated both praise and controversy, touching off a statewide debate about how math should be taught and who it should serve.",
      },
      {
        type: "h2",
        text: "What Changed in the New Framework?",
      },
      {
        type: "p",
        text: "The updated framework places a stronger emphasis on conceptual understanding over rote memorization. Rather than pushing students through Algebra 1 in 8th grade as a universal benchmark, the new guidance encourages data science, statistics, and applied math pathways alongside the traditional algebra-and-calculus sequence. The goal is to reach more students — particularly those who historically dropped out of the math pipeline — by offering multiple routes to mathematical proficiency.",
      },
      {
        type: "ul",
        items: [
          "Emphasis on 'big ideas' that connect concepts across grade levels",
          "Greater integration of data literacy and real-world problem solving",
          "New elective pathways: Data Science as an alternative to Precalculus/Calculus",
          "Reduced emphasis on tracking and acceleration in middle school",
          "Stronger focus on equity — ensuring all students access rigorous math",
        ],
      },
      {
        type: "h2",
        text: "The Controversy",
      },
      {
        type: "p",
        text: "The framework has faced pushback from some university professors and parent groups who worry that de-emphasizing early algebra access will disadvantage students applying to UC and CSU campuses, which still require traditional math sequences for many STEM majors. Critics argue that replacing Precalculus with a Data Science elective — while valuable — may leave students unprepared for calculus-based college courses.",
      },
      {
        type: "p",
        text: "Proponents counter that the existing system was already failing large numbers of students, particularly in lower-income districts, by pushing an accelerated one-size-fits-all path that many couldn't sustain.",
      },
      {
        type: "h2",
        text: "What Does This Mean for Your Child?",
      },
      {
        type: "p",
        text: "Implementation varies by district — some California school districts are moving quickly to align curriculum with the new framework, while others are taking a more cautious approach. Parents should check with their child's school about how math courses will be sequenced and whether acceleration options (like taking Algebra 1 in 7th grade) are still available.",
      },
      {
        type: "p",
        text: "For students targeting STEM majors at UC or CSU, completing Calculus or at minimum Precalculus before graduation remains important. A qualified math tutor can help students stay on the traditional track, fill gaps left by curriculum transitions, or bridge into the new data science pathway if that better suits their goals.",
      },
      {
        type: "links",
        label: "Find a Math Tutor in California",
        items: [
          { text: "Math tutors in Los Angeles", href: "/los-angeles/mathematics" },
          { text: "Math tutors in San Francisco", href: "/san-francisco/mathematics" },
          { text: "Math tutors in San Diego", href: "/san-diego/mathematics" },
          { text: "Browse all California math tutors", href: "/tutors" },
        ],
      },
    ],
  },
  {
    slug: "caaspp-2024-25-results-california",
    title: "2024–25 CAASPP Results: How Is California Performing?",
    description:
      "California's Smarter Balanced assessment results reveal persistent gaps in math and ELA proficiency. What the numbers mean and what families can do.",
    date: "June 3, 2026",
    dateISO: "2026-06-03",
    readTime: "5 min",
    category: "K-12",
    region: "Statewide",
    sections: [
      {
        type: "p",
        text: "Each year, the California Assessment of Student Performance and Progress (CAASPP) measures how well students in grades 3–8 and grade 11 are meeting state standards in English Language Arts (ELA) and Mathematics. The 2024–25 results continue to paint a mixed picture of California's K–12 education system.",
      },
      {
        type: "h2",
        text: "Key Findings from 2024–25",
      },
      {
        type: "p",
        text: "While specific 2024–25 figures are pending final CDE publication, trends from recent cycles show that roughly half of California students meet or exceed the ELA standard, while math proficiency continues to lag — typically with 35–40% of students meeting grade-level benchmarks statewide. Post-pandemic recovery has been uneven: urban districts have shown slower rebound than suburban counterparts, and learning loss in elementary math remains a documented concern. (Verify final 2024–25 percentages at caaspp.cde.ca.gov when released.)",
      },
      {
        type: "h2",
        text: "Persistent Achievement Gaps",
      },
      {
        type: "ul",
        items: [
          "English learners: proficiency rates roughly 25–30 points below the state average",
          "Students from low-income families: approximately 30 percentage points below non-low-income peers in math",
          "Students with disabilities: largest gaps, often 40+ points below the overall average",
          "African American and Hispanic students: gap-closing progress, but still significantly below Asian and White peers",
        ],
      },
      {
        type: "h2",
        text: "What the Test Actually Measures",
      },
      {
        type: "p",
        text: "CAASPP uses the Smarter Balanced Assessments, which test critical thinking and application rather than simple recall. Students read complex passages, analyze arguments, solve multi-step math problems, and write explanatory essays. Many students who perform well in class struggle with the format — and vice versa.",
      },
      {
        type: "h2",
        text: "How Tutoring Can Help",
      },
      {
        type: "p",
        text: "A tutor who understands the Smarter Balanced format can make a measurable difference. Unlike general homework help, targeted CAASPP prep focuses on the specific reasoning and writing skills the test rewards. If your child's CAASPP scores fell below the 'Standard Met' level, summer and fall tutoring is the most effective time to close that gap before the next school year accelerates.",
      },
      {
        type: "links",
        label: "Find a Tutor to Help With Test Prep",
        items: [
          { text: "English tutors in California", href: "/tutors" },
          { text: "Math tutors near you", href: "/tutors" },
          { text: "Post a tuition request — free", href: "/request" },
        ],
      },
    ],
  },
  {
    slug: "uc-csu-admissions-class-2026",
    title: "UC and CSU Admissions Updates for Class of 2026 Applicants",
    description:
      "What California high school seniors need to know about UC and CSU application changes, test policy, and admissions trends for the 2025–26 cycle.",
    date: "May 30, 2026",
    dateISO: "2026-05-30",
    readTime: "7 min",
    category: "College Admissions",
    region: "Statewide",
    sections: [
      {
        type: "p",
        text: "For California high school students graduating in spring 2026, the college admissions landscape has shifted significantly over the past two years. Here is what matters most heading into the application season.",
      },
      {
        type: "h2",
        text: "UC System: Test-Free Is Now Permanent",
      },
      {
        type: "p",
        text: "The University of California made its test-blind policy permanent for all campuses through at least the current application cycle. This means SAT and ACT scores will not be considered in admissions decisions — not even as optional context. The UC Regents voted to develop a new, UC-specific standardized test, but that is still in development and not in use for the Class of 2026 or 2027. For these applicants, grades, coursework rigor, personal insight questions, and extracurriculars carry the full weight.",
      },
      {
        type: "h2",
        text: "CSU System: Test-Free Through 2025 Entry",
      },
      {
        type: "p",
        text: "California State University campuses also remain test-free for Class of 2026 applicants (fall 2026 entry). However, CSU has signaled it may revisit this policy in coming years, especially for competitive programs. For now, your GPA and completion of A–G requirements are the primary academic criteria.",
      },
      {
        type: "h2",
        text: "What's Getting More Competitive",
      },
      {
        type: "ul",
        items: [
          "UCLA, UC Berkeley, and UC San Diego continue to see record application numbers — admit rates at these flagships are at historic lows",
          "UC Santa Barbara, UC Davis, and UC Irvine have seen large increases in applications from out-of-state and international students",
          "CSU Cal Poly SLO and SDSU remain highly selective for many majors",
          "Impacted programs (nursing, business, CS, engineering) have additional requirements at most CSU campuses",
        ],
      },
      {
        type: "h2",
        text: "A–G Requirements: Still Non-Negotiable",
      },
      {
        type: "p",
        text: "Both UC and CSU require completion of 15 college-preparatory A–G courses with a C or better (and ideally a B or better for competitive applicants). The most commonly missed requirement is the two years of laboratory science. Students should verify their A–G completion with their school counselor no later than junior year.",
      },
      {
        type: "h2",
        text: "Personal Insight Questions (UC PIQs)",
      },
      {
        type: "p",
        text: "UC applicants answer four of eight Personal Insight Questions, 350 words each. These have replaced the traditional personal statement and are the primary way applicants distinguish themselves. Strong PIQ writing is specific, reflective, and honest — not a resume summary. Many students benefit from a writing tutor or academic coach to refine their responses.",
      },
      {
        type: "links",
        label: "Prepare for College Applications with a Tutor",
        items: [
          { text: "Find an SAT/ACT prep tutor", href: "/tutors" },
          { text: "Academic writing tutors in California", href: "/tutors" },
          { text: "Post a tuition request", href: "/request" },
        ],
      },
    ],
  },
  {
    slug: "lausd-budget-after-school-tutoring-2025",
    title: "How LAUSD's Latest Budget Affects After-School and Tutoring Programs",
    description:
      "Los Angeles Unified School District faces budget pressure in 2025. Here's what that means for after-school programs, tutoring support, and families who rely on them.",
    date: "May 25, 2026",
    dateISO: "2026-05-25",
    readTime: "5 min",
    category: "District News",
    region: "Los Angeles",
    sections: [
      {
        type: "p",
        text: "Los Angeles Unified School District — the second-largest school district in the United States with over 560,000 students — is navigating a difficult budget period. Declining enrollment, the end of one-time federal pandemic relief funds (ESSER), and rising pension costs have created a structural deficit that is forcing difficult trade-offs.",
      },
      {
        type: "h2",
        text: "What's Being Cut or Reduced",
      },
      {
        type: "p",
        text: "LAUSD's budget proposals for 2025–26 have included reductions to supplemental academic support programs, including some after-school tutoring initiatives funded through ESSER money that is now exhausted. Programs that expanded during COVID recovery — including expanded tutoring staffing at high-need schools — are among those facing cuts. The district has emphasized it is trying to protect core classroom instruction, but enrichment and intervention programs are at higher risk.",
      },
      {
        type: "ul",
        items: [
          "Some after-school academic intervention programs reduced in scope",
          "ESSER-funded tutoring positions not renewed in several schools",
          "Library hours and instructional aide positions reduced at some campuses",
          "Community schools funding under review for the 2026–27 cycle",
        ],
      },
      {
        type: "h2",
        text: "What's Being Protected",
      },
      {
        type: "p",
        text: "LAUSD has committed to maintaining its expanded transitional kindergarten (TK) program, mental health counselors added post-pandemic, and core special education services. The district is also preserving funding for its Early Literacy Initiative, recognizing that 3rd-grade reading proficiency is a key predictor of long-term academic outcomes.",
      },
      {
        type: "h2",
        text: "What This Means for Families",
      },
      {
        type: "p",
        text: "For families in LAUSD who have relied on free or subsidized after-school tutoring programs, the reduction in district-provided support means they may need to look at alternatives. Private tutors remain the most flexible option — many LAUSD-area tutors are credentialed teachers or graduate students who offer competitive rates and can tailor sessions to district curriculum standards.",
      },
      {
        type: "p",
        text: "If your child attended an LAUSD school that had a tutoring program reduced or eliminated, connecting directly with an independent tutor is a practical next step. catutors.com lists verified tutors across the LA metro area — all contacts are free and direct.",
      },
      {
        type: "links",
        label: "Find a Tutor in the Los Angeles Area",
        items: [
          { text: "Tutors in Los Angeles", href: "/los-angeles" },
          { text: "Math tutors in Los Angeles", href: "/los-angeles/mathematics" },
          { text: "English tutors in Los Angeles", href: "/los-angeles/english" },
          { text: "Post a free tuition request", href: "/request" },
        ],
      },
    ],
  },
  {
    slug: "sat-vs-act-california-2025",
    title: "SAT vs ACT in California: Which Test Should Your Child Take in 2025?",
    description:
      "With the UC system test-blind and CSUs test-free, do SAT and ACT scores still matter for California students? Here's the practical answer for 2025 applicants.",
    date: "May 20, 2026",
    dateISO: "2026-05-20",
    readTime: "6 min",
    category: "Standardized Tests",
    region: "Statewide",
    sections: [
      {
        type: "p",
        text: "California's two major public university systems — UC and CSU — no longer consider SAT or ACT scores for admissions. So do standardized tests still matter for California high school students? The answer is: it depends on where you're applying.",
      },
      {
        type: "h2",
        text: "UC and CSU: Test-Blind/Test-Free",
      },
      {
        type: "p",
        text: "The University of California is fully test-blind through at least the 2025–26 admissions cycle — SAT/ACT scores are not submitted and not considered. The California State University system is test-free for undergraduate admissions. For students applying only to CA public universities, test prep may not be a priority.",
      },
      {
        type: "h2",
        text: "Private Colleges and Out-of-State Schools",
      },
      {
        type: "p",
        text: "Most private colleges — including Stanford, USC, and Caltech — and the majority of out-of-state public universities have returned to test-optional or test-required policies. Stanford and MIT require SAT or ACT scores. USC is test-optional. If your student is considering any private college or out-of-state school, taking the SAT or ACT is still advisable.",
      },
      {
        type: "h2",
        text: "SAT vs ACT: The Structural Differences",
      },
      {
        type: "ul",
        items: [
          "SAT (Digital): 2-hour 14-minute exam, adaptive format, strong reading/writing component, calculator allowed throughout math",
          "ACT: 2 hours 55 minutes, fixed format, includes a separate Science section, slightly more time pressure",
          "SAT math focuses more on algebra and advanced math; ACT math covers more topics including trigonometry",
          "The digital SAT (launched 2024) is significantly shorter and uses adaptive difficulty — many students find it less fatiguing",
          "Both are accepted equally by virtually all US colleges that require testing",
        ],
      },
      {
        type: "h2",
        text: "Which Test Is Better for California Students?",
      },
      {
        type: "p",
        text: "There is no single answer — the right test depends on the student's strengths. Students who are strong readers and prefer a more reasoning-based math section often score better on the SAT. Students who are fast workers and comfortable with a science data-interpretation section often prefer the ACT. The best approach is to take a full-length practice test for both and compare the results.",
      },
      {
        type: "h2",
        text: "When to Start Prep",
      },
      {
        type: "p",
        text: "Most college counselors recommend beginning test prep in the spring of junior year, targeting a summer or early fall test date. A focused 8–12 week prep period with a qualified tutor — covering strategy, timing, and content gaps — is typically more effective than self-study alone. California students applying to any college outside the UC/CSU system should not treat test prep as optional.",
      },
      {
        type: "links",
        label: "Find an SAT or ACT Prep Tutor in California",
        items: [
          { text: "SAT prep tutors in Los Angeles", href: "/los-angeles/sat-prep" },
          { text: "SAT prep tutors in San Francisco", href: "/san-francisco/sat-prep" },
          { text: "SAT prep tutors in San Diego", href: "/san-diego/sat-prep" },
          { text: "Browse all test prep tutors", href: "/tutors" },
        ],
      },
    ],
  },
];

export function getAllNews(): NewsPost[] {
  return [...NEWS_POSTS].sort((a, b) => b.dateISO.localeCompare(a.dateISO));
}

export function getNewsBySlug(slug: string): NewsPost | undefined {
  return NEWS_POSTS.find((p) => p.slug === slug);
}

export function getRelatedNews(current: NewsPost, limit = 3): NewsPost[] {
  return NEWS_POSTS.filter(
    (p) => p.slug !== current.slug && p.category === current.category
  )
    .sort((a, b) => b.dateISO.localeCompare(a.dateISO))
    .slice(0, limit);
}
