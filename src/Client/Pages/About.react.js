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
              <p>My name is Jade. My pronouns are they/them and I'm based in Brooklyn, NY. Some things I like are an internet that respects all people, open and consensual communities, information security, open data and beautiful data visualization, art, comics, video games, music, and rock climbing.</p>
              <br />
              <p>I currently work as an independent web developer and tech consultant. Previously, I was a software engineer at <a href="https://everplans.com" target="_blank" className="linky">Everplans</a> and enjoy doing projects that help activist communities. Before this, I worked as an emergency room nurse and I have a B.A. in political science.</p>
            </div>
            <br/>
            <h3>Some things I've worked on:</h3>
            <div className='sub-section text-body projects'>
             <a href='https://trump-tweets-viz.herokuapp.com/' target='blank'>Trump Tweets - </a>
              <p> 
                <br/>A data project using D3.js that visualizes and categorizes the targets of Donald Trump's twitter insults.
              </p>
              <br/>
              <a href='https://github.com/0xStarcat/Trump-Tweets-Scraper' target='blank'>Trump Tweets Scraper - </a>
              <p>
                <br/>A Node scraper for supplying Twitter data to Trump Tweets. Collects the latest data from <a href='https://www.nytimes.com/interactive/2016/01/28/upshot/donald-trump-twitter-insults.html' target='blank'>a NYTimes article</a> that continuously updates its coverage of Trump's Twitter.
              </p>
              <br/>
              <a href='https://github.com/0xStarcat/Census-CPS-Scraper' target='blank'>Census.gov CPS Scraper - </a>
              <p>
                <br/>A Node scraper for the CPS report from <a href='census.gov'target='blank'>census.gov</a>. Queries the census database, extracts data, and formats population demographic data into a CSV file.
              </p>
              <br/>
              <a href='https://right2remove.us/' target='blank'>Right2Remove - </a>
              <p>
                <br/>A static website built in collaboration with an artist/activist for the promotion of a the right to remove your information from search results in the United States and to fight the abuse of personal information on the internet.
              </p>
              <br/>
              <a href='https://myIRlog.com' target='blank'>My IRlog - </a>
              <p>
                <br/>A medical data logging and education site architectured, built, and hosted to comply with HIPPA privacy and security regulations. Rails framework + Linux server.
              </p>
              <br/>
              <a href='https://github.com/0xStarcat/yahoo-login' target='blank'>Yahoo "login" - </a>
              <p>
                <br/>A spear-ph*shing site set up for educational purposes for a friend's podcast discussion. Mimics appearance of yahoo.com's login site which was tweaked to deliver the user's password to an email address.
              </p>
            </div>
          </section>
        </div>
      </div>
    )
  }
}
