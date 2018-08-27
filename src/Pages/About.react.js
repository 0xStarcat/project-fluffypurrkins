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
                like are an internet that respects all people, open and consensual communities, data
                activism, comics, video games, music, and rock climbing.
              </p>
              <br />
              <p>
                I enjoy doing projects that align with my values for a more just and egalitarian
                world, teaching people about technology and coding, and helping people with their
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
                Please <Link to="/contact">reach out</Link> if you'd like to collaborate.
              </p>
            </div>
            <br />
          </section>
        </div>
      </div>
    )
  }
}

export default connect()(About)
