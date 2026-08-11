import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import './githubStats.css';

const USERNAME = 'Asim-Sidd02';

const repoListVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const repoItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};

const LANGUAGE_COLORS = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  HTML: '#e34c26',
  CSS: '#563d7c',
  PHP: '#4F5D95',
  Dart: '#00B4AB',
  Vue: '#41b883',
  Python: '#3572A5',
};

const formatCount = (count) => (count >= 1000 ? `${(count / 1000).toFixed(1)}k` : `${count}`);

const timeAgo = (dateString) => {
  const seconds = Math.floor((Date.now() - new Date(dateString).getTime()) / 1000);
  const units = [
    ['year', 31536000],
    ['month', 2592000],
    ['day', 86400],
    ['hour', 3600],
    ['minute', 60],
  ];
  const match = units.find(([, secondsInUnit]) => seconds >= secondsInUnit);
  const [label, secondsInUnit] = match || ['second', 1];
  const value = Math.max(1, Math.floor(seconds / secondsInUnit));
  return `${value} ${label}${value > 1 ? 's' : ''} ago`;
};

const GithubStats = () => {
  const [profile, setProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const [profileRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${USERNAME}`),
          fetch(`https://api.github.com/users/${USERNAME}/repos?sort=updated&per_page=4`),
        ]);

        const okResponses = profileRes.ok && reposRes.ok;
        okResponses || (() => { throw new Error('GitHub request failed'); })();

        const [profileData, reposData] = await Promise.all([profileRes.json(), reposRes.json()]);

        cancelled || setProfile(profileData);
        cancelled || setRepos(reposData.filter((repo) => !repo.fork).slice(0, 4));
        cancelled || setStatus('ready');
      } catch (error) {
        cancelled || setStatus('error');
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="github section" id="github">
      <h2 className="section__title">GitHub Activity</h2>
      <span className="section__subtitle">Live From My Repos</span>

      <div className="github__container container">
        {status === 'loading' && (
          <div className="github__skeleton">
            <div className="github__skeleton-avatar"></div>
            <div className="github__skeleton-lines">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}

        {status === 'error' && (
          <div className="github__error">
            <i className="uil uil-exclamation-triangle"></i>
            <p>Couldn't load live GitHub data right now.</p>
            <a href={`https://github.com/${USERNAME}`} target="_blank" rel="noreferrer" className="button button--flex">
              Visit GitHub Profile
            </a>
          </div>
        )}

        {status === 'ready' && (
          <div className="github__grid">
            <motion.a
              href={profile.html_url}
              target="_blank"
              rel="noreferrer"
              className="github__profile"
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4 }}
            >
              <img src={profile.avatar_url} alt={profile.login} className="github__avatar" />
              <h3 className="github__name">{profile.name || profile.login}</h3>
              <p className="github__bio">{profile.bio || 'Building things across the stack.'}</p>

              <div className="github__stats-row">
                <div className="github__stat">
                  <span className="github__stat-value">{formatCount(profile.public_repos)}</span>
                  <span className="github__stat-label">Repos</span>
                </div>
                <div className="github__stat">
                  <span className="github__stat-value">{formatCount(profile.followers)}</span>
                  <span className="github__stat-label">Followers</span>
                </div>
                <div className="github__stat">
                  <span className="github__stat-value">{formatCount(profile.following)}</span>
                  <span className="github__stat-label">Following</span>
                </div>
              </div>
            </motion.a>

            <motion.ul
              className="github__repos"
              variants={repoListVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {repos.map((repo) => (
                <motion.li key={repo.id} className="github__repo" variants={repoItemVariants} whileHover={{ y: -3 }}>
                  <a href={repo.html_url} target="_blank" rel="noreferrer" className="github__repo-link">
                    <div className="github__repo-header">
                      <i className="uil uil-github-alt"></i>
                      <span className="github__repo-name">{repo.name}</span>
                    </div>
                    <p className="github__repo-desc">{repo.description || 'No description provided.'}</p>
                    <div className="github__repo-meta">
                      {repo.language && (
                        <span className="github__repo-lang">
                          <span
                            className="github__repo-lang-dot"
                            style={{ backgroundColor: LANGUAGE_COLORS[repo.language] || 'var(--accent-color)' }}
                          ></span>
                          {repo.language}
                        </span>
                      )}
                      <span className="github__repo-stars">
                        <i className="uil uil-star"></i>{repo.stargazers_count}
                      </span>
                      <span className="github__repo-updated">Updated {timeAgo(repo.pushed_at)}</span>
                    </div>
                  </a>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        )}
      </div>
    </section>
  );
};

export default GithubStats;
