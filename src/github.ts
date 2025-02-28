'use server';

import { createAppAuth } from "@octokit/auth-app";
import { Octokit } from "@octokit/core";
import { ReviewResult } from "./db";

export type PullRequestData = {
    id: number,
    unique_id: string,
    repo: string,
    title: string,
    state: string,
    url: string,
    html_url: string
    patch_url: string
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
        prs = prResults.flatMap(r => r.data).map(p => { //console.log(p); 
            return { 
                id: p.number, 
                unique_id: `${p.id}`, 
                title: p.title, 
                repo: p.url.split("/")[4],
                state: p.state, 
                url: p.url,
                patch_url: p.patch_url,
                html_url: p.html_url,
                commit_id: p.merge_commit_sha,
                updatedAt: p.updated_at
             }})
    }
    return {
        organizationName: organizationName,
        totalRepositories: repoResult.data.total_count,
        pullRequests: prs
    }
}


export const writeCommentsToGithub = async (installationId: string, pr: PullRequestData, results: ReviewResult[]) => {
    const installationOctokit = new Octokit({
        authStrategy: createAppAuth,
        auth: {
          appId: process.env.CZ_GITHUB_APP_ID ,
          privateKey: process.env.CZ_GITHUB_PK_PEM,
          installationId: installationId,
        },
    });
    
    const comments = await installationOctokit.request(`GET ${pr.url}/comments`, {
        headers: {
          'X-GitHub-Api-Version': '2022-11-28'
        }
    });
    comments.data
        .filter((c: { user: { login: string; }; }) => c.user.login.startsWith("codezorp") )
        .map((c: { url: string; }) => {
            return installationOctokit.request(`DELETE ${c.url}`, {
                headers: {
                'X-GitHub-Api-Version': '2022-11-28'
                }
            });
    });
    const commits = await installationOctokit.request(`GET ${pr.url}/commits`, {
        headers: {
          'X-GitHub-Api-Version': '2022-11-28'
        }
    });
    const last_commit_sha = commits.data[commits.data.length-1].sha;
    const createResults = await Promise.all(results.map(r => {
        return installationOctokit.request(`POST ${pr.url}/comments`, {
            body: `Problem(${r.severity}): ${r.problem}\n\nSuggestion: ${r.suggestion}`,
            commit_id: last_commit_sha,
            path: r.file,
            line: r.line_number,
            side: 'RIGHT',
            headers: {
            'X-GitHub-Api-Version': '2022-11-28'
            }
        }).catch(e => e)
    }))
    createResults.filter(result => (result instanceof Error)).forEach(err => {
        console.error("Unable to write Github comment", err)
    });

}