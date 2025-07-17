import { defineEventHandler, useRuntimeConfig } from "#imports";

export default defineEventHandler(async () => {
  const config = useRuntimeConfig();
  const token = config.githubApiToken;
  const endpoint = config.public.githubEndpoint;

  const query = `
    query {
      viewer {
        repositories(privacy: PUBLIC) {
          totalCount
        }
        followers {
          totalCount
        }
        contributionsCollection {
          contributionCalendar {
            totalContributions
          }
        }
        pullRequests {
          totalCount
        }
        issues {
          totalCount
        }
        starredRepositories {
          totalCount
        }
        commitComments {
          totalCount
        }
      }
    }
  `;

  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables: {
      login: "marprezd",
    } }),
  });

  if (!res.ok) {
    return { error: "Failed to fetch GitHub stats" };
  }

  const { data } = await res.json();
  const viewer = data.viewer;

  return {
    stars: viewer.starredRepositories.totalCount,
    totalCommits: viewer.commitComments.totalCount,
    totalRepos: viewer.repositories.totalCount,
    followers: viewer.followers.totalCount,
    contributions: viewer.contributionsCollection.contributionCalendar.totalContributions,
    prs: viewer.pullRequests.totalCount,
    issues: viewer.issues.totalCount,
  };
});
