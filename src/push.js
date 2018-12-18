import React from 'react';


export default class PushComp extends React.Component {

constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
}



handleClick(e) {
    e.preventDefault
    console.log("Button Clicked");
    console.log("Push", Push)
    Push.Permission.request(onGranted,onDenied);

    function onGranted() {
           console.log("onGranted")
       }

       function onDenied() {
           console.log("onDenied")
       }
//     Push.create("Hello world!", {
//     body: "How's it hangin'?",
//
//     timeout: 1000,
//     onClick: function () {
//         window.focus();
//         this.close();
//     }
// });
    };

render() {
return (
    <div>
<button id="desktop-notification" onClick={this.handleClick}>Desktop Notification</button>
</div>
)
}
}
