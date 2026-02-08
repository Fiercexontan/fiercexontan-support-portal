'use client';

import { useState, useEffect } from 'react';
import { FaGithub, FaCodeBranch, FaStar, FaExclamationCircle } from 'react-icons/fa';
import { formatDate } from '@/lib/constants';

export default function GithubActivity() {
  const [activity, setActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchGithubActivity();
  }, []);

  const fetchGithubActivity = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/github-activity');
      
      if (!response.ok) {
        throw new Error('Failed to fetch GitHub activity');
      }
      
      const data = await response.json();
      setActivity(data.slice(0, 5)); // Show only 5 most recent activities
      setError(null);
    } catch (err) {
      console.error('Error fetching GitHub activity:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="glass-card rounded-2xl p-6">
        <div className="flex items-center space-x-3 mb-4">
          <FaGithub className="text-2xl text-accent-cyan" />
          <h3 className="text-xl font-bold text-white">Recent GitHub Activity</h3>
        </div>
        <div className="flex justify-center py-8">
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="glass-card rounded-2xl p-6">
        <div className="flex items-center space-x-3 mb-4">
          <FaGithub className="text-2xl text-accent-cyan" />
          <h3 className="text-xl font-bold text-white">Recent GitHub Activity</h3>
        </div>
        <div className="flex items-center space-x-3 text-yellow-500 bg-yellow-500/10 rounded-lg p-4">
          <FaExclamationCircle />
          <p className="text-sm">Unable to load GitHub activity at this time.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <FaGithub className="text-2xl text-accent-cyan" />
          <h3 className="text-xl font-bold text-white">Recent GitHub Activity</h3>
        </div>
        <a
          href={`https://github.com/${process.env.NEXT_PUBLIC_GITHUB_ORG}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent-cyan hover:text-accent-blue transition-colors text-sm font-medium"
        >
          View More →
        </a>
      </div>

      <div className="space-y-4">
        {activity.length === 0 ? (
          <p className="text-white/60 text-sm text-center py-4">No recent activity</p>
        ) : (
          activity.map((item, index) => (
            <div
              key={index}
              className="flex items-start space-x-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
            >
              <div className="flex-shrink-0 mt-1">
                {item.type === 'push' && (
                  <FaCodeBranch className="text-accent-cyan" />
                )}
                {item.type === 'star' && (
                  <FaStar className="text-yellow-400" />
                )}
                {item.type === 'issue' && (
                  <FaExclamationCircle className="text-green-400" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-medium truncate">
                  {item.repo}
                </p>
                <p className="text-white/60 text-xs mt-1 line-clamp-2">
                  {item.description}
                </p>
                <p className="text-white/40 text-xs mt-1">
                  {formatDate(item.timestamp)}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/60">
        <span>Updates every 5 minutes</span>
        <button
          onClick={fetchGithubActivity}
          className="text-accent-cyan hover:text-accent-blue transition-colors"
        >
          Refresh
        </button>
      </div>
    </div>
  );
}