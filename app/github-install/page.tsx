'use client';

import { getPullRequests, GitHubExlorationData, PullRequestData, writeCommentsToGithub } from "@/src/github";
import { useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect, useState } from "react";
import { timeAgo } from "@/src/timeago";
import { checkCachedResults, checkResultsInDb, createGitHubInstallation, ReviewResult, saveFeedback } from "@/src/db";
import { requestCodeReview } from "@/src/sqs";
import { Badge, Button, Card, Col, ListGroup, Offcanvas, ProgressBar, Row } from "react-bootstrap";


export default function GitHubInstallWithSuspense() {
  return (
    <Suspense>
      <GitHubInstall />
    </Suspense>
  )
}

type PrReview = {
  pr: PullRequestData
  messageId: string
  numberOfChecks: number
  result: ReviewResult[]|null
}

const getBadgeColor = (severity: string) => {
  switch (severity.toLowerCase()) {
    case 'high':
      return 'danger'; // Red badge for high priority
    case 'medium':
      return 'warning'; // Yellow badge for medium priority
    case 'low':
      return 'success'; // Green badge for low priority
    default:
      return 'secondary'; // Gray badge for unknown priority
  }
}

const GitHubInstall = () => {

   // http://localhost:3000/github-install?installation_id=61691079&setup_action=install
  const searchParams = useSearchParams();
  const [data, setData] = useState<GitHubExlorationData|null>(null);
  const [integrationId, setIntegrationId] = useState<string|null>(null);
  const [openPr, setOpenPr] = useState<PrReview|null>(null);

  const installationId = searchParams?.get("installation_id");

  useEffect(() => {
    const triggerLoad = async () => {
      if (installationId !== null && installationId !== undefined) {
        const d = await getPullRequests(installationId);
        if (d.organizationName != null) {
          const id = await createGitHubInstallation(d.organizationName, installationId);
          setIntegrationId(id);
        }
        setData(d);
      }
    }
    triggerLoad();
  }, [ setData, setIntegrationId, installationId ]);
  // refresh timer
  const checkResults = useCallback(async (messageId:string) => {
    // console.log("Check", openPr)
    if (openPr !== null && openPr.result === null) {
      const results = await checkResultsInDb(messageId, integrationId!);
      if (results != null) {
        setOpenPr({ ...openPr, result: results });
      } else {
        setOpenPr({ ...openPr, numberOfChecks: openPr.numberOfChecks+1 });
      }
    }
  }, [ setOpenPr, openPr, integrationId ]);
  useEffect(() => {
      if (openPr?.result === null) {
        const timer = setTimeout(() => {
          checkResults(openPr.messageId);
        }, 1000);
        return () => { clearInterval(timer) }; 
      }
    }, [openPr, checkResults]);

  if (installationId === null || installationId === undefined) {
    return (
      <div className="container mt-4 text-center">
      <div className="row row-cols-1 ">
          <h1>Something went wrong. Please retry the installation</h1>
        </div></div>);
  }

  const handleImportToGitHub = () => {
    const trigger = async () => {
       await writeCommentsToGithub(installationId, openPr!.pr, openPr!.result!);
       window.open(openPr!.pr.html_url + "/files", "_blank");
    }
    trigger();
  }

  const handleVisitGitHub = (pr: PullRequestData) => {
    window.open(pr.html_url + "/files", "_blank");
  }

  const handleFeedback = (pr: PullRequestData, feedback: string) => {
    const trigger = async () => { 
      await saveFeedback(integrationId!, pr.unique_id, feedback);
    }
    trigger();
  }

  const handleRequestReview = (pr: PullRequestData) => {
      const trigger = async () => {
        const cached = await checkCachedResults(integrationId!, pr.unique_id);
        if (cached) {
          setOpenPr({
            pr: pr,
            messageId: "cached", 
            numberOfChecks: 0,
            result: cached
          });
          return;
        }

        const messageId = await requestCodeReview(integrationId!, pr.html_url, pr.unique_id);
        // console.log("posted", messageId);
        if (messageId !== null && messageId !== undefined) {
          setOpenPr({
            pr: pr,
            messageId: messageId, 
            numberOfChecks: 0,
            result: null
          });
        }
      };
      trigger();
  };

  return (<>
    <section className="bg-light py-3">
        <div className="text-center mb-4">
          <h1><span className="text-gradient d-inline">Installation Successful!</span></h1>
          {data && <>
          <p className="lead mx-3">You&apos;ve successfully connected your GitHub account to <strong className="font-weight-bold">{data.organizationName}</strong>. The bot will review all new PRs in the selected projects, you don&apos;t need to do anything else.</p>
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
        <Card>
          <Card.Body>
            <Card.Title>#{pr.id} {pr.title}</Card.Title>
            <Card.Text className="text-muted">Repo: {pr.repo} Updated: {timeAgo(pr.updatedAt) as string}</Card.Text>
            <span className="badge bg-warning">{pr.state}</span>
            <div className="mt-3">
              <button className="btn btn-sm" style={{backgroundColor:"#55bdc6"}} onClick={() =>handleRequestReview(pr)}>Zorp Review</button>&nbsp;
              <button className="btn btn-secondary btn-sm" onClick={() => handleVisitGitHub(pr)}><i className="bi bi-box-arrow-up-right" /> View in GitHub</button>
            </div>
          </Card.Body>
        </Card>
      </div>))}

    {/* <div className="text-center mb-4">
      <button className="btn btn-outline-primary">Load More</button>
    </div> */}
    </div>
<Offcanvas show={openPr !== null} onHide={() => setOpenPr(null)} placement="bottom" style={{height:"75%"}}>
  <Offcanvas.Header closeButton>
    <Offcanvas.Title>Zorp Review {openPr !== null ? `#${openPr.pr.id} ${openPr.pr.title}` : ''}</Offcanvas.Title> 
  </Offcanvas.Header>
  <Offcanvas.Body>
    {openPr?.result === null && <div>
      <p>Review typically takes about a minute</p>
      <ProgressBar striped animated variant="info" now={Math.min(100, openPr.numberOfChecks * 3) } />
    </div>}
    {openPr?.result !== null && <Row>
      <Col md="8">
      <ListGroup>
        {openPr?.result.map((issue:ReviewResult, index:number) => (
          <ListGroup.Item key={'issues' + index}>
            <h5><strong>File:</strong> {issue.file}:{issue.line_number} Category: {issue.category} <Badge  bg={getBadgeColor(issue.severity)}>{issue.severity}</Badge></h5>
            <p><strong>Problem:</strong> {issue.problem}</p>
            <p><strong>Suggestion:</strong> {issue.suggestion}</p>
            {/* {issue.clarifying_question && (
              <p><strong>Clarifying Question:</strong> {issue.clarifying_question}</p>
            )} */}
          </ListGroup.Item>
        ))}
      </ListGroup>
      </Col>
      <Col  md="4">
        <p>For a better experience, view the review on GitHub.</p>
          <div className="text-center my-3"><Button variant="dark" onClick={() => handleImportToGitHub()}><i className="bi bi-box-arrow-up-right" /> View in GitHub</Button></div>
          <div className="text-center">Don&apos;t forget your feedback - 
            <Button variant="light" onClick={() => handleFeedback(openPr!.pr, "good")}><i className="bi bi-hand-thumbs-up-fill" style={{color: "#ffcb4c"}}></i></Button>&nbsp;
            <Button variant="light" onClick={() => handleFeedback(openPr!.pr, "bad")}><i className="bi bi-hand-thumbs-down-fill" style={{color: "#ffcb4c"}}></i></Button>
         </div>
        </Col>  
      </Row>}
  </Offcanvas.Body>
</Offcanvas>

</div>}
</>
  );
}
