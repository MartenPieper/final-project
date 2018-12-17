import React, {Component} from 'react';
import Typist from 'react-typist';

export default class Typewriter extends Component {

  render() {
    return (
        <div>
        <h1>Mach mehr aus deinem Studium!</h1>

      <div>
      <span>Bei StudentScout findest du alle ...</span>

      <Typist>
      <span>Studentenjobs..</span>
      <Typist.Backspace count={14} delay={200} />
      <span>tipendien..</span>
      <Typist.Backspace count={12} delay={200} />
      <span>Events..</span>
      <Typist.Backspace count={8} delay={200} />
      <span>Finanzierungen..</span>
      <Typist.Backspace count={15} delay={200} />
      <span>reizeitaktivitäten..</span>
      <Typist.Backspace count={21} delay={200} />
      <span>Deals für mehr Studentenleben..</span>


      </Typist>
      </div>
      </div>
    );
  }
}
