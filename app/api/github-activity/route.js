import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const org = process.env.NEXT_PUBLIC_GITHUB_ORG || 'Fiercexontan-Ops';
    
    // Fetch recent events from GitHub API
    const response = await fetch(
      `https://api.github.com/orgs/${org}/events?per_page=10`,
      {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          // Note: For production, add GitHub token for higher rate limits
          // 'Authorization': `token ${process.env.GITHUB_TOKEN}`,
        },
        next: { revalidate: 300 } // Cache for 5 minutes
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch GitHub activity');
    }

    const events = await response.json();
    
    // Transform events into a simpler format
    const activities = events.map(event => {
      let description = '';
      let type = 'push';

      switch (event.type) {
        case 'PushEvent':
          const commits = event.payload.commits?.length || 0;
          description = `Pushed ${commits} commit${commits !== 1 ? 's' : ''} to ${event.payload.ref?.split('/').pop() || 'main'}`;
          type = 'push';
          break;
        case 'PullRequestEvent':
          description = `${event.payload.action} pull request: ${event.payload.pull_request?.title}`;
          type = 'issue';
          break;
        case 'IssuesEvent':
          description = `${event.payload.action} issue: ${event.payload.issue?.title}`;
          type = 'issue';
          break;
        case 'CreateEvent':
          description = `Created ${event.payload.ref_type}: ${event.payload.ref || event.repo.name}`;
          type = 'push';
          break;
        case 'WatchEvent':
          description = `Starred the repository`;
          type = 'star';
          break;
        case 'ForkEvent':
          description = `Forked the repository`;
          type = 'push';
          break;
        default:
          description = `${event.type.replace('Event', '')} activity`;
          type = 'push';
      }

      return {
        repo: event.repo.name.split('/')[1] || event.repo.name,
        description,
        type,
        timestamp: event.created_at,
        actor: event.actor.login,
      };
    });

    return NextResponse.json(activities);
  } catch (error) {
    console.error('Error fetching GitHub activity:', error);
    
    // Return mock data if GitHub API fails
    return NextResponse.json([
      {
        repo: 'support-portal',
        description: 'Pushed 3 commits to main',
        type: 'push',
        timestamp: new Date().toISOString(),
        actor: 'Fiercexontan-Ops'
      },
      {
        repo: 'blockchain-tools',
        description: 'Created new feature branch',
        type: 'push',
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        actor: 'Fiercexontan-Ops'
      }
    ]);
  }
}