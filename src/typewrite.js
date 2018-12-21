import React, {Component} from 'react';
import Typist from 'react-typist';

export default class Typewriter extends Component {

  render() {
    return (
        <div className="banner-container">

        <section className="wrapper">
        <h1 className="heading-title">Want to get the most out of your studies?!</h1>

          <h2 className="sentence">Here you can find the best
            <div className="slidingVertical">
              <span>Events</span>
              <span>Jobs</span>
              <span>MOOCs</span>
              <span>Scholarships</span>
              <span>Leisure activities</span>
            </div>

          </h2>

</section>
</div>

    );
  }
}
