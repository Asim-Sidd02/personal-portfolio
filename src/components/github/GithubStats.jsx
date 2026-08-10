import React, { useState, useEffect } from 'react';
import './githubStats.css';

const USERNAME = 'Asim-Sidd02';

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
            <a
              href={profile.html_url}
              target="_blank"
              rel="noreferrer"
              className="github__profile"
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
            </a>

            <ul className="github__repos">
              {repos.map((repo) => (
                <li key={repo.id} className="github__repo">
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
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
};

export default GithubStats;
