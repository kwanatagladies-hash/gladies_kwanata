/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Article, StockTicker, LiveFeedItem, Comment } from './types';

export const initialStocks: StockTicker[] = [
  { symbol: "DJIA", name: "Dow Jones", price: "34,820.12", change: "-156.80", changePercent: "-0.45%", isPositive: false },
  { symbol: "S&P 500", name: "S&P 500 Index", price: "4,495.70", change: "+5.40", changePercent: "+0.12%", isPositive: true },
  { symbol: "NASDAQ", name: "Nasdaq Composite", price: "13,912.40", change: "+115.80", changePercent: "+0.84%", isPositive: true },
  { symbol: "BTC-USD", name: "Bitcoin USD", price: "36,240.00", change: "+1,480.00", changePercent: "+4.25%", isPositive: true },
  { symbol: "GOLD", name: "Gold Futures", price: "1,962.50", change: "-3.50", changePercent: "-0.18%", isPositive: false },
];

export const sampleComments: Comment[] = [
  {
    id: "c1",
    author: "Eleanor Vance",
    location: "Seattle, WA",
    text: "This agreement is decades overdue, but the real test is execution. Establishing a fund is easy; getting wealthy carbon-emitting nations to actually deposit the funds and distributing them efficiently to local communities in need is where treaties historically collapse.",
    date: "Nov 14, 2023, 11:02 AM",
    likes: 342,
    isNYTPick: true,
    isVerified: true
  },
  {
    id: "c2",
    author: "Richard G.",
    location: "Geneva, Switzerland",
    text: "As an observer of these negotiations, I must say the level of diplomatic gridlock was unprecedented. Elena Rodriguez's report captures the sigh of relief in the room perfectly. It's a landmark moment, but let's see how much capital is pledged by the end of the month.",
    date: "Nov 14, 2023, 11:15 AM",
    likes: 128,
    isNYTPick: false,
    isVerified: true
  },
  {
    id: "c3",
    author: "EcoOptimist",
    location: "Boston, MA",
    text: "Finally, concrete recognition of climate justice! Developing nations suffer the most immediate and catastrophic consequences of climate change despite contributing the least to historical greenhouse gases. This is a moral imperative.",
    date: "Nov 14, 2023, 11:30 AM",
    likes: 415,
    isNYTPick: true,
    isVerified: false
  },
  {
    id: "c4",
    author: "Thomas Miller",
    location: "Houston, TX",
    text: "Who oversees this fund? If history is any indicator, billions will be lost to administrative overhead and governmental corruption. There must be absolute transparency and auditing requirements built in from day one.",
    date: "Nov 14, 2023, 11:45 AM",
    likes: 89,
    isNYTPick: false,
    isVerified: false
  }
];

export const initialArticles: Article[] = [
  {
    id: "climate-reparations",
    title: "Global Summit Reaches Landmark Agreement on Climate Reparations",
    abstract: "After weeks of intense negotiation, delegates from nearly 200 nations have finalized a historic pact to establish a global fund for climate-related damages in developing countries.",
    author: "BY ELENA RODRIGUEZ",
    date: "Nov. 14, 2023, 10:45 a.m. ET",
    imageUrl: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1200&q=80",
    imageCaption: "Delegates applaud after the final vote in the General Assembly hall at the United Nations Headquarters. The agreement marks a historic shift in global climate finance policy.",
    section: "World",
    type: "lead",
    readTime: 5,
    comments: sampleComments,
    content: [
      "UNITED NATIONS — In what diplomats are calling the most significant breakthrough since the Paris Agreement, nearly 200 nations on Tuesday finalized a historic pact to establish a global 'loss and damage' fund. The initiative is aimed at helping developing nations recover from the devastating impacts of climate change.",
      "The agreement, reached after a grueling, round-the-clock three-week negotiation session in Geneva, represents a watershed moment in climate diplomacy. It formally establishes a mechanism through which wealthy, high-emitting nations will contribute financially to rebuild infrastructure, relocate communities, and preserve heritage in countries suffering from rising seas, extreme droughts, and intensified storms.",
      "Elena Rodriguez, leading the climate taskforce, reported that the atmosphere inside the assembly hall transitioned from tense silence to explosive applause as the final gavel fell. 'We have written a new chapter in global solidarity,' remarked Amina J. Mohammed, the UN Deputy Secretary-General. 'For the first time, we are moving beyond mitigation and adaptation to address the severe, irreversible realities of climate reparations.'",
      "The negotiations almost collapsed multiple times over the weekend. A coalition of developed nations, led by the United States and the European Union, initially resisted any language that implied legal liability or compensation claims. The compromise language avoids terms of legal culpability while establishing a 'cooperative fund for restoration and resilience.'",
      "Under the terms of the agreement, an interim board will be established immediately to draft the fund's operational guidelines, with an aim to begin disbursements by late next year. Pledges are voluntary, but several European nations have already announced initial contributions totaling over $450 million. Analysts estimate that the actual cost of loss and damage exceeds $300 billion annually.",
      "While environmental advocates praised the treaty as a historic moral victory, some expressed concern about the lack of binding targets. 'A fund is only as good as the capital inside it,' said Sunita Narain, director of the Centre for Science and Environment in New Delhi. 'We must ensure this isn't another empty bucket that wealthy nations point to while failing to deliver real support.'"
    ]
  },
  {
    id: "inflation-cooling",
    title: "Central Banks Signal Shift as Inflation Cools Faster Than Anticipated",
    abstract: "New data suggests that major economies might avoid a recession as consumer prices stabilize across the Eurozone and North America.",
    author: "BY DAVID HARRISON",
    date: "Nov. 14, 2023, 09:30 a.m. ET",
    section: "Business",
    type: "secondary",
    readTime: 4,
    comments: [
      {
        id: "inf-1",
        author: "Sarah Sterling",
        location: "London, UK",
        text: "This is a welcome relief. The aggressive rate hikes have been painful for mortgage holders, but seeing inflation back towards target without a massive spike in unemployment is the best-case scenario.",
        date: "Nov 14, 2023",
        likes: 124,
        isNYTPick: true,
        isVerified: true
      }
    ],
    content: [
      "WASHINGTON — Economists are breathing a cautious sigh of relief. Fresh consumer index data released on Tuesday indicates that inflation across the world's largest economies is decelerating at a pace that has surprised even the most optimistic market analysts.",
      "In the United States, consumer price index (CPI) growth fell to 3.1% year-on-year, down from a peak of over 9% in mid-2022. Similar cooling trends were observed in the Eurozone, where inflation dipped to 2.9%, and Canada, which registered 3.1%. The rapid descent has sparked intense speculation that central banks are finished with their aggressive interest rate-hiking cycles.",
      "Federal Reserve officials, while remaining characteristically guarded, acknowledged that the combination of cooling inflation and strong labor markets raises the probability of a coveted 'soft landing' — taming inflation without triggering a severe recession.",
      "Market indexes reacted immediately. The S&P 500 and Nasdaq surged in early trading, while Treasury yields fell sharply. However, central bankers caution that returning inflation fully to their 2% target remains a delicate, long-term challenge, and interest rates are likely to remain elevated for several quarters to come."
    ]
  },
  {
    id: "light-rail-transit",
    title: "The Silent Revolution of Urban Transit: Why Light Rail is Winning Again",
    abstract: "Cities are tearing up highways to make room for streetcars, transforming the landscape of modern commuting and property values.",
    author: "BY SARAH JENKINS",
    date: "Nov. 13, 2023, 02:15 p.m. ET",
    section: "World",
    type: "secondary",
    readTime: 6,
    content: [
      "MUNICH — Across dozens of mid-sized cities in Europe and North America, a silent transformation is taking place on the asphalt. In a striking reversal of mid-20th-century urban planning, municipalities are systematically dismantling urban freeways and lane capacity to lay down steel tracks.",
      "Light rail and modern streetcar systems are experiencing an unprecedented renaissance. Proponents point to a perfect storm of drivers: skyrocketing maintenance costs for highway infrastructure, the urgent need to slash municipal carbon footprints, and an overwhelming preference among younger demographics for car-free urban centers.",
      "The impact extends far beyond transportation. Modern transit corridors have become magnets for real estate development. Properties located within a five-minute walk of new light rail stations are experiencing valuation premiums of up to 25% compared to adjacent neighborhoods.",
      "Critics raise concerns about high upfront capital costs and long construction timelines. Yet, as transit planners look at successful integrations in cities from Portland to Munich, the consensus is clear: the future of urban mobility looks remarkably like its past, only quieter, electric, and beautifully integrated."
    ]
  },
  {
    id: "spacex-starship",
    title: "SpaceX Successfully Lands Starship Prototype After Record Altitude Flight",
    abstract: "In a major milestone for deep space exploration, the spacecraft executed a belly flop maneuver and touched down vertically on the Texas coastline.",
    author: "BY DR. MARCUS VANCE",
    date: "Nov. 14, 2023, 10:35 a.m. ET",
    timeAgo: "10 MIN AGO",
    isBreaking: true,
    section: "Science",
    type: "breaking",
    readTime: 3,
    content: [
      "BOCA CHICA, TX — Under clear blue skies along the Gulf of Mexico, SpaceX on Tuesday successfully launched, flew, and landed its massive Starship prototype, achieving a flawless flight demonstration that marks a massive step forward for NASA's lunar ambitions.",
      "The 160-foot stainless steel spacecraft soared to an altitude of approximately six miles before turning off its three Raptor engines. It then committed to a highly complex, computer-controlled horizontal 'belly flop' descent, utilizing four steering flaps to glide through the atmosphere.",
      "In the flight's most nail-biting moment, the engines re-ignited just seconds before impact, pivoting the ship back into a vertical orientation and setting it down gently on the concrete landing pad amidst a cloud of steam and dust. The achievement is SpaceX's first fully successful high-altitude landing of the Starship system, clearing the way for orbital test flights next spring."
    ]
  },
  {
    id: "senate-tech-monopolies",
    title: "Senate Passes Bipartisan Bill to Reform Tech Monopolies",
    abstract: "The legislation represents the most aggressive antitrust action in decades, seeking to curb self-preferencing and app store dominance.",
    author: "BY CLARA VANCE",
    date: "Nov. 14, 2023, 10:17 a.m. ET",
    timeAgo: "28 MIN AGO",
    isBreaking: true,
    section: "Politics",
    type: "breaking",
    readTime: 4,
    content: [
      "WASHINGTON — In a rare and striking show of bipartisanship, the United States Senate on Tuesday passed the American Innovation and Choice Online Act, a landmark piece of legislation designed to break the stranglehold of the nation's largest tech platforms.",
      "The bill, which passed with a commanding 68-31 majority, targets platforms with a market capitalization exceeding $550 billion. It outlaws the practice of 'self-preferencing' — when an e-commerce giant or search engine prioritizes its own house brands or auxiliary services over independent third-party competitors.",
      "The bill's passage represents a severe blow to a multi-million dollar lobbying campaign waged by tech conglomerates, which argued the rules would ruin popular consumer services. The legislation now heads to the House of Representatives, where it faces a highly contested but favorable path to the President's desk."
    ]
  },
  {
    id: "analog-photography",
    title: "The Rebirth of Analog Photography in a Digital Age",
    abstract: "Against all odds, film cameras and chemical darkrooms are experiencing an explosive resurgence fueled by Gen Z creators and professional artists.",
    author: "BY JULIAN THORNE",
    date: "Nov. 14, 2023, 08:00 a.m. ET",
    imageUrl: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=600&q=80",
    imageCaption: "A classic 35mm rangefinder camera. Film manufacturers are experiencing an unprecedented surge in demand, causing widespread shortages.",
    section: "Culture",
    type: "latest",
    readTime: 4,
    content: [
      "TOKYO — Inside Fujifilm's primary manufacturing facility on the outskirts of Tokyo, chemical engineers are working triple shifts. The product they are rushing to fabricate isn't a cutting-edge sensor or smartphone component, but rolls of silver halide color negative film — a technology declared obsolete over a decade ago.",
      "Analog photography is experiencing an extraordinary, youth-driven renaissance. Film sales have tripled over the past four years, driven largely by creators born well after digital cameras became standard. Community darkrooms are popping up in major metropolitan areas, and secondhand vintage cameras have seen their resale values spike by up to 400%.",
      "Creators describe the attraction as a desire for tangibility, slower pacing, and the unique, irreplaceable aesthetic of chemical grain. 'In a world where everything is perfect, immediate, and instantly edited, there is a profound beauty in the anticipation of waiting for a roll to develop and accepting the beautiful imperfections of film,' says Tokyo-based photographer Hiroshi Sato."
    ]
  },
  {
    id: "deep-sea-jellyfish",
    title: "New Species of Deep-Sea Jellyfish Discovered in Mariana Trench",
    abstract: "Biologists operating a deep-sea submersible have captured high-definition footage of a bioluminescent organism that defies existing classifications.",
    author: "BY DR. SYLVIA EARLE",
    date: "Nov. 13, 2023, 06:12 p.m. ET",
    imageUrl: "https://images.unsplash.com/photo-1535591273668-578e31182c4f?auto=format&fit=crop&w=600&q=80",
    imageCaption: "The newly discovered jellyfish, exhibiting a mesmerizing cyan bioluminescence, was observed at a depth of nearly 25,000 feet.",
    section: "Science",
    type: "latest",
    readTime: 3,
    content: [
      "MARIANA TRENCH — Gliding through the perpetual midnight of the ocean's deepest abyssal zone, the high-powered lights of the research vehicle *Alucia II* illuminated a creature never before seen by human eyes. The organism, a delicate jellyfish measuring roughly ten inches across, floated with a slow, rhythmic pulsation.",
      "Biologists analyzing the high-definition telemetry described the jellyfish as a biological marvel. It possesses a complex network of dual-layered tentacles that glow with an intense, self-generated cyan bioluminescence, likely used to attract micro-prey in the dark.",
      "The creature's genetic sequence, sampled via a delicate suction mechanism, reveals a unique evolutionary branch. 'We are looking at a species that has evolved in complete isolation under pressures that would crush a steel submarine,' said Dr. Earle. 'It is a reminder that we know less about our ocean floors than we do about the surface of Mars.'"
    ]
  },
  {
    id: "opinion-social-connection",
    title: "The Crisis of Social Connection is Our Biggest National Threat",
    abstract: "\"We are losing the ability to talk to our neighbors, and it's killing our democracy.\"",
    author: "DAVID BROOKS",
    date: "Nov. 14, 2023",
    quote: "We are losing the ability to talk to our neighbors, and it's killing our democracy.",
    section: "Opinion",
    type: "opinion",
    readTime: 5,
    content: [
      "In recent years, a quiet epidemic of loneliness has swept across our society, severing the essential bonds of local community. We are withdrawing from civic associations, religious spaces, and simple neighborhood interactions.",
      "The data is as clear as it is devastating: Americans spend significantly less time socializing in person with friends than they did two decades ago. This isolation breeds suspicion. When we no longer interact with people whose backgrounds differ from ours, we stop viewing them as neighbors and begin viewing them as existential threats.",
      "Rebuilding our frayed social fabric requires more than online engagement. It demands real-time investment in physical spaces — parks, libraries, community centers — where the slow, difficult, and beautiful work of human connection can take root once more."
    ]
  },
  {
    id: "opinion-red-carpet",
    title: "When the Red Carpet Becomes a Political Minefield",
    abstract: "\"Hollywood's attempt to stay neutral is failing in a polarized world.\"",
    author: "MAUREEN DOWD",
    date: "Nov. 13, 2023",
    quote: "Hollywood's attempt to stay neutral is failing in a polarized world.",
    section: "Opinion",
    type: "opinion",
    readTime: 5,
    content: [
      "HOLLYWOOD — For decades, the red carpet was a meticulously curated parade of glamour, commercial sponsors, and safe, superficial questions about styling. But today, the velvet ropes are struggling to hold back the weight of a fracturing geopolitical reality.",
      "In our hyper-polarized climate, silence is no longer parsed as neutral; it is scrutinized as a statement of intent. Publicists and actors find themselves navigating a treacherous landscape where a single misworded interview or an omitted pin can ignite immediate, career-altering internet backlashes.",
      "The result is a culture of acute anxiety behind the scenes. In attempting to please everyone, Hollywood's elite are increasingly rendering themselves utterly silent, retreating behind heavily scripted soundbites that satisfy no one and strip the artistic community of its historical role as a provocative cultural mirror."
    ]
  },
  {
    id: "opinion-ai-data",
    title: "Is Artificial Intelligence Already Running Out of Data?",
    abstract: "\"The internet is becoming a closed loop, and that's a problem for the bots.\"",
    author: "EZRA KLEIN",
    date: "Nov. 12, 2023",
    quote: "The internet is becoming a closed loop, and that's a problem for the bots.",
    section: "Opinion",
    type: "opinion",
    readTime: 6,
    content: [
      "The modern artificial intelligence boom has been fueled by a simple, voracious premise: feed the models everything ever written, and they will become infinitely smart. But researchers are hitting a physical wall. We are running out of high-quality, human-written text on the public internet.",
      "Within the next few years, major developers will have fully consumed the available corpus of books, research papers, and forums. To continue training, companies are turning to 'synthetic data' — text generated by models to train newer models. But this creates a dangerous recursive loop, leading to model degradation and a homogenization of language.",
      "The closed loop of the web is a warning. Intelligence cannot exist solely in an echo chamber of its own past output. It requires interaction with the messy, unpredictable, and lived physical world."
    ]
  },
  {
    id: "opinion-remote-work",
    title: "The Unseen Consequences of the Remote Work Era",
    abstract: "\"Why the 'Third Place' is disappearing from the American landscape.\"",
    author: "MICHELLE GOLDBERG",
    date: "Nov. 11, 2023",
    quote: "Why the 'Third Place' is disappearing from the American landscape.",
    section: "Opinion",
    type: "opinion",
    readTime: 5,
    content: [
      "The debate over remote work has centered almost entirely on productivity metrics and corporate overhead. But we are ignoring the profound cultural cost of turning our homes into offices and our colleagues into floating Zoom tiles.",
      "Historically, society relied on the 'Third Place' — the local coffee shop, diner, bookstore, or pub — to serve as a buffer between domestic duties and professional demands. As remote workers colonize these spaces with laptops and noise-canceling headphones, we are commodifying the last bastions of unscripted social life.",
      "We are trading the messy, spontaneous joy of shared public life for the hyper-efficient isolation of our private living rooms. It's a bargain that may boost corporate profit margins, but leaves our collective spirits impoverished."
    ]
  },
  {
    id: "business-growth-costs",
    title: "Why the Silicon Valley 'Growth at All Costs' Model is Dying",
    abstract: "A new generation of founders is prioritizing profitability and sustainability over hyper-scaling, marking a sea change in venture capital.",
    author: "BY NELSON D. SCHWARTZ",
    date: "Nov. 14, 2023, 11:15 a.m. ET",
    imageUrl: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=1200&q=80",
    imageCaption: "Modern office towers in San Francisco. Rising interest rates and market corrections have changed the venture capital calculus.",
    section: "Business",
    type: "business",
    readTime: 6,
    content: [
      "SAN FRANCISCO — For nearly two decades, the playbook for startup success in Silicon Valley was single-minded: raise massive amounts of venture capital, burn cash rapidly to capture market share, and worry about profitability only after achieving global scale.",
      "That era is officially over. A combination of rising interest rates, deflated tech valuations, and highly public corporate collapses has forced a profound reckoning across the tech sector. Today, venture capitalists are turning away from 'unicorns' with massive cash burn rates, demanding instead that startups demonstrate clear paths to profitability from their earliest stages.",
      "The shift is forcing a new breed of disciplined entrepreneurship. Founders are scaling back hiring, focusing on core product lines, and pricing services sustainably rather than subsidizing customer acquisition. While the transition is painful, economists argue it will yield a healthier, more resilient tech ecosystem built on real value rather than speculative hype."
    ]
  },
  {
    id: "business-ev-sales",
    title: "EV Sales Stumble as Infrastructure Fails to Keep Pace",
    abstract: "Automakers are pulling back on aggressive targets as car buyers express anxiety about charging networks and range limitations.",
    author: "BY NELSON D. SCHWARTZ",
    date: "Nov. 14, 2023",
    section: "Business",
    type: "business",
    readTime: 4,
    content: [
      "DETROIT — The initial wave of enthusiastic early adopters has passed, and automakers are encountering a formidable wall of consumer resistance in their push to transition to electric vehicles.",
      "Sales growth for EVs has slowed dramatically in recent quarters, leading legacy giants like Ford and General Motors to delay billions in manufacturing investments. Surveys indicate that while consumers support environmental goals, they are highly hesitant to purchase EVs due to the unreliability of public charging stations and anxieties about winter battery performance.",
      "Industry experts warn that the transition cannot succeed on vehicle styling alone. 'We have put the cart before the horse,' says industry analyst Jessica Caldwell. 'Until we build a charging grid that is as ubiquitous, fast, and reliable as the corner gas station, the mass market will remain locked in internal combustion.'"
    ]
  },
  {
    id: "business-retailers-centers",
    title: "Retailers Bet Big on 'Experience Centers' as E-commerce plateaus",
    abstract: "Physical storefronts are re-emerging as the primary engine for brand loyalty and immersive shopping trips.",
    author: "BY NELSON D. SCHWARTZ",
    date: "Nov. 13, 2023",
    section: "Business",
    type: "business",
    readTime: 4,
    content: [
      "NEW YORK — After a decade of declaring the 'retail apocalypse' and predicting the complete dominance of online shopping, major consumer brands are pouring massive capital back into physical brick-and-mortar storefronts.",
      "The new stores, however, bear little resemblance to traditional retail outlets. Termed 'experience centers,' these locations focus heavily on community engagement, interactive workshops, and high-end hospitality rather than carrying rows of boxed inventory.",
      "Brands like Nike, Apple, and Lululemon are leading the charge, designing spaces where customers can test equipment on custom courts, attend yoga classes, or consult with running specialists. By turning shopping into a social, physical destination, retailers are building deep brand connections that digital screens simply cannot match."
    ]
  },
  {
    id: "business-fractional-cfo",
    title: "The Rise of the 'Fractional CFO' in Startups",
    abstract: "With seed rounds shrinking, emerging companies are hiring part-time financial executives to manage cash burns and ensure survival.",
    author: "BY NELSON D. SCHWARTZ",
    date: "Nov. 12, 2023",
    section: "Business",
    type: "business",
    readTime: 3,
    content: [
      "AUSTIN, TX — In the high-flying tech market of 2021, a seed-stage startup would typically hire a full suite of C-level executives immediately upon receiving funding. Today, survival is about lean operations, giving rise to the 'fractional' executive.",
      "Part-time, highly experienced Chief Financial Officers (CFOs) are becoming the most sought-after asset for early-stage companies. Working just 10 to 15 hours a week for several startups simultaneously, these financial veterans help founders navigate delicate cash flow modeling, tax structuring, and investor reporting at a fraction of the cost of a full-time executive.",
      "The trend reflects a broader move towards modular, flexible labor at the highest levels of corporate leadership, allowing startups to purchase expert guidance only as they need it."
    ]
  },
  {
    id: "business-trade-routes",
    title: "Global Trade Routes Shift Amid Geopolitical Tensions",
    abstract: "Manufacturing hubs are relocating to allied nations as supply chain resiliency overrides pure cost efficiency.",
    author: "BY NELSON D. SCHWARTZ",
    date: "Nov. 11, 2023",
    section: "Business",
    type: "business",
    readTime: 5,
    content: [
      "SINGAPORE — The map of global manufacturing is being redrawn at a pace not seen since the end of the Cold War. Under pressure from trade tariffs, geopolitical friction, and lessons learned from pandemic-era shut-downs, multinational conglomerates are shifting their supply chains.",
      "Countries like Vietnam, Mexico, and India are experiencing a historic manufacturing boom as Western companies execute 'nearshoring' and 'friendshoring' strategies. The primary goal is no longer finding the absolute lowest labor cost, but ensuring that vital components are fabricated in politically stable, allied nations.",
      "While the restructuring is boosting supply chain security, economists warn it will permanently elevate consumer prices. Building redundant facilities and abandoning hyper-efficient centralized hubs introduces friction that will keep global inflation pressures active for years to come."
    ]
  }
];

export const sampleLiveFeed: LiveFeedItem[] = [
  {
    id: "l1",
    time: "10:45 AM ET",
    title: "Historic Climate Pact Approved Unanimously",
    text: "The UN President has slammed down the final gavel, officially confirming the unanimous passage of the Loss and Damage fund. Cheers and tearful embraces break out across the assembly hall floor.",
    category: "World"
  },
  {
    id: "l2",
    time: "10:35 AM ET",
    title: "SpaceX Starship Touchdown Confirmed",
    text: "Telemetry confirms the Starship prototype has landed in Boca Chica, Texas. Visual feeds show the vehicle sitting upright on the pad with light venting. This is the first complete success of the high-altitude landing sequence.",
    category: "Science"
  },
  {
    id: "l3",
    time: "10:15 AM ET",
    title: "Delegates Enter Final Draft Discussion",
    text: "In Geneva, the wording of Article 14 regarding voluntary financing has been finalized after a late concession from EU representatives. The voting session is expected to commence in 15 minutes.",
    category: "World"
  },
  {
    id: "l4",
    time: "09:45 AM ET",
    title: "Stocks Jump Following CPI Report",
    text: "The Dow Jones Industrial Average gains 180 points in opening minutes, while the tech-heavy Nasdaq Composite index leaps 1.2% as cooling inflation data sparks rate-cut hopes.",
    category: "Business"
  },
  {
    id: "l5",
    time: "09:30 AM ET",
    title: "US Consumer Inflation Drops to 3.1%",
    text: "The Labor Department releases its consumer index report, showing year-on-year inflation fell to 3.1% in October, representing a significant cooling trend from prior months.",
    category: "Business"
  }
];
