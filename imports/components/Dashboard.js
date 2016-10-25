import React from 'react';
import { Meteor } from 'meteor/meteor';
import AccountsUIWrapper from './accounts'
import SelectLanguage from './SelectLanguage';
import Matches from './Matches';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
  }

  startChat(user, peer) {
    var outgoingCall = peer.call(user.profile.peerId, window.localStream);
    window.currentCall = outgoingCall;
    outgoingCall.on('stream', function (remoteStream) {
      window.remoteStream = remoteStream;
      var video = document.getElementById('theirVideo')
      video.src = URL.createObjectURL(remoteStream);
    });
  }

  render() {
    return (
      <div className='dashboard'>
        <div className='top'>
          <div className='video-box'>
            <div className='video-wrapper'>
              <video id="theirVideo" muted="true" autoPlay="true"></video>
            </div>
          </div>
          <div className='current-profile'>
            <span className='sign-out'>
              <AccountsUIWrapper />
            </span>
          </div>
        </div>
        <div className='bottom'>
          <div className='text-box'></div>
          <div className='new-chat'>
            <div className='selected-language'>
              Selected Language
            </div>
            <div className='language'>
              {this.props.language}
            </div>
            <div className='button-wrapper'>
              <button onClick={() => this.startChat(this.props.onlineUsers[0], this.props.peer)}>
                {this.props.onlineUsers[0] ? 'Start Chat' : 'Waiting'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default Dashboard;

// <Matches 
//   matches={onlineUsers.filter(u => (
//     u.profile.language === language
//   ))} 
// />