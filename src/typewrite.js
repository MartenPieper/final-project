import React, {Component} from 'react';
import Typist from 'react-typist';

export default class Typewriter extends Component {

  render() {
    return (
        <div className="banner-container">

        <section className="wrapper">
        <h1 className="heading-title">Mach mehr aus deinem Studium!</h1>

          <h2 className="sentence">Hier findest du die passenden
            <div className="slidingVertical">
              <span>Events</span>
              <span>Jobs</span>
              <span>Onlinekurse</span>
              <span>Stipendien</span>
              <span>Freizeitangebote</span>
            </div>

          </h2>

</section>
</div>

    );
  }
}
