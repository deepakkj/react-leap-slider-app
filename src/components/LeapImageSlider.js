
import React from 'react';
import { withLeapContainer } from 'react-leap';
import Gallery from './Gallery';

const imagesList = [
  {src: '../images/1.jpg', caption: '1',orientation: 'square', useForDemo: true},
  {src: '../images/2.jpg', caption: '2',orientation: 'square', useForDemo: true},
  {src: '../images/4.jpg', caption: '3',orientation: 'square', useForDemo: true},
  {src: '../images/5.jpg', caption: '4',orientation: 'square', useForDemo: true},

];

const LeapImageSlider = ({frame}) => {
  console.log(frame);
  if (Object.keys(frame).length === 0 ) {
    return (
      <div className="aa">
        <Gallery images={imagesList} showThumbnails={true}/>
        <h6 className="text-right text-white warning-msg">Attach Leap Motion to use gestures</h6>
      </div>
    );
  }

  return (
    <div>
      <Gallery images={imagesList} showThumbnails={true} gestures={frame.currentFrameRate >= 20 ? frame.gestures : ''} />
    </div>
  )
}


export default withLeapContainer(LeapImageSlider);
