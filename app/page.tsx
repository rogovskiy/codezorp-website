'use client';

import { createIntegration } from "../src/db";
import Dots from "./dots";

export default function Home() {

  const testAction = async () => {
    console.log("testing dynamo");
     await createIntegration("test");
  }

  return (<>
    <header className="py-0">
        <div className="container px-5 pb-5">
            <div className="row gx-5 align-items-center">
                <div className="col-xxl-7">
                    <div className="text-center text-xxl-start">
                        <div className="fs-3 fw-light text-muted">The alien intelligence behind smarter code reviews</div>
                        <h1 className="display-3 fw-bolder mb-5"><span className="text-gradient d-inline">Supercharge Your Code Reviews</span></h1>
                        <div className="d-grid gap-3 d-sm-flex justify-content-sm-center justify-content-xxl-start mb-3">
                            <a className="btn btn-dark btn-lg px-3 py-3 me-sm-3 fs-6 fw-bolder" href="https://github.com/apps/codezorp-dev/installations/new"><i className="bi bi-github" /> Integrate with GitHub</a>
                            <a className="btn btn-outline-dark btn-lg px-3 py-3 fs-6 fw-bolder" href="projects.html" onClick={testAction}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-gitlab" viewBox="0 0 16 16">
  <path d="m15.734 6.1-.022-.058L13.534.358a.57.57 0 0 0-.563-.356.6.6 0 0 0-.328.122.6.6 0 0 0-.193.294l-1.47 4.499H5.025l-1.47-4.5A.572.572 0 0 0 2.47.358L.289 6.04l-.022.057A4.044 4.044 0 0 0 1.61 10.77l.007.006.02.014 3.318 2.485 1.64 1.242 1 .755a.67.67 0 0 0 .814 0l1-.755 1.64-1.242 3.338-2.5.009-.007a4.05 4.05 0 0 0 1.34-4.668Z"/>
</svg> Integrate with GitLab</a>
                        </div>
                    </div>
                </div>
                <div className="col-xxl-5">
                    <div className="d-flex justify-content-center mt-5 mt-xxl-0">
                        <div className="profile bg-gradient-primary-to-secondary">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img className="profile-img" src="codezorp.png" alt="..." />
                            <div className="dots-1">
                              <Dots />
                            </div>
                            <div className="dots-2">
                              <Dots />
                            </div>
                            <div className="dots-3">
                              <Dots />
                            </div>
                            <div className="dots-4">
                              <Dots />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>
    <section className="bg-light py-3">
        <div className="container px-5">
            <div className="row gx-5 justify-content-center">
                <div className="col-xxl-8">
                    <div className="my-5">
                      <h2 className="text-center display-5 fw-bolder"><span className="text-gradient d-inline">How does it work?</span></h2>
                    </div>
                </div>
            </div>
            <div className="row gx-5 justify-content-center my-2">
                <div className="col-xxl-5">
                    <p className="lead fw-light my-2">Takes 10 min to get started</p>
                    <ul className="list-group text-left">
                      <li className="list-group-item"><b>Integrate:</b> Connect with GitHub, Bitbucket, or GitLab. </li>
                      <li className="list-group-item"><b>Review:</b> AI bot reviews every pull request.</li>                              
                      <li className="list-group-item"><b>Improve:</b> Get actionable feedback to enhance code quality.</li>
                      <li className="list-group-item"><b>Deploy:</b> Merge with confidence and ship faster.</li>
                    </ul>
                </div>
                <div className="col-xxl-5">
                    <p className="lead fw-light my-2">Why choose CodeZorp?</p>
                    <ul className="list-group text-left">
                      <li className="list-group-item"><b>Instant Feedback</b> Get reviews in seconds.</li>
                      <li className="list-group-item"><b>Multi-Platform</b>  Works with GitHub,Bitbucket, GitLab.</li>
                      <li className="list-group-item"><b>Customizable Rules</b>   Tailor the bot to your coding standards</li>
                      <li className="list-group-item"><b>Security First</b>  Your code is never stored or shared.</li>
                      <li className="list-group-item"><b>Learning AI</b>  The bot improves over time. </li>
                    </ul>
                </div>
            </div>
        </div>       
    </section>
    <section className="py-3">
        <div className="container px-5">
            <div className="row gx-5 justify-content-center">
                <div className="col-xxl-8">
                    <div className="my-5">
                      <h2 className="text-center display-5 fw-bolder"><span className="text-gradient d-inline">Results</span></h2>
                      <p className="text-muted lead">Average review time is 1 minute 38 seconds. Every third review identifies a logical issue.</p>
                      </div>
                </div>
            </div>
            <div className="row gx-5 justify-content-center my-2">
                <div className="col-xxl-5">
                    <p className="lead fw-light my-2">29 code reviews completed since launch</p>
<div className="progress my-3">
  <div className="progress-bar" role="progressbar" style={{width: "100%", backgroundColor: "#1f6f6f" }} > Java </div>
</div>
<div className="progress my-3">
  <div className="progress-bar" role="progressbar" style={{width: "80%", backgroundColor: "#1f6f6f"}}>HTML</div>
</div>
<div className="progress my-3">
  <div className="progress-bar" role="progressbar" style={{width: "78%", backgroundColor: "#1f6f6f"}} >Python</div>
</div>
<div className="progress my-3">
  <div className="progress-bar" role="progressbar" style={{width: "50%", backgroundColor: "#1f6f6f"}} >Javascript</div>
</div>
                </div>
                <div className="col-xxl-5">
                    <p className="lead fw-light my-2">Top comment categories</p>
<div className="progress my-3">
  <div className="progress-bar" role="progressbar" style={{width: "56%", backgroundColor: "#c99b38"}}>Correctness / Logic</div>
</div>
<div className="progress my-3">
  <div className="progress-bar" role="progressbar" style={{width: "78%", backgroundColor: "#1f6f6f"}}>Security</div>
</div>
<div className="progress my-3 text-right">
  <div className="progress-bar" role="progressbar" style={{width: "100%", backgroundColor: "#2066a8" }}> Maintainability </div>
</div>

<div className="progress my-3">
  <div className="progress-bar" role="progressbar" style={{width: "50%", backgroundColor: "#5e4c5f"}}>Test Coverage</div>
</div>
                </div>
            </div>
        </div>
      </section>
</>
  );
}
