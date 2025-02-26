'use client';

import { getPullRequests, GitHubExlorationData } from "@/src/github";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { timeAgo } from "@/src/timeago";


export default function GitHubInstallWithSuspense() {
  return (
    <Suspense>
      <GitHubInstall />
    </Suspense>
  )
}

const GitHubInstall = () => {

   // http://localhost:3000/github-install?installation_id=61691079&setup_action=install
  const searchParams = useSearchParams();
  const [data, setData] = useState<GitHubExlorationData|null>(null);

  const installationId = searchParams?.get("installation_id");

  useEffect(() => {
    const triggerLoad = async () => {
      if (installationId !== null && installationId !== undefined) {
        const d = await getPullRequests(installationId);
        setData(d);
      }
    }
    triggerLoad();
  }, [ setData, installationId ]);

  if (installationId === null || installationId === undefined) {
    return (
      <div className="container mt-4 text-center">
      <div className="row row-cols-1 ">
          <h1>Something went wrong. Please retry the installation</h1>
        </div></div>);
  }

  return (<>
    <section className="bg-light py-3">
        <div className="text-center mb-4">
          <h1><span className="text-gradient d-inline">Installation Successful!</span></h1>
          {data && <>
          <p className="lead">You&apos;ve successfully connected your GitHub account to <strong className="font-weight-bold">{data.organizationName}</strong>.</p>
          <p className="lead">Explore your GitHub PRs and reviews.</p>
          <p className="small"><i>You can close this page at any time when you are done exploring</i></p>
          </>}
        </div>
    </section>

    {data && <div className="container mt-4">

    <div className="row mb-4">
      <div className="col-md-8">
        <input type="text" className="form-control" placeholder="Search PRs..." />
      </div>
      <div className="col-md-4">
        <select className="form-select">
          <option value="all">All</option>
          <option value="open">Open</option>
          <option value="closed">Closed</option>
        </select>
      </div>
    </div>

    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 mb-4">

      {data.pullRequests.map((pr) => (<div className="col" key={pr.id}>
        <div className="card pr-card">
          <div className="card-body">
            <h5 className="card-title">#{pr.id} {pr.title}</h5>
            <p className="card-text text-muted">Repo: {pr.repo} Updated: {timeAgo(pr.updatedAt) as string}</p>
            <span className="badge bg-warning">{pr.state}</span>
            <div className="mt-3">
              <button className="btn btn-sm" style={{backgroundColor:"#55bdc6"}} data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">Zorp Review</button>&nbsp;
              <button className="btn btn-secondary btn-sm"><i className="bi bi-box-arrow-up-right" /> View in GitHub</button>
            </div>
          </div>
        </div>
      </div>))}

    {/* <div className="text-center mb-4">
      <button className="btn btn-outline-primary">Load More</button>
    </div> */}
    </div>

<div className="offcanvas offcanvas-bottom" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
  <div className="offcanvas-header">
    <h5 className="offcanvas-title" id="offcanvasExampleLabel">Zorp Review</h5>
    <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div className="offcanvas-body">
    <div>
      Some text as placeholder. In real life you can have the elements you have chosen. Like, text, images, lists, etc.
    </div>
    <div className="mt-3 row">
      <div className="col-md-2"><button className="btn btn-dark">Post Review to GitHub</button></div>
      <div className="col-md-6">Don&apos;t forget your feedback - 
      <button className="btn btn-light"><i className="bi bi-hand-thumbs-up-fill" style={{color: "#ffcb4c"}}></i></button>&nbsp;
      <button className="btn btn-light"><i className="bi bi-hand-thumbs-down-fill" style={{color: "#ffcb4c"}}></i></button>
      </div>
    </div>
  </div>
</div>

</div>}
</>
  );
}
