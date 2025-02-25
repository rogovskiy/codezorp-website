import Dots from "./dots";

export default function Home() {
  return (<>
    <main className="flex-shrink-0">
    <nav className="navbar navbar-expand-lg navbar-light bg-white py-3">
        <div className="container px-5">
            <a className="navbar-brand" href="index.html"><span className="fw-bolder text-dark">CodeZorp.ai</span></a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0 small fw-bolder">
                    <li className="nav-item"><a className="nav-link" href="projects.html">How does it work?</a></li>
                    <li className="nav-item"><a className="nav-link" href="index.html">Blog</a></li>
                    <li className="nav-item"><a className="nav-link" href="contact.html">Contact</a></li>
                </ul>
            </div>
        </div>
    </nav>
    <header className="py-0">
        <div className="container px-5 pb-5">
            <div className="row gx-5 align-items-center">
                <div className="col-xxl-7">
                    <div className="text-center text-xxl-start">
                        <div className="fs-3 fw-light text-muted">The alien intelligence behind smarter code reviews</div>
                        <h1 className="display-3 fw-bolder mb-5"><span className="text-gradient d-inline">Supercharge Your Code Reviews</span></h1>
                        <div className="d-grid gap-3 d-sm-flex justify-content-sm-center justify-content-xxl-start mb-3">
                            <a className="btn btn-dark btn-lg px-3 py-3 me-sm-3 fs-6 fw-bolder" href="resume.html"><i className="bi bi-github" /> Integrate with GitHub</a>
                            <a className="btn btn-outline-dark btn-lg px-3 py-3 fs-6 fw-bolder" href="projects.html"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-gitlab" viewBox="0 0 16 16">
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
                    <p className="lead fw-light my-2">It takes 10 min to get started</p>
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
</main>
<footer className="bg-white py-4 mt-auto">
    <div className="container px-5">
        <div className="row align-items-center justify-content-between flex-column flex-sm-row">
            <div className="col-auto"><div className="small m-0">Copyright &copy; Your CodeZorp 2025  </div></div>
            <div className="col-auto">
                <a className="small text-dark" href="#!">Privacy</a>
                <span className="mx-1">&middot;</span>
                <a className="small text-dark" href="#!">Terms</a>
                <span className="mx-1">&middot;</span>
                <a className="small text-dark" href="#!">Contact</a>
            </div>
        </div>
    </div>
</footer>
</>
  );
}
