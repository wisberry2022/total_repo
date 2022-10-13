import './Basic.scss';
import React from 'react';
import ReactFullpage from '@fullpage/react-fullpage';
import First from './sections/First/First';
import Second from './sections/Second/Second';
import Third from './sections/Third/Third';
const anchors = ['firstSection', 'secondSection', 'thirdSection'];

const FullPage = () => (
  <ReactFullpage
    //fullpage options
    anchors={anchors}
    // navigation
    // navigationTooltips={anchors}
    // parallax={false}
    // parallaxOptions={percentage}
    licenseKey={'YOUR_KEY_HERE'}
    loopBottom
    scrollingSpeed={1000} /* Options here */

    render={({ state, fullpageApi }) => {
      return (
        <ReactFullpage.Wrapper>
          <First />
          <Second />
          <Third />
          <div className="section">
            <p>Section 3</p>
          </div>

        </ReactFullpage.Wrapper>
      );
    }}
  />
);

export default FullPage;