import React from 'react';







export default class Push extends React.Component {

constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
}

handleClick(e) {
    e.preventDefault
    console.log("Button Clicked");
    Push.create('Hello World!');
    };

return (
    <div>
<button id="desktop-notification" onClick={this.handleClick}>Desktop Notification</button>
</div>
)

}
