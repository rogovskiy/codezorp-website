'use server';

import { createAppAuth } from "@octokit/auth-app";
import { Octokit } from "@octokit/core";

export type PullRequestData = {
    id: number,
    repo: string,
    title: string,
    state: string,
    url: string,
    updatedAt: string
}
export type GitHubExlorationData = {
    organizationName: string|null
    totalRepositories: number
    pullRequests: PullRequestData[]
}

export const getPullRequests = async (installationId: string) => {
    const installationOctokit = new Octokit({
        authStrategy: createAppAuth,
        auth: {
          appId: process.env.CZ_GITHUB_APP_ID ,
          privateKey: process.env.CZ_GITHUB_PK_PEM,
          installationId: installationId,
        },
    });
      
    const repoResult = await installationOctokit.request("GET /installation/repositories");
    let organizationName = null;
    let prs: PullRequestData[] = [];
    if (repoResult.data.total_count > 0) {
        const firstRepo = repoResult.data.repositories[0];
        organizationName = firstRepo.full_name.split('/')[0];

        const mostRecentRepos = repoResult.data.repositories.sort(r => -r.id).slice(0, 10);
        const prResults = await Promise.all(mostRecentRepos.map(async (r) => {
            return installationOctokit.request('GET /repos/{owner}/{repo}/pulls', {
                owner: r.owner.login,
                repo: r.name,
                headers: {
                  'X-GitHub-Api-Version': '2022-11-28'
                }
              })
        }));
        prs = prResults.flatMap(r => r.data).map(p => ({ 
                id: p.number, 
                title: p.title, 
                repo: p.url.split("/")[4],
                state: p.state, 
                url: p.url,
                updatedAt: p.updated_at
             }))
    }
    return {
        organizationName: organizationName,
        totalRepositories: repoResult.data.total_count,
        pullRequests: prs
    }
}

