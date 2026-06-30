/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

interface FooterProps {
  onSectionClick?: (section: string) => void;
}

export default function Footer({ onSectionClick }: FooterProps) {
  const sections = [
    {
      title: 'News',
      links: ['Home Page', 'World', 'Politics', 'Election 2024'],
    },
    {
      title: 'Opinion',
      links: ["Today's Opinion", 'Columnists', 'Editorials', 'Guest Essays'],
    },
    {
      title: 'Arts',
      links: ['Books', 'Movies', 'Television', 'Music'],
    },
    {
      title: 'Living',
      links: ['Automobiles', 'Education', 'Food', 'Health'],
    },
    {
      title: 'More',
      links: ['Reader Center', 'Wirecutter', 'Cooking', 'Games'],
    },
    {
      title: 'Account',
      links: ['Log In', 'Manage Account', 'Help'],
    },
  ];

  return (
    <footer className="w-full bg-[#fcfcfc] dark:bg-[#121212] border-t border-gray-300 dark:border-zinc-800 pt-10 pb-20 px-4 transition-colors duration-200">
      <div className="max-w-5xl mx-auto flex flex-col items-center">
        {/* Large Logo */}
        <div className="mb-8">
          <h2
            className="font-gothic text-3xl sm:text-4xl text-[#121212] dark:text-[#f3f3f3] tracking-tight"
            style={{ fontFamily: 'UnifrakturMaguntia, serif' }}
            id="footer-logo"
          >
            The New York Times
          </h2>
        </div>

        {/* Link Columns Grid */}
        <div className="w-full grid grid-cols-2 md:grid-cols-6 gap-8 pb-10 border-b border-gray-200 dark:border-zinc-800 text-left">
          {sections.map((col, idx) => (
            <div key={idx} className="flex flex-col gap-3">
              <h3 className="font-sans text-[11px] font-extrabold uppercase tracking-widest text-[#121212] dark:text-[#f3f3f3]">
                {col.title}
              </h3>
              <ul className="flex flex-col gap-2">
                {col.links.map((link, lIdx) => (
                  <li key={lIdx}>
                    <button
                      onClick={() => onSectionClick?.(link)}
                      className="font-sans text-xs text-gray-600 dark:text-zinc-400 hover:text-[#121212] dark:hover:text-[#f3f3f3] transition-colors cursor-pointer text-left"
                    >
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Fine Print links */}
        <div className="w-full pt-8 flex flex-col items-center gap-4 text-[11px] text-gray-500 dark:text-zinc-500 font-sans">
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-center">
            <span>© {new Date().getFullYear()} The New York Times Company</span>
            <span className="hidden sm:inline">|</span>
            <a href="#nytco" className="hover:underline">NYTCo</a>
            <a href="#contact" className="hover:underline">Contact Us</a>
            <a href="#accessibility" className="hover:underline">Accessibility</a>
            <a href="#work" className="hover:underline">Work with us</a>
            <a href="#advertise" className="hover:underline">Advertise</a>
            <a href="#privacy" className="hover:underline">Privacy Policy</a>
            <a href="#terms" className="hover:underline">Terms of Service</a>
          </div>
          <p className="text-[10px] text-gray-400 dark:text-zinc-600 text-center max-w-2xl leading-relaxed">
            This digital service matches the layout and design architecture of the classic print and digital editions. Images are curated via high-quality free repositories for illustrative purposes.
          </p>
        </div>
      </div>
    </footer>
  );
}
