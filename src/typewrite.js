import React, {Component} from 'react';
import Typist from 'react-typist';

export default class Typewriter extends Component {

  render() {
    return (
        <div>

        <section className="wrapper">
        <h1>Willst du mehr aus deinem Studium machen?</h1>

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
