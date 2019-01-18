import React, { Component } from 'react'
import { connect } from 'react-redux'
import PageHeader from './PageHeader'
import { Link } from 'react-router-dom'
import { fetchProjects } from '../Actions'

import './Style/page.scss'
class About extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.props.dispatch(fetchProjects())
  }

  render() {
    return (
      <div>
        <PageHeader />
        <div className="page">
          <section>
            <h2 className="section-header">Hi, my name is Jade.</h2>
            <div className="sub-section text-body">
              <p>
                I'm a web developer and technology consultant based in Brooklyn, NY. Some things I
                enjoy are an internet that respects all people, open and consensual communities,
                data activism, comics, video games, music, and rock climbing.
              </p>
              <br />
              <p>
                I enjoy projects that align with my values for a more just and egalitarian world,
                teaching people about technology and coding, and helping people with their
                independent projects. Before this, I was a software engineer at{' '}
                <a
                  href="https://everplans.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="linky"
                >
                  Everplans
                </a>
                , an emergency room nurse, and I have a B.A. in political science.
              </p>
              <br />
              <p>
                I'm currently a founder / software engineer at Data Automatica, a tech collective
                and consultancy.
              </p>
              <br />
              <p>
                Please <Link to="/contact">reach out</Link> if you'd like to collaborate.
              </p>
            </div>
            <br />
          </section>
          {/* <section className="writing">
            <h3 className="section-header">Writing</h3>
            <div className="sub-section">
              <p>
                <a className="linky" href="https://catxmachina.xyz" target="_blank">
                  CatXMachina - my blog
                </a>
              </p>
            </div>
            <div className="sub-section">
              <p>
                <a
                  className="linky"
                  href="https://dev.to/0xstarcat/a-checklist-for-people-that-want-to-make-tech-for-good-and-not-tech-for-bad-1gmb"
                  target="_blank"
                >
                  A checklist for people that want to make Tech for Good (and not Tech for Bad).
                </a>
              </p>
            </div>
            <div className="sub-section">
              <p>
                <a
                  className="linky"
                  href="https://medium.com/@jadeX/the-5-stages-of-grief-why-you-probably-shouldnt-build-your-own-cms-d39be6ea01b2"
                  target="_blank"
                >
                  The 5 stages of grief & why you probably shouldn’t build your own CMS.
                </a>
              </p>
            </div>
          </section>
          <section className="speaking">
            <h3 className="section-header">Speaking</h3>
            <div className="sub-section">
              <p>Oct, 2017 - Radical Networks</p>
              <p>
                <a
                  className="linky"
                  href="https://livestream.com/accounts/9197973/radnets17/videos/164748864"
                  target="_blank"
                >
                  Thanks, but we can secure ourselves: Setting up your own VPN with Algo.
                </a>
              </p>
            </div>
            <div className="sub-section">
              <p>Mar, 2017 - CSFair NYC</p>
              <p>
                <a
                  className="linky"
                  href="https://github.com/0xStarcat/csfair-presentation"
                  target="_blank"
                >
                  Digital Privacy: What Do You Look Like?
                </a>
              </p>
            </div>
            <div className="sub-section">
              <p>Jan, 2017 - Make A Diff CryptoParty</p>
              <p>
                <a
                  className="linky"
                  href="https://github.com/0xStarcat/protect-yo-self-browsing"
                  target="_blank"
                >
                  Protect Yo Self - Network Privacy & Safe Browsing
                </a>
              </p>
            </div>
            <div className="sub-section">
              <p>Dec, 2016 - Mozilla + Tactical Tech</p>
              <p>
                <a
                  className="linky"
                  href="https://tacticaltech.org/projects/glass-room"
                  target="_blank"
                >
                  The Glass Room - Workshops on Metadata / Safe Browsing
                </a>
              </p>
            </div>
            <hr />
          </section> */}
        </div>
      </div>
    )
  }
}

export default connect()(About)
