import React, {Component} from 'react'
import PageHeader from './PageHeader'

import './Style/page.scss'
export default class About extends Component {
  constructor() {
    super()
  }
  render() {
    return(
      <div>
        <PageHeader/>
        <div className ='page'>
          <section>
            <h2 className='section-header'>Hi,</h2>
            <div className='sub-section text-body'>
              <p>My name is Jeff. I'm based in Brooklyn, NY. Some things I like are information security, an internet that respects all people, cultural diversity, open and consensual communities, art, comics, games, and music.</p>
              <br />
              <p>I currently work as a software engineer for <a href="https://everplans.com" target="_blank" className="linky">Everplans</a> and enjoy doing projects that help activist communities. Before this, I worked as an emergency room nurse and I have a B.A. in political science.</p>
            </div>
            <br/>
            <h3>Some things I've worked on:</h3>
            <div className='sub-section text-body projects'>
              <p>
                <a href='https://trump-tweets-viz.herokuapp.com/' target='blank'>Trump Tweets - </a>
                <br/>A data project using D3.js that visualizes and categorizes the targets of Donald Trump's twitter insults.
              </p>
              <br/>
              <p>
                <a href='https://github.com/0xStarcat/Trump-Tweets-Scraper' target='blank'>Trump Tweets Scraper - </a>
                <br/>A Node scraper for supplying Twitter data to Trump Tweets. Collects the latest data from <a href='https://www.nytimes.com/interactive/2016/01/28/upshot/donald-trump-twitter-insults.html' target='blank'>a NYTimes article</a> that continuously updates its coverage of Trump's Twitter.
              </p>
              <br/>
              <p>
                <a href='https://github.com/0xStarcat/Census-CPS-Scraper' target='blank'>Census.gov CPS Scraper - </a>
                <br/>A Node scraper for the CPS report from <a href='census.gov'target='blank'>census.gov</a>. Queries the census database, extracts data, and formats population demographic data into a CSV file.
              </p>
              <br/>
              <p>
                <a href='https://right2remove.us/' target='blank'>Right2Remove - </a>
                <br/>A static website built with Bootstrap in collaboration with an artist/activist for the promotion of a political cause.
              </p>
              <br/>
              <p>
                <a href='https://myIRlog.com' target='blank'>My IRlog - </a>
                <br/>A medical data logging and education site architectured, built, and hosted to comply with HIPPA privacy and security regulations. Rails framework + Linux server.
              </p>
              <br/>
              <p>
                <a href='https://github.com/0xStarcat/yahoo-login' target='blank'>Yahoo "login" - </a>
                <br/>A spear-ph*shing site set up for educational purposes for a friend's podcast discussion. Mimics appearance of yahoo.com's login site which was tweaked to deliver the user's password to an email address.
              </p>
            </div>
          </section>
        </div>
      </div>
    )
  }
}
